# FairPlay Test Architecture 🏗️

## Senior QA Automation Strategy

This document explains the **senior-level decisions** behind this test automation framework.

---

##  Design Philosophy

### 1. Stability Over Speed

**Problem**: Flaky tests = lost trust  
**Solution**:

- Smart wait strategies (network + DOM)
- Flexible selectors (data-testid → aria-label → content)
- Retry logic ONLY where appropriate
- Animation disabling

### 2. Maintainability Over Coverage

**Problem**: 1000 tests, all break on minor UI change  
**Solution**:

- Centralized selectors (`support/selectors/`)
- Reusable commands (`cy.visitHomepage()`)
- Fixtures for test data (JSON, not hardcoded)
- Page Objects for complex flows ONLY

### 3. Fast Feedback Over Exhaustive Testing

**Problem**: 2-hour test suite → nobody runs it  
**Solution**:

- Smoke suite: 6 tests, <10 min → Run on every PR
- Regression suite: 100+ tests, ~45 min → Nightly
- Tag-based execution (`@smoke`, `@critical`, `@slow`)

---

##  Test Pyramid

```
Integration (10%) ← Smoke tests, critical path
    ↓
UI E2E (20%) ← Cypress tests (user flows)
    ↓
API Tests (70%) ← Backend validation (future)
```

**Why this ratio?**

- API tests are **fast, stable, cheap**
- UI tests are **slow, flaky, expensive**
- Balance = comprehensive coverage without maintenance hell

---

## 🧩 Architecture Components

### 1. Commands (`support/commands/`)

**Purpose**: Reusable actions across tests

**Types**:

- **Common**: `cy.dismissCookieBanner()`, `cy.waitForPageLoad()`
- **Navigation**: `cy.visitHomepage()`, `cy.scrollToPricing()`
- **Domain-specific**: `cy.visitWithReferral(code)`

**When to create a command?**

- Used in 3+ tests
- Multi-step action (login, checkout)
- Complex logic (retry, conditional)

**When NOT to create a command?**

- One-off action → inline it
- Simple action → use native Cypress

---

### 2. Helpers (`support/helpers/`)

**Purpose**: Pure functions for logic

**Examples**:

- `generateUniqueEmail()` → Test data
- `waitForStableElement(selector)` → Wait strategy
- `logTestInfo(message)` → Logging

**Why separate from commands?**

- Testable (pure functions)
- No Cypress dependency
- Reusable in other tools (Playwright, Puppeteer)

---

### 3. Selectors (`support/selectors/`)

**Purpose**: Centralized selector management

**Strategy** (priority order):

1. `[data-testid="buy-button"]` ← Best (semantic)
2. `[aria-label="Purchase"]` ← Good (accessibility)
3. `button:contains("Buy")` ← Acceptable (content-based)
4. `.btn-primary` ← Last resort (class-based)

**Why centralize?**

- UI change → update 1 file, not 50 tests
- Consistency across team
- Easy to audit

---

### 4. Fixtures (`fixtures/`)

**Purpose**: Static test data

**Examples**:

- `plans.json` → Pricing, plan details
- `countries.json` → Coverage data
- `test-users.json` → Pre-seeded users (future)

**Why JSON over hardcoded?**

- Easy to update without touching tests
- Shareable with backend team
- Version controlled

---

### 5. Page Objects (`support/pages/`)

**Current Status**: Not used yet (intentional)

**When to use**:

- Multi-step wizards (purchase flow)
- Complex dashboards (account page)
- Same page used in 5+ tests

**When NOT to use**:

- Simple pages (login = 2 fields, 1 button → command is enough)
- One-off tests

**Hybrid approach** (this project):

- Commands for simple actions
- Page Objects for complex flows (when needed)

---

## 🔄 Wait Strategies

### Problem: Flaky tests from timing issues

### Solution: **Zero hard sleeps**

####  BAD: Hard sleep

```javascript
cy.wait(5000); // What if it takes 6 seconds? Or 2 seconds?
```

