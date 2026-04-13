# 🧮 Mortgage Strategy Simulator

**Prepay · Invest · Hybrid** — Compare all three strategies side-by-side, post-tax and inflation-adjusted.

> _While repaying a mortgage — should you Prepay, Invest, or do Both?_

🔗 **[Live Demo →](https://shubhamrkrock.github.io/Mortgage-Prepay-or-Invest/)**

---

## What It Does

Most mortgage calculators tell you how much interest you save by prepaying. This tool goes further — it shows you the **net worth outcome** of three complete strategies over the life of your loan, with post-capital-gains-tax and inflation-adjusted results, so you can make a genuinely informed decision.

| Strategy | What happens to your extra monthly cash |
|---|---|
| **Full Prepay** 🏠 | All extra cash reduces principal each month. Loan closes early. Freed EMI + extra reinvested for remaining months. |
| **Full Invest** 📈 | Loan runs its full natural term. 100% of extra cash invested from month 1. EMI hike increment also goes to portfolio. |
| **Hybrid** ⚖️ | Extra cash split by a user-controlled slider — part prepays, part invests. Post-close, all freed cash reinvests. |

Every result is **post capital-gains-tax** (applied year-by-year) and features an **inflation-adjusted Present Value** so you can compare across strategies on equal footing.

---

---

## Features

### 🎛️ Inputs — 11 Parameters, 3 Sections

**Loan Parameters**
- Outstanding loan amount (with currency prefix)
- Annual interest rate — slider + number + stepper
- Loan tenure — years + months (two fields)

**Optimisation Levers**
- Extra monthly cash — with optional annual step-up %
- Extra EMIs per year — lump-sum bonus payment once a year, applied directly to principal
- EMI Hike % per year — gradually increases the monthly payment each year; hike increment goes to principal (Prepay/Hybrid) or portfolio (Invest)
- Hybrid split — slider with live "60% / 40%" label

**Market & Tax Assumptions**
- Expected investment CAGR — slider + number + stepper
- Inflation rate — slider + number + stepper
- Tax on investment returns — slider + number + stepper

All sliders show **live-value labels** above the input and all number inputs have ▲/▼ steppers for keyboard/touch fine-tuning.

---

### 🏆 Decision Banner + Three Strategy Cards

**Decision Banner** — live recommendation with plain-English reason and emoji icon.

**Each strategy card shows:**
- Nominal Net Worth (post-tax) — primary figure
- Present Value (inflation-discounted) — sub-label with tooltip
- Strategy-specific stats: Loan closes in · Interest saved / Capital invested / Months freed · vs other strategies
- Best badge + colour-ring glow on the winning card

---

### 📊 Visual Comparison — 4 Chart Tabs

Open by default. Chart.js 4.4.3. Tabs:

| Tab | Type | What it shows |
|---|---|---|
| **NW Growth** | Line | Year-by-year post-tax net worth for all 3 strategies. Dashed vertical lines mark each strategy's loan-close month. |
| **Net Worth** | Grouped bar | Nominal NW (solid) + Real/PV (faded) side-by-side per strategy |
| **Composition** | Stacked horizontal bar | Principal Invested vs Net Returns (post-tax). Total label at bar end. |
| **Interest Paid** | Bar | Total interest paid to the lender over the loan life |

Each tab includes a **chart dictionary** — legend cards explaining what each colour and element means.

---

### 📋 Detailed Breakdown Table

Collapsed by default. Side-by-side table across all 3 strategies: Nominal NW, Present Value, Loan Tenure, Interest Saved, Capital Invested, Gross FV, Tax Paid, Net Return, Return on Capital, Months Freed. Highlight row styling on key metrics.

---

### 💹 Cashflow Streams

Per-strategy tab view (Prepay / Invest / Hybrid). Shows every cash stream in a structured table:
- **During-loan phase** — extra cash, bonus EMI lump, EMI hike increment: annualised rate, months active, capital invested, FV
- **Freed-months phase B** (Prepay/Hybrid) — same breakdown for the post-payoff reinvestment period
- Visual **timeline bar** showing loan phase vs freed-investing phase with colour-coded segments
- Grand total row

---

### 📅 Year-end Portfolio Snapshots

Annual table: post-tax net worth for all 3 strategies at each year-end. Marker rows highlight the year each loan closes. Best-value cell per year bolded. Final year row highlighted.

---

### 🔬 Per-stream FV Waterfall

Per-strategy tab view. Breaks down final net worth into individual FV contributions per cash stream — quantifies exactly how much each lever (extra cash, step-up, bonus EMIs, hike increment, freed EMI) contributed to the outcome.

---

### 📅 Amortization Schedule

Full month-by-month table for any of the 3 strategies (tab-switcher). Columns:

> Opening Balance · EMI · Interest · Principal from EMI · Principal from Prepayment · Total Payment · End Balance

Each column header shows the formula used (e.g. `P×r×(1+r)ⁿ÷((1+r)ⁿ−1)`). Features:
- **Year summary rows** (►Year 1 · 12 m) — collapsible, year-level totals
- **Totals row** pinned at the top
- All values use the active number format and currency
- End Balance cell shows **PAID** in green on final month

---

### 📊 CAGR Sensitivity Matrix

Full-width section. Sweeps two variables simultaneously:

| Dimension | Rows (CAGR) | Columns |
|---|---|---|
| **vs Loan Rate** (default) | CAGR % | Loan interest rate % |
| **vs Extra Cash** | CAGR % | Extra cash multiples |
| **vs Tax Rate** | CAGR % | Capital gains tax rate % |

Each cell shows the winning strategy in colour (amber = Prepay, sky = Invest, violet = Hybrid). The cell matching your current live inputs is **outlined and bolded**. Configurable axis controls: min/max/step for both dimensions with stepper buttons. Warning banner when the matrix would exceed a safe cell count. Horizontally scrollable on mobile.

---

### 🎯 Interactive FV Calculator

Collapsed by default. Shows the future-value breakdown for each strategy under your current inputs — useful for understanding which component drives the outcome.

---

### 🧠 Beyond the Numbers

Three-column layout (Prepay · Invest · Hybrid). Eight accordion sections across two sub-grids, all collapsed by default:

**Sub-grid 1 — Financial & Psychological (ranked items with title + description):**
- 💰 Financial Pros — 3 ranked items per strategy
- ⚠️ Financial Cons — 2–4 ranked items per strategy
- 🧘 Psychological Pros — 2–3 ranked items per strategy
- 😟 Psychological Cons — 2 ranked items per strategy

**Sub-grid 2 — Situational context (chip-style bullet lists):**
- ✅ Best when — rate levels, risk tolerance, emergency fund status
- ❌ Worst when — opposite conditions
- 👤 Best for — personality and life-stage profiles
- ⚠️ Worst for — who should avoid each approach

---

### ❓ FAQ — 8 Questions

Two-column animated grid (single column on mobile). Each question has a colour-coded category chip and smooth CSS `grid-template-rows` expand/collapse animation (no JS height measurement).

| # | Category | Question |
|---|---|---|
| 1 | Strategy | Why doesn't Full Invest benefit less from extra cash than Hybrid? |
| 2 | Strategy | Why does the loan close date differ from my bank's calculator? |
| 3 | Inputs | What is EMI Hike % and should I use it? |
| 4 | Inputs | How does post-tax return work — what CAGR should I enter? |
| 5 | Results | How is Net Worth calculated? Is it truly comparable? |
| 6 | Results | What does "Interest Saved" mean and why is it zero for Full Invest? |
| 7 | Results | Nominal vs Real (inflation-adjusted) Net Worth — what's the difference? |
| 8 | Math | How do I read the Sensitivity Matrix? |

---

### 📱 Mobile

- **Bottom navigation bar** — sticky 5-button quick-jump: Inputs · Results · Charts · Schedule · Beyond
- **Section headers wrap at ≤640px** — title + ⓘ badge + ▼ chevron stay on row 1; tab pills (strategy/chart tabs) flow onto row 2 at full width
- **Expand All / Collapse All bar stretches full-width** on narrow screens with equal-size buttons
- iOS zoom-on-focus prevention (`font-size: max(16px, …)` on all inputs)
- `touch-action: manipulation` on all interactive elements including section headers — removes 300ms tap delay
- `overscroll-behavior-x: contain` on sensitivity matrix — prevents accidental back-navigation
- Chart tabs wrap to a second line on narrow viewports
- Sticky Beyond the Numbers bar hidden on mobile (≤900px) — not needed in single-column layout

---

## How to Use

### Option A — Use the hosted version
Visit the live link above. No install, no sign-in.

### Option B — Run locally
```bash
git clone https://github.com/shubhamrkrock/Mortgage-Prepay-or-Invest.git
cd Mortgage-Prepay-or-Invest
# Just open the file — no build step needed
open index.html
```

It's a single self-contained HTML file with no server-side dependencies.

---

## Hosting on GitHub Pages

1. Push `index.html` (and `README.md`) to the root of your repo
2. Go to **Settings → Pages → Source** and set branch `main`, folder `/ (root)`
3. GitHub will publish it at `https://<your-username>.github.io/<repo-name>/`

---

## Calculation Methodology

### Equal-footing comparison

Every strategy receives the same inputs — same loan, same EMI, same extra cash. Comparison is made over a **fixed time horizon** equal to the original loan tenure. For strategies that close the loan early, freed-up cash (EMI + extra) is reinvested for all remaining months. No strategy loses invested time.

| Strategy | During loan | After early payoff |
|---|---|---|
| **Prepay** | EMI + full extra → principal | (EMI + extra) × freed months → market |
| **Invest** | EMI + full extra → market (month 1) | None — loan runs full term |
| **Hybrid** | Prepay-split → principal; invest-split → market | (EMI + extra) × freed months → market |

Full Invest deploys *more* capital into the market during the loan than Hybrid does. Its structural disadvantage is that it never generates a post-loan reinvestment window.

### Month-by-month simulation vs NPER

The tool uses a **month-by-month amortization simulation**, not the analytical `NPER()` formula. The two converge when extra payments are a fixed monthly amount, but diverge under:

- **Extra EMI per year** — a one-time annual lump applied directly to principal; `NPER` cannot model this
- **EMI Hike % per year** — a year-on-year step-up; `NPER` ignores this

Both close the loan earlier than `NPER` predicts. With Extra EMI = 0 and EMI Hike = 0%, results match standard amortization exactly.

### Tax model

Capital gains tax is applied **year-by-year** on investment returns (not deferred to exit):

```
Annual post-tax return = Gross Return × (1 − Tax Rate)
```

Tax is applied to gains only (final value minus cost basis). Principal returned is not taxed.

### Inflation adjustment

```
Real NW = Nominal NW ÷ (1 + inflation_rate)^tenure_years
```

Shown as "Present Value" on strategy cards and in the breakdown table.

---

## Technical Notes

- **Zero installed dependencies** — Chart.js v4.4.3 loaded via CDN (jsDelivr)
- **Pure vanilla JS** — no framework, no bundler, no build step
- **Single file** — all HTML, CSS, and JS in `index.html`
- **Finance engine** — EMI via annuity formula; FV via standard compound-interest formulas
- **Theme system** — 13 semantic CSS colour tokens with WCAG AA–verified values for both dark and light themes; OS preference auto-detected via `prefers-color-scheme`
- **Persistence** — `localStorage` key `mms_v1` (schema v1); fails silently in private browsing
- **Tooltip engine** — fixed-position global tooltip; viewport-aware, never clipped by `overflow: hidden`
- **Chart plugins** — custom bar data-label plugin (contrast-aware text), composition totals plugin (smart bar-end positioning)

---

## Disclaimer

Results are estimates for **educational purposes only**. Past market returns do not guarantee future performance. This tool does not constitute financial advice. Consult a qualified financial advisor before making investment or mortgage decisions.

---

## Changelog

### v2.2 — 13 Apr 2026
- **Holistic Strategy Quiz — full redesign** — 4 ranked sections (20 questions, 5 each), covering all 8 Beyond the Numbers pillars in order of impact: Core Drivers → Behavioral → Life Situation → Advanced Factors
- **Input gate screen** — quiz now opens a gate that checks whether inputs are still at defaults; dynamic title, icon, and CTA change across 4 severity levels (0–4 defaults remaining); primary CTA swaps to "go back and enter numbers" when inputs are unset
- **Scrollbar visibility** — all browsers (Chrome/Safari: 8px with explicit accent colours; Firefox: `scrollbar-color` applied to all scrollable children in both dark and light themes)
- **Quiz mobile layout** — bottom-sheet style on ≤480px (aligns to bottom, rounded top corners, reduced padding, `94dvh` height)
- **Light-theme quiz fixes** — warning dot, checklist item tints, data nudge backgrounds, dashed borders, and selected answer state all now WCAG AA–visible on white
- **Button alignment** — `justify-content: center` added to all quiz nav buttons for consistent centering at full width

### v2.1 — 13 Apr 2026
- **Expand All / Collapse All** — button bar above first results section; opens or closes all 8 sections simultaneously
- **Click-anywhere section headers** — entire header row is a toggle target; tab pills and ⓘ badge still fire independently
- **Section ⓘ tooltips** — every section header now has an info badge explaining what the section shows, what question it answers, and who should look at it
- **Sticky Beyond the Numbers column headers** — Prepay / Invest / Hybrid labels pin to the top as you scroll through all 8 qualitative accordion categories (desktop only)
- **Sensitivity tab → auto-expand** — clicking a Sensitivity Matrix tab opens the section automatically if collapsed
- **Mobile section header wrap** — at ≤640px: title + ⓘ + ▼ on row 1, tab pills full-width on row 2
- **Mobile Expand All bar** — stretches full-width with equal-size buttons on narrow screens
- **`touch-action: manipulation`** extended to section headers and expand buttons — eliminates 300 ms tap delay

### v2.0 — 12–13 Apr 2026
- 26-currency support with live reformatting
- Compact / Full number display toggle (1.2M ↔ 1,200,000)
- Dark / Light theme with OS `prefers-color-scheme` auto-detect; manual override persists
- `localStorage` persistence for all inputs and ribbon settings
- CAGR Sensitivity Matrix — sweep two axes simultaneously with configurable min/max/step; heat-map winner cells; current-input cell outlined
- Post-tax capital gains modelled year-by-year (not at exit)
- Inflation-adjusted Present Value on every strategy card and breakdown table
- Interactive FV Calculator section
- Cashflow Streams — per-strategy tab with during-loan and freed-months FV breakdown
- Year-end Portfolio Snapshots — annual net-worth table across all 3 strategies
- Per-stream FV Waterfall — quantifies each lever's contribution to final net worth
- FAQ — 8 questions, 2-column animated accordion grid with category chips
- Beyond the Numbers redesigned — 8 qualitative accordion sections across two grids
- Mobile bottom navigation bar — 5 quick-jump buttons
- Amortization Schedule — full month-by-month table with year-collapse rows, formula headers, strategy tab-switcher
- Full WCAG AA contrast across both themes — 13 semantic CSS colour tokens

### v1.0 — 12 Apr 2026
- Three-strategy mortgage simulator: Full Prepay, Full Invest, Hybrid Split
- 11 inputs: loan amount, interest rate, tenure, extra cash, extra EMIs/year, EMI hike %, hybrid split slider, CAGR, inflation, tax rate
- Decision banner with live recommended strategy and plain-English reason
- Three strategy cards: post-tax nominal net worth, inflation-adjusted present value, strategy-specific stats
- Visual Comparison — 4-tab Chart.js chart (NW Growth, Net Worth, Composition, Interest Paid)
- Detailed Breakdown table (side-by-side key metrics)
- CAGR sensitivity cards (bar visualisation across CAGR scenarios)
- Beyond the Numbers — 3-column qualitative grid (Financial Pros/Cons, Psychological Pros/Cons)
- Single self-contained HTML file, zero build dependencies

---

## Author

Built by **Shubham Kumar**

- 💼 [LinkedIn](https://www.linkedin.com/in/shubhamrkrock/)
- 📸 [Instagram](https://www.instagram.com/shubhamrkrock/)

---

## License

MIT — free to use, fork, and adapt with attribution.
