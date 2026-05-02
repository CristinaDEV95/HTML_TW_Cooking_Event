/**
 * Single source of truth for ingredients. Recipes reference these by `id`
 * so quantities do not repeat name/icon blobs across versions.
 *
 * `eventID`: which Culinary Crucible rounds use this ingredient (matches events.js `id`).
 */
const allIngredients = [
  { id: "beans", name: "Beans", icon: "img/Beans_Icon.webp", eventID: ["03"] },

  {id: "fish", name: "Fish", icon: "img/Fish_Icon.webp", eventID: ["04"]},
  {id: "lettuce", name: "Lettuce", icon: "img/Lettuce_Icon.webp", eventID: ["04"]},
  {id: "onion", name: "Onion", icon: "img/Onion_Icon.webp", eventID: ["03", "04"] },
  {id: "avocado", name: "Avocado", icon: "img/Avocado_Icon.webp", eventID: ["04"]},
  {id: "ginger", name: "Ginger", icon: "img/Ginger_Icon.webp", eventID: ["04"]},
  {id: "carrot", name: "Carrot", icon: "img/Carrot_Icon.webp", eventID: ["04"]},
  {id: "tomato", name: "Tomato", icon: "img/Tomato_Icon.webp", eventID: ["03", "04"] },
  {id: "garlic", name: "Garlic", icon: "img/Garlic_Icon.webp", eventID: ["03", "04"] },
  {id: "milk", name: "Milk", icon: "img/Milk_Icon.webp", eventID: ["03", "04"] },
  {id: "flour", name: "Flour", icon: "img/Flour_Icon.webp", eventID: ["03", "04"] },
  {id: "rice", name: "Rice", icon: "img/Rice_Icon.webp", eventID: ["04"]},
  {id: "bread", name: "Bread", icon: "img/Bread_Icon.webp", eventID: ["04"]},
  {id: "bread_crumbs", name: "Bread Crumbs", icon: "img/Bread_Crumbs_Icon.webp", eventID: ["04"]},
  {id: "spices", name: "Spices", icon: "img/Chili_Powder_Icon.webp", eventID: ["03", "04"] },
  {id: "egg", name: "Egg", icon: "img/Egg_Icon.webp", eventID: ["03", "04"] },
  {id: "consomme", name: "Consomme", icon: "img/Consomme_Icon.webp", eventID: ["04"]},
  {id: "shellfish", name: "Shellfish", icon: "img/Shellfish_Icon.webp", eventID: ["04"]},

  { id: "potato", name: "Potato", icon: "img/Potato_Icon.webp", eventID: ["03"] },
  { id: "bitter_melon", name: "Bitter Melon", icon: "img/Bitter_Melon_Icon.webp", eventID: ["03"] },
  { id: "meat", name: "Meat", icon: "img/Meat_Icon.webp", eventID: ["03"] },
  { id: "bacon", name: "Bacon", icon: "img/Bacon_Icon.webp", eventID: ["03"] },
  { id: "sugar", name: "Sugar", icon: "img/Sugar_Icon.webp", eventID: ["03"]},
  { id: "pasta", name: "Pasta", icon: "img/Pasta_Icon.webp", eventID: ["03"] },

];
