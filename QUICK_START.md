# Quick Start Guide 🚀

## Run Your First Test in 2 Minutes

### 1. Open Cypress

```bash
npm run cypress:open
```

### 2. Select Test

- Click **E2E Testing**
- Choose browser (Chrome recommended)
- Click on any test in `smoke/` folder
- Watch it run!

---

## Run All Smoke Tests (Headless)

```bash
npm run test:smoke
```

⏱️ Takes ~5-8 minutes

---

## What Tests Are Available?

### ✅ Smoke Tests (Ready to run)

| Test                   | What it checks                     | Time |
| ---------------------- | ---------------------------------- | ---- |
| `01-homepage-load`     | Homepage loads with all CTAs       | 30s  |
| `02-navigation`        | Navigation links work              | 20s  |
| `03-pricing-display`   | Pricing correct (€25, €30, €35)    | 25s  |
| `04-responsive-design` | Mobile/tablet/desktop views        | 60s  |
| `05-external-links`    | App Store, Google Play links valid | 15s  |
| `06-page-performance`  | Page loads in <5s                  | 20s  |

### 🧪 Regression Tests (Ready to run)

| Test                 | What it checks                          |
| -------------------- | --------------------------------------- |
| `referral-tracking`  | Referral code in URL → stored in cookie |
| `affiliate-tracking` | Affiliate ID tracking & persistence     |
| `contact-form`       | Form validation (client-side)           |
| `phone-check`        | Phone compatibility checker             |
| `destination-check`  | Destination coverage checker            |

---

## Common Commands

```bash
# Interactive mode
npm run cypress:open

# Run all tests
npm test

# Run specific category
npm run test:smoke
npm run test:referral

# Run in different browsers
npm run test:chrome
npm run test:firefox

# Mobile view
npm run test:mobile

# Watch tests run (headed mode)
npm run test:headed

# Clean up screenshots/videos
npm run clean
```

---

## Next Steps

1. **Read the full README** → `README.md`
2. **Understand architecture** → `ARCHITECTURE.md`
3. **Check test results** → `cypress/screenshots/` and `cypress/videos/`

---

## Troubleshooting

### Test fails?

1. Check `cypress/screenshots/` for screenshot of failure
2. Watch `cypress/videos/` to see what happened
3. Run in headed mode to debug: `npm run test:headed`

### Page loads slowly?

Increase timeout in `cypress.config.js`:

```javascript
{
  defaultCommandTimeout: 15000, // 15 seconds
  pageLoadTimeout: 45000 // 45 seconds
}
```

---

**You're ready! Start testing. 🎯**
