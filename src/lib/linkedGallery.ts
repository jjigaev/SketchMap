/** Find the visible project using measured offsets, including the gap between slides. */
export function nearestSlide(position: number, offsets: readonly number[]): number {
  let nearest = 0;
  for (let index = 1; index < offsets.length; index += 1) {
    if (Math.abs(offsets[index] - position) < Math.abs(offsets[nearest] - position)) nearest = index;
  }
  return nearest;
}

export function isHorizontalDrag(x: number, y: number): boolean {
  return Math.abs(x) >= 8 && Math.abs(x) > Math.abs(y);
}

/** Short deliberate drags advance once; longer drags can travel several projects. */
export function dragTarget(start: number, distance: number, step: number, count: number): number {
  const bounded = Math.max(0, Math.min(count - 1, start));
  if (count < 2 || step <= 0 || Math.abs(distance) < Math.min(96, step * 0.18)) return bounded;
  const advance = Math.max(1, Math.round(Math.abs(distance) / step)) * Math.sign(distance);
  return Math.max(0, Math.min(count - 1, bounded + advance));
}

/** One native scroll track owns both photographs, so the pair cannot drift apart. */
export function initLinkedGallery(root: HTMLElement): () => void {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  if (!track || slides.length === 0) return () => {};

  const previous = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const count = root.querySelector<HTMLElement>('[data-count]');
  const announcement = root.querySelector<HTMLElement>('[data-announcement]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const { signal } = events;
  let offsets = slides.map((slide) => slide.offsetLeft - slides[0].offsetLeft);
  let active = -1;
  let target: number | null = null;
  let frame = 0;
  let settleTimer = 0;
  let width = track.clientWidth;
  let suppressClick = false;
  let drag: { id: number; x: number; y: number; left: number; index: number; moving: boolean } | null = null;

  const updateControls = () => {
    if (previous) previous.disabled = (target ?? active) <= 0;
    if (next) next.disabled = (target ?? active) >= slides.length - 1;
  };

  const render = () => {
    const index = nearestSlide(track.scrollLeft, offsets);
    if (active !== index) {
      active = index;
      root.dataset.activeIndex = String(index);
      slides.forEach((slide, position) => slide.classList.toggle('is-active', position === index));
      const position = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      if (count) count.textContent = position;
      if (announcement) announcement.textContent = `${position}: ${slides[index].querySelector('.selected__project-title')?.textContent ?? ''}`;
    }
    updateControls();
  };

  const settle = () => {
    window.clearTimeout(settleTimer);
    if (drag?.moving) return;
    target = null;
    render();
  };

  const goTo = (index: number, instant = reduced.matches) => {
    target = Math.max(0, Math.min(slides.length - 1, index));
    updateControls();
    track.scrollTo({ left: offsets[target], behavior: instant ? 'instant' : 'smooth' });
    if (instant) settle();
    else {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 180);
    }
  };

  previous?.addEventListener('click', () => goTo((target ?? active) - 1), { signal });
  next?.addEventListener('click', () => goTo((target ?? active) + 1), { signal });
  track.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const current = target ?? active;
    const index = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: slides.length - 1 }[event.key];
    if (index === undefined) return;
    event.preventDefault();
    goTo(index);
  }, { signal });

  track.addEventListener('scroll', () => {
    if (!frame) frame = window.requestAnimationFrame(() => { frame = 0; render(); });
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, 180);
  }, { passive: true, signal });
  track.addEventListener('scrollend', settle, { signal });

  // Touch stays browser-owned: native swipes, momentum, vertical scrolling and pinch zoom.
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !event.isPrimary) return;
    suppressClick = false;
    target = null;
    track.scrollTo({ left: track.scrollLeft, behavior: 'instant' });
    render();
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: track.scrollLeft, index: active, moving: false };
  }, { signal });

  window.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const x = event.clientX - drag.x;
    if (!drag.moving) {
      if (!isHorizontalDrag(x, event.clientY - drag.y)) return;
      drag.moving = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    }
    if (event.cancelable) event.preventDefault();
    track.scrollLeft = drag.left - x;
  }, { passive: false, signal });

  const finishDrag = (cancelled: boolean) => {
    if (!drag) return;
    const gesture = drag;
    drag = null;
    if (!gesture.moving) return;
    suppressClick = true;
    const destination = cancelled
      ? nearestSlide(track.scrollLeft, offsets)
      : dragTarget(gesture.index, track.scrollLeft - gesture.left, offsets[1] - offsets[0], slides.length);
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(gesture.id)) track.releasePointerCapture(gesture.id);
    goTo(destination);
  };

  window.addEventListener('pointerup', (event) => {
    if (drag?.id === event.pointerId) finishDrag(false);
  }, { signal });
  window.addEventListener('pointercancel', (event) => {
    if (drag?.id === event.pointerId) finishDrag(true);
  }, { signal });
  track.addEventListener('lostpointercapture', () => finishDrag(true), { signal });
  window.addEventListener('blur', () => finishDrag(true), { signal });

  track.addEventListener('click', (event) => {
    if (!suppressClick || event.detail === 0) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, { capture: true, signal });

  // A touch or trackpad gesture can interrupt an in-flight button transition.
  track.addEventListener('touchstart', () => { target = null; }, { passive: true, signal });
  track.addEventListener('wheel', () => { target = null; }, { passive: true, signal });
  reduced.addEventListener('change', () => {
    if (reduced.matches) { finishDrag(true); goTo(target ?? active, true); }
  }, { signal });

  const resize = new ResizeObserver(() => {
    if (width === track.clientWidth) return;
    width = track.clientWidth;
    finishDrag(true);
    offsets = slides.map((slide) => slide.offsetLeft - slides[0].offsetLeft);
    goTo(target ?? active, true);
  });
  resize.observe(track);
  track.dataset.draggable = 'true';
  render();

  return () => {
    events.abort();
    resize.disconnect();
    window.cancelAnimationFrame(frame);
    window.clearTimeout(settleTimer);
    if (drag && track.hasPointerCapture(drag.id)) track.releasePointerCapture(drag.id);
    drag = null;
    track.classList.remove('is-dragging');
    delete track.dataset.draggable;
  };
}
