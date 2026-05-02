/* ingredients.js → allIngredients | events.js → culinaryEvents */
/* recipes.js (loaded async) → recipes */

const ingredientById = Object.fromEntries(allIngredients.map((ing) => [ing.id, ing]));

const ingredientList = document.getElementById("ingredientList");
const recipesOutput = document.getElementById("recipesOutput");

/** Names of ingredients shown for this page (from `body` id → events.js `id`). */
let ingredientNames = [];
let stock = {};

function getCurrentPageFilename() {
  let path = window.location.pathname.split("/").pop() || "";
  if (!path) path = "index.html";
  return path;
}

/** Prefer matching `culinaryEvents[].href` so IDs stay in sync with events.js (body id is fallback). */
function getCurrentEventId() {
  const path = getCurrentPageFilename();
  const norm = (s) => String(s || "").toLowerCase();

  if (typeof culinaryEvents !== "undefined" && culinaryEvents.length) {
    const hit = culinaryEvents.find((ev) => {
      return (
        norm(path) === norm(ev.href) ||
        (norm(ev.href) === "index.html" &&
          (norm(path) === "" || norm(path) === "index.html"))
      );
    });
    if (hit != null && hit.id !== undefined && hit.id !== "") {
      return String(hit.id);
    }
  }

  const bid = document.body.id || "";
  const m = bid.match(/^page-event-(.+)$/i);
  return m ? m[1] : null;
}

function ingredientMatchesEvent(ing) {
  const eid = getCurrentEventId();
  if (!eid) return true;
  return Array.isArray(ing.eventID) && ing.eventID.includes(eid);
}

function recipeMatchesEvent(recipe) {
  const eid = getCurrentEventId();
  if (!eid) return true;
  return Array.isArray(recipe.eventID) && recipe.eventID.length > 0 && recipe.eventID.includes(eid);
}

function syncVisibleIngredientNames() {
  ingredientNames = allIngredients.filter(ingredientMatchesEvent).map((i) => i.name);
}

function ingredientsForCurrentEvent() {
  return allIngredients.filter(ingredientMatchesEvent);
}

function ensureStockShape() {
  allIngredients.forEach((ing) => {
    if (stock[ing.name] === undefined) stock[ing.name] = 0;
  });
}

/** Expand `{ id, qty }` into `{ name, icon, qty }` using the shared catalog. */
function resolveNeed(need) {
  if (need.id && ingredientById[need.id]) {
    const ing = ingredientById[need.id];
    return { name: ing.name, icon: ing.icon, qty: need.qty };
  }
  return need;
}

function hydrateRecipeNeeds() {
  recipes.forEach((recipe) => {
    recipe.needs = recipe.needs.map(resolveNeed);
  });
}

function renderEvents() {
  const grid = document.getElementById("eventsGrid");
  if (!grid || typeof culinaryEvents === "undefined") return;

  const path = getCurrentPageFilename();
  const norm = (s) => String(s || "").toLowerCase();

  grid.innerHTML = "";

  culinaryEvents.forEach((ev) => {
    const isCurrent =
      norm(path) === norm(ev.href) ||
      (norm(ev.href) === "index.html" &&
        (norm(path) === "" || norm(path) === "index.html"));

    const inner = `
      <img src="${ev.image}" alt="" class="event-card-image" loading="lazy" width="320" height="120">
      <span class="event-card-title">${ev.title}</span>
      ${isCurrent ? `<span class="event-card-badge">Current</span>` : ""}
    `;

    if (!ev.href || isCurrent) {
      const div = document.createElement("div");
      div.className = `event-card${isCurrent ? " is-current" : ""}`;
      div.id = `guide-event-${ev.id}`;
      div.dataset.eventId = ev.id;
      div.innerHTML = inner;
      grid.appendChild(div);
      return;
    }

    const a = document.createElement("a");
    a.className = "event-card";
    a.id = `guide-event-${ev.id}`;
    a.href = ev.href;
    a.dataset.eventId = ev.id;
    a.innerHTML = inner;
    grid.appendChild(a);
  });
}

/* ============================
   LOCAL STORAGE
============================ */
function saveStock() {
  ensureStockShape();
  const toSave = {};
  allIngredients.forEach((ing) => {
    toSave[ing.name] = Math.max(0, Math.floor(Number(stock[ing.name]) || 0));
  });
  localStorage.setItem("culinaryStock", JSON.stringify(toSave));
}

