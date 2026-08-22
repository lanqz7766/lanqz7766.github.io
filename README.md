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

Open `index.html` directly in a browser, or run a small local server:

```bash
python3 -m http.server 8027 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:8027
```

## Publish Later

This is plain static HTML/CSS/JS. It can be pushed to a GitHub Pages repository such as `lanqz7766.github.io` without requiring Jekyll or Ruby.

The original GitHub repository uses Jekyll and the Minimal Light theme. This version keeps the same content editable locally without a build step.
