/**
 * Playable / navigable Culinary Crucible rounds. Each row needs a stable `id`
 * and `image` for the gallery. Add `href` when the HTML page exists.
 *
 * Scale to many rounds: append objects `{ id, title, image, href }`; the grid
 * uses auto-fill so ~20 cards layout cleanly.
 *
 * Guide IDs (landmarks): `page-event-{id}` on <body> (same value as this file’s `id`),
 * `#guide-main`, `#guide-banner`,
 * `#guide-events`, `#guide-ingredients`, `#guide-recipes`, `#guide-event-{id}` on cards,
 * `#guide-ing-{ingredientId}` on rows, `#guide-recipe-{recipeId}` on recipe cards.
 */
const culinaryEvents = [
  {
    id: "01",
    title: "Raising the Steaks",
    image: "img_header/1_NRC_Master_Chef_29_Event_Banner.webp",
    imageHeader: "img_header/1_The_Culinary_Crucible_-_Raising_the_Steaks.webp",
    href: "index.html",
  },
  {
    id: "02",
    title: "The Spice of Life",
    image: "img_header/2_NRC_Master_Chef_29_Event_Banner.webp",
    imageHeader: "img_header/2_The_Culinary_Crucible_-_The_Spice_of_Life.webp",
    href: "index.html",
  },
  {
    id: "03",
    title: "The Beaning of Life",
    image: "img_header/3_NRC_Master_Chef_29_Event_Banner.webp",
    imageHeader: "img_header/3_The_Culinary_Crucible_-_The_Beaning_of_Life.webp",
    href: "index.html",
  },
  {
    id: "04",
    title: "Carp-e Diem",
    image: "img_header/4_NRC_Master_Chef_29_Event_Banner.webp",
    imageHeader: "img_header/4_The_Culinary_Crucible_-_Carp-e_Diem.webp",
    href: "index.html",
  },
  {
    id: "05",
    title: "In Pursuit of Eggcellence",
    image: "img_header/5_NRC_Master_Chef_The_Yolk_of_the_Matter_Banner.webp",
    imageHeader: "img_header/5_The_Culinary_Crucible_-_In_Pursuit_of_Eggcellence.webp",
    href: "index.html",
  },
  {
    id: "06",
    title: "A Starch Difference",
    image: "img_header/6_NRC_Master_Chef_To_Potatoes_and_Beyond_Banner.webp",
    imageHeader: "img_header/6_The_Culinary_Crucible_-_A_Starch_Difference.webp",
    href: "index.html",
  },
  {
    id: "07",
    title: "Noodling Around",
    image: "img_header/7_NRC_Master_Chef_7E_Banner.webp",
    imageHeader: "img_header/7_The_Culinary_Crucible_-_Noodling_Around.webp",
    href: "index.html",
  },
  {
    id: "08",
    title: "Pepper Pandemonium",
    image: "img_header/8_NRC_Master_Chef_7E_Banner.webp",
    imageHeader: "img_header/8_The_Culinary_Crucible_-_Pepper_Pandemonium.webp",
    href: "index.html",
  },
  {
    id: "09",
    title: "Cream of the Crop",
    image: "img_header/9_NRC_Master_Chef_7E_Banner.webp",
    imageHeader: "img_header/9_The_Culinary_Crucible_-_Cream_of_the_Crop.webp",
    href: "index.html",
  },
  {
    id: "10",
    title: "Confection Perfection",
    image: "img_header/10_NRC_Master_Chef_7E_Banner.webp",
    imageHeader: "img_header/10_The_Culinary_Crucible_-_Confection_Perfection.webp",
    href: "index.html",
  },
  {
    id: "11",
    title: "No Grain, No Gain",
    image: "img_header/11_NRC_Master_Chef_7E_Banner.webp",
    imageHeader: "img_header/11_The_Culinary_Crucible_-_No_Grain_No_Gain.webp",
    href: "index.html",
  },


];
