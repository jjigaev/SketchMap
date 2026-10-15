import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { comparisonPosition, initImageComparison } from '../src/lib/imageComparison.ts';

describe('comparison position boundary', () => {
  it('clamps both endpoints and rounds to native one-percent steps', () => {
    assert.equal(comparisonPosition(-40), 0);
    assert.equal(comparisonPosition(140), 100);
    assert.equal(comparisonPosition('73.6'), 74);
    assert.equal(comparisonPosition(0), 0);
    assert.equal(comparisonPosition(100), 100);
  });

  it('rejects missing, non-finite and CSS-shaped input', () => {
    for (const value of ['', ' ', 'NaN', Infinity, -Infinity, '60%; color:red', '80px']) {
      assert.equal(comparisonPosition(value), 50);
    }
  });
});

function fixture(test, loaded = true) {
  const properties = new Map();
  const attributes = new Map();
  const input = Object.assign(new EventTarget(), { value: '50', disabled: true, setAttribute: (key, value) => attributes.set(key, value) });
  const image = () => Object.assign(new EventTarget(), { complete: loaded, naturalWidth: loaded ? 1536 : 0 });
  const sketch = image();
  const render = image();
  const status = { textContent: '' };
  const frame = { style: { setProperty: (key, value) => properties.set(key, value) } };
  const elements = { 'input[type="range"]': input, '.comparison__frame': frame, '[data-sketch]': sketch, '[data-render]': render, '[data-comparison-status]': status };
  const root = { dataset: { sketchLabel: 'Нобай', renderLabel: 'Визуализация', loadingMessage: 'Loading', errorMessage: 'Unavailable' }, querySelector: (selector) => elements[selector] };
  const dispose = initImageComparison(root);
  test.after(dispose);
  const change = (value) => { input.value = value; input.dispatchEvent(new Event('input')); };
  return { input, sketch, render, root, status, properties, attributes, change, dispose };
}

describe('native image comparison controller', () => {
  it('starts at a balanced split with localized accessible values', (test) => {
    const f = fixture(test);
    assert.equal(f.properties.get('--comparison-position'), '50%');
    assert.equal(f.attributes.get('aria-valuetext'), 'Нобай: 50%. Визуализация: 50%.');
    assert.equal(f.root.dataset.state, 'ready');
    assert.equal(f.input.disabled, false);
  });

  it('updates clipping and accessible values from native input events', (test) => {
    const f = fixture(test);
    f.change('73');
    assert.equal(f.properties.get('--comparison-position'), '73%');
    assert.equal(f.attributes.get('aria-valuetext'), 'Нобай: 73%. Визуализация: 27%.');
  });

  it('can reveal either image completely', (test) => {
    const f = fixture(test);
    f.change('0');
    assert.equal(f.properties.get('--comparison-position'), '0%');
    f.change('100');
    assert.equal(f.properties.get('--comparison-position'), '100%');
  });

  it('never writes unvalidated input into CSS', (test) => {
    const f = fixture(test);
    f.change('80%;display:none');
    assert.equal(f.input.value, '50');
    assert.equal(f.properties.get('--comparison-position'), '50%');
  });

  it('waits for both images before enabling the control', (test) => {
    const f = fixture(test, false);
    assert.equal(f.input.disabled, true);
    assert.equal(f.status.textContent, 'Loading');
    f.sketch.complete = true;
    f.sketch.naturalWidth = 1536;
    f.sketch.dispatchEvent(new Event('load'));
    assert.equal(f.input.disabled, true);
    f.render.complete = true;
    f.render.naturalWidth = 1536;
    f.render.dispatchEvent(new Event('load'));
    assert.equal(f.input.disabled, false);
    assert.equal(f.status.textContent, '');
  });

  it('falls back to the visualization when the sketch fails', (test) => {
    const f = fixture(test);
    f.sketch.dispatchEvent(new Event('error'));
    assert.equal(f.root.dataset.failed, 'sketch');
    assert.equal(f.root.dataset.state, 'unavailable');
    assert.equal(f.input.disabled, true);
    assert.equal(f.status.textContent, 'Unavailable');
  });

  it('falls back to the sketch when the visualization fails', (test) => {
    const f = fixture(test);
    f.render.dispatchEvent(new Event('error'));
    assert.equal(f.root.dataset.failed, 'render');
    assert.equal(f.input.disabled, true);
  });

  it('detects failed images that completed before initialization', (test) => {
    const f = fixture(test, false);
    f.sketch.complete = true;
    f.render.complete = true;
    f.dispose();
    const again = initImageComparison(f.root);
    test.after(again);
    assert.equal(f.root.dataset.failed, 'both');
    assert.equal(f.input.disabled, true);
  });

  it('removes event handlers when disposed', (test) => {
    const f = fixture(test);
    f.dispose();
    f.change('90');
    assert.equal(f.properties.get('--comparison-position'), '50%');
    assert.equal(f.input.disabled, true);
  });

  it('keeps separate project comparisons independent', (test) => {
    const first = fixture(test);
    const second = fixture(test);
    first.change('80');
    assert.equal(first.properties.get('--comparison-position'), '80%');
    assert.equal(second.properties.get('--comparison-position'), '50%');
    first.dispose();
    second.change('20');
    assert.equal(second.properties.get('--comparison-position'), '20%');
    assert.equal(second.input.disabled, false);
  });

  it('ignores pages without a comparison', () => {
    assert.doesNotThrow(() => initImageComparison({ querySelector: () => null })());
  });
});
