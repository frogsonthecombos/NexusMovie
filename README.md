# NEXUS Movie Library

A cyber/Y2K/liquid-chrome movie library designed for GitHub Pages.

## Structure

- `index.html` — page structure
- `css/` — visual theme and effects
- `js/` — library, search, categories, player, effects
- `data/movies.json` — movie database
- `images/posters/` — movie poster images

## Adding a movie

Add an object to `data/movies.json`:

```json
{
  "id": "NXL-003",
  "title": "Your Movie",
  "year": 2026,
  "category": "Action",
  "rating": "PG-13",
  "description": "Description.",
  "image": "images/posters/your-movie.jpg",
  "drive": "https://drive.google.com/file/d/YOUR_FILE_ID/view"
}
```

Put the poster at the matching path in `images/posters/`.

The JavaScript automatically converts a standard Google Drive `/view` URL into the `/preview` URL used by the embedded player.

## Google Drive

The Drive file must be shared with the people who should be able to watch it. If the file is not accessible to the viewer, the embedded player cannot play it.

## GitHub Pages

Push the entire folder to a GitHub repository and enable GitHub Pages from the repository settings.

For a larger media collection, keep the actual video files outside GitHub and use Drive links in the JSON, as this project does.
