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
- research interests
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
assets/img/IMG_1381.png
```

Publication thumbnails are also configured in `data/content.js`. Replace the image files or change the `image` path for each publication.

## Local Preview

Open `index.html` directly in a browser, or run a small local server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://127.0.0.1:8000
```

## Publish Later

This is plain static HTML/CSS/JS. It can be pushed to a GitHub Pages repository such as `lanqz7766.github.io` without requiring Jekyll or Ruby.

The original GitHub repository uses Jekyll and the Minimal Light theme. This version keeps the same content editable locally without a build step.
