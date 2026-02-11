#  Pregled Svih Testova - FairPlay Cypress

Kompletna lista testova i šta svaki proverava.

---

## 🔥 SMOKE TESTS (6 suites, ~8 min)

**Cilj**: Brza provera kritičnih funkcionalnosti  
**Kada pokrenuti**: Svaki deploy, svaki PR  
**Komanda**: `npm run test:smoke`

---

### 1. Homepage Load (`01-homepage-load.cy.js`)

**Lokacija**: `cypress/e2e/smoke/01-homepage-load.cy.js`  
**Trajanje**: ~30s  
**Testova**: 9

| Test                                                      | Šta proverava                                                        | Zašto je važno                          |
| --------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------- |
| `should load homepage successfully`                       | Homepage se učitava, URL je tačan, body je vidljiv                   | Osnovna provera da sajt radi            |
| `should display hero section with main heading`           | H1 heading postoji i sadrži "FAIRPLAY" ili "MOBILE DATA"             | Glavni hero banner je vidljiv           |
| `should display FairPlay Flex pricing section`            | Flex pricing (6/12/24 meseca) je prikazan sa cenama (€35, €30, €25)  | Flex proizvodi su dostupni              |
| `should display Day Passes pricing section`               | Day Pass pricing (3/7/14 dana) je prikazan sa cenama (€25, €50, €75) | Day Pass proizvodi su dostupni          |
| `should display "Check Your Destination" CTA`             | CTA za proveru destinacije postoji                                   | Korisnik može da proveri coverage       |
| `should display "Check Phone Compatibility" CTA`          | CTA za proveru telefona postoji                                      | Korisnik može da proveri kompatibilnost |
| `should display coverage information (135+ destinations)` | "135+" tekst je vidljiv                                              | Coverage info je jasan                  |
| `should display key USPs`                                 | USP-ovi su vidljivi (Unlimited, One eSIM, No Waste)                  | Value proposition je jasan              |
| `should have no console errors on page load`              | Nema JavaScript greški u konzoli                                     | Tehnička stabilnost                     |

---

### 2. Navigation (`02-navigation.cy.js`)

**Lokacija**: `cypress/e2e/smoke/02-navigation.cy.js`  
**Trajanje**: ~20s  
**Testova**: 9

| Test                                        | Šta proverava                                                          | Zašto je važno                |
| ------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------- |
| `should display header/navigation`          | Header ili nav element postoji i vidljiv je                            | Osnovna navigacija radi       |
| `should display header branding/logo`       | Header ima logo, img, svg ili branding element                         | Branding je prisutan          |
| `should have Account Login link`            | "Account Login" link postoji i ima href                                | Korisnik može da se uloguje   |
| `should have Help Center link`              | Link sa `/help-center` postoji                                         | Korisnik može da dobije pomoć |
| `should display footer`                     | Footer element postoji                                                 | Footer je prisutan            |
| `should have legal links in footer`         | Imprint, Privacy, Terms linkovi postoje                                | Legal compliance              |
| `should have app download links`            | App Store i Google Play linkovi postoje i validni su                   | Korisnik može da preuzme app  |
| `should have social media links`            | Bar jedan social link postoji (Facebook, Twitter, Instagram, LinkedIn) | Social presence               |
| `should scroll to pricing section smoothly` | Scroll do pricing-a radi bez grešaka                                   | UX je dobar                   |

---

### 3. Pricing Display (`03-pricing-display.cy.js`)

**Lokacija**: `cypress/e2e/smoke/03-pricing-display.cy.js`  
**Trajanje**: ~25s  
**Testova**: 11

#### FairPlay Flex Pricing

| Test                                                   | Šta proverava                       | Zašto je važno     |
| ------------------------------------------------------ | ----------------------------------- | ------------------ |
| `should display 6-month Flex plan with correct price`  | 6-month plan prikazan sa €35/month  | Cena je tačna      |
| `should display 12-month Flex plan with correct price` | 12-month plan prikazan sa €30/month | Cena je tačna      |
| `should display 24-month Flex plan with correct price` | 24-month plan prikazan sa €25/month | Cena je tačna      |
| `should display Flex plan starting data (5 GB)`        | "5 GB" start data je prikazan       | Data info je jasan |

#### Day Passes Pricing

| Test                                            | Šta proverava                | Zašto je važno |
| ----------------------------------------------- | ---------------------------- | -------------- |
| `should display 3-day pass with correct price`  | 3-day pass prikazan sa €25   | Cena je tačna  |
| `should display 7-day pass with correct price`  | 7-day pass prikazan sa €50   | Cena je tačna  |
| `should display 14-day pass with correct price` | 14-day pass prikazan sa €75  | Cena je tačna  |
| `should display "unlimited" for day passes`     | "Unlimited" tekst je vidljiv | USP je jasan   |

