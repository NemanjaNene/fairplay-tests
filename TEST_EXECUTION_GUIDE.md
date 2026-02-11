# Test Execution Guide 

Complete guide for running tests in different scenarios.

---

##  Quick Commands

```bash
# Interactive mode (best for development)
npm run cypress:open

# Run all tests (headless)
npm test

# Run smoke tests (5-8 min)
npm run test:smoke

# Run regression tests
npm run test:regression
```

---

##  Test Categories

### 1. Smoke Tests (6 suites, ~8 min)

**Purpose**: Fast sanity check  
**When**: Every PR, every deploy  
**Command**: `npm run test:smoke`

**What's included**:

- Homepage loads with CTAs
- Navigation works
- Pricing display correct
- Responsive design (mobile/tablet/desktop)
- External links valid
- Page performance (<5s load)

**Success criteria**: All 6 suites pass

---

### 2. Regression Tests (5+ suites, ~15-20 min)

**Purpose**: Comprehensive coverage  
**When**: Nightly, pre-release  
**Command**: `npm run test:regression`

**What's included**:

- Referral tracking
- Affiliate tracking
- Form validation
- Phone compatibility
- Destination coverage

**Success criteria**: >95% pass rate

---

### 3. Referral & Affiliate Tests

**Purpose**: Track referral/affiliate cookie persistence  
**When**: After referral feature changes  
**Commands**:

```bash
npm run test:referral    # Referral only
npm run test:affiliate   # Affiliate only
```

---

##  Browser Testing

### Chrome (default)

```bash
npm run test:chrome
```

### Firefox

```bash
npm run test:firefox
```

### Edge

```bash
npm run test:edge
```

### All browsers (parallel)

```bash
npm run test:chrome & npm run test:firefox & npm run test:edge
```

---

## 📱 Device Testing

### Mobile (iPhone SE viewport)

```bash
npm run test:mobile
```

### Tablet

```bash
npx cypress run --config viewportWidth=768,viewportHeight=1024
```

### Desktop (default)

```bash
npm test
```

---

##  Advanced Execution

### Run specific test file

```bash
npx cypress run --spec "cypress/e2e/smoke/01-homepage-load.cy.js"
```

### Run tests matching pattern

```bash
npx cypress run --spec "cypress/e2e/smoke/**/*"
npx cypress run --spec "cypress/e2e/regression/referral/**/*"
```

### Run with custom config

```bash
npx cypress run --config viewportWidth=1280,viewportHeight=720
```

### Run in headed mode (watch tests run)

```bash
npm run test:headed
```

### Run with specific timeout

```bash
npx cypress run --config defaultCommandTimeout=15000
```

---

##  Debugging

### Open Test Runner (interactive)

```bash
npm run cypress:open
```

Then:

1. Select E2E Testing
2. Choose browser
3. Click on test to run
4. Watch in real-time
5. Use DevTools to inspect

### Run single test in headed mode

```bash
npx cypress run --headed --spec "cypress/e2e/smoke/01-homepage-load.cy.js"
```

### Run with console output

```bash
npx cypress run --browser chrome --headed --no-exit
```

### Generate detailed logs

```bash
DEBUG=cypress:* npm test
```

---

##  Reporting

### Default (terminal output)

```bash
npm test
```

### JUnit XML (for CI)

```bash
npx cypress run --reporter junit --reporter-options "mochaFile=results/test-results.xml"
```

### Mochawesome (HTML report)

```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
npm run report
```

Then open `mochawesome-report/index.html`

---

##  Environment Variables

### Set base URL

```bash
CYPRESS_BASE_URL=https://staging.yes-to-fairplay.com npm test
```

### Set custom timeout

```bash
CYPRESS_defaultCommandTimeout=20000 npm test
```

### Skip specific tests

```bash
CYPRESS_SKIP_SMOKE=true npm test:regression
```

---

## 🧹 Cleanup

### Remove screenshots and videos

```bash
npm run clean
```

### Remove node_modules (fresh install)

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Performance Tips

### Run in parallel (requires Cypress Cloud or Sorry Cypress)

```bash
npm run test:parallel
```

### Run on multiple machines

```bash
# Machine 1
npx cypress run --spec "cypress/e2e/smoke/**/*"

# Machine 2
npx cypress run --spec "cypress/e2e/regression/**/*"
```

### Skip video recording (faster)

```bash
npx cypress run --config video=false
```

---

##  Common Issues

### Issue: Tests timeout

**Solution**: Increase timeout

```bash
npx cypress run --config defaultCommandTimeout=15000,pageLoadTimeout=45000
```

### Issue: Network errors

**Solution**: Add retry

```javascript
// In test
cy.request({ url: "/api/data", retryOnNetworkFailure: true });
```

### Issue: Flaky tests

**Solution**: Enable retry for CI

```javascript
// cypress.config.js
{
  retries: {
    runMode: 2,
    openMode: 0
  }
}
```

### Issue: Element not found

**Solution**: Increase timeout or wait for element

```javascript
cy.get('[data-testid="element"]', { timeout: 10000 }).should("be.visible");
```

---

##  CI/CD Integration

### GitHub Actions

See `.github/workflows/cypress-tests.yml`

### GitLab CI

```yaml
cypress:
  image: cypress/browsers:node18.12.0-chrome107
  script:
    - npm ci
    - npm run test:smoke
```

### Jenkins

```groovy
stage('E2E Tests') {
  steps {
    sh 'npm ci'
    sh 'npm run test:smoke'
  }
}
```

---

## 📞 Need Help?

1. Check [README.md](README.md)
2. Check [ARCHITECTURE.md](ARCHITECTURE.md)
3. Check [Cypress Docs](https://docs.cypress.io)

---

**Happy Testing! **
