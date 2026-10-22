# Shopify theme handoff

## Deliverables

- `dist/infantry-for-christ-theme.zip`: uploadable theme, with Shopify folders at ZIP root.
- `dist/design-preview.html`: portable visual preview using the real public catalog. The custom sections are rendered from their Liquid source; header, product cards, and footer are simplified for this local preview. It is not a Shopify runtime or a checkout demo.
- `dist/home-1440.png` and `dist/home-390.png`: desktop and mobile screenshots of that local design preview.
- `theme/`: complete editable theme source, derived from the merchant's Ritual 3.3.1 export.

The original uploaded ZIP remains intact in the chat attachments. The live store was not modified.

## What changed

- Replaced the generic preset homepage with a faith-centered hero, real featured product, actual catalog grid, purpose statement, Facebook link, and shopping guide.
- Set a consistent warm cream, charcoal, and muted olive palette.
- Kept the store identity visible in the header and removed transparent product/home headers.
- Removed empty footer columns and an oversized repeated logo. Retained native email signup and policy components; added the exact merchant-provided Facebook URL.
- Added product-page shopping guidance and a youth-size notice for the selected Child of God hoodie. Shipping and return guidance appears only when the corresponding Shopify policy has content.
- Removed an unconfigured collection-link section from product pages.
- Retained native product media, variant selection, search, recommendations, cart, checkout handoff, and Shopify's injected app integration hooks. Retention of source code is not proof those functions have passed a store test.
- Added no storefront JavaScript or third-party tracking. Custom sections use CSS, server-rendered Liquid, and native disclosure elements.

## Upload without changing the live store

1. In Shopify, go to Online Store → Themes → Add theme → Upload ZIP file and choose `infantry-for-christ-theme.zip`. Leave it unpublished.
2. Open Customize for the uploaded theme. Confirm the hero resolves to `fgne`, the homepage collection is All products, and the youth product selector resolves to `child-of-god-hoodie`. Adjust selections if Shopify does not resolve them on import.
3. Confirm the main menu and footer menu point to real destinations. If desired, add the logo in theme settings; a text brand name works until a logo is selected.
4. Open app embeds and enable the integrations required by your store. Theme exports do not fully capture Shopify settings, app state, or supplier configuration.
5. Review the copy and [catalog recommendations](catalog-recommendations.md). Confirm supplier facts before making catalog edits.
6. Save accurate policies under Shopify Settings → Policies, verify their public links, and connect the size guide if one exists. The current policy URLs returned 404 during the audit.
7. Work through the [launch checks](launch-checklist.md), including payment, shipping, supplier behavior, mobile product selection, cart updates, and checkout handoff.
8. Review the unpublished theme before publishing. Keep the original live Dawn theme available for rollback.

No admin credentials or supplier access were supplied in this session, so the new theme has not been uploaded, published, or tested against a real Shopify checkout. Never send passwords or API keys in chat.

## Development

Use Node 22 or newer, Python 3, and Chromium. Use this task's existing checkout; do not create a worktree unless explicitly requested.

```sh
cd /workspace/infantryforchrist
npm ci --cache /tmp/ifc-npm-cache --no-audit --no-fund
npm run theme:check
npm run preview:build
npm run test:preview
npm run theme:package
```

`preview:build` uses a cached public catalog and images in `.cache/`. Remove those cached files to refresh the public snapshot. Public prices and availability in the static preview can become stale; the Shopify theme itself reads current Shopify data. The preview renderer adapts only the custom sections; it deliberately does not implement Shopify's native theme-block runtime.

`test:preview` uses `/usr/bin/chromium` by default; set `CHROMIUM_PATH` if your system uses a different executable. Tests cover layout, the new Liquid branches, links, image loading, keyboard disclosures, and automated accessibility. Manual assistive-technology testing and full Shopify functional testing remain necessary.

The theme ZIP includes only Shopify theme directories. It excludes public catalog caches, customer data, development dependencies, documentation, and test artifacts.
