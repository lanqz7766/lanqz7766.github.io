(function () {
  const content = window.SITE_CONTENT;
  if (!content) {
    return;
  }

  const ownName = content.profile.name;
  const selectedPublicationLimit = 10;

  function $(id) {
    return document.getElementById(id);
  }

  function text(node, value) {
    node.textContent = value || "";
  }

  const iconPaths = {
    scholar: '<path d="M4 8.5 12 4l8 4.5-8 4.5L4 8.5Z"/><path d="M7 11.5v4.2c1.4 1 3.1 1.5 5 1.5s3.6-.5 5-1.5v-4.2"/><path d="M20 8.5v5"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><path d="M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    cv: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
    mail: '<path d="M4 4h16v16H4z"/><path d="m4 7 8 6 8-6"/>',
    wechat: '<path d="M3 10.2C3 6.8 6.3 4 10.3 4s7.3 2.8 7.3 6.2-3.3 6.2-7.3 6.2c-.8 0-1.7-.1-2.4-.3L4.8 18l.8-3.1C4 13.8 3 12.1 3 10.2Z"/><path d="M12.2 15.1c0 2.7 2.6 4.9 5.8 4.9.6 0 1.2-.1 1.8-.2l2.4 1.2-.6-2.4c1.1-.9 1.8-2.1 1.8-3.5 0-2.7-2.4-4.8-5.5-4.9"/><path d="M7.8 8.8h.1M12.6 8.8h.1M16 14h.1M19.8 14h.1"/>',
    paper: '<path class="paper-back" d="M5 5.5H4.5A1.5 1.5 0 0 0 3 7v13A1.5 1.5 0 0 0 4.5 21.5H16"/><g class="paper-sheet"><rect x="7" y="2.5" width="13.5" height="17" rx="1.5"/><path d="M10.5 7h6.5M10.5 11h6.5M10.5 15h4"/></g>',
    code: '<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/>',
    dataset: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    project: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    conference: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 11h18M8 15h3M8 18h7"/>',
    expand: '<path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"/>',
    brain: '<path d="M12 5a3 3 0 0 0-5.8-1A4 4 0 0 0 3 10a4.5 4.5 0 0 0 1 8 4 4 0 0 0 8 1V5Zm0 0a3 3 0 0 1 5.8-1A4 4 0 0 1 21 10a4.5 4.5 0 0 1-1 8 4 4 0 0 1-8 1"/><path d="M7 4v3M3 10h3l2 2M4 18h3v-3M17 4v3M21 10h-3l-2 2M20 18h-3v-3"/>',
    chip: '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
    activity: '<path d="M22 12h-4l-3 8L9 4l-3 8H2"/>',
    zap: '<path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    nodes: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><path d="m8.5 7.5 7 0M7.5 8.5l3 7M16.5 8.5l-3 7"/>'
  };

  const brandIcons = {
    github: "assets/icons/github.svg",
    huggingface: "assets/icons/huggingface.svg"
  };

  function iconNameForLink({ label, url }) {
    const hostname = new URL(url, document.baseURI).hostname;
    if (hostname === "github.com") return "github";
    if (hostname === "huggingface.co") return "huggingface";
    const key = (label || "").toLowerCase();
    if (key.includes("scholar")) return "scholar";
    if (key.includes("linkedin")) return "linkedin";
    if (key.includes("wechat")) return "wechat";
    if (key === "cv" || key.includes("curriculum")) return "cv";
    if (key.includes("paper") || key.includes("pdf")) return "paper";
    if (key.includes("code")) return "code";
    if (key.includes("dataset")) return "dataset";
    if (key === "project") return "project";
    if (key === "conference") return "conference";
    if (key.includes("email") || key.includes("mail")) return "mail";
    return "";
  }

  function createIcon(name) {
    if (!iconPaths[name] && !brandIcons[name]) {
      return null;
    }
    const span = document.createElement("span");
    span.className = "inline-icon";
    if (name === "paper") span.classList.add("paper-icon");
    span.setAttribute("aria-hidden", "true");
    if (brandIcons[name]) {
      const image = document.createElement("img");
      image.src = brandIcons[name];
      image.alt = "";
      span.append(image);
    } else {
      span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name]}</svg>`;
    }
    return span;
  }

  function createLink(link, className, options = {}) {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = link.url.startsWith("http") ? "_blank" : "_self";
    if (link.url.startsWith("http")) {
      a.rel = "noreferrer";
    }
    if (className) {
      a.className = className;
    }
    if (options.icon !== false) {
      const iconName = options.icon || iconNameForLink(link);
      const icon = createIcon(iconName);
      if (icon) {
        a.append(icon);
        if (iconName === "paper") a.classList.add("paper-resource-link");
      }
    }
    a.append(document.createTextNode(link.label));
    return a;
  }

  function appendLinkedText(parent, value, options = {}) {
    const source = value || "";
    const linkMap = content.linkMap || {};
    const phrases = Object.keys(linkMap).sort((a, b) => b.length - a.length);
    const needles = options.strongOwnName ? [ownName, ...phrases].sort((a, b) => b.length - a.length) : phrases;
    let index = 0;
    let buffer = "";

    function flush() {
      if (buffer) {
        parent.append(document.createTextNode(buffer));
        buffer = "";
      }
    }

    while (index < source.length) {
      const match = needles.find((needle) => source.startsWith(needle, index));
      if (!match) {
        buffer += source[index];
        index += 1;
        continue;
      }

      flush();
      if (options.strongOwnName && match === ownName) {
        const strong = document.createElement("strong");
        strong.textContent = match;
        parent.append(strong);
      } else {
        parent.append(createLink({ label: match, url: linkMap[match] }, "", { icon: false }));
      }
      index += match.length;
    }

    flush();
  }

  function highlightAuthor(authorString) {
    const fragment = document.createDocumentFragment();
    const parts = (authorString || "").split(ownName);
    parts.forEach((part, index) => {
      fragment.append(document.createTextNode(part));
      if (index < parts.length - 1) {
        const strong = document.createElement("strong");
        strong.textContent = ownName;
        fragment.append(strong);
      }
    });
    return fragment;
  }

  function renderProfile() {
    document.title = ownName;
    $("profile-name").textContent = ownName;
    const siteName = $("site-name");
    if (siteName) {
      siteName.textContent = ownName;
    }
    $("profile-avatar").src = content.profile.avatar || "assets/img/profile-placeholder.svg";
    $("profile-avatar").alt = ownName;
    text($("profile-title"), content.profile.title);
    const affiliation = $("profile-affiliation");
    if (content.profile.affiliationUrl) {
      affiliation.replaceChildren(createLink({ label: content.profile.affiliation, url: content.profile.affiliationUrl }, "", { icon: false }));
    } else {
      text(affiliation, content.profile.affiliation);
    }

    const links = $("profile-links");
    links.replaceChildren();
    content.profile.links.forEach((link, index) => {
      if (index > 0) {
        const separator = document.createElement("span");
        separator.className = "slash-separator";
        separator.textContent = "/";
        links.append(separator);
      }
      links.append(createLink(link, "icon-link"));
    });

    const email = $("profile-email");
    email.href = `mailto:${content.profile.email}`;
    email.className = "email-link icon-link";
    email.replaceChildren(createIcon("mail"), document.createTextNode(content.profile.email));

    const scholar = content.profile.links.find((link) => link.label.toLowerCase().includes("scholar"));
    if (scholar) {
      $("scholar-link").href = scholar.url;
    }

    $("footer-name").textContent = ownName;
    $("footer-year").textContent = new Date().getFullYear();
    if ($("footer-updated") && content.siteMeta && content.siteMeta.lastUpdated) {
      $("footer-updated").textContent = content.siteMeta.lastUpdated;
    }
  }

  function renderWechat() {
    const wrap = $("wechat-contact");
    const config = content.profile.wechat;
    if (!wrap || !config || !config.qr) {
      return;
    }

    wrap.hidden = false;

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "wechat-trigger icon-link";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "wechat-qr-card");
    trigger.append(createIcon("wechat"), document.createTextNode(config.label || "WeChat"));

    const card = document.createElement("span");
    card.id = "wechat-qr-card";
    card.className = "wechat-qr-card";
    card.setAttribute("aria-hidden", "true");

    const top = document.createElement("span");
    top.className = "wechat-card-top";
    const title = document.createElement("strong");
    title.textContent = config.displayName || "WeChat";
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "wechat-close";
    closeButton.setAttribute("aria-label", "Close WeChat QR code");
    closeButton.textContent = "×";
    top.append(title, closeButton);

    const imageLink = document.createElement("a");
    imageLink.className = "wechat-image-link";
    imageLink.href = config.qr;
    imageLink.target = "_blank";
    imageLink.rel = "noreferrer";
    imageLink.setAttribute("aria-label", "Open full-size WeChat QR code");
    const image = document.createElement("img");
    image.src = config.qr;
    image.alt = `WeChat QR code for ${config.displayName || ownName}`;
    image.loading = "lazy";
    imageLink.append(image);

    const note = document.createElement("small");
    note.textContent = config.note || "Scan to connect on WeChat";
    card.append(top, imageLink, note);
    wrap.replaceChildren(trigger, card);

    let keyboardInput = false;
    let suppressFocusOpen = false;

    function setOpen(isOpen) {
      wrap.classList.toggle("is-open", isOpen);
      trigger.setAttribute("aria-expanded", String(isOpen));
      card.setAttribute("aria-hidden", String(!isOpen));
    }

    document.addEventListener(
      "pointerdown",
      (event) => {
        keyboardInput = false;
        if (!wrap.contains(event.target)) {
          setOpen(false);
        }
      },
      true
    );

    document.addEventListener("keydown", (event) => {
      keyboardInput = true;
      if (event.key === "Escape" && wrap.classList.contains("is-open")) {
        event.preventDefault();
        setOpen(false);
        suppressFocusOpen = true;
        trigger.focus({ preventScroll: true });
        suppressFocusOpen = false;
      }
    });

    trigger.addEventListener("focus", () => {
      if (keyboardInput && !suppressFocusOpen) {
        setOpen(true);
      }
    });

    trigger.addEventListener("click", (event) => {
      if (event.detail === 0 && wrap.classList.contains("is-open")) {
        return;
      }
      setOpen(!wrap.classList.contains("is-open"));
    });

    closeButton.addEventListener("click", () => {
      setOpen(false);
      suppressFocusOpen = true;
      trigger.focus({ preventScroll: true });
      suppressFocusOpen = false;
    });
  }

  function bindActiveNavigation() {
    const nav = document.querySelector(".nav-list");
    const links = [...nav.querySelectorAll("a")];
    const backToTop = $("back-to-top");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sectionIds = links.map((link) => link.getAttribute("href")).filter(Boolean);
    const sections = sectionIds
      .map((id) => document.querySelector(id))
      .filter(Boolean);

    function updateNavEdges() {
      nav.parentElement.classList.toggle("has-overflow-start", nav.scrollLeft > 1);
      nav.parentElement.classList.toggle("has-overflow-end", nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 1);
    }

    nav.addEventListener("scroll", updateNavEdges, { passive: true });
    new ResizeObserver(updateNavEdges).observe(nav);

    function setActive() {
      let activeId = "#Home";
      const offset = 120;
      sections.forEach((section) => {
        if (section.offsetTop <= window.scrollY + offset) {
          activeId = `#${section.id}`;
        }
      });
      links.forEach((link) => {
        const active = link.getAttribute("href") === activeId;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      updateNavEdges();
      backToTop.classList.toggle("is-visible", window.scrollY > 500);
    }

    backToTop.hidden = false;
    backToTop.addEventListener("click", () => {
      $("site-name").focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "instant" : "smooth" });
    });

    let framePending = false;
    window.addEventListener("scroll", () => {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(() => {
        setActive();
        framePending = false;
      });
    }, { passive: true });
    window.addEventListener("hashchange", setActive);
    new ResizeObserver(setActive).observe($("main"));
    setActive();
  }

  function bindSectionEntrance() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (reducedMotion.matches) return;
        target.classList.add("is-entering");
        target.addEventListener("animationend", () => {
          target.classList.remove("is-entering");
        }, { once: true });
      });
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });

    document.querySelectorAll(".content > .section").forEach((section) => {
      const { top, bottom } = section.getBoundingClientRect();
      // Keep content already on screen (including direct anchor visits) still.
      if (top < window.innerHeight && bottom > 0) return;
      observer.observe(section);
    });
    reducedMotion.addEventListener("change", ({ matches }) => {
      if (!matches) return;
      observer.disconnect();
      document.querySelectorAll(".section.is-entering").forEach((section) => {
        section.classList.remove("is-entering");
      });
    });
  }

  function renderAbout() {
    const about = $("about-content");
    about.replaceChildren();
    content.about.forEach((paragraph) => {
      const p = document.createElement("p");
      appendLinkedText(p, paragraph);
      about.append(p);
    });
    const collaboration = $("collaboration-note");
    collaboration.replaceChildren();
    if (content.collaboration) {
      collaboration.hidden = false;
      appendLinkedText(collaboration, content.collaboration);
    } else {
      collaboration.hidden = true;
    }
  }

  function renderNews() {
    const news = $("news-content");
    news.replaceChildren();
    const visibleLimit = 6;
    const allItems = content.news.flatMap((yearGroup) =>
      (yearGroup.items || []).map((item) => ({ ...item, year: yearGroup.year }))
    );

    function renderGroups(items, target, options = {}) {
      const groups = [];
      items.forEach((item) => {
        let group = groups.find((candidate) => candidate.year === item.year);
        if (!group) {
          group = { year: item.year, items: [] };
          groups.push(group);
        }
        group.items.push(item);
      });

      groups.forEach((yearGroup, groupIndex) => {
        const block = document.createElement("div");
        block.className = "year-block";

        const year = document.createElement("div");
        year.className = "year-label";
        year.textContent = yearGroup.year;

        const list = document.createElement("ul");
        list.className = "news-list";
        yearGroup.items.forEach((item) => {
          const li = document.createElement("li");
          const date = document.createElement("span");
          date.className = "date-tag";
          date.textContent = `[${item.date}] `;
          li.append(date);

          const highlights = (item.highlights || [])
            .map(phrase => ({ phrase, start: item.text.indexOf(phrase) }))
            .sort((a, b) => a.start - b.start);
          let cursor = 0;
          highlights.forEach(({ phrase, start }) => {
            appendLinkedText(li, item.text.slice(cursor, start));
            const emphasis = document.createElement("span");
            emphasis.className = "news-emphasis";
            appendLinkedText(emphasis, phrase);
            li.append(emphasis);
            cursor = start + phrase.length;
          });
          appendLinkedText(li, item.text.slice(cursor));
          list.append(li);
        });

        if (!(options.suppressFirstYear && groupIndex === 0)) {
          block.append(year);
        }
        block.append(list);
        target.append(block);
      });
    }

    renderGroups(allItems.slice(0, visibleLimit), news);

    const olderItems = allItems.slice(visibleLimit);
    if (!olderItems.length) {
      return;
    }

    const archive = document.createElement("div");
    archive.className = "news-archive";
    archive.id = "older-news";
    archive.setAttribute("aria-hidden", "true");
    archive.inert = true;
    const archiveInner = document.createElement("div");
    archiveInner.className = "news-archive-inner";
    renderGroups(olderItems, archiveInner, {
      suppressFirstYear: olderItems[0].year === allItems[visibleLimit - 1].year
    });
    archive.append(archiveInner);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "news-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", archive.id);
    toggle.innerHTML = '<span>Show older news</span><span class="news-toggle-arrow" aria-hidden="true">↓</span>';

    function setArchiveOpen(isOpen) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      archive.setAttribute("aria-hidden", String(!isOpen));
      archive.inert = !isOpen;
      archive.classList.toggle("is-open", isOpen);
      toggle.querySelector("span").textContent = isOpen ? "Show fewer" : "Show older news";
    }

    toggle.addEventListener("click", () => {
      setArchiveOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    news.append(archive, toggle);
  }

  function renderResearch() {
    const target = $("research-content");
    target.replaceChildren();
    content.researchInterests.forEach((item) => {
      const row = document.createElement("article");
      row.className = "research-item";
      const title = document.createElement("h3");
      title.textContent = item.title;
      const researchIcon = createIcon({
        "Medical AI": "brain",
        "Agentic AI": "nodes",
        "Efficient AI": "chip"
      }[item.title]);
      if (researchIcon) {
        researchIcon.classList.add("research-icon");
        title.prepend(researchIcon);
      }
      const body = document.createElement("p");
      appendLinkedText(body, item.text);
      const copy = document.createElement("div");
      copy.append(title, body);

      if (item.papers && item.papers.length) {
        const papers = document.createElement("div");
        papers.className = "research-papers";
        papers.setAttribute("aria-label", `Representative work in ${item.title}`);
        item.papers.forEach((paper) => {
          const link = createLink(paper, "research-paper-link", { icon: false });
          papers.append(link);
        });
        copy.append(papers);
      }

      row.append(copy);
      target.append(row);
    });
  }

  function renderSelectedPublications() {
    const target = $("selected-publications");
    target.replaceChildren();
    content.selectedPublications.slice(0, selectedPublicationLimit).forEach((pub) => {
      const article = document.createElement("article");
      article.className = "publication";
      if (pub.id) article.id = pub.id;

      const image = document.createElement("img");
      image.className = "pub-image";
      image.src = pub.image || "assets/img/publication-placeholder.svg";
      image.alt = `${pub.title} preview`;
      image.loading = "lazy";

      const body = document.createElement("div");
      const title = document.createElement("h3");
      title.className = "pub-title";
      const paper = pub.links?.find((link) => link.label === "Paper");
      if (paper) {
        title.append(createLink({ label: pub.title, url: paper.url }, "pub-title-link", { icon: false }));
      } else {
        title.textContent = pub.title;
      }

      const authors = document.createElement("p");
      authors.className = "pub-authors";
      authors.append(highlightAuthor(pub.authors));

      const venue = document.createElement("p");
      venue.className = "pub-venue";
      appendLinkedText(venue, pub.venue);

      body.append(title, authors, venue);

      if (pub.contribution) {
        const contribution = document.createElement("p");
        contribution.className = "pub-contribution";
        contribution.textContent = pub.contribution;
        body.append(contribution);
      }

      if (pub.note) {
        const note = document.createElement("p");
        note.className = "pub-note";
        note.textContent = pub.note;
        body.append(note);
      }

      if (pub.links && pub.links.length) {
        const links = document.createElement("div");
        links.className = "pub-links";
        pub.links.forEach((link) => links.append(createLink(link)));
        body.append(links);
      }

      article.append(createFigureButton(image, pub.title), body);
      target.append(article);
    });
  }

  function renderOtherPublications() {
    const target = $("other-publications");
    const archive = $("more-publications");
    const label = $("more-publications-label");
    target.replaceChildren();
    const publications = [
      ...content.selectedPublications.slice(selectedPublicationLimit),
      ...content.otherPublications.flatMap(group => group.items || [])
    ];
    archive.hidden = publications.length === 0;
    if (!publications.length) {
      return;
    }
    label.textContent = `Show more publications (${publications.length})`;
    const list = document.createElement("ol");
    list.className = "compact-list";
    publications.forEach((pub) => {
      const item = document.createElement("li");
      if (pub.id) item.id = pub.id;
      if (pub.image) {
        item.className = "compact-publication";
        const image = document.createElement("img");
        image.className = "compact-image";
        image.src = pub.image;
        image.alt = `${pub.title} preview`;
        image.loading = "lazy";
        item.append(createFigureButton(image, pub.title));
      }

      const copy = document.createElement("div");
      const title = document.createElement("span");
      title.className = "compact-title";
      title.textContent = pub.title;
      const meta = document.createElement("span");
      meta.className = "compact-meta";
      const description = [pub.authors, pub.venue, pub.contribution, pub.note].filter(Boolean).join(". ");
      meta.append(highlightAuthor(`${description}. `));

      copy.append(title, meta);
      if (pub.links && pub.links.length) {
        const links = document.createElement("span");
        links.className = "compact-links";
        pub.links.forEach((link) => links.append(createLink(link)));
        meta.append(links);
      }

      item.append(copy);
      list.append(item);
    });
    target.append(list);
  }

  function revealPublicationHash() {
    const publication = $(window.location.hash.slice(1));
    if (!publication || !publication.closest("#publications")) return;
    const archive = publication.closest("details");
    if (archive) publicationArchive.openInstantly();
    publication.scrollIntoView({ block: "start" });
  }

  function bindPublicationArchive() {
    const archive = $("more-publications");
    const panel = $("publications-archive-content");
    const summary = archive.querySelector("summary");
    const label = $("more-publications-label");
    const closedLabel = label.textContent;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let expanded = archive.open;
    let animation;

    function setOpen(open, animate = true) {
      const height = archive.open ? panel.getBoundingClientRect().height : 0;
      const opacity = archive.open ? getComputedStyle(panel).opacity : 0;
      if (animation) animation.cancel();
      animation = null;
      panel.classList.remove("is-animating");
      expanded = open;
      summary.setAttribute("aria-expanded", String(open));
      panel.inert = !open;
      label.textContent = open ? "Show fewer publications" : closedLabel;
      archive.classList.toggle("is-expanded", open);
      if (!animate || reducedMotion.matches) {
        archive.open = open;
        return;
      }
      archive.open = true;
      panel.classList.add("is-animating");
      animation = panel.animate([
        { height: `${height}px`, opacity },
        { height: `${open ? panel.scrollHeight : 0}px`, opacity: open ? 1 : 0 }
      ], { duration: 220, easing: "ease-in-out" });
      animation.onfinish = () => setOpen(expanded, false);
    }

    summary.setAttribute("aria-controls", panel.id);
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      setOpen(!expanded);
    });
    // Native anchor navigation and Find in Page can also open <details>.
    archive.addEventListener("toggle", () => {
      if (!animation && expanded !== archive.open) setOpen(archive.open, false);
    });
    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches && animation) setOpen(expanded, false);
    });
    setOpen(expanded, false);
    return { openInstantly: () => setOpen(true, false) };
  }

  function createFigureButton(image, title) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "publication-figure";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-label", `Enlarge figure: ${title}`);
    button.dataset.figureTitle = title;
    button.append(image);
    const hint = createIcon("expand");
    hint.classList.add("figure-expand-hint");
    button.append(hint);
    return button;
  }

  function bindFigurePreview() {
    const dialog = $("figure-dialog");
    const image = $("figure-dialog-image");
    const title = $("figure-dialog-title");
    const close = dialog.querySelector(".figure-dialog-close");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let trigger;
    let closing = false;

    function closePreview() {
      if (closing) return;
      if (reducedMotion.matches) {
        dialog.close();
        return;
      }
      closing = true;
      dialog.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 140, easing: "ease-out"
      }).onfinish = () => dialog.close();
    }

    $("publications").addEventListener("click", (event) => {
      const button = event.target.closest(".publication-figure");
      if (!button) return;
      trigger = button;
      const thumbnail = button.querySelector("img");
      image.src = thumbnail.currentSrc || thumbnail.src;
      image.alt = thumbnail.alt;
      title.textContent = button.dataset.figureTitle;
      closing = false;
      document.documentElement.classList.add("figure-open");
      dialog.showModal();
    });
    close.addEventListener("click", closePreview);
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closePreview();
    });
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog &&
          (event.clientX < rect.left || event.clientX > rect.right ||
           event.clientY < rect.top || event.clientY > rect.bottom)) {
        closePreview();
      }
    });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("figure-open");
      trigger?.focus({ preventScroll: true });
      closing = false;
    });
  }

  function renderEntries(items, targetId) {
    const target = $(targetId);
    target.replaceChildren();
    items.forEach((item) => {
      const entry = document.createElement("article");
      entry.className = "entry";

      const period = document.createElement("div");
      period.className = "entry-period";
      period.textContent = item.period;

      const body = document.createElement("div");
      body.className = "entry-copy";
      const title = document.createElement("h3");
      title.textContent = item.title;
      const org = document.createElement("p");
      appendLinkedText(org, item.organization);
      const detail = document.createElement("p");
      appendLinkedText(detail, [item.location, item.detail].filter(Boolean).join(" - "));
      body.append(title, org, detail);

      if (item.summary) {
        const summary = document.createElement("p");
        summary.className = "entry-summary";
        appendLinkedText(summary, item.summary);
        body.append(summary);
      }

      const main = document.createElement("div");
      main.className = item.logo ? "entry-main" : "entry-main entry-main-text";
      if (item.logo) {
        const logo = document.createElement("img");
        logo.className = "entry-logo";
        logo.src = item.logo;
        logo.alt = item.logoAlt || `${item.organization} logo`;
        logo.loading = "lazy";
        main.append(logo);
      }
      main.append(body);

      entry.append(period, main);
      if (item.highlights && item.highlights.length) {
        const highlights = document.createElement("ul");
        highlights.className = "entry-highlights";
        item.highlights.forEach((highlight) => {
          const li = document.createElement("li");
          const label = document.createElement("strong");
          label.textContent = `${highlight.label}: `;
          li.append(label);
          appendLinkedText(li, highlight.text);
          highlights.append(li);
        });
        entry.append(highlights);
      }
      target.append(entry);
    });
  }

  function renderTeachingMentoring() {
    const target = $("teaching-content");
    target.replaceChildren();
    content.teachingMentoring.forEach((paragraph) => {
      const p = document.createElement("p");
      appendLinkedText(p, paragraph);
      target.append(p);
    });
  }

  function renderAwards() {
    const highlights = $("recognition-content");
    highlights.replaceChildren();
    [...content.recognitionHighlights, ...content.awards].forEach((recognition) => {
      const card = document.createElement("li");
      card.className = "recognition-card";

      const venue = document.createElement("p");
      venue.className = "recognition-venue";
      venue.textContent = recognition.venue || recognition.year;
      const title = document.createElement("h3");
      title.textContent = recognition.title;
      card.append(venue, title);
      if (recognition.link) {
        card.append(createLink(recognition.link, "recognition-link", { icon: false }));
      }
      if (recognition.detail) {
        const detail = document.createElement("p");
        detail.className = "recognition-detail";
        detail.textContent = recognition.detail;
        card.append(detail);
      }
      highlights.append(card);
    });
  }

  function renderService() {
    const service = $("service-content");
    service.replaceChildren();

    if (content.serviceGroups && content.serviceGroups.length) {
      content.serviceGroups.forEach((group, groupIndex) => {
        const title = document.createElement("h3");
        title.textContent = group.title;
        const paragraph = document.createElement("p");
        group.items.forEach((item, index) => {
          if (index > 0) paragraph.append(" · ");
          paragraph.append(createLink(item, groupIndex > 0 ? "service-venue" : undefined));
        });
        service.append(title, paragraph);
      });
      return;
    }

    const p = document.createElement("p");
    p.textContent = content.service || "";
    service.append(p);
  }

  renderProfile();
  renderWechat();
  renderAbout();
  renderNews();
  renderResearch();
  renderSelectedPublications();
  renderOtherPublications();
  renderEntries(content.education, "education-content");
  renderTeachingMentoring();
  renderAwards();
  renderService();
  const publicationArchive = bindPublicationArchive();
  bindFigurePreview();
  bindActiveNavigation();
  window.addEventListener("hashchange", revealPublicationHash);
  if (window.location.hash) revealPublicationHash();
  bindSectionEntrance();
})();
