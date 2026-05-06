const formFactor = process.env.LHCI_FORM_FACTOR === 'desktop' ? 'desktop' : 'mobile';
const urls = (process.env.LHCI_URLS || '')
  .split(/[\n, ]+/)
  .map((url) => url.trim())
  .filter(Boolean);

const desktopSettings = {
  formFactor: 'desktop',
  screenEmulation: {
    mobile: false,
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
    disabled: false,
  },
};

const mobileSettings = {
  formFactor: 'mobile',
  screenEmulation: {
    mobile: true,
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    disabled: false,
  },
};

module.exports = {
  ci: {
    collect: {
      url: urls,
      numberOfRuns: Number(process.env.LHCI_RUNS || 3),
      settings: formFactor === 'desktop' ? desktopSettings : mobileSettings,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: formFactor === 'desktop' ? 0.65 : 0.45 }],
        'categories:accessibility': ['warn', { minScore: 0.8 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'uses-http2': 'off',
        'uses-long-cache-ttl': 'off',
        'unused-javascript': 'off',
        'render-blocking-resources': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
