import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizePath, titleOverride } from './titleOverrides.js';

const table = { '/services': { title: 'T', description: 'D' } };

test('paths normalise', () => {
  assert.equal(normalizePath('/services/'), '/services');
  assert.equal(normalizePath(undefined), '/');
});

test('an entry applies, a missing or half entry does not', () => {
  assert.deepEqual(titleOverride('/services/', table), { title: 'T', description: 'D' });
  assert.equal(titleOverride('/other', table), null);
  assert.equal(titleOverride('/services', { '/services': { title: 'only' } }), null);
  assert.equal(titleOverride('/services', {}), null);
});
