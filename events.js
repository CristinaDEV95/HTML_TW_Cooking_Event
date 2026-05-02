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
    id: "03",
    title: "The Beaning of Life",
    image: "img_header/3_NRC_Master_Chef_29_Event_Banner.webp",
    href: "index.html",
  },
  {
    id: "04",
    title: "Carp-e Diem",
    image: "img_header/4_NRC_Master_Chef_29_Event_Banner.webp",
    href: "EV_05_26.html",
  },


];
