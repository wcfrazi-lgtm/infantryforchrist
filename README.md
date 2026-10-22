# Infantry for Christ

Shopify storefront redesign workspace for infantryforchrist.com.

The redesigned theme is built from the supplied Ritual 3.3.1 export, with a new homepage and brand direction. The merchant authorized replacing any existing design that does not serve the store. Native commerce components are retained; no live Shopify changes have been made.

- [Design brief](docs/store-redesign-brief.md)
- [Launch acceptance checks](docs/launch-checklist.md)
- [Store and competitor audit](docs/store-audit.md)
- [Catalog recommendations](docs/catalog-recommendations.md)
- [Theme upload and development instructions](docs/shopify-handoff.md)

Run `npm ci`, `npm run theme:check`, `npm run preview:build`, `npm run test:preview`, and `npm run theme:package`. Upload `dist/infantry-for-christ-theme.zip` as an unpublished Shopify theme for functional testing. Node 22+, Python 3, and Chromium are required for the complete local workflow.

The static design preview is not a Shopify checkout test. Shipping, refund, privacy, and terms policy URLs returned 404 during the audit and need merchant configuration before launch. Do not place passwords, API keys, or private customer/order exports in this repository.