#### Pricing Details

| Test                                     | Šta proverava             | Zašto je važno         |
| ---------------------------------------- | ------------------------- | ---------------------- |
| `should mention 135+ destinations`       | "135+" tekst postoji      | Coverage je jasan      |
| `should mention 5G premium connectivity` | "5G" tekst postoji        | Speed info je jasan    |
| `should mention free global eSIM`        | "free eSIM" tekst postoji | Dodatna vrednost jasna |

---

### 4. Responsive Design (`04-responsive-design.cy.js`)

**Lokacija**: `cypress/e2e/smoke/04-responsive-design.cy.js`  
**Trajanje**: ~60s  
**Testova**: 15 (5 testova × 3 device-a)

#### Testovi za svaki device (Mobile, Tablet, Desktop):

| Test                                   | Šta proverava               | Zašto je važno           |
| -------------------------------------- | --------------------------- | ------------------------ |
| `should display hero section`          | Hero je vidljiv na device-u | Layout je dobar          |
| `should display pricing cards`         | Pricing je vidljiv          | Proizvodi su dostupni    |
| `should have clickable CTAs`           | CTA dugmad su klikabla      | Korisnik može da nastavi |
| `should not have horizontal scrollbar` | Nema horizontal scroll-a    | UX je čist               |
| `should display footer`                | Footer je vidljiv           | Kompletan layout         |

#### Mobile-Specific Tests:

| Test                                    | Šta proverava                         | Zašto je važno       |
| --------------------------------------- | ------------------------------------- | -------------------- |
| `should have mobile navigation`         | Hamburger menu ili mobile nav postoji | Mobile UX            |
| `should stack pricing cards vertically` | Pricing cards su vertikalno na mobile | Layout je prilagođen |

**Devices testirana**:

- 📱 Mobile (iPhone SE): 375x667
- 📱 Tablet (iPad): 768x1024
- 🖥️ Desktop: 1920x1080

---

### 5. External Links (`05-external-links.cy.js`)

**Lokacija**: `cypress/e2e/smoke/05-external-links.cy.js`  
**Trajanje**: ~15s  
**Testova**: 6

| Test                                                      | Šta proverava                                                   | Zašto je važno                    |
| --------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------- |
| `should have valid App Store link`                        | Link sadrži `apps.apple.com` i postoji                          | iOS users mogu da preuzmu app     |
| `should have valid Google Play link`                      | Link sadrži `play.google.com` i postoji                         | Android users mogu da preuzmu app |
| `should have external links open in new tab`              | App Store/Google Play linkovi imaju `target="_blank"`           | UX - ne napuštaju sajt            |
| `should have valid social media links`                    | Social linkovi (Facebook, Twitter, Instagram, LinkedIn) postoje | Social presence                   |
| `should have rel="noopener noreferrer" on external links` | External linkovi imaju security attributes                      | Security best practice            |
| `should verify Help Center link is accessible`            | Help Center link postoji i ima href                             | Korisnik može da dobije pomoć     |

---

### 6. Page Performance (`06-page-performance.cy.js`)

**Lokacija**: `cypress/e2e/smoke/06-page-performance.cy.js`  
**Trajanje**: ~20s  
**Testova**: 6

| Test                                           | Šta proverava                                  | Zašto je važno           |
| ---------------------------------------------- | ---------------------------------------------- | ------------------------ |
| `should load homepage within 5 seconds`        | Page load < 5 sekundi                          | Performance              |
| `should have all critical images loaded`       | Sve slike učitane (naturalWidth > 0)           | Nema broken images       |
| `should not have layout shifts (CLS check)`    | Layout ne skače tokom učitavanja               | UX stability             |
| `should have proper meta tags for SEO`         | Title, description, viewport meta tags postoje | SEO & accessibility      |
| `should not have JavaScript errors in console` | Nema JS errors                                 | Tehnička kvaliteta       |
| `should have proper caching headers`           | Static resursi imaju cache-control headers     | Performance optimization |

---

##  REGRESSION TESTS (5 suites, ~20-30 min)

**Cilj**: Detaljna provera svih funkcionalnosti  
**Kada pokrenuti**: Nightly builds, pre release-a  
**Komanda**: `npm run test:regression`

---

### 1. Referral Tracking (`referral/referral-tracking.cy.js`)

**Lokacija**: `cypress/e2e/regression/referral/referral-tracking.cy.js`  
**Trajanje**: ~5 min  
**Testova**: 8

