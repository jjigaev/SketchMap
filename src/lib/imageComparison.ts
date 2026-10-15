/** Only bounded numeric values may reach the clipping custom property. */
export function comparisonPosition(value: string | number): number {
  if (typeof value === 'string' && value.trim() === '') return 50;
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(Math.max(0, Math.min(100, number))) : 50;
}

/** Keep native range semantics for pointer, touch, keyboard and assistive technology. */
export function initImageComparison(root: HTMLElement): () => void {
  const input = root.querySelector<HTMLInputElement>('input[type="range"]');
  const frame = root.querySelector<HTMLElement>('.comparison__frame');
  const sketch = root.querySelector<HTMLImageElement>('[data-sketch]');
  const render = root.querySelector<HTMLImageElement>('[data-render]');
  const status = root.querySelector<HTMLElement>('[data-comparison-status]');
  if (!input || !frame || !sketch || !render) return () => {};

  const events = new AbortController();
  const { signal } = events;
  const failed = new Set<HTMLImageElement>();
  const reflect = () => {
    const value = comparisonPosition(input.value);
    input.value = String(value);
    frame.style.setProperty('--comparison-position', `${value}%`);
    input.setAttribute('aria-valuetext', `${root.dataset.sketchLabel}: ${value}%. ${root.dataset.renderLabel}: ${100 - value}%.`);
  };

  const syncState = () => {
    const broken = (image: HTMLImageElement) => failed.has(image) || (image.complete && image.naturalWidth === 0);
    const sketchFailed = broken(sketch);
    const renderFailed = broken(render);
    const unavailable = sketchFailed || renderFailed;
    const ready = !unavailable && sketch.complete && render.complete;
    root.dataset.state = unavailable ? 'unavailable' : ready ? 'ready' : 'loading';
    root.dataset.failed = sketchFailed ? (renderFailed ? 'both' : 'sketch') : renderFailed ? 'render' : '';
    input.disabled = !ready;
    if (status) status.textContent = unavailable ? root.dataset.errorMessage ?? '' : ready ? '' : root.dataset.loadingMessage ?? '';
  };

  input.addEventListener('input', reflect, { signal });
  for (const image of [sketch, render]) {
    image.addEventListener('load', syncState, { signal });
    image.addEventListener('error', () => { failed.add(image); syncState(); }, { signal });
  }
  reflect();
  syncState();

  return () => {
    events.abort();
    input.disabled = true;
    root.dataset.state = 'static';
  };
}
