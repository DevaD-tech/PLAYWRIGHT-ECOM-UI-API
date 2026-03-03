## Playwright E‑Commerce Automation Framework (UI + API)

This repository contains a **Playwright test framework** for an e‑commerce application, covering both **UI flows** (Sauce Demo) and **API tests** (Rahul Shetty Academy e‑com API).

The goal is to be:
- **Simple and close to real‑world usage**
- **Page Object Model (POM) driven**
- **Easy to plug into CI/CD**

---

### Tech Stack

- **Playwright Test** (`@playwright/test`)
- **JavaScript**
- **Node.js**
- **Page Object Model (POM)**

---

### Project Structure

```text
playwright-ecom-ui-api
│
├── tests
│   ├── ui
│   │   ├── login.spec.js
│   │   ├── product.spec.js
│   │   └── cart.spec.js
│   |   └── checkout.spec.js
│   │
│   └── api
│       ├── auth.api.spec.js
│       ├── addToCart.api.spec.js
│      
│
├── pages
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── test-data
│   ├── users.json
│   └── checkout.json
│   
│
├── utils
│   ├── apiHelper.js
│   ├── testDataUtil.js
│   
│
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md
```

Key conventions:
- **UI tests** use `page` and POM classes from `pages/`.
- **API tests** use the built‑in `request` fixture from Playwright Test.
- Tags like `@smoke` and `@regression` are used for filtering test subsets.

---

### Prerequisites

- **Node.js** 18+ installed
- **npm** (bundled with Node)

Verify:

```bash
node -v
npm -v
```

---

### Installation

From the project root:

```bash
npm install
```

This installs `@playwright/test` and any other dev dependencies from `package.json`.

If Playwright browsers are not installed yet, run:

```bash
npx playwright install
```

---

### Playwright Configuration

The core configuration lives in `playwright.config.js`:

- `testDir: './tests'` – all tests live under `tests/`.
- `use.baseURL: 'https://www.saucedemo.com'` – base URL for UI tests.
- `use.headless: true` – runs in headless mode by default.
- `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'` – helpful for debugging.
- `reporter: [['html'], ['list']]` – list + HTML report.

You can override most of these with CLI flags if needed (e.g. `--headed`). 

---

### NPM Scripts

Defined in `package.json`:

- **`npm test`**: run **all** tests (UI + API)
  ```bash
  npm test
  ```

- **`npm run test:ui`**: run only **UI tests** (`tests/ui`)
  ```bash
  npm run test:ui
  ```

- **`npm run test:api`**: run only **API tests** (`tests/api`)
  ```bash
  npm run test:api
  ```

- **`npm run test:smoke`**: run tests tagged with `@smoke`
  ```bash
  npm run test:smoke
  ```

- **`npm run test:regression`**: run tests tagged with `@regression`
  ```bash
  npm run test:regression
  ```

- **`npm run report`**: open the last generated **HTML report**
  ```bash
  npm run report
  ```

---

### Running Example Tests

- **UI – Cart flow example**
  - Logs in via `LoginPage`
  - Adds items using `ProductsPage`
  - Verifies cart contents via `CartPage`
  - Completes checkout with `CheckoutPage`

- **API – Authentication example**
  - Sends a `POST` request to `https://rahulshettyacademy.com/api/ecom/auth/login`
  - Asserts `status === 200`
  - Validates token presence and success message

You can run all of the above with:

```bash
npm test
```

---

### HTML Report

After a test run, open the HTML report with:

```bash
npm run report
```

This launches Playwright’s interactive report viewer in your browser so you can inspect runs, traces, screenshots, and videos.

---

### Running in Headed Mode / Debugging

To observe UI tests in a real browser:

```bash
npx playwright test tests/ui --headed
```

To use Playwright’s built‑in debug UI:

```bash
npx playwright test tests/ui --debug
```

---

### CI/CD Notes

This project is designed to be CI‑friendly:

- Single command to install dependencies: `npm install`
- Deterministic test commands (`npm test`, `npm run test:ui`, `npm run test:api`, etc.)
- HTML report artifact via `playwright show-report`

You can plug these commands directly into your CI workflow (GitHub Actions, Azure DevOps, GitLab CI, etc.).

---

### Extending the Framework

- **Add new UI flows**:
  - Create or extend POMs in `pages/`.
  - Add new specs under `tests/ui/` and reuse existing page objects.

- **Add new API tests**:
  - Create additional `*.api.spec.js` files in `tests/api/`.
  - Use the `request` fixture for HTTP calls and keep assertions close to business expectations.

Keep tests small, focused, and tagged (`@smoke`, `@regression`, etc.) to maintain fast feedback cycles.
