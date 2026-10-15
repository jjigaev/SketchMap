import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import { getProjects, projectSlugs } from '../src/data/projects.ts';

describe('project comparison content', () => {
  for (const locale of ['ru', 'kk', 'en']) {
    it(`pairs every ${locale} project with its own full-frame sketch`, () => {
      const projects = getProjects(locale);
      assert.equal(projects.length, 6);
      assert.deepEqual(projects.map((project) => project.slug), projectSlugs);
      assert.equal(new Set(projects.map((project) => project.sketch.src)).size, projects.length);
      for (const project of projects) {
        assert.equal(project.sketch.src, `/images/projects/${project.slug}-sketch-v1.webp`);
        assert.equal(project.hero.src, `/images/projects/${project.slug}-hero-v2.webp`);
        assert.notEqual(project.sketch.src, project.hero.src);
        assert.equal(project.sketch.width, project.hero.width);
        assert.equal(project.sketch.height, project.hero.height);
        assert.equal(project.sketch.width / project.sketch.height, 1.5);
        assert.ok(project.sketch.alt.includes(project.hero.alt));
      }
    });
  }

  it('localizes each sketch description without changing its image identity', () => {
    const translations = ['ru', 'kk', 'en'].map(getProjects);
    for (let index = 0; index < projectSlugs.length; index++) {
      const sketches = translations.map((projects) => projects[index].sketch);
      assert.equal(new Set(sketches.map((sketch) => sketch.src)).size, 1);
      assert.equal(new Set(sketches.map((sketch) => sketch.alt)).size, 3);
    }
  });

  it('ships both WebP assets for every comparison', async () => {
    for (const project of getProjects('ru')) {
      for (const image of [project.hero, project.sketch]) {
        const asset = await readFile(new URL(`../public${image.src}`, import.meta.url));
        assert.equal(asset.toString('ascii', 0, 4), 'RIFF', image.src);
        assert.equal(asset.toString('ascii', 8, 12), 'WEBP', image.src);
      }
    }
  });
});