function loadStock() {
  const saved = localStorage.getItem("culinaryStock");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(stock, parsed);
    } catch (_) {
      /* ignore corrupt storage */
    }
  }
  ensureStockShape();

  ingredientNames.forEach((name) => {
    const qtyInput = ingredientList.querySelector(`input[data-qty="${name}"]`);
    const checkbox = ingredientList.querySelector(`input[data-ing="${name}"]`);

    if (qtyInput) qtyInput.value = String(stock[name] ?? 0);
    if (checkbox) checkbox.checked = (stock[name] || 0) > 0;
  });
}

/* ============================
   QUANTITY PARSER
============================ */
function getRequiredQty(qtyValue) {
  if (typeof qtyValue === "number") return qtyValue;
  if (typeof qtyValue !== "string") return 0;

  const fractionMatch = qtyValue.match(/(\d+)\s*\/\s*(\d+)/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);
    return denominator === 0 ? 0 : numerator / denominator;
  }

  const numberMatch = qtyValue.match(/\d+(\.\d+)?/);
  return numberMatch ? Number(numberMatch[0]) : 1;
}

/* ============================
   INGREDIENT CONTROLS
============================ */
function buildIngredientControls() {
  ingredientsForCurrentEvent().forEach((ingredient) => {
    const row = document.createElement("div");
    row.className = "ing-row";
    row.id = `guide-ing-${ingredient.id}`;

    const isImage = /\.(ico|png|jpg|jpeg|webp|svg)$/i.test(ingredient.icon);
    const iconHTML = isImage
      ? `<img src="${ingredient.icon}" class="ing-icon">`
      : `<span class="ing-emoji">${ingredient.icon}</span>`;

    row.innerHTML = `
      <label>
        <input type="checkbox" data-ing="${ingredient.name}" data-ing-id="${ingredient.id}">
        ${iconHTML} ${ingredient.name}
      </label>
      <input type="number" data-qty="${ingredient.name}" min="0" step="1" value="0" />
    `;

    ingredientList.appendChild(row);
  });
}

/* ============================
   INGREDIENT CHANGE HANDLER
============================ */
function handleIngredientChange(event) {
  const checkbox = event.target.matches('input[type="checkbox"]')
    ? event.target
    : null;

  const qtyInput = event.target.matches('input[type="number"]')
    ? event.target
    : null;

  if (qtyInput) {
    const ingredientName = qtyInput.dataset.qty;
    const value = Math.max(0, parseInt(qtyInput.value, 10) || 0);
    qtyInput.value = String(value);
    stock[ingredientName] = value;

    const linkedCheckbox = ingredientList.querySelector(`input[data-ing="${ingredientName}"]`);
    if (linkedCheckbox) linkedCheckbox.checked = value > 0;
  }

  if (checkbox && !checkbox.checked) {
    const ingredientName = checkbox.dataset.ing;
    stock[ingredientName] = 0;
    const linkedQtyInput = ingredientList.querySelector(`input[data-qty="${ingredientName}"]`);
    if (linkedQtyInput) linkedQtyInput.value = "0";
  }

  ingredientNames.forEach((ingredientName) => {
    const checkboxNode = ingredientList.querySelector(`input[data-ing="${ingredientName}"]`);
    const qtyNode = ingredientList.querySelector(`input[data-qty="${ingredientName}"]`);
    if (checkboxNode && qtyNode && !checkboxNode.checked) {
      stock[ingredientName] = 0;
      qtyNode.value = "0";
    }
  });

  renderRecipes();
  saveStock();
}

/* ============================
   RECIPE LOGIC
============================ */
function canCook(recipe) {
  return recipe.needs.every((item) => (stock[item.name] || 0) >= getRequiredQty(item.qty));
}

function missingCount(recipe) {
  return recipe.needs.filter((item) => (stock[item.name] || 0) < getRequiredQty(item.qty)).length;
}

function getSelectedIngredientNames() {
  return ingredientNames.filter((ingredientName) => (stock[ingredientName] || 0) > 0);
}

function matchesSelectedIngredients(recipe, selectedIngredients) {
  if (selectedIngredients.length === 0) return true;
  return recipe.needs.some((item) => selectedIngredients.includes(item.name));
}

