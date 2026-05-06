# Lighthouse CI Performance Testing

This theme includes Lighthouse CI for automated mobile and desktop speed checks.

## GitHub Actions setup

Set these repository variables in GitHub:

- `LHCI_URLS`: Required for automatic runs. Add one or more live URLs separated by commas, spaces, or new lines.
  - Example: `https://www.pawpygo.com/zh, https://www.pawpygo.com/zh/collections/all`
  - Use the final localized URL, such as `/zh`, instead of the root domain if Shopify redirects the root URL.
- `LHCI_RUNS`: Optional. Defaults to `3` Lighthouse runs per URL.

The workflow also supports manual runs from **Actions → Lighthouse CI → Run workflow**, where URLs can be entered without changing repository variables.

## Local usage

Install dependencies once:

```bash
npm ci
```

Run both mobile and desktop audits:

```bash
LHCI_URLS="https://www.pawpygo.com/zh" npm run perf
```

Run only one profile:

```bash
LHCI_URLS="https://www.pawpygo.com/zh" npm run perf:mobile
LHCI_URLS="https://www.pawpygo.com/zh" npm run perf:desktop
```

## Thresholds

Performance, accessibility, best practices, and SEO thresholds currently warn instead of failing the build. This keeps speed reporting visible while avoiding blocked deploys during the first tuning phase.
