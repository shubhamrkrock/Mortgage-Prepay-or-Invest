# 🏠 Mortgage Strategy Simulator

**Prepay • Invest • Hybrid** — Compare all three strategies side-by-side, post-tax and inflation-adjusted.

> _While repaying a mortgage — should you Prepay, Invest, or do Both?_

🔗 **[Live Demo →](https://shubhamrkrock.github.io/mortgage-strategy-simulator/)**

---

## What It Does

Most mortgage calculators tell you how much interest you save by prepaying. This tool goes further — it shows you the **net worth outcome** of three complete strategies over the life of your loan, so you can make a genuinely informed decision:

| Strategy | What happens to your extra monthly cash |
|---|---|
| **Full Prepay** 🏠 | All extra cash reduces the principal. Loan closed early, then you invest EMI + extra. |
| **Full Invest** 📈 | Loan runs its full term. Extra cash invested from month 1. |
| **Hybrid** ⚖️ | You split the extra cash — part prepays, part invests. You control the ratio. |

Every result is **post capital-gains-tax** and **inflation-adjusted** to today's purchasing power.

---

## Features

### 📊 Five Chart Views
- **Net Worth** — Nominal and real (inflation-adjusted) bar chart for all three strategies
- **Composition** — Horizontal stacked bar: principal deployed vs. net after-tax returns
- **Breakdown** — Capital deployed vs. after-tax compounding gains per strategy
- **Interest Paid** — Total interest cost per strategy (lower is better)
- **NW Growth** — Post-tax, year-by-year net worth curves with loan-close markers

### 🏆 Smart Rankings
- Strategies are automatically ranked #1 / #2 / #3 by nominal net worth
- The winner gets a **Best** badge with strategy-colored highlight
- The decision banner explains *why* a strategy wins at your specific inputs

### 🎛️ Fully Configurable Inputs
- Outstanding loan amount
- Annual interest rate (1–20%)
- Loan tenure (years + months)
- Extra monthly cash available (min $0)
- Expected investment CAGR (1–100%)
- Tax rate on investment returns (0–40%)
- Inflation rate (0–50%)
- Hybrid split ratio (10/90 to 90/10)

### 📋 Detailed Breakdown Table
Side-by-side comparison of nominal net worth, real net worth, loan close date, interest paid, capital deployed, months freed, and cross-strategy deltas.

### 💡 Beyond the Numbers
Qualitative analysis of financial and psychological pros/cons for each strategy — ranked by impact/severity — because the best decision isn't always the highest number.

---

## How to Use

### Option A — Use the hosted version
Visit the live link above. No install, no sign-in.

### Option B — Run locally
```bash
git clone https://github.com/shubhamrkrock/mortgage-strategy-simulator.git
cd mortgage-strategy-simulator
# Just open the file — no build step needed
open mortgage-strategy-simulator.html
```

It's a single self-contained HTML file with no server-side dependencies.

---

## Hosting on GitHub Pages

1. Push `mortgage-strategy-simulator.html` to the root of your repo (rename to `index.html` if you want the root URL to serve it directly)
2. Go to **Settings → Pages → Source** and set branch `main`, folder `/root`
3. GitHub will publish it at `https://<your-username>.github.io/<repo-name>/`

---

## Technical Notes

- **Zero dependencies installed** — Chart.js v4.4.3 is loaded via CDN (jsDelivr)
- **Pure vanilla JS** — no framework, no bundler, no build step
- **Finance engine** — EMI via annuity formula, FV via standard compound-interest formulas, matching Excel `PMT` / `NPER` / `FV` behavior
- **Tax model** — capital gains tax applied annually to investment returns (not deferred to exit)
- **Inflation model** — nominal future values discounted to present value using the inflation rate over the full tenure

---

## Disclaimer

Results are estimates for **educational purposes only**. Past market returns do not guarantee future performance. This tool does not constitute financial advice. Consult a qualified financial advisor before making investment or mortgage decisions.

---

## Author

Built by **Shubham Kumar**

- 💼 [LinkedIn](https://www.linkedin.com/in/shubhamrkrock/)
- 📸 [Instagram](https://www.instagram.com/shubhamrkrock/)

---

## License

MIT — free to use, fork, and adapt with attribution.