####  GOOD: Wait for condition

```javascript
// Wait for DOM element
cy.get('[data-testid="result"]', { timeout: 10000 }).should("be.visible");

// Wait for network request
cy.intercept("POST", "/api/purchase").as("purchase");
cy.wait("@purchase").its("response.statusCode").should("eq", 200);

// Wait for URL change
cy.url().should("include", "/confirmation");

// Wait for stable DOM
cy.waitForNetworkIdle();
```

---

##  Selector Strategy

### Problem: Tests break on UI redesign

### Solution: **Flexible selector hierarchy**

#### Priority (best → worst):

1. **`data-testid`** ← Semantic purpose, never changes

   ```javascript
   cy.get('[data-testid="checkout-button"]');
   ```

2. **`aria-label` / `role`** ← Accessibility (stable)

   ```javascript
   cy.get('[aria-label="Close modal"]');
   cy.get('[role="dialog"]');
   ```

3. **Content-based** ← Works with i18n (flexible)

   ```javascript
   cy.contains(/check.*destination/i);
   ```

4. **Unique ID** ← If persistent (not dynamic)

   ```javascript
   cy.get("#payment-form");
   ```

5. **CSS classes** ← Last resort (brittle)
   ```javascript
   cy.get(".btn-primary"); // Can change with redesign
   ```

####  NEVER use:

- XPath (slow, brittle)
- Nested selectors (`.header > nav > ul > li:nth-child(3)`)
- Dynamic IDs (`#user-1234567890`)

---

## 🔁 Retry Strategy

### When to retry:

- **Intermittent network issues** (API timeout)
- **Known flaky external dependency** (payment gateway)

### When NOT to retry:

