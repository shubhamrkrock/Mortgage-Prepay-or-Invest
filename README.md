# 💰 Mortgage Suite

**EMI Matrix · Strategy Simulator · Loan Eligibility · Holistic Quiz** — A complete mortgage decision toolkit in a single file.

> _More than a calculator — a decision framework._

🔗 **[Live Demo →](https://shubhamrkrock.github.io/Mortgage-Prepay-or-Invest/)**

![Mortgage Suite preview](og-image.svg)

---

## What It Does

Four tools in one, accessible from a unified suite navigation bar:

| Tool | What it answers |
|---|---|
| **📊 EMI Matrix** | What will my monthly payment be across every rate × tenure combination? |
| **🏠 Strategy Simulator** | Should I prepay, invest, or do both — and by how much? |
| **🏦 Loan Eligibility** | How much can I actually borrow — based on my country's regulations? |
| **🎯 Holistic Quiz** | Given my personality and life situation, which strategy actually fits me? |

All calculations are **post capital-gains-tax** and **inflation-adjusted**. No sign-in, no install, no server — one self-contained HTML file + one JS rules library.

---

## Tools

### 📊 EMI Matrix

Rate × tenure matrix showing monthly EMI for every combination, colour-coded to your budget:

- **🟢 Comfortable** — EMI ≤ comfort threshold % of budget
- **🟡 Tight** — EMI between threshold and 100% of budget
- **🔴 Over budget** — EMI exceeds budget
- Click any cell for a full breakdown: EMI, total interest, total cost, budget bar
- **Configurable axes** — set min/max/step for both Rate (%) and Tenure (years)
- **Comfort threshold** — slider + number input controlling the green/amber boundary
- Top-right loan badge shows the active loan amount at a glance
- Header stat cards: best shortest payoff + lowest EMI combinations
- Loan amount syncs bidirectionally with the Strategy Simulator

### 🏠 Strategy Simulator — Prepay · Invest · Hybrid

Compare all three strategies side-by-side over the full loan horizon:

| Strategy | Mechanics |
|---|---|
| **Full Prepay** | All extra cash reduces principal monthly. Loan closes early. Freed EMI + extra reinvested for remaining months. |
| **Full Invest** | Loan runs full term. 100% of extra cash invested from month 1. |
| **Hybrid** | Extra cash split by a user-controlled slider — part prepays, part invests. |

**12 analysis views:**
1. Decision Banner — live recommendation with plain-English reason
2. Strategy Cards — nominal + real NW, loan-close date, vs-comparison
3. NW Growth chart — year-by-year post-tax net worth, all 3 strategies
4. Net Worth bar chart — nominal vs real side-by-side
5. Composition chart — principal invested vs net returns (stacked)
6. Interest Paid chart
7. Detailed Breakdown table — 12 metrics across all 3 strategies
8. Cashflow Streams — per-stream FV breakdown with timeline bar
9. Year-end Portfolio Snapshots — annual NW at each year-end
10. Per-stream FV Waterfall — quantifies each lever's contribution
11. Future-Value Calculator — interactive horizon slider with synced calendar dropdowns and y/m inputs
12. CAGR Sensitivity Matrix — sweeps CAGR vs Loan Rate / Extra Cash / Tax Rate; heat-map winner cells

**3 optimisation levers:**
- Extra monthly cash (with optional annual step-up %)
- Extra EMIs per year (lump-sum annual payment to principal)
- EMI Hike % per year (gradual monthly payment increase)

**Full amortization schedule** — month-by-month table with year-collapse rows and formula headers.

### 🧠 Holistic Strategy Quiz

20 questions across 4 ranked sections — covers what the numbers can't:

- **Core Drivers** — financial priorities, risk tolerance, loan-to-income
- **Behavioral** — loss aversion, market discipline, sleep-test
- **Life Situation** — job security, dependants, emergency fund
- **Advanced Factors** — tax optimisation, legacy, opportunity cost awareness

Produces a weighted verdict with explanation. Input gate checks whether you've entered real numbers before the quiz runs.

### 🏦 Loan Eligibility (BETA)

Country-specific "How much can I borrow?" calculator. Automatically applies the selected currency's regulatory framework:

- **26 currencies** — DTI/DSTI caps, LTV limits, tenure & age constraints, stress-test buffers, income multipliers
- **9 inputs** — Monthly income, existing debts, property value, own contribution (down payment), interest rate, desired tenure, age, employment type, first-home toggle
- **4 headline metrics** — Eligible Loan, Max EMI, Effective Tenure, Min Down Payment
- **10-row constraint breakdown** with ⓘ tooltips on every row — each explains the business logic, formula, what question it answers, and who should care
- **Own contribution logic** — requested loan = property − contribution; binding constraint can be income, LTV, or contribution
- **Dynamic income label** — switches between "Gross Monthly Income" and "Net Monthly Income" based on country convention
- **Contribution hint** — live "Down payment: X% of property · Min required: Y ✓/✗"
- **Regulation notes, source URLs & regulator pills** — links to official regulatory documentation for every country
- **Cross-links** — one-click transfer of eligible loan amount into EMI Matrix or Strategy Simulator (with toast notification)
- **Powered by `loan-eligibility-rules.js`** — external rules library with per-country regulation objects (DSTI, LTV tiers, stress-test, age limits, tenure caps, income types, source URLs)
- **BETA disclaimer** — prominently warns users to verify with their bank

### 📋 Beyond the Numbers

8 qualitative accordion sections comparing Prepay / Invest / Hybrid across:
Financial Pros/Cons · Psychological Pros/Cons · Best When · Worst When · Best For · Worst For

### ❓ FAQ (all pages)

Every page has its own FAQ section with smooth-animated accordion questions. Answers contain **navigation links** that scroll directly to the relevant section (offset for the sticky ribbon). Categories are colour-coded: Strategy · Inputs · Results · Math · General · Navigation.

- **Home** — 6 FAQs: what the suite does, where to start, data privacy, cross-tool value transfer, country support, mobile
- **Eligibility** — 7 FAQs: why loan is lower than expected, existing debts, stress-test buffer, headline cards, LTV tracker, country support (sources & last-updated), cross-link to simulator
- **EMI Matrix** — 6 FAQs: colour-coding, budget input, headline cards, detail card, next steps, why shorter tenure saves interest
- **Strategy Simulator** — 20 FAQs: recommendation & quiz, scenario cards, visual comparison, cashflow streams, year-end snapshots, FV waterfall, amortisation, FV calculator, sensitivity matrix, beyond-the-numbers, input levers, breakdown table, strategy fairness, loan close dates, EMI hike, CAGR & tax, net worth methodology, interest saved, nominal vs real NW

---

## Inputs

**20 parameters across 4 groups:**

| Group | Parameters |
|---|---|
| Loan | Amount · Annual Rate · Tenure (years + months) |
| Optimisation | Extra Monthly Cash · Step-up % · Extra EMIs/yr · EMI Hike %/yr · Hybrid split |
| Assumptions | CAGR · Inflation · Capital Gains Tax |
| Eligibility | Monthly Income · Existing Debts · Property Value · Own Contribution · Interest Rate · Desired Tenure · Age · Employment Type · First Home |

All sliders have live-value labels. All number inputs have ▲/▼ steppers. Decimal values accepted everywhere.

---

## UI & UX

- **Dark / Light theme** — OS `prefers-color-scheme` auto-detect; manual toggle persists
- **26 currencies** — live reformatting with flag icons
- **Compact / Full number toggle** — `1.2M` ↔ `1,200,000`
- **Entrance animations** — staggered `fadeSlideUp` on every view transition
- **Mobile-first** — responsive at 1040px, 860px, 640px, 520px, 480px, 420px breakpoints
- **Unified footer** — LinkedIn + Instagram links on all four views
- **`localStorage` persistence** — all inputs survive page refresh (keys: `mms_v1`, `mms_elig_v1`)
- **WCAG AA colour tokens** — verified contrast ratios in both themes

---

## How to Use

### Option A — Live version
**[shubhamrkrock.github.io/Mortgage-Prepay-or-Invest/](https://shubhamrkrock.github.io/Mortgage-Prepay-or-Invest/)**

### Option B — Run locally
```bash
git clone https://github.com/shubhamrkrock/Mortgage-Prepay-or-Invest.git
cd Mortgage-Prepay-or-Invest
open index.html   # no build step — single HTML file
```

---

## Technical Notes

- **Zero installed dependencies** — Chart.js v4.4.3 via CDN (jsDelivr)
- **Pure vanilla JS** — no framework, no bundler, no build step
- **Single file** — all HTML, CSS, and JS in `index.html` (~400 KB) + `loan-eligibility-rules.js` (~1 KB per country, 26 countries)
- **Finance engine** — month-by-month amortization simulation (not analytical NPER); correctly models extra EMIs, annual hike %, and hybrid splits
- **Eligibility engine** — `computeEligibility()` in external JS; per-country regulation objects with DSTI/LTV/stress-test/age/tenure rules
- **Tax model** — capital gains applied year-by-year on gains only; principal not taxed
- **Inflation** — `Real NW = Nominal NW ÷ (1 + r)^n`
- **CSS token system** — `--accent`, `--surface`, `--border`, `--sb-thumb/track` and 13 semantic tokens; full dark + light override block
- **Scoped EMI CSS** — all EMI Matrix styles under `#view-emi` to isolate from Prepay styles
- **SEO** — canonical URL, OG tags, Twitter card, JSON-LD WebApplication schema, per-view dynamic `<title>` and `<meta description>`

---

## Calculation Methodology

### Equal-footing comparison

All strategies receive identical inputs over a **fixed horizon** equal to the original tenure. Strategies that close the loan early reinvest freed cash (EMI + extra) for all remaining months — no strategy loses invested time.

### Month-by-month vs NPER

The simulator uses month-by-month amortization. Results match NPER when extra payments = 0, but diverge (correctly) under extra EMIs/year and annual EMI hike — which NPER cannot model.

### Tax

```
Annual post-tax return = Gross Return × (1 − Tax Rate)
```
Applied year-by-year on gains only.

### Inflation

```
Real NW = Nominal NW ÷ (1 + inflation_rate)^tenure_years
```

---

## Disclaimer

Results are estimates for **educational purposes only**. Past market returns do not guarantee future performance. This tool does not constitute financial advice. Consult a qualified financial advisor before making mortgage or investment decisions.

---

## Changelog

### v3.1 — 15 Apr 2026
- **LTV Milestone Tracker** — shows when LTV drops below a target; calculates rate-reduction savings
- **Global loan start date** — synced month/year selector across Eligibility and Strategy Simulator; all tables and charts show calendar dates alongside relative durations
- **Calendar date propagation** — scenario cards, decision banner, charts, breakdown table, cashflow streams, year-end snapshots, FV waterfall, amortisation schedule and FV calculator all display calendar dates (e.g. "Jan 2029") with year-range labels ("May 2026 – Apr 2027")
- **FV Calculator enhancements** — linear slider, synced calendar month/year dropdowns, y/m number inputs with steppers
- **Apply-in-month dropdown** — replaced 1–12 slider with month-name select
- **FAQ sections on all 4 pages** — tokenised accordion styling; 39 total FAQs with colour-coded categories (Strategy · Inputs · Results · Math · General · Navigation); answers contain deep-links that scroll to the relevant section (offset for 52px sticky ribbon)
- **Unified button styles** — `.amort-strategy-tab` now matches `.chart-tab` across Visual Comparison, Cashflow Streams, Year-End Snapshots, FV Waterfall, Amortisation, and Sensitivity Matrix

### v3.0 — 15 Apr 2026
- **Loan Eligibility tool (BETA)** — full "How much can I borrow?" module with 26-currency regulatory engine
- **`loan-eligibility-rules.js`** — external rules library: per-country DSTI/LTV/stress-test/age/tenure/income-type, with source URLs and regulator metadata
- **Own Contribution / Down Payment** input — requested loan = property − contribution; binding constraint can be income, LTV, or contribution
- **Constraint breakdown tooltips** — all 10 rows have ⓘ rich tooltips explaining business logic, formula, what it answers, and who should look at it (same pattern as Simulator section tooltips)
- **Cross-links** — one-click transfer of eligible loan into EMI Matrix or Strategy Simulator, with toast confirmation
- **Dynamic income label** — auto-switches "Gross" / "Net" per country convention
- **Contribution hint** — live "Down payment X% · Min required Y ✓/✗"
- **BETA disclaimer** — prominent warning box below hero
- **Country/regulator/date pills** — live metadata below hero
- **Regulation notes & source URLs** — per-country regulatory footnotes with links to official documents
- **Mobile responsiveness** — eligibility headline grid stacks 2→1 col at 420px; breakdown table font scales; tooltip sizing
- **134 → 0 inline style warnings** — all eligibility, EMI Matrix, and Prepay section inline styles extracted to CSS classes
- **Browser compat** — 5 vendor-prefix gaps fixed; `COMPAT` comments on remaining browser-support properties

### v2.3 — 14 Apr 2026
- **EMI Matrix merged into suite** — unified nav, shared loan amount sync, shared currency/theme controls
- **Staggered entrance animations** — `fadeSlideUp` replays on every view switch for all three sections
- **Config cards** — Comfort Threshold, Tenure Rows, Rate Columns wrapped in surface boxes
- **Matrix cell hover** — brightness + saturation + white inset ring + tint overlay
- **Scrollbar tokens** — `--sb-thumb` / `--sb-track` neutral grey replacing accent purple
- **Footer unified** — consistent `app-footer` with "Connect with me on" + LinkedIn + Instagram across all views
- **Mobile breakpoints** — EMI Matrix responsive at 860px / 520px
- **SEO** — OG tags, Twitter card, JSON-LD schema, favicon, theme-color, per-view dynamic title + description
- **Home page** — hero dot removed; `home-hero` entrance animation added
- **Comfort slider** — min changed 50→30; spin buttons restored; `step="any"` decimal support
- **Matrix header sizes** — row + column headers unified at 0.65rem
- **Detail card** — margins aligned to matrix-panel padding (web + mobile)

### v2.2 — 13 Apr 2026
- Holistic Strategy Quiz — full redesign (4 ranked sections, 20 questions)
- Input gate screen with 4 severity levels
- Scrollbar visibility improvements (Chrome/Safari/Firefox)
- Quiz mobile bottom-sheet layout
- Light-theme quiz WCAG AA fixes

### v2.1 — 13 Apr 2026
- Expand All / Collapse All button bar
- Click-anywhere section headers
- Section ⓘ tooltips
- Sticky Beyond the Numbers column headers
- Sensitivity tab auto-expand
- Mobile section header wrap + Expand All bar

### v2.0 — 12–13 Apr 2026
- 26-currency support
- Compact/Full number toggle
- Dark/Light theme with OS auto-detect
- localStorage persistence
- CAGR Sensitivity Matrix
- Post-tax year-by-year capital gains model
- Inflation-adjusted Present Value
- Interactive FV Calculator
- Cashflow Streams, Year-end Snapshots, Per-stream Waterfall
- FAQ, Beyond the Numbers redesign
- Mobile bottom navigation bar
- Full amortization schedule


---

## What It Does

Most mortgage calculators tell you how much interest you save by prepaying. This tool goes further — it shows you the **net worth outcome** of three complete strategies over the life of your loan, with post-capital-gains-tax and inflation-adjusted results, **plus** a country-specific eligibility check so you know how much you can actually borrow before you start planning.

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
- **Single file** — all HTML, CSS, and JS in `index.html` + `loan-eligibility-rules.js`
- **Finance engine** — EMI via annuity formula; FV via standard compound-interest formulas
- **Eligibility engine** — `computeEligibility()` with per-country regulation objects; external rules library
- **Theme system** — 13 semantic CSS colour tokens with WCAG AA–verified values for both dark and light themes; OS preference auto-detected via `prefers-color-scheme`
- **Persistence** — `localStorage` keys `mms_v1` + `mms_elig_v1`; fails silently in private browsing
- **Tooltip engine** — fixed-position global tooltip; viewport-aware, never clipped by `overflow: hidden`
- **Chart plugins** — custom bar data-label plugin (contrast-aware text), composition totals plugin (smart bar-end positioning)

---

## Disclaimer

Results are estimates for **educational purposes only**. Past market returns do not guarantee future performance. This tool does not constitute financial advice. Consult a qualified financial advisor before making investment or mortgage decisions.

---

## Changelog

### v3.0 — 15 Apr 2026
- **Loan Eligibility (BETA)** — 26-currency "How much can I borrow?" with own contribution, constraint breakdown tooltips, cross-links, BETA disclaimer, mobile responsive
- **`loan-eligibility-rules.js`** — external per-country regulatory rules engine
- **134 → 0 inline style warnings** — full CSS class extraction across all sections
- **Browser compat** — vendor-prefix fixes + COMPAT comments

### v2.3 — 14 Apr 2026
- **EMI Matrix merged into suite** — unified nav, shared loan amount sync, shared currency/theme controls
- **Staggered entrance animations, config cards, matrix cell hover, scrollbar tokens, unified footer**
- **SEO** — OG tags, Twitter card, JSON-LD, per-view dynamic title + description
- **Mobile breakpoints** — EMI Matrix responsive at 860px / 520px

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