| Test                                                  | Šta proverava                                             | Zašto je važno          |
| ----------------------------------------------------- | --------------------------------------------------------- | ----------------------- |
| `should capture referral code from URL parameter`     | `?ref=CODE` se čuva u cookie/localStorage                 | Referral tracking radi  |
| `should persist referral code across page navigation` | Referral code ostaje posle navigacije                     | Tracking je stabilan    |
| `should handle multiple referral code formats`        | `?ref`, `?referral`, `?code` parametri rade               | Fleksibilnost           |
| `should not override existing referral code`          | Drugi ref code ne overwrite-uje prvi                      | First-touch attribution |
| `should expire referral cookie after X days`          | Cookie ima expiry datum (>7 dana)                         | Data retention policy   |
| `should handle invalid referral codes gracefully`     | XSS, path traversal, dugački kodovi ne break-uju stranicu | Security                |
| `should track referral code case-insensitively`       | `FrIeNd123`, `FRIEND123`, `friend123` tretiraju se isto   | User-friendly           |

**Test data**: Generisani unique referral kodovi

---

### 2. Affiliate Tracking (`referral/affiliate-tracking.cy.js`)

**Lokacija**: `cypress/e2e/regression/referral/affiliate-tracking.cy.js`  
**Trajanje**: ~5 min  
**Testova**: 7

| Test                                                       | Šta proverava                                       | Zašto je važno          |
| ---------------------------------------------------------- | --------------------------------------------------- | ----------------------- |
| `should capture affiliate ID from URL parameter`           | `?aff=ID` se čuva u cookie/localStorage             | Affiliate tracking radi |
| `should persist affiliate ID across page navigation`       | Affiliate ID ostaje posle navigacije                | Tracking je stabilan    |
| `should handle both referral and affiliate simultaneously` | `?ref=X&aff=Y` - oba se čuvaju                      | Multi-attribution       |
| `should track affiliate with utm parameters`               | UTM parametri se trackiraju zajedno sa affiliate ID | Marketing analytics     |
| `should expire affiliate cookie after X days`              | Cookie ima expiry (>30 dana)                        | Industry standard       |
| `should handle affiliate ID formats`                       | Alphanumeric, hyphens, underscores - sve radi       | Fleksibilnost           |
| `should sanitize malicious affiliate IDs`                  | XSS/injection kodovi se blokiraju                   | Security                |

**Test data**: Generisani unique affiliate ID-evi

---

### 3. Contact Form Validation (`forms/contact-form.cy.js`)

**Lokacija**: `cypress/e2e/regression/forms/contact-form.cy.js`  
**Trajanje**: ~3 min  
**Testova**: 5

| Test                                                | Šta proverava                                | Zašto je važno          |
| --------------------------------------------------- | -------------------------------------------- | ----------------------- |
| `should display contact form`                       | Forma postoji (ako je dostupna)              | User može da kontaktira |
| `should validate email field (invalid email)`       | Client-side validacija radi za invalid email | UX                      |
| `should require email field (empty submission)`     | Required polja se validiraju                 | Data quality            |
| `should accept valid email format`                  | Valid email prolazi validaciju               | Funkcionalna forma      |
| `should have proper input labels for accessibility` | Input fields imaju labels ili aria-label     | Accessibility           |

**Napomena**: Client-side validacija SAMO (bez submit-a jer nema test backend)

---

### 4. Phone Compatibility Checker (`compatibility/phone-check.cy.js`)

**Lokacija**: `cypress/e2e/regression/compatibility/phone-check.cy.js`  
**Trajanje**: ~3 min  
**Testova**: 5

| Test                                               | Šta proverava                                           | Zašto je važno             |
| -------------------------------------------------- | ------------------------------------------------------- | -------------------------- |
| `should have "Check Phone Compatibility" CTA`      | CTA je vidljiv i klikabilan                             | User može da proveri       |
| `should open phone compatibility checker on click` | Modal/page se otvara                                    | Funkcionalnost je dostupna |
| `should display phone brands list`                 | Lista brendova postoji (Apple, Samsung, Google, Xiaomi) | User može da bira          |
| `should validate compatible phone`                 | Kompatibilni telefon prolazi proveru                    | Funkcionalna validacija    |
| `should have link to compatible devices list`      | Link ka kompletnoj listi postoji                        | Additional info            |

**Test data**: iPhone 14 Pro (compatible), iPhone 6 (incompatible)

---

### 5. Destination Coverage Checker (`compatibility/destination-check.cy.js`)

**Lokacija**: `cypress/e2e/regression/compatibility/destination-check.cy.js`  
**Trajanje**: ~3 min  
**Testova**: 6