function cookRecipe(recipeIndex) {
  const recipe = recipes[recipeIndex];
  if (!canCook(recipe)) return;

  recipe.needs.forEach((item) => {
    const required = getRequiredQty(item.qty);
    stock[item.name] = Math.max(0, (stock[item.name] || 0) - required);
  });

  ingredientNames.forEach((ingredientName) => {
    const qtyInput = ingredientList.querySelector(`input[data-qty="${ingredientName}"]`);
    const checkbox = ingredientList.querySelector(`input[data-ing="${ingredientName}"]`);
    if (!qtyInput || !checkbox) return;
    const currentValue = Math.floor(stock[ingredientName]);
    stock[ingredientName] = currentValue;
    qtyInput.value = String(currentValue);
    checkbox.checked = currentValue > 0;
  });

  renderRecipes();
  saveStock();
}

/* ============================
   RENDER RECIPES
============================ */
function renderRecipes() {
  recipesOutput.innerHTML = "";
  const selectedIngredients = getSelectedIngredientNames();

  const forEvent = recipes
    .map((recipe, index) => ({ recipe, index }))
    .filter(({ recipe }) => recipeMatchesEvent(recipe));

  if (forEvent.length === 0) {
    recipesOutput.innerHTML = `
      <div id="guide-recipes-empty" class="recipe">
        <h3>No recipes for this event</h3>
        <p class="small">Add recipes with this round’s <code>eventID</code> in <code>recipes.js</code>.</p>
      </div>`;
    return;
  }

  const filteredRecipes = forEvent.filter(({ recipe }) =>
    matchesSelectedIngredients(recipe, selectedIngredients),
  );

  if (filteredRecipes.length === 0) {
    recipesOutput.innerHTML = `
      <div id="guide-recipes-empty" class="recipe">
        <h3>No matching recipes</h3>
        <p class="small">Try selecting different ingredients.</p>
      </div>`;
    return;
  }

  filteredRecipes.forEach(({ recipe, index }) => {
    const complete = canCook(recipe);
    const miss = missingCount(recipe);

    const card = document.createElement("div");
    card.className = "recipe";
    card.id = recipe.id ? `guide-recipe-${recipe.id}` : `guide-recipe-idx-${index}`;
    card.dataset.recipeId = recipe.id || "";

    const badge = complete
      ? `<span class="badge can-make">Complete</span>`
      : `<span class="badge partial">Missing ${miss}</span>`;

    const isImage = /\.(ico|png|jpg|jpeg|webp|svg)$/i.test(recipe.icon || "");
    const recipeIcon = isImage
      ? `<img src="${recipe.icon}" class="recipe-icon" alt="">`
      : "";

    let html = `
      <div class="recipe-header">
        ${recipeIcon}
        <h3>${recipe.name} ${badge}</h3>
      </div>
      <ul>
    `;

    recipe.needs.forEach((item) => {
      const have = stock[item.name] || 0;
      const required = getRequiredQty(item.qty);
      const enough = have >= required;

      const useImage = item.icon && /\.(ico|png|jpg|jpeg|webp|svg)$/i.test(item.icon);
      const ingIcon = useImage
        ? `<img src="${item.icon}" class="ing-icon-small" alt="">`
        : "";

      html += `
        <li class="${enough ? "ok" : "missing"}">
          ${ingIcon} ${item.name} — need: ${item.qty}, have: ${have} ${enough ? "✓" : "✗"}
        </li>
      `;
    });

    html += `
      </ul>
      <div class="actions">
        <button ${complete ? "" : "disabled"} onclick="cookRecipe(${index})">
          Cook 1x
        </button>
        <span class="small">${complete ? "Ready to cook" : "Need more ingredients"}</span>
      </div>
    `;

    card.innerHTML = html;
    recipesOutput.appendChild(card);
  });
}

/* ============================
   INIT
============================ */
function initApp() {
  syncVisibleIngredientNames();

  renderEvents();

  ingredientList.innerHTML = "";
  buildIngredientControls();

  if (!ingredientList.dataset.listenersAttached) {
    ingredientList.addEventListener("change", handleIngredientChange);
    ingredientList.addEventListener("input", handleIngredientChange);
    ingredientList.dataset.listenersAttached = "1";
  }

  stock = {};
  loadStock();
  renderRecipes();
}

function loadRecipesAndStart() {
  const recipesScript = document.createElement("script");
  recipesScript.src = "recipes.js";
  recipesScript.onload = () => {
    hydrateRecipeNeeds();
    initApp();
  };
  document.body.appendChild(recipesScript);
}

window.cookRecipe = cookRecipe;
loadRecipesAndStart();
