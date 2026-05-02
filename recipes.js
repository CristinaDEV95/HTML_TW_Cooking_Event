// Recipe data: use ingredient `id` from ingredients.js (qty string or number)

const recipes = [
  {
    id: "tofu_hamburger_steak",
    name: "Tofu Hamburger Steak",
    icon: "img/CC_Tofu_Hamburger_Steak.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "meat", qty: "1" },
      { id: "onion", qty: "1" },
      { id: "egg", qty: "1" },
      { id: "flour", qty: "1" },
    ],
  },
  {
    id: "sauteed_pea_shoots_garlic",
    name: "Sauteed Pea Shoots with Garlic",
    icon: "img/CC_Sauteed_Pea_Shoots_with_Garlic.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "bacon", qty: "1" },
      { id: "garlic", qty: "1" },
    ],
  },
  {
    id: "erwtensoep",
    name: "Erwtensoep",
    icon: "img/CC_Erwtensoep.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "meat", qty: "1" },
      { id: "onion", qty: "1" },
      { id: "potato", qty: "1" },
    ],
  },
  {
    id: "minestrone",
    name: "Minestrone",
    icon: "img/CC_Minestrone.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "bacon", qty: "1" },
      { id: "onion", qty: "1" },
      { id: "potato", qty: "1" },
      { id: "tomato", qty: "1" },
    ],
  },
  {
    id: "baked_beans",
    name: "Baked Beans",
    icon: "img/CC_Baked_Beans.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "tomato", qty: "1" },
      { id: "sugar", qty: "1" },
    ],
  },
  {
    id: "pea_shoot_pasta",
    name: "Pea Shoot Pasta",
    icon: "img/CC_Pea_Shoot_Pasta.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "bacon", qty: "1" },
      { id: "milk", qty: "1" },
      { id: "pasta", qty: "1" },
    ],
  },
  {
    id: "hummus",
    name: "Hummus",
    icon: "img/CC_Hummus.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "garlic", qty: "1" },
    ],
  },
  {
    id: "bitter_melon_stir_fry",
    name: "Bitter Melon Stir Fry",
    icon: "img/CC_Bitter_Melon_Stir_Fry.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "meat", qty: "1" },
      { id: "bitter_melon", qty: "1" },
      { id: "egg", qty: "1" },
    ],
  },
  {
    id: "chili_con_carne",
    name: "Chili con Carne",
    icon: "img/CC_Chili_con_Carne.webp",
    eventID: ["03"],
    needs: [
      { id: "beans", qty: "1" },
      { id: "meat", qty: "1" },
      { id: "onion", qty: "1" },
      { id: "tomato", qty: "1" },
      { id: "spices", qty: "1" },
    ],
  },

  /*=============================== */

  {
    id: "",
    name: "Mackerel Fritters",
    icon: "img/CC_Mackerel_Fritters.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "milk", qty: "1" },
      { id: "flour", qty: "1" },
      { id: "egg", qty: "1" },
    ]
  },
  {
    id: "",
    name: "Mackerel Curry",
    icon: "img/CC_Mackerel_Curry.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "onion", qty: "1" },
      { id: "carrot", qty: "1" },
      { id: "rice", qty: "1" },
      { id: "spices", qty: "1" },
    ]
  },
    {
    id: "",
    name: "Fried Sardines",
    icon: "img/CC_Fried_Sardines.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "bread_crumbs", qty: "1" },
    ]
  },
    {
    id: "",
    name: "Garudhiya",
    icon: "img/CC_Garudhiya.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "spices", qty: "1" },
    ]
  },
    {
    id: "",
    name: "Poke Bowl",
    icon: "img/CC_Poke_Bowl.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "avocado", qty: "1" },
      { id: "rice", qty: "1" },
    ]
  },
    {
    id: "",
    name: "Mackerel in Tomato Sauce",
    icon: "img/CC_Mackerel_in_Tomato_Sauce.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "tomato", qty: "1" },
      { id: "consomme", qty: "1" },
    ]
  },
    {
    id: "",
    name: "Mackerel Sandwich",
    icon: "img/CC_Mackerel_Sandwich.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "lettuce", qty: "1" },
      { id: "onion", qty: "1" },
      { id: "bread", qty: "1" },
    ]
  },
    {
    id: "",
    name: "Acqua Pazza",
    icon: "img/CC_Acqua_Pazza.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "tomato", qty: "1" },
      { id: "garlic", qty: "1" },
      { id: "shellfish", qty: "1" },
    ]
  },
    {
    id: "",
    name: "Saury Braised in Chili Paste",
    icon: "img/CC_Saury_Braised_in_Chili_Paste.webp",
    eventID: ["04"], 
    needs: [
      { id: "fish", qty: "1" },
      { id: "ginger", qty: "1" },
      { id: "garlic", qty: "1" },
      { id: "spices", qty: "1" },
    ]
  },

];