| Test                                                      | Šta proverava                                      | Zašto je važno       |
| --------------------------------------------------------- | -------------------------------------------------- | -------------------- |
| `should have "Check Destination" CTA`                     | CTA je vidljiv                                     | User može da proveri |
| `should display coverage information (135+ destinations)` | "135+" info je prikazan                            | Coverage je jasan    |
| `should open destination checker on click`                | Modal/search se otvara                             | Funkcionalnost radi  |
| `should have coverage map or list visible`                | Mapa ili lista zemalja postoji                     | Visualization        |
| `should display key European countries in coverage`       | Germany, France, Italy, Spain, Croatia su navedeni | Main markets         |
| `should mention global coverage`                          | USA, Canada, Australia, Japan su navedeni          | Global reach         |

**Test data**: 135+ destinations

---

## ⏳ PREPARED FOR FUTURE (Templates)

Ovi testovi su **spremni kao templates** ali čekaju test environment/backend.

---

### Login Flow (`templates/login-flow.cy.js.template`)

**Status**: ⏳ Template ready  
**Potrebno**: Test environment sa login funkcijom

| Test (planned)                                 | Šta će proveravati      |
| ---------------------------------------------- | ----------------------- |
| `should login with valid credentials`          | User može da se uloguje |
| `should show error with invalid email`         | Error handling radi     |
| `should show error with wrong password`        | Security validation     |
| `should require email field`                   | Client-side validation  |
| `should require password field`                | Client-side validation  |
| `should have "Forgot Password" link`           | Password reset dostupan |
| `should have "Register" link`                  | Registration dostupna   |
| `should redirect to previous page after login` | Deep linking radi       |
| `should persist session across page refresh`   | Session management      |
| `should logout successfully`                   | Logout radi             |

---

### Purchase Flow (`templates/purchase-flow.cy.js.template`)

**Status**: ⏳ Template ready  
**Potrebno**: Test environment + payment gateway

| Test (planned)                                   | Šta će proveravati                   |
| ------------------------------------------------ | ------------------------------------ |
| `should purchase 6-month Flex plan successfully` | End-to-end purchase radi             |
| `should purchase 7-day pass successfully`        | Day Pass purchase radi               |
| `should handle payment declined gracefully`      | Error handling za failed payment     |
| `should apply referral discount at checkout`     | Referral integration radi            |
| `should validate credit card number format`      | Client-side validation               |
| `should prevent double payment submission`       | Security - prevent duplicate charges |
| `should display order summary before payment`    | UX - clear pricing                   |

---

##  Test Coverage Summary

| Kategorija             | Testova        | Status       | Runtime     |
| ---------------------- | -------------- | ------------ | ----------- |
| **Smoke Tests**        | ~55 tests      |  Ready     | 8 min       |
| **Regression Tests**   | ~31 tests      |  Ready     | 20-30 min   |
| **Templates (Future)** | ~17 tests      | ⏳ Template  | TBD         |
| **UKUPNO**             | **~103 tests** | **86 ready** | **~30 min** |

---

##  Execution Strategy

### Daily (Every PR):

```bash
npm run test:smoke  # 8 min, 55 tests
```

### Nightly:

```bash
npm run test:regression  # 30 min, 31 tests
```

### Pre-Release:

```bash
npm test  # All tests
```

### Specific:

```bash
npm run test:referral      # Referral tests only
npm run test:affiliate     # Affiliate tests only
npm run test:compatibility # Compatibility tests
```

---

##  Test Data

### Fixtures Used:

- `plans.json` - Flex & Day Pass pricing
- `countries.json` - Coverage data
- `test-users.json` - Test accounts (prepared)
- `test-cards.json` - Payment test cards (prepared)

### Dynamic Data:

- Unique emails: `test-${Date.now()}@fairplay-qa.com`
- Unique referral codes: `REF${timestamp}`
- Unique affiliate IDs: `aff-${timestamp}-${random}`

---

##  Maintenance

### Kako dodati novi test:

1. **Smoke test** (kritično za biznis):

   ```bash
   # Dodaj u cypress/e2e/smoke/
   cypress/e2e/smoke/07-new-critical-test.cy.js
   ```

2. **Regression test** (detaljna provera):

   ```bash
   # Dodaj u cypress/e2e/regression/<category>/
   cypress/e2e/regression/purchase/payment-methods.cy.js
   ```

3. **Update ovaj dokument** sa opisom testa

---

**Last Updated**: Feb 3, 2026  
**Total Tests**: 86 ready, 17 templates  
**Maintainer**: Senior QA Team