- **Hard failures** (payment declined, validation error)
- **Test data issues** (user already exists)
- **Wrong selectors** (element doesn't exist)

### Implementation:

```javascript
// Cypress auto-retries assertions (4s default)
cy.get('[data-testid="result"]').should("be.visible"); //  Auto-retry

// Cypress DOES NOT auto-retry actions
cy.get('[data-testid="button"]').click(); //  No retry

// Custom retry for actions
Cypress.Commands.add("clickWithRetry", (selector, retries = 3) => {
  // Implementation in commands/common-commands.js
});
```

### Global retry (Cypress 12+):

```javascript
// cypress.config.js
{
  retries: {
    runMode: 2,    // CI: retry failed tests 2x
    openMode: 0    // Local: no retry (fast debugging)
  }
}
```

---

##  Test Data Strategy

### Problem: Tests interfere with each other (parallel execution)

### Solution: **Unique data per test**

#### Pattern 1: Generate unique data

```javascript
const email = `test-${Date.now()}-${Math.random()
  .toString(36)
  .substr(2, 5)}@fairplay-qa.com`;
```

#### Pattern 2: Partition data by worker

```javascript
// CI gives you WORKER_INDEX (0, 1, 2, 3...)
const workerId = Cypress.env("WORKER_INDEX") || "0";
const email = `test-worker-${workerId}@fairplay-qa.com`;
```

#### Pattern 3: Setup/Cleanup via API

```javascript
beforeEach(() => {
  // Create fresh user via API
  cy.request("POST", "/api/test/seed-user", { email: generateUniqueEmail() });
});

afterEach(() => {
  // Cleanup
  cy.request("DELETE", "/api/test/cleanup-user");
});
```

---

## 🏷️ Tagging Strategy

### Tags for flexible execution

```javascript
describe("Purchase Flow", { tags: ["@smoke", "@critical", "@payment"] }, () => {
  // Tests...
});
```

### Tag definitions:

| Tag           | Meaning             | When to run                   |
| ------------- | ------------------- | ----------------------------- |
| `@smoke`      | Critical path, fast | Every PR, every deploy        |
| `@regression` | Full suite          | Nightly, pre-release          |
| `@critical`   | Must-pass           | Before deploy to production   |
| `@slow`       | Tests >30s          | Nightly only                  |
| `@payment`    | Payment-related     | When payment gateway changed  |
| `@referral`   | Referral tracking   | When referral feature changed |
| `@wip`        | Work in progress    | Not in CI                     |

### Execution:

```bash
# Run by tag (Cypress 10+)
npx cypress run --env grepTags=@smoke

# Multiple tags
npx cypress run --env grepTags="@smoke+@critical"
```

---

##  Parallel Execution

### Problem: 100 tests, 50 minutes → too slow

### Solution: **Run in parallel**

#### Option 1: Cypress Cloud

```bash
# 4 machines in parallel
npx cypress run --parallel --record --key YOUR_KEY
```

#### Option 2: Sorry Cypress (self-hosted)

```bash
# Free alternative to Cypress Cloud
npm install -g @sorry-cypress/director
sorry-cypress start
```

#### Data isolation for parallel:

- **Unique test data per worker** (timestamp + worker ID)
- **Separate test accounts** (test-worker-0, test-worker-1...)
- **API cleanup** (delete only your own data)

---

##  Debugging Strategy

### When test fails:

#### 1. Check screenshot

```
cypress/screenshots/test-name (failed).png
```

#### 2. Watch video

```
cypress/videos/test-name.mp4
```

#### 3. Check logs

```javascript
// Custom logging
cy.task("log", "Debug info here");

// Network logs
cy.intercept("**/*", (req) => {
  cy.task("log", `${req.method} ${req.url}`);
});
```

#### 4. Interactive debugging

```javascript
cy.pause(); // Pause test at this point
cy.debug(); // Open DevTools debugger
```

#### 5. Is it a bug or flaky test?

**Decision tree**:

- Failed first time ever? → Likely **bug**
- Failed 100% of time? → Definite **bug**
- Failed intermittently? → Likely **flaky test** (improve wait strategy)
- Failed in CI, passed locally? → **Environment issue** (viewport, timezone, etc.)

---

##  CI/CD Integration

### Stages:

```
PR → Smoke tests (8 min) → Merge
↓
Staging deploy → Smoke tests → Critical tests (15 min)
↓
Nightly → Full regression (45 min)
↓
Pre-production → Full regression + slow tests (60 min)
```

### Example GitHub Actions:

```yaml
on:
  pull_request:
    jobs:
      smoke:
        run: npm run test:smoke

  schedule:
    - cron: '0 2 * * *' # 2 AM daily
    jobs:
      regression:
        run: npm run test:regression
```

---

## 🎓 Senior Insights

### 1. Don't test everything in UI

**Example**: Testing 100 edge cases for password validation

-  Bad: 100 Cypress tests (slow, brittle)
-  Good: 1 Cypress test (happy path) + 99 API/unit tests (fast)

### 2. Test user flows, not pages

**Example**: Purchase flow

-  Bad: Test each page individually
-  Good: Test end-to-end journey (select plan → payment → confirmation)

### 3. Fail fast, fail clear

**Example**: Test fails at step 5 of 10

-  Bad: Generic error "Element not found"
-  Good: "Expected payment status 'success' but got 'pending' at step 5"

### 4. No test is better than a flaky test

**Why?**

- Flaky test = 0% trust
- Developers ignore failures
- Test suite becomes useless

**Solution**:

- Fix flaky tests immediately
- Or delete them until you can fix

---

## 🔮 Future Enhancements

When APIs/test environment available:

1. **API tests** (70% of coverage)

   - Endpoint validation
   - Business logic
   - Error handling

2. **Visual regression** (Percy, Applitools)

   - Screenshot comparison
   - Catch unintended UI changes

3. **Performance tests** (Lighthouse CI)

   - Page load time
   - Core Web Vitals
   - Accessibility scores

4. **Security tests** (ZAP, Burp)
   - XSS, CSRF, SQL injection
   - Authentication bypass
   - Sensitive data exposure

---

**Built for scale. Designed for stability. Optimized for speed.**

 **Senior QA Automation at its finest.**
