/* The approved continuous-stroke year study, scoped to the fellowship. */
(() => {
  const card = document.querySelector('.recognition-featured');
  const venue = card?.querySelector('.recognition-venue');
  if (!venue) return;
  const year = venue.textContent.trim();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const mask = document.createElement('canvas');
  const ink = mask.getContext('2d');
  if (!ctx || !ink) return; // Leave the ordinary text intact without Canvas.
  const label = document.createElement('span');
  label.className = 'year-readable';
  label.textContent = year;
  canvas.className = 'fellowship-year-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  venue.replaceChildren(label, canvas);
  card.classList.add('has-year-art');
  venue.classList.add('has-year-art');

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, ratio = 1, visible = false;
  let frame = 0, lastDraw = 0;
  function draw(time) {
    if (!width || !height) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#284f70';
    for (let x = 1.5; x < width; x += 3) {
      const level = Math.min(3, Math.floor((Math.sin(x * .09) + 1) * 2));
      ctx.lineWidth = [1.65, 1.9, 2.15, 2.4][level];
      ctx.globalAlpha = reduced.matches ? 1 : .96 + .04 * Math.sin(time / 5000 + x * .04);
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(mask, 0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
  }
  const active = () => visible && !document.hidden && !reduced.matches;
  function tick(time) {
    frame = 0;
    if (!active()) return;
    if (time - lastDraw >= 50) { draw(time); lastDraw = time; }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (visible) draw(performance.now());
    if (active()) frame = requestAnimationFrame(tick);
  }
  new ResizeObserver(() => {
    ({ width, height } = canvas.getBoundingClientRect());
    if (!width || !height) return;
    ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    mask.width = Math.round(width * 2); mask.height = Math.round(height * 2);
    let size = height * .82;
    ink.font = `700 ${size * 2}px Georgia`;
    size *= Math.min(1, (width - 10) * 2 / ink.measureText(year).width);
    ink.font = `700 ${size * 2}px Georgia`;
    ink.textAlign = 'center'; ink.textBaseline = 'middle';
    ink.fillText(year, width, height + size * .06);
    draw(performance.now());
  }).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(card);
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
})();
