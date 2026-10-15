import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { dragTarget, initLinkedGallery, isHorizontalDrag, nearestSlide } from '../src/lib/linkedGallery.ts';

describe('linked project gallery gestures', () => {
  it('uses measured slide gaps when finding the visible pair', () => {
    const offsets = [0, 1088, 2176, 3264];
    assert.equal(nearestSlide(530, offsets), 0);
    assert.equal(nearestSlide(560, offsets), 1);
    assert.equal(nearestSlide(1800, offsets), 2);
  });

  it('clamps overscroll to the first or last pair', () => {
    assert.equal(nearestSlide(-120, [0, 350, 700]), 0);
    assert.equal(nearestSlide(950, [0, 350, 700]), 2);
  });

  it('does not turn a click or small pointer jitter into a drag', () => {
    assert.equal(isHorizontalDrag(0, 0), false);
    assert.equal(isHorizontalDrag(7, 2), false);
    assert.equal(isHorizontalDrag(-7, -2), false);
  });

  it('requires horizontal intent and leaves vertical gestures alone', () => {
    assert.equal(isHorizontalDrag(20, 30), false);
    assert.equal(isHorizontalDrag(20, 20), false);
    assert.equal(isHorizontalDrag(8, 2), true);
    assert.equal(isHorizontalDrag(-12, 3), true);
  });

  it('returns short drags to their starting project', () => {
    assert.equal(dragTarget(2, 60, 1000, 6), 2);
    assert.equal(dragTarget(2, -60, 1000, 6), 2);
  });

  it('advances a deliberate short drag in either direction', () => {
    assert.equal(dragTarget(2, 110, 1000, 6), 3);
    assert.equal(dragTarget(2, -110, 1000, 6), 1);
  });

  it('scales the release threshold for narrow layouts', () => {
    assert.equal(dragTarget(0, 50, 300, 6), 0);
    assert.equal(dragTarget(0, 60, 300, 6), 1);
  });

  it('lets a long drag travel several pairs', () => {
    assert.equal(dragTarget(0, 1700, 800, 6), 2);
    assert.equal(dragTarget(4, -1700, 800, 6), 2);
  });

  it('never wraps beyond the first or last project', () => {
    assert.equal(dragTarget(0, -1000, 800, 6), 0);
    assert.equal(dragTarget(5, 1000, 800, 6), 5);
    assert.equal(dragTarget(2, 10000, 800, 6), 5);
  });

  it('handles a single project and an unmeasured track', () => {
    assert.equal(dragTarget(0, 300, 0, 1), 0);
    assert.equal(dragTarget(2, 300, 0, 6), 2);
    assert.equal(nearestSlide(300, [0]), 0);
  });
});

