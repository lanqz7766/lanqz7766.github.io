# Personal Website

This is a local, static academic homepage adapted from your existing `lanqz7766.github.io` content and the section style of `https://xixiaouab.github.io/#Publications`.

## Edit Content

Most personal content lives in:

```text
data/content.js
```

Edit that file to change:

- name, title, affiliation, email, and links
- about paragraphs
- research interests and their representative-paper links
- news
- selected publications and other publications
- education, experience, awards, and service

## Replace Images

Images live in:

```text
assets/img/
```

The current profile image is configured as:

```text
assets/img/profile-photo.webp
```

Publication thumbnails are also configured in `data/content.js`. Replace the image files or change the `image` path for each publication.

The WeChat contact card and institutional marks also live in `assets/img/`.

## Visitor Map

The footer embeds a site-specific [MapMyVisitors](https://mapmyvisitors.com/) world map from `index.html`. The JavaScript widget is the primary integration; a plain-image fallback is included for browsers with JavaScript disabled.

MapMyVisitors is a hosted third-party service that uses IP-derived approximate geolocation. If the map project is replaced, update both the JavaScript `d` value and the fallback image/link together.

## Local Preview

Run a small local server so the interactive 3D model can load:

```bash
python3 -m http.server 8027 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:8027
```

## ClinAgent Workstation

The introduction's layout and soft scene background are in `station.css`.
`station.js` loads the original model from `assets/scenes/clinagent-station.glb`
with version-pinned Three.js modules. The transparent `clinagent-poster.webp`
appears immediately and remains available if 3D loading is unavailable.

Drag horizontally to rotate, or use the two keyboard-accessible arrow buttons.
Vertical touch swipes still scroll the page. Typing pauses offscreen, while the
page is hidden, and when reduced motion is requested. Profile content and the
existing navigation, publication archive and image previews remain in
`data/content.js` and `script.js`.

## Palette and Awards

`theme.css` applies the near-white, deep-blue and mist-blue palette while
preserving the original fonts. Oral/Spotlight recognition notes use mist-blue labels; nominations and
shortlists retain their full wording in pale champagne labels. Early Accept
remains plain secondary text. Recognition labels have small stepped pixel
corners, with a subtle edge/fill change on hover and no movement. Awards
use matching stepped frames and venue/year labels, with tiny square divider
endpoints.
The awards renderer in `script.js` places the existing CPRIT fellowship first;
other records remain in a responsive two-column list (one column on mobile).
Facts, titles, amounts and links remain in `data/content.js`.

Cards use subtle border and shadow feedback without hover movement or
pointer-following light. Award and publication rows use a pale background
on hover/focus. Keyboard focus remains visible. Reduced-motion preferences
disable transitions; no extra interaction script or dependency is required.

## Deployment

This is plain static HTML/CSS/JS. It can be pushed to a GitHub Pages repository such as `lanqz7766.github.io` without requiring Jekyll or Ruby.

The original GitHub repository uses Jekyll and the Minimal Light theme. This version keeps the same content editable locally without a build step.

## Academic Service

Academic Service: workshop title and organizer
role are featured separately; conference and journal reviewing are shown in
two columns, stacked on mobile. Styles: academic-service.css. Original service
content and links remain in data/content.js.
