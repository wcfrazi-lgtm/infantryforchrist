# Verification and provenance

## Original

- Merchant upload: `theme_export__infantryforchrist-com-ritual__21OCT2026-1116pm.zip`
- SHA-256: `fc166ec68308153b6a2ff12ad987cf59c58a6b908948aa0bc4f8dad86e40026c`
- Theme metadata: Ritual 3.3.1, author Shopify.
- 411 original entries. Original upload retained intact; extracted reference copy kept outside the project checkout.
- A scan for common private API-key formats found no matching files. This is a precautionary scan, not a comprehensive security audit.

## Local validation

- Shopify Theme Check: zero errors; 26 pre-existing warnings; zero added findings relative to the export. Existing warnings concern native snippet arguments, scoped classes, and unused/undefined documentation or template variables. They were not suppressed.
- Ten custom-section and static-preview checks passed: escaped copy and empty hero fallback, missing-policy hiding, policy links and youth-only notice, four screen widths (320/390/768/1440), keyboard disclosure, exact Facebook URL, and automated WCAG accessibility scan.
- Browser: system Chromium via Playwright. Automated scan covers WCAG 2 A/AA, 2.1 AA, and 2.2 AA tags; it does not replace manual accessibility testing.
- Real public product images loaded in the static preview. Desktop and mobile screenshots were visually inspected.
- ZIP contains 415 Shopify theme files, with theme directories at the archive root. CRC validation passed. No development tools, private store data, or documentation are included in the theme ZIP.
- The custom sections add no JavaScript, and the hero uses responsive image widths with eager/high-priority loading. No live speed score or conversion improvement is claimed.

## Remaining validation

The static renderer exercises the new sections, but its header, product cards, and footer are simplified. Shopify's native theme blocks, product variant controls, cart behavior, app embeds, shipping, tax, payments, and supplier fulfillment require an unpublished Shopify preview and store settings access. These have not been validated for the redesigned theme.

Direct policy URL checks returned 404 for shipping, refunds, privacy, and terms. The merchant is researching supplier requirements. Do not launch until accurate policies and the necessary operational settings are in place.

See [the handoff](shopify-handoff.md) and [launch checks](launch-checklist.md).
