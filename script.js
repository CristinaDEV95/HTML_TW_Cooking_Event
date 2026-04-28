const allIngredients = [
  { name: "Beans", icon: "img/Beans_Icon.webp" },
  { name: "Onion", icon: "img/Onion_Icon.webp" },
  { name: "Potato", icon: "img/Potato_Icon.webp" },
  { name: "Bitter Melon", icon: "img/Bitter_Melon_Icon.webp" },
  { name: "Tomato", icon: "img/Tomato_Icon.webp" },
  { name: "Meat", icon: "img/Meat_Icon.webp" },
  { name:"Bacon", icon:"img/Bacon_Icon.webp"},
  { name: "Milk", icon: "img/Milk_Icon.webp" },
  { name: "Flour", icon: "img/Flour_Icon.webp" },
  { name: "Sugar", icon: "img/Sugar_Icon.webp" },
  { name: "Pasta", icon: "img/Pasta_Icon.webp" },
  { name: "Spices", icon: "img/Chili_Powder_Icon.webp" },
  { name: "Egg", icon: "img/Egg_Icon.webp" },
  { name: "Garlic", icon: "img/Garlic_Icon.webp" },
];


const ingredientList = document.getElementById("ingredientList");
const recipesOutput = document.getElementById("recipesOutput");
const ingredientNames = allIngredients.map((ingredient) => ingredient.name);
const stock = Object.fromEntries(ingredientNames.map((name) => [name, 0]));

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



function handleIngredientChange(event) {
  const checkbox = event.target.closest('input[type="checkbox"]');
  const qtyInput = event.target.closest('input[type="number"]');

  if (qtyInput) {
    const ingredientName = qtyInput.dataset.qty;
    const value = Math.max(0, Number.parseInt(qtyInput.value || "0", 10) || 0);
    qtyInput.value = String(value);
    stock[ingredientName] = value;

    const linkedCheckbox = ingredientList.querySelector(`input[data-ing="${ingredientName}"]`);
    linkedCheckbox.checked = value > 0;
  }

  if (checkbox && !checkbox.checked) {
    const ingredientName = checkbox.dataset.ing;
    stock[ingredientName] = 0;
    const linkedQtyInput = ingredientList.querySelector(`input[data-qty="${ingredientName}"]`);
    linkedQtyInput.value = "0";
  }

  ingredientNames.forEach((ingredientName) => {
    const checkboxNode = ingredientList.querySelector(`input[data-ing="${ingredientName}"]`);
    const qtyNode = ingredientList.querySelector(`input[data-qty="${ingredientName}"]`);
    if (!checkboxNode.checked) {
      stock[ingredientName] = 0;
      qtyNode.value = "0";
    }
  });

  renderRecipes();
}

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
    const currentValue = Math.floor(stock[ingredientName]);
    stock[ingredientName] = currentValue;
    qtyInput.value = String(currentValue);
    checkbox.checked = currentValue > 0;
  });

  renderRecipes();
}

function renderRecipes() {
  recipesOutput.innerHTML = "";
  const selectedIngredients = getSelectedIngredientNames();

  const filteredRecipes = recipes
    .map((recipe, index) => ({ recipe, index }))
    .filter(({ recipe }) => matchesSelectedIngredients(recipe, selectedIngredients));

  if (filteredRecipes.length === 0) {
    recipesOutput.innerHTML = `<div class="recipe"><h3>No matching recipes</h3><p class="small">Try selecting different ingredients.</p></div>`;
    return;
  }

  filteredRecipes.forEach(({ recipe, index }) => {
    const complete = canCook(recipe);
    const miss = missingCount(recipe);
    

    const card = document.createElement("div");
    card.className = "recipe";

    const badge = complete
      ? `<span class="badge can-make">Complete</span>`
      : `<span class="badge partial">Missing ${miss}</span>`;

    const recipeImage = recipe.icon
      ? `<img src="${recipe.icon}" alt="${recipe.name}" class="recipe-icon">`
      : "";

    let html = `
      <div class="recipe-header">
        ${recipeImage}
        <h3>${recipe.name} ${badge}</h3>
      </div>
      <ul>
    `;

recipe.needs.forEach((item) => {
  const have = stock[item.name] || 0;
  const required = getRequiredQty(item.qty);
  const enough = have >= required;

  const isImage = item.icon && /\.(ico|png|jpg|jpeg|webp|svg)$/i.test(item.icon);
  const ingIcon = isImage
    ? `<img src="${item.icon}" class="ing-icon-small">`
    : "";

  html += `
    <li class="${enough ? "ok" : "missing"}">
      ${ingIcon} ${item.name} — need: ${item.qty}, have: ${have} ${enough ? "✓" : "✗"}
    </li>
  `;
});


    html += `</ul>
      <div class="actions">
        <button ${complete ? "" : "disabled"} onclick="cookRecipe(${index})">
          Cook 1x
        </button>
        <span class="small">${complete ? "Ready to cook" : "Need more ingredients"}</span>
      </div>`;

    card.innerHTML = html;
    recipesOutput.appendChild(card);
  });
}

function initApp() {
  buildIngredientControls();
  ingredientList.addEventListener("change", handleIngredientChange);
  ingredientList.addEventListener("input", handleIngredientChange);
  renderRecipes();
}

function loadRecipesAndStart() {
  const recipesScript = document.createElement("script");
  recipesScript.src = "recipes.js";
  recipesScript.onload = initApp;
  document.body.appendChild(recipesScript);
}

window.cookRecipe = cookRecipe;
loadRecipesAndStart();

function buildIngredientControls() {
  allIngredients.forEach((ingredient) => {
    const row = document.createElement("div");
    row.className = "ing-row";

    const isImage = /\.(ico|png|jpg|jpeg|webp|svg)$/i.test(ingredient.icon);

    const iconHTML = isImage
      ? `<img src="${ingredient.icon}" class="ing-icon">`
      : `<span class="ing-emoji">${ingredient.icon}</span>`;

    row.innerHTML = `
      <label>
        <input type="checkbox" data-ing="${ingredient.name}">
        ${iconHTML} ${ingredient.name}
      </label>
      <input type="number" data-qty="${ingredient.name}" min="0" step="1" value="0" />
    `;

    ingredientList.appendChild(row);
  });
}

