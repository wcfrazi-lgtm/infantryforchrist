import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root, renderSection } from './build-preview.mjs';

const tests = [];
async function test(name, fn) { await fn(); tests.push(name); console.log(`PASS ${name}`); }

await test('Hero escapes merchant copy and handles missing product/image', async () => {
  const html = await renderSection('ifc-hero', { heading: '<script>alert(1)</script>' });
  assert(html.includes('&lt;script&gt;')); assert(!html.includes('<script>'));
  assert(html.includes('ifc-hero__art')); assert(!html.includes('In the collection'));
});
await test('Guide hides unpublished shipping/return policies', async () => {
  const html = await renderSection('ifc-shopping-guide');
  assert(!html.includes('Read the shipping policy')); assert(!html.includes('Read the return policy'));
});
await test('Guide displays configured policies and youth-only size warning', async () => {
  const context = { shop: { shipping_policy: { body: 'Policy', url: '/policies/shipping-policy' }, refund_policy: { body: 'Policy', url: '/policies/refund-policy' } }, product: { handle: 'child-of-god-hoodie' } };
  const settings = { youth_product: { handle: 'child-of-god-hoodie' } };
  const youth = await renderSection('ifc-shopping-guide', settings, context);
  assert(youth.includes('This is a youth hoodie.')); assert(youth.includes('/policies/shipping-policy')); assert(youth.includes('/policies/refund-policy'));
  const adult = await renderSection('ifc-shopping-guide', settings, { ...context, product: { handle: 'fglj' } });
  assert(!adult.includes('This is a youth hoodie.'));
});

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext();
const page = await context.newPage();
const html = await readFile(resolve(root, 'dist/design-preview.html'), 'utf8');
try {
  // Give the document a real origin for accessibility tooling without external requests.
  await page.route('http://ifc-preview.test/**', (route) => route.fulfill({ contentType: 'text/html', body: html }));
  await page.goto('http://ifc-preview.test/');
  for (const width of [1440, 768, 390, 320]) {
    await test(`Preview fits ${width}px viewport with loaded product images`, async () => {
      await page.setViewportSize({ width, height: 1000 });
      await page.locator('img').evaluateAll((images) => Promise.all(images.map((i) => i.decode())));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.preview-card').count(), 7);
      if ([1440, 390].includes(width)) await page.screenshot({ path: resolve(root, `dist/home-${width}.png`), fullPage: true });
    });
  }
  await test('Shopping guide opens with keyboard', async () => {
    const summary = page.locator('summary').first(); await summary.focus(); await page.keyboard.press('Enter');
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
  });
  await test('Facebook links retain exact merchant-provided URL', async () => {
    const links = page.locator('a[href*="facebook.com"]'); assert.equal(await links.count(), 2);
    for (const link of await links.all()) { assert.equal(await link.getAttribute('href'), 'https://www.facebook.com/profile.php?id=61585848563985'); assert((await link.getAttribute('rel')).includes('noopener')); }
  });
  await test('Preview passes automated WCAG 2.2 AA accessibility scan', async () => {
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await writeFile(resolve(root, 'dist/accessibility-results.json'), JSON.stringify(result, null, 2));
    assert.deepEqual(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })), []);
  });
} finally { await browser.close(); }
await writeFile(resolve(root, 'dist/preview-test-results.json'), JSON.stringify({ passed: tests.length, tests, limitations: 'Tests cover custom sections and a static design preview, not Shopify commerce, supplier fulfillment, native theme blocks, or checkout.' }, null, 2));
console.log(`${tests.length} checks passed. Shopify commerce remains to be tested in an unpublished theme.`);