// Use real EventTargets to test the controller without adding a DOM/test dependency.
function fixture(test, reducedMotion = false) {
  const classes = () => {
    const values = new Set();
    return {
      add: (name) => values.add(name), remove: (name) => values.delete(name),
      contains: (name) => values.has(name),
      toggle: (name, enabled) => enabled ? values.add(name) : values.delete(name),
    };
  };
  const view = Object.assign(new EventTarget(), {
    setTimeout, clearTimeout, requestAnimationFrame: () => 1, cancelAnimationFrame() {},
  });
  const preference = Object.assign(new EventTarget(), { matches: reducedMotion });
  view.matchMedia = () => preference;
  const requests = [];
  const captures = new Set();
  const track = Object.assign(new EventTarget(), {
    scrollLeft: 0, clientWidth: 1000, dataset: {}, classList: classes(),
    scrollTo(request) {
      requests.push(request);
      if (request.behavior === 'instant') this.scrollLeft = request.left;
    },
    setPointerCapture: (id) => captures.add(id),
    hasPointerCapture: (id) => captures.has(id),
    releasePointerCapture: (id) => captures.delete(id),
  });
  const previous = Object.assign(new EventTarget(), { disabled: true });
  const next = Object.assign(new EventTarget(), { disabled: false });
  const count = { textContent: '' };
  const announcement = { textContent: '' };
  const slides = Array.from({ length: 6 }, (_, index) => ({
    offsetLeft: index * 1048, classList: classes(),
    querySelector: () => ({ textContent: `Project ${index + 1}` }),
  }));
  const elements = { '[data-track]': track, '[data-prev]': previous, '[data-next]': next, '[data-count]': count, '[data-announcement]': announcement };
  const root = { dataset: {}, querySelector: (selector) => elements[selector], querySelectorAll: () => slides };
  let observer;
  const originals = { window: globalThis.window, ResizeObserver: globalThis.ResizeObserver };
  globalThis.window = view;
  globalThis.ResizeObserver = class {
    constructor(callback) { this.callback = callback; observer = this; }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
  const dispose = initLinkedGallery(root);
  test.after(() => {
    dispose();
    for (const [key, value] of Object.entries(originals)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  });
  const send = (target, type, properties = {}) => {
    const event = Object.assign(new Event(type, { cancelable: true }), properties);
    target.dispatchEvent(event);
    return event;
  };
  const pointer = (target, type, x, y = 0, pointerType = 'mouse') => send(target, type, {
    clientX: x, clientY: y, pointerId: 1, pointerType, button: 0, isPrimary: true,
  });
  return { view, track, previous, next, count, root, slides, requests, preference, observer, dispose, send, pointer };
}

describe('linked gallery controller', () => {
  it('queues rapid next clicks against the destination, not an intermediate scroll position', (test) => {
    const f = fixture(test);
    f.send(f.next, 'click');
    f.send(f.next, 'click');
    assert.deepEqual(f.requests.map(({ left }) => left), [1048, 2096]);
  });

  it('keeps a normal project click usable', (test) => {
    const f = fixture(test);
    f.pointer(f.track, 'pointerdown', 300);
    f.pointer(f.view, 'pointerup', 300);
    assert.equal(f.send(f.track, 'click', { detail: 1 }).defaultPrevented, false);
  });

  it('snaps a mouse drag and suppresses only its trailing navigation click', (test) => {
    const f = fixture(test);
    f.pointer(f.track, 'pointerdown', 300);
    f.pointer(f.view, 'pointermove', 100);
    assert.equal(f.track.classList.contains('is-dragging'), true);
    f.pointer(f.view, 'pointerup', 100);
    assert.equal(f.requests.at(-1).left, 1048);
    assert.equal(f.track.classList.contains('is-dragging'), false);
    assert.equal(f.send(f.track, 'click', { detail: 1 }).defaultPrevented, true);
    assert.equal(f.send(f.track, 'click', { detail: 1 }).defaultPrevented, false);
  });

  it('never suppresses keyboard activation after a drag', (test) => {
    const f = fixture(test);
    f.pointer(f.track, 'pointerdown', 300);
    f.pointer(f.view, 'pointermove', 100);
    f.pointer(f.view, 'pointerup', 100);
    assert.equal(f.send(f.track, 'click', { detail: 0 }).defaultPrevented, false);
  });

  it('leaves touch swipes and vertical gestures to the browser', (test) => {
    const f = fixture(test);
    f.pointer(f.track, 'pointerdown', 300, 0, 'touch');
    assert.equal(f.pointer(f.view, 'pointermove', 100, 0, 'touch').defaultPrevented, false);
    assert.equal(f.requests.length, 0);
    f.pointer(f.track, 'pointerdown', 300);
    assert.equal(f.pointer(f.view, 'pointermove', 280, 90).defaultPrevented, false);
    assert.equal(f.track.classList.contains('is-dragging'), false);
  });

  it('recovers pointer capture when a drag is cancelled', (test) => {
    const f = fixture(test);
    f.pointer(f.track, 'pointerdown', 900);
    f.pointer(f.view, 'pointermove', 250);
    f.pointer(f.view, 'pointercancel', 250);
    assert.equal(f.track.hasPointerCapture(1), false);
    assert.equal(f.track.classList.contains('is-dragging'), false);
    assert.equal(f.requests.at(-1).left, 1048);
  });

  it('updates the pair, count and boundary controls immediately for reduced motion', (test) => {
    const f = fixture(test, true);
    f.send(f.track, 'keydown', { key: 'End' });
    assert.equal(f.requests.at(-1).behavior, 'instant');
    assert.equal(f.root.dataset.activeIndex, '5');
    assert.equal(f.count.textContent, '06 / 06');
    assert.equal(f.next.disabled, true);
    f.send(f.track, 'keydown', { key: 'Home' });
    assert.equal(f.root.dataset.activeIndex, '0');
    assert.equal(f.previous.disabled, true);
  });

  it('preserves the current project after a responsive resize', (test) => {
    const f = fixture(test, true);
    f.send(f.track, 'keydown', { key: 'ArrowRight' });
    f.track.clientWidth = 390;
    f.slides.forEach((slide, index) => { slide.offsetLeft = index * 370; });
    f.observer.callback();
    assert.equal(f.track.scrollLeft, 370);
    assert.equal(f.root.dataset.activeIndex, '1');
  });

  it('removes listeners, capture and transient styles on disposal', (test) => {
    const f = fixture(test);
    f.pointer(f.track, 'pointerdown', 300);
    f.pointer(f.view, 'pointermove', 100);
    f.dispose();
    const calls = f.requests.length;
    f.send(f.next, 'click');
    assert.equal(f.requests.length, calls);
    assert.equal(f.track.hasPointerCapture(1), false);
    assert.equal(f.track.classList.contains('is-dragging'), false);
    assert.equal(f.observer.disconnected, true);
  });
});
