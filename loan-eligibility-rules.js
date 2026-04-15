/* ═══════════════════════════════════════════════════════════════════════════
   loan-eligibility-rules.js — Country-Specific Mortgage Eligibility Engine
   ═══════════════════════════════════════════════════════════════════════════
   Pure data + pure functions. No DOM access. Consumed by index.html.
   Keyed by the same currency codes used in the CUR object.
   ═════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ── Per-country regulatory parameters ────────────────────────────────── */
const ELIG_RULES = {

  /* ────────────────── Americas ────────────────── */

  USD: {
    country:    'United States',
    regulator:  'CFPB / Fannie Mae / Freddie Mac',
    regulation: 'Qualified Mortgage (QM) Rule — 12 CFR §1026.43',
    dstiCap:    0.43,          // QM back-end DTI cap
    dstiCapHigh: 0.50,         // with compensating factors (DU approve/eligible)
    dstiHighIncomeThreshold: null, // not income-based — lender discretion
    ltvCap:     0.97,          // Conventional with PMI; 80% = no PMI
    ltvNoInsurance: 0.80,
    maxTenureYears: 30,
    minAge:     18,
    maxAgeAtMaturity: null,    // ECOA prohibits age discrimination in credit
    stressTestBuffer: 0,       // no formal buffer for fixed-rate
    stressTestFixedRate: null,
    notes: [
      'DTI ≤ 43% for QM status; up to 50% possible with strong compensating factors.',
      'FHA loans allow 96.5% LTV with 3.5% down & mortgage insurance premium.',
      'VA loans allow 100% LTV for eligible veterans — no down payment.',
      'LTV > 80% requires Private Mortgage Insurance (PMI).',
    ],
    lastUpdated: '2025-01-15',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'CFPB QM Rule', url: 'https://www.consumerfinance.gov/rules-policy/final-rules/qualified-mortgage-definition-under-truth-lending-act/' },
      { label: 'Fannie Mae Selling Guide (DTI)', url: 'https://selling-guide.fanniemae.com/Selling-Guide/Origination-thru-Closing/Subpart-B3-Underwriting-Borrowers/Chapter-B3-6-Liability-Assessment/1032992141/B3-6-02-Debt-to-Income-Ratios-02-05-2020.htm' },
    ],
  },

  CAD: {
    country:    'Canada',
    regulator:  'OSFI / CMHC',
    regulation: 'OSFI B-20 Guideline & CMHC Mortgage Insurance Rules',
    dstiCap:    0.39,          // GDS ≤ 32%, TDS ≤ 40% (CMHC insured: 39% GDS / 44% TDS)
    dstiCapHigh: 0.44,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.95,          // CMHC insured for properties ≤ C$1.5M
    ltvNoInsurance: 0.80,
    maxTenureYears: 25,        // insured; 30 years uninsured
    maxTenureUninsured: 30,
    minAge:     18,            // 19 in BC, NB, NS, NL
    maxAgeAtMaturity: null,    // no statutory cap
    stressTestBuffer: 2.0,     // qualifying rate = max(contract + 2%, 5.25%)
    stressTestFixedRate: 5.25, // floor
    notes: [
      'Stress test: qualify at higher of (contract rate + 2%) or 5.25%.',
      'Insured mortgages (LTV > 80%) max 25-year amortization.',
      'Minimum 5% down for first $500K; 10% on portion above $500K.',
    ],
    lastUpdated: '2025-01-10',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'OSFI B-20 Guideline', url: 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/residential-mortgage-underwriting-practices-procedures' },
      { label: 'CMHC Mortgage Insurance', url: 'https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance' },
    ],
  },

  BRL: {
    country:    'Brazil',
    regulator:  'BCB (Banco Central) / CMN',
    regulation: 'CMN Resolution 4.676 / SBPE & FGTS funding rules',
    dstiCap:    0.30,          // income commitment ≤ 30% for SBPE/FGTS
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.80,          // SAC amortization; 70% for Price table
    ltvNoInsurance: 0.80,
    maxTenureYears: 35,
    minAge:     18,
    maxAgeAtMaturity: 80,      // 80 years + 6 months
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'FGTS-funded loans have subsidised rates for first home up to R$350K.',
      'SAC (constant amortisation) allows 80% LTV; Price (French) allows 70%.',
      'Max age at loan maturity: 80 years and 6 months.',
    ],
    lastUpdated: '2024-12-01',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'BCB Regulation on Housing Finance', url: 'https://www.bcb.gov.br/en/financialstability/sfnregulation' },
    ],
  },

  MXN: {
    country:    'Mexico',
    regulator:  'CNBV / Infonavit / Fovissste',
    regulation: 'CNBV General Banking Law & Infonavit Operating Rules',
    dstiCap:    0.30,          // PTI ≤ 30% (Infonavit & commercial)
    dstiCapHigh: 0.35,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.90,          // Infonavit; commercial banks typically 80%
    ltvNoInsurance: 0.80,
    maxTenureYears: 30,        // 20 for Infonavit
    minAge:     18,
    maxAgeAtMaturity: 65,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'Infonavit loans max 20-year tenure with up to 90% LTV.',
      'Commercial bank mortgages typically cap at 80% LTV, 30-year tenure.',
      'Co-borrower (cónyuge) income can be combined.',
    ],
    lastUpdated: '2024-11-15',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'Infonavit Operating Rules', url: 'https://portalmx.infonavit.org.mx/' },
    ],
  },

  /* ────────────────── Europe ────────────────── */

  EUR: {
    country:    'Eurozone (France HCSF rules as strictest binding default)',
    regulator:  'HCSF (France) / ECB macroprudential guidelines',
    regulation: 'HCSF Decision D-2021-16 (France, binding since Jan 2022)',
    dstiCap:    0.35,          // France HCSF: DSTI ≤ 35% of gross income
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     1.00,          // No formal EU-wide LTV cap; NL = 100%, DE/FR ≈ 80-100%
    ltvNoInsurance: 0.80,      // most banks' internal ceiling without guarantees
    maxTenureYears: 25,        // France HCSF max; Germany/NL can be 30
    minAge:     18,
    maxAgeAtMaturity: null,    // varies by member state
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'EUR covers 20+ countries — rules differ. French HCSF rules are used as default (strictest binding).',
      'France: DSTI ≤ 35%, max tenure 25 years (+2 for VEFA construction = 27 max).',
      'Germany: no statutory DTI cap; banks typically apply 30-40% of net income.',
      'Netherlands: LTV ≤ 100%; NIBUD income-based affordability tables apply.',
      'Spain: LTV ≤ 80% primary, ≤ 70% second home; no statutory DTI cap.',
    ],
    lastUpdated: '2025-01-20',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'HCSF Decision D-2021-16 (FR)', url: 'https://www.economie.gouv.fr/hcsf/recommandation-r-2021-1' },
      { label: 'ECB Macroprudential Bulletin', url: 'https://www.ecb.europa.eu/pub/financial-stability/macroprudential-bulletin/html/index.en.html' },
    ],
  },

  GBP: {
    country:    'United Kingdom',
    regulator:  'FCA / PRA (Bank of England)',
    regulation: 'FCA MCOB & PRA SS1/13 — Mortgage Market Review (MMR)',
    dstiCap:    0.45,          // No fixed DTI cap; 4-4.5× income multiplier typical
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    incomeMultiplier: 4.5,     // max loan = 4.5× gross annual income
    ltvCap:     0.95,
    ltvNoInsurance: 0.90,
    maxTenureYears: 40,        // some lenders allow 35-40
    minAge:     18,
    maxAgeAtMaturity: 70,      // varies by lender; 65-80
    stressTestBuffer: 1.0,     // FCA removed 3% buffer Aug 2022; lenders apply ~1-2% own buffer
    stressTestFixedRate: null,
    notes: [
      'No statutory DTI cap — lenders use income multiplier (typically ≤ 4.5× gross annual).',
      'FCA removed the 3% stress test buffer in Aug 2022; lenders still apply own buffers.',
      'LTV > 90% products are fewer and carry higher rates.',
      'Max age at maturity varies by lender (65-80 typical).',
    ],
    lastUpdated: '2025-02-01',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'FCA MCOB Handbook', url: 'https://www.handbook.fca.org.uk/handbook/MCOB/' },
      { label: 'PRA Supervisory Statement SS1/13', url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/2013/residential-property-lending-ss' },
    ],
  },

  CHF: {
    country:    'Switzerland',
    regulator:  'FINMA / SwissBanking self-regulation',
    regulation: 'SwissBanking "Guidelines on the Minimum Requirements for Mortgage Financing"',
    dstiCap:    0.33,          // total housing cost ≤ 33% of gross income at caloric rate
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.80,          // ≥ 20% equity, ≥10% must be "hard" (non-pension)
    ltvNoInsurance: 0.80,
    maxTenureYears: 25,        // must amortise to 67% LTV within 15 years
    minAge:     18,
    maxAgeAtMaturity: null,    // retirement age (64/65) is when 67% LTV must be reached
    stressTestBuffer: 0,
    stressTestFixedRate: 5.0,  // caloric/theoretical rate for affordability
    notes: [
      'Affordability test: interest at 5% theoretical rate + 1% maintenance + amortisation ≤ 33% income.',
      'Must amortise (indirect or direct) to 67% LTV within 15 years.',
      'At least 10% of property value must come from "hard" equity (non-pension savings).',
      'Pension fund (Pillar 2) withdrawal can count toward remaining 10%.',
    ],
    lastUpdated: '2025-01-05',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'SwissBanking Self-Regulation Guidelines', url: 'https://www.swissbanking.ch/en/topics/regulation-and-compliance/guidelines' },
      { label: 'FINMA Mortgage Guidelines', url: 'https://www.finma.ch/en/supervision/banks-and-securities-firms/cross-sectoral-tools/mortgage-market/' },
    ],
  },

  PLN: {
    country:    'Poland',
    regulator:  'KNF (Komisja Nadzoru Finansowego)',
    regulation: 'Recommendation S (amended 2024) & Recommendation T',
    dstiCap:    0.40,          // income < national average
    dstiCapHigh: 0.50,         // income ≥ national average
    dstiHighIncomeThreshold: 7824, // PLN/month — national avg gross salary threshold (GUS 2024 Q4; DSTI itself uses net)
    ltvCap:     0.90,          // with credit-financed insurance for top 10%
    ltvNoInsurance: 0.80,      // standard without bridge insurance
    maxTenureYears: 35,        // statutory; KNF recommends ≤ 25 in creditworthiness calc
    recommendedMaxTenure: 25,
    minAge:     18,
    maxAgeAtMaturity: 70,      // bank-dependent, typically 65-70
    stressTestBuffer: 2.5,     // banks must stress at rate + 2.5pp
    stressTestFixedRate: null,
    notes: [
      'DSTI calculated on NET disposable income (dochód rozporządzalny netto) per KNF Recommendation S.',
      'DSTI ≤ 40% (income below national avg) or ≤ 50% (income ≥ avg national gross salary threshold).',
      'LTV ≤ 80% standard; up to 90% with bridge insurance on the 80-90% tranche.',
      'KNF recommends using max 25 years in creditworthiness calculations, even if contract is 35.',
      'Stress test buffer: +2.5 pp above contract rate.',
      '"Bezpieczny Kredyt 2%" / "Kredyt na Start" programs may override some limits for first-time buyers.',
    ],
    lastUpdated: '2025-03-01',
    incomeType:  'net',  // DSTI calculated on net income per regulation
    sourceUrls: [
      { label: 'KNF Recommendation S', url: 'https://www.knf.gov.pl/dla_rynku/regulacje_i_praktyka/rekomendacje_i_wytyczne/rekomendacje_dla_bankow' },
      { label: 'KNF Recommendation T', url: 'https://www.knf.gov.pl/dla_rynku/regulacje_i_praktyka/rekomendacje_i_wytyczne/rekomendacje_dla_bankow' },
    ],
  },

  NOK: {
    country:    'Norway',
    regulator:  'Finanstilsynet (Financial Supervisory Authority)',
    regulation: 'Boliglånsforskriften (Mortgage Lending Regulation)',
    dstiCap:    0.50,          // debt service after living expenses + 5% stress test
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    totalDebtToIncomeMax: 5.0, // total debt ≤ 5× gross annual income
    ltvCap:     0.85,          // primary residence
    ltvSecondary: 0.60,        // secondary/holiday homes (Oslo)
    ltvNoInsurance: 0.85,
    maxTenureYears: 30,
    minAge:     18,
    maxAgeAtMaturity: null,
    stressTestBuffer: 0,
    stressTestFixedRate: 5.0,  // must afford 5% rate after living expenses
    notes: [
      'Total debt must not exceed 5× gross annual income.',
      'Must service debt at 5% interest rate after standard living expenses.',
      'LTV ≤ 85% primary residence; ≤ 60% for secondary homes in Oslo.',
      'Lenders have 10% flexibility quota per quarter to deviate from rules.',
    ],
    lastUpdated: '2025-01-01',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'Finanstilsynet Boliglånsforskriften', url: 'https://www.finanstilsynet.no/en/laws-and-regulations/banking-and-finance/regulation-on-requirements-for-residential-mortgage-loans/' },
    ],
  },

  SEK: {
    country:    'Sweden',
    regulator:  'Finansinspektionen (FI)',
    regulation: 'FFFS 2016:33 Amortisation Requirement',
    dstiCap:    0.50,          // practical; no statutory DTI cap
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    totalDebtToIncomeMax: 4.5, // monitored; additional amortisation > 4.5×
    ltvCap:     0.85,
    ltvNoInsurance: 0.85,
    maxTenureYears: 50,        // No fixed max; interest-only possible after amortisation met
    minAge:     18,
    maxAgeAtMaturity: null,
    stressTestBuffer: 3.0,     // banks stress at ~6-7% rate
    stressTestFixedRate: null,
    amortisationRules: [
      { ltvAbove: 0.70, ratePerYear: 0.02 },  // > 70% LTV: amortise ≥ 2%/yr
      { ltvAbove: 0.50, ratePerYear: 0.01 },  // 50-70% LTV: amortise ≥ 1%/yr
    ],
    notes: [
      'LTV > 70%: must amortise ≥ 2% of loan/year. 50-70%: ≥ 1%/year.',
      'Debt > 4.5× gross annual income: additional 1% amortisation.',
      'No statutory max tenure — many choose 50+ year mortgages with amortisation overlay.',
      'Banks stress test at 6-7% in internal affordability calculations.',
    ],
    lastUpdated: '2025-01-10',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'FI Amortisation Requirement FFFS 2016:33', url: 'https://www.fi.se/en/our-registers/search-fffs/2016/201633/' },
    ],
  },

  DKK: {
    country:    'Denmark',
    regulator:  'Finanstilsynet / Danish FSA',
    regulation: 'Executive Order on Good Practice for Mortgage Lending',
    dstiCap:    0.45,          // practical guideline
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    totalDebtToIncomeMax: 4.0, // strict for variable/IO loans
    ltvCap:     0.95,          // 80% mortgage bond + 15% bank top-up
    ltvMortgageBond: 0.80,
    ltvNoInsurance: 0.80,
    maxTenureYears: 30,
    minAge:     18,
    maxAgeAtMaturity: null,
    stressTestBuffer: 1.0,
    stressTestFixedRate: null,
    notes: [
      'Mortgage bond system: up to 80% LTV via realkreditinstitut, top-up 15% via bank loan.',
      'Total debt ≤ 4× gross annual income for variable rate / interest-only loans.',
      'Interest-only allowed for 10 years if LTV ≤ 60%.',
      'Danish model is unique — among safest mortgage systems globally.',
    ],
    lastUpdated: '2024-12-15',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'Danish FSA Mortgage Guidelines', url: 'https://www.finanstilsynet.dk/en/Rules-and-practice/Legislation/Executive-orders/Executive-orders-on-banks' },
    ],
  },

  TRY: {
    country:    'Turkey',
    regulator:  'BDDK (BRSA) / CBRT',
    regulation: 'BDDK Mortgage Lending Regulation',
    dstiCap:    0.50,          // ≤ 50% of net income
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.80,
    ltvNoInsurance: 0.80,
    maxTenureYears: 10,        // 120 months — much shorter than global norms
    minAge:     18,
    maxAgeAtMaturity: 65,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'Max tenure only 10 years (120 months) due to high interest rate environment.',
      'High mortgage rates (30%+ in 2024) make long tenures impractical.',
      'Some subsidised programs for first-time buyers offer longer terms.',
    ],
    lastUpdated: '2024-11-01',
    incomeType:  'net',  // DSTI calculated on net income per regulation
    sourceUrls: [
      { label: 'BDDK Mortgage Regulations', url: 'https://www.bddk.org.tr/en' },
    ],
  },

  /* ────────────────── Asia-Pacific ────────────────── */

  INR: {
    country:    'India',
    regulator:  'RBI / NHB (National Housing Bank)',
    regulation: 'RBI Master Circular on Housing Finance (DNBR) & NHB Guidelines',
    dstiCap:    0.50,          // FOIR 40-50% (salaried); 40% for self-employed
    dstiCapHigh: 0.65,         // some banks allow up to 65% for high income salaried
    dstiHighIncomeThreshold: 50000, // INR/month — above this, banks are more flexible
    ltvCap:     0.90,          // for loans ≤ ₹30 lakh
    ltvTiers: [
      { upTo: 3000000,  ltv: 0.90 },  // ≤ ₹30L: 90%
      { upTo: 7500000,  ltv: 0.80 },  // ₹30L–75L: 80%
      { upTo: Infinity, ltv: 0.75 },   // > ₹75L: 75%
    ],
    ltvNoInsurance: 0.75,
    maxTenureYears: 30,
    minAge:     21,            // 25 for self-employed at some banks
    maxAgeAtMaturity: 65,      // salaried; 70 for self-employed
    maxAgeAtMaturitySelf: 70,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'FOIR (Fixed Obligation to Income Ratio): 40-50% salaried, 40% self-employed.',
      'LTV tiered: ≤ ₹30L → 90%, ₹30-75L → 80%, > ₹75L → 75%.',
      'Co-applicant income can be added (spouse, parent, sibling).',
      'Tax benefit under Section 80C (principal ₹1.5L) & 24(b) (interest ₹2L) of IT Act.',
      'Max age at maturity: 60-65 (salaried), 65-70 (self-employed) — varies by bank.',
    ],
    lastUpdated: '2025-02-15',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'RBI Master Direction — Housing Finance', url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12423' },
      { label: 'NHB Circular on LTV Ratio', url: 'https://nhb.org.in/circulars/' },
    ],
  },

  JPY: {
    country:    'Japan',
    regulator:  'FSA / JHF (Japan Housing Finance Agency)',
    regulation: 'JHF Flat 35 Lending Guidelines',
    dstiCap:    0.30,          // for annual income < ¥4M
    dstiCapHigh: 0.35,         // for annual income ≥ ¥4M
    dstiHighIncomeThreshold: 333333, // ≈ ¥4M annual / 12
    ltvCap:     1.00,          // Flat 35 + α allows up to 100%
    ltvNoInsurance: 0.90,      // Flat 35 standard
    maxTenureYears: 35,
    minAge:     20,            // age of majority (18 since Apr 2022, but most lenders still require 20)
    maxAgeAtMaturity: 80,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'Flat 35: DTI ≤ 30% (income < ¥4M) or ≤ 35% (income ≥ ¥4M).',
      'Flat 35 covers up to 90% LTV; Flat 35 + α up to 100%.',
      'Very low interest rates (sub-2%) make affordability favourable.',
      'Max age at maturity: 80 years; loan starts must be before age 70.',
    ],
    lastUpdated: '2025-01-10',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'JHF Flat 35 Product Guide', url: 'https://www.flat35.com/english/' },
    ],
  },

  CNY: {
    country:    'China',
    regulator:  'PBOC / CBIRC (NFA since 2023)',
    regulation: 'PBOC Differentiated Housing Credit Policy',
    dstiCap:    0.50,
    dstiCapHigh: 0.55,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.80,          // 20% down for first home (relaxed 2023)
    ltvSecond:  0.60,          // 40% down for second home
    ltvNoInsurance: 0.70,
    maxTenureYears: 30,
    minAge:     18,
    maxAgeAtMaturity: 70,      // extended from 65 in some cities (2023)
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'LTV limits vary by city — tier-1 cities are stricter.',
      'First home: 20-30% down payment. Second home: 30-40% down.',
      'Provident Housing Fund (公积金) loans offer lower rates but smaller amounts.',
      'Max age at maturity extended to 70 in many cities since 2023.',
    ],
    lastUpdated: '2025-01-15',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'PBOC Housing Credit Policy', url: 'http://www.pbc.gov.cn/en/3688006/index.html' },
    ],
  },

  HKD: {
    country:    'Hong Kong',
    regulator:  'HKMA (Hong Kong Monetary Authority)',
    regulation: 'HKMA Mortgage Supervisory Policy Manual PM-2',
    dstiCap:    0.50,          // DSR ≤ 50%
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.90,          // with HKMC Mortgage Insurance ≤ HK$10M
    ltvNoInsurance: 0.70,      // without HKMC MIP
    ltvTiers: [
      { upTo: 10000000, ltv: 0.90 },  // ≤ HK$10M with MIP: 90%
      { upTo: 12000000, ltv: 0.80 },  // HK$10-12M: 80%
      { upTo: Infinity, ltv: 0.70 },   // > HK$12M: 70%
    ],
    maxTenureYears: 30,
    minAge:     18,
    maxAgeAtMaturity: null,
    stressTestBuffer: 2.0,     // must pass DSR ≤ 60% at +2%
    stressTestFixedRate: null,
    notes: [
      'DSR ≤ 50%; stress test DSR ≤ 60% at rate + 2%.',
      'HKMC Mortgage Insurance: up to 90% LTV for properties ≤ HK$10M.',
      'Stamp duty surcharges for non-permanent residents (15-30%).',
      'Income proof requirements are strict for self-employed.',
    ],
    lastUpdated: '2025-02-01',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'HKMA Property Mortgage SPM PM-2', url: 'https://www.hkma.gov.hk/eng/regulatory-resources/regulatory-guides/supervisory-policy-manual/' },
      { label: 'HKMC Mortgage Insurance Programme', url: 'https://www.hkmc.com.hk/eng/our_business/mortgage_insurance_programme.html' },
    ],
  },

  KRW: {
    country:    'South Korea',
    regulator:  'FSC / FSS',
    regulation: 'DSR (Debt Service Ratio) Regulation Phase 3',
    dstiCap:    0.40,          // DSR ≤ 40% all-in (all loans)
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.70,          // non-regulated areas
    ltvRegulated: 0.40,        // speculative overheated zones (Seoul Gangnam etc.)
    ltvNoInsurance: 0.70,
    maxTenureYears: 40,        // extended from 30 in 2023
    minAge:     19,            // Korean age of majority
    maxAgeAtMaturity: null,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'DSR ≤ 40% — includes ALL loan repayments (not just mortgage).',
      'LTV in speculative zones (Seoul): 40%. Regulated zones: 50%. Others: 70%.',
      'First-time buyers may get up to 70% even in regulated zones (since 2023 relaxation).',
      'Jeonse loans (deposit rental) count toward DSR.',
    ],
    lastUpdated: '2025-01-20',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'FSC DSR Regulation', url: 'https://www.fsc.go.kr/eng/po020101' },
    ],
  },

  SGD: {
    country:    'Singapore',
    regulator:  'MAS (Monetary Authority of Singapore)',
    regulation: 'MAS Notice 645 / TDSR Framework',
    dstiCap:    0.55,          // TDSR ≤ 55%
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    msrCap:     0.30,          // MSR ≤ 30% for HDB flats
    ltvCap:     0.75,          // bank loan, first property
    ltvHDB:     0.80,          // HDB loan
    ltvSecond:  0.45,          // second property
    ltvNoInsurance: 0.75,
    maxTenureYears: 30,        // private; 25 for HDB
    maxTenureHDB: 25,
    minAge:     21,
    maxAgeAtMaturity: 65,
    stressTestBuffer: 0,
    stressTestFixedRate: 4.0,  // medium-term rate for variable-rate stress test
    notes: [
      'TDSR ≤ 55%: all monthly debt obligations / gross monthly income.',
      'MSR ≤ 30% for HDB flat purchases (mortgage only / income).',
      'LTV: 75% first property (bank), 45% second property.',
      'HDB loans: 80% LTV, 25-year max, must be Singapore Citizens.',
      'Medium-term interest rate of 4% used for stress testing variable-rate loans.',
    ],
    lastUpdated: '2025-01-15',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'MAS Notice 645 (TDSR)', url: 'https://www.mas.gov.sg/regulation/notices/notice-645' },
      { label: 'HDB Housing Loan Info', url: 'https://www.hdb.gov.sg/residential/buying-a-flat/financing-a-flat-purchase/housing-loan-from-hdb' },
    ],
  },

  AUD: {
    country:    'Australia',
    regulator:  'APRA / ASIC',
    regulation: 'APRA APG 223 (Residential Mortgage Lending)',
    dstiCap:    0.45,          // no statutory cap; banks use ~35-45%
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.95,          // with LMI (Lenders Mortgage Insurance)
    ltvNoInsurance: 0.80,
    maxTenureYears: 30,
    minAge:     18,
    maxAgeAtMaturity: null,    // lenders assess individually
    stressTestBuffer: 3.0,     // APRA mandated +3% serviceability buffer
    stressTestFixedRate: null,
    notes: [
      'APRA serviceability buffer: qualify at contract rate + 3%.',
      'LTV > 80% requires Lenders\' Mortgage Insurance (LMI) — one-off premium.',
      'First Home Guarantee (FHBG): 5% deposit with no LMI (gov scheme).',
      'DTI > 6× is flagged as high-risk by APRA; some banks hard-cap at 6×.',
    ],
    lastUpdated: '2025-02-01',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'APRA APG 223', url: 'https://www.apra.gov.au/residential-mortgage-lending' },
      { label: 'First Home Guarantee (NHFIC)', url: 'https://www.housingaustralia.gov.au/support-buy-home/first-home-guarantee' },
    ],
  },

  MYR: {
    country:    'Malaysia',
    regulator:  'BNM (Bank Negara Malaysia)',
    regulation: 'BNM Policy Document on Responsible Financing',
    dstiCap:    0.60,          // DSR ≤ 60-70% varies by bank
    dstiCapHigh: 0.70,
    dstiHighIncomeThreshold: 5000, // MYR/month — higher DSR allowed above this
    ltvCap:     0.90,          // first 2 properties
    ltvThirdPlus: 0.70,        // 3rd property onwards
    ltvNoInsurance: 0.90,
    maxTenureYears: 35,
    minAge:     18,
    maxAgeAtMaturity: 70,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'DSR ≤ 60% typical; up to 70% for higher-income borrowers.',
      'First 2 homes: up to 90% LTV. Third home onwards: max 70% LTV.',
      'Islamic financing (Musharakah Mutanaqisah) is widely used alongside conventional.',
      'RPGT (Real Property Gains Tax) applies on disposal within 5 years.',
    ],
    lastUpdated: '2024-12-01',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'BNM Responsible Financing Policy', url: 'https://www.bnm.gov.my/documents/20124/938039/PD_Responsible+Financing.pdf' },
    ],
  },

  IDR: {
    country:    'Indonesia',
    regulator:  'OJK / BI (Bank Indonesia)',
    regulation: 'BI Regulation on LTV Ratio for Property Credit (PBI)',
    dstiCap:    0.40,          // ≤ 30-40% typical
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     1.00,          // first home — 100% (relaxed 2023)
    ltvSecond:  0.80,
    ltvThirdPlus: 0.70,
    ltvNoInsurance: 0.80,
    maxTenureYears: 25,
    minAge:     21,
    maxAgeAtMaturity: 65,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'First home: up to 100% LTV (relaxed since 2023 to stimulate housing).',
      'Second home: 80% LTV. Third+: 70% LTV.',
      'FLPP (subsidised housing) program for low-income first-time buyers.',
      'Self-employed face stricter documentation requirements.',
    ],
    lastUpdated: '2025-01-01',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'BI LTV Regulation', url: 'https://www.bi.go.id/en/publikasi/peraturan/default.aspx' },
    ],
  },

  THB: {
    country:    'Thailand',
    regulator:  'BOT (Bank of Thailand)',
    regulation: 'BOT Notification on LTV Measures for Housing Loans',
    dstiCap:    0.40,          // 40-50% bank-dependent
    dstiCapHigh: 0.50,
    dstiHighIncomeThreshold: null,
    ltvCap:     1.00,          // first home ≤ ฿10M
    ltvTiers: [
      { upTo: 10000000, ltv: 1.00, note: 'First home ≤ ฿10M' },
      { upTo: Infinity, ltv: 0.90, note: 'First home > ฿10M' },
    ],
    ltvSecond:  0.80,
    ltvNoInsurance: 0.90,
    maxTenureYears: 30,
    minAge:     20,
    maxAgeAtMaturity: 65,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'First home ≤ ฿10M: up to 100% LTV. First home > ฿10M: up to 90%.',
      'Second home: 80% (or 90% if first home EMI paid 2+ years).',
      'Foreigners cannot own land; condo ownership limited to 49% of building.',
    ],
    lastUpdated: '2024-11-15',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'BOT LTV Measures', url: 'https://www.bot.or.th/en/financial-innovation/financial-landscape.html' },
    ],
  },

  /* ────────────────── Middle East & Africa ────────────────── */

  AED: {
    country:    'UAE',
    regulator:  'CBUAE (Central Bank of UAE)',
    regulation: 'CBUAE Regulation on Mortgage Loans (2013, amended 2023)',
    dstiCap:    0.50,          // DBR ≤ 50% (Debt Burden Ratio)
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     0.80,          // UAE nationals, first property ≤ AED 5M
    ltvExpat:   0.75,          // expatriates, first property ≤ AED 5M
    ltvHighValue: 0.65,        // expat, property > AED 5M
    ltvNoInsurance: 0.75,
    maxTenureYears: 25,
    minAge:     21,
    maxAgeAtMaturity: 65,      // employed; 70 for self-employed
    maxAgeAtMaturitySelf: 70,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'DBR ≤ 50% of gross monthly income (all debts included).',
      'UAE nationals: 80% LTV first home (≤ AED 5M), 70% (> AED 5M).',
      'Expatriates: 75% LTV first (≤ AED 5M), 65% (> AED 5M).',
      'Second property: additional 5% LTV haircut from above limits.',
      'Non-resident investors: max 50% LTV.',
    ],
    lastUpdated: '2025-01-20',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'CBUAE Mortgage Regulations', url: 'https://www.centralbank.ae/en/legislation' },
    ],
  },

  SAR: {
    country:    'Saudi Arabia',
    regulator:  'SAMA (Saudi Central Bank)',
    regulation: 'SAMA Responsible Finance Regulation & Real Estate Finance Law',
    dstiCap:    0.55,
    dstiCapHigh: 0.65,
    dstiHighIncomeThreshold: 25000, // SAR/month
    ltvCap:     0.90,          // first home (since 2020 update)
    ltvSecond:  0.70,
    ltvNoInsurance: 0.90,
    maxTenureYears: 30,
    minAge:     21,
    maxAgeAtMaturity: 65,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'DBR ≤ 55% of gross monthly income; up to 65% if income > SAR 25K/month.',
      'First home: up to 90% LTV; second property: 70%.',
      'Sakani program & "Real Estate Development Fund" offer subsidies for first-time buyers.',
      'Mortgage market rapidly expanding post-2017 reforms (Vision 2030).',
    ],
    lastUpdated: '2025-01-10',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'SAMA Responsible Finance Principles', url: 'https://www.sama.gov.sa/en-us/Laws/Pages/ConsumerProtection.aspx' },
    ],
  },

  ZAR: {
    country:    'South Africa',
    regulator:  'SARB / FSCA',
    regulation: 'National Credit Act (NCA) 34 of 2005',
    dstiCap:    0.30,          // typical; NCA mandates "affordability assessment"
    dstiCapHigh: null,
    dstiHighIncomeThreshold: null,
    ltvCap:     1.00,          // 100% bonds common for strong profiles
    ltvNoInsurance: 0.80,
    maxTenureYears: 30,
    minAge:     18,
    maxAgeAtMaturity: 70,
    stressTestBuffer: 2.0,
    stressTestFixedRate: null,
    notes: [
      'NCA mandates affordability assessment — no fixed DTI cap but 30% is industry standard.',
      '100% home loans (no deposit) common but require strong credit score.',
      'Transfer duty applies above ZAR 1.1M property value.',
      'FLISP program: first-time buyer subsidy for income R 3,501-22,000/month.',
    ],
    lastUpdated: '2024-12-01',
    incomeType:  'gross',  // DSTI calculated on gross income per regulation
    sourceUrls: [
      { label: 'National Credit Act 34 of 2005', url: 'https://www.ncr.org.za/documents/pages/National-Credit-Act/national-credit-act.html' },
    ],
  },

  NGN: {
    country:    'Nigeria',
    regulator:  'CBN / FMBN (Federal Mortgage Bank)',
    regulation: 'National Housing Fund (NHF) Act & CBN Prudential Guidelines',
    dstiCap:    0.33,          // NHF: ≤ 33% of net income
    dstiCapHigh: 0.40,         // commercial banks
    dstiHighIncomeThreshold: null,
    ltvCap:     0.90,          // NHF scheme
    ltvCommercial: 0.75,
    ltvNoInsurance: 0.75,
    maxTenureYears: 30,        // NHF; commercial typically 10-20
    maxTenureCommercial: 20,
    minAge:     21,
    maxAgeAtMaturity: 60,
    stressTestBuffer: 0,
    stressTestFixedRate: null,
    notes: [
      'NHF scheme: DTI ≤ 33% of net income, up to 90% LTV, 30-year max.',
      'Commercial mortgage: DTI ≤ 40%, LTV 75%, tenure 10-20 years.',
      'NHF contribution: 2.5% of basic salary for participants.',
      'Very high interest rates (18-25%) make mortgage market small.',
    ],
    lastUpdated: '2024-11-01',
    incomeType:  'net',  // DSTI calculated on net income per regulation
    sourceUrls: [
      { label: 'FMBN NHF Guidelines', url: 'https://www.fmbn.gov.ng/nhf/' },
      { label: 'CBN Prudential Guidelines', url: 'https://www.cbn.gov.ng/documents/prudentialguidelines.asp' },
    ],
  },
};


/* ── Core Eligibility Computation ─────────────────────────────────────── */

/**
 * Compute mortgage eligibility based on country-specific regulations.
 *
 * @param {Object} p
 * @param {number} p.monthlyIncome   Monthly income — gross or net depending on country (see incomeType)
 * @param {number} p.existingEMIs         Sum of existing monthly debt obligations
 * @param {number} p.propertyValue        Property purchase price / market value
 * @param {number} p.age                  Borrower's current age in years
 * @param {number} p.interestRate         Expected annual interest rate (%, e.g. 7.5)
 * @param {number} p.desiredTenureYears   Desired loan tenure in years
 * @param {string} p.currencyCode         Currency code (key into ELIG_RULES & CUR)
 * @param {string} [p.employmentType]     'salaried' | 'self-employed' (affects some countries)
 * @param {boolean}[p.isFirstHome]        true = first property (affects LTV in many countries)
 * @returns {Object}
 */
function computeEligibility(p) {
  const rules = ELIG_RULES[p.currencyCode];
  if (!rules) {
    return {
      eligible: false,
      error: `No eligibility rules available for currency ${p.currencyCode}.`,
      warnings: [`Loan eligibility data is not available for the selected currency.`],
    };
  }

  const warnings = [];
  const isSelf = p.employmentType === 'self-employed';
  const isFirst = p.isFirstHome !== false; // default true

  /* ─ 1. Determine effective DSTI cap ────── */
  let dstiCap = rules.dstiCap;
  if (rules.dstiCapHigh && rules.dstiHighIncomeThreshold && p.monthlyIncome >= rules.dstiHighIncomeThreshold) {
    dstiCap = rules.dstiCapHigh;
  } else if (rules.dstiCapHigh && !rules.dstiHighIncomeThreshold) {
    // dstiCapHigh available but no income threshold — use conservative (lower) cap
    dstiCap = rules.dstiCap;
  }
  // UK uses income multiplier instead of DSTI
  const useIncomeMultiplier = !!rules.incomeMultiplier;

  /* ─ 2. Max EMI from income ────── */
  const maxEMI = Math.max(0, p.monthlyIncome * dstiCap - p.existingEMIs);
  if (maxEMI <= 0) {
    warnings.push('Existing debt obligations already exceed or consume your DSTI limit. No room for a new mortgage.');
  }

  /* ─ 3. Effective tenure ────── */
  let maxAgeMaturity = rules.maxAgeAtMaturity;
  if (isSelf && rules.maxAgeAtMaturitySelf) maxAgeMaturity = rules.maxAgeAtMaturitySelf;
  let maxTenure = rules.maxTenureYears;
  let tenureFromAge = maxTenure;
  if (maxAgeMaturity && p.age) {
    tenureFromAge = Math.max(0, maxAgeMaturity - p.age);
    if (tenureFromAge < maxTenure) {
      warnings.push(`Age constraint: max tenure reduced to ${tenureFromAge} years (retirement at ${maxAgeMaturity}).`);
    }
  }
  const effectiveTenure = Math.min(p.desiredTenureYears || maxTenure, maxTenure, tenureFromAge);
  if (effectiveTenure <= 0) {
    warnings.push('Effective loan tenure is zero — borrower age exceeds maximum age at maturity.');
    return { eligible: false, effectiveTenure: 0, warnings, rulesUsed: rules };
  }

  /* ─ 4. Stress-tested interest rate ────── */
  let calcRate = p.interestRate;
  if (rules.stressTestFixedRate) {
    calcRate = Math.max(calcRate, rules.stressTestFixedRate);
    if (calcRate > p.interestRate) {
      warnings.push(`Affordability stress-tested at ${calcRate}% (regulatory floor) instead of ${p.interestRate}%.`);
    }
  }
  if (rules.stressTestBuffer) {
    calcRate = Math.max(calcRate, p.interestRate + rules.stressTestBuffer);
    if (rules.stressTestBuffer > 0) {
      warnings.push(`Affordability stress-tested at ${(p.interestRate + rules.stressTestBuffer).toFixed(2)}% (contract + ${rules.stressTestBuffer}% buffer).`);
    }
  }

  /* ─ 5. Max loan from DSTI / income multiplier ────── */
  const r = calcRate / 100 / 12;
  const n = effectiveTenure * 12;
  let maxLoanDSTI;

  if (useIncomeMultiplier) {
    // UK-style: min of income-multiplier-based and DSTI-based
    const fromMultiplier = p.monthlyIncome * 12 * rules.incomeMultiplier;
    if (r > 0 && n > 0) {
      const emiPerUnit = r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const fromDSTI = maxEMI / emiPerUnit;
      maxLoanDSTI = Math.min(fromMultiplier, fromDSTI);
    } else {
      maxLoanDSTI = fromMultiplier;
    }
  } else {
    if (r > 0 && n > 0) {
      const emiPerUnit = r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      maxLoanDSTI = maxEMI / emiPerUnit;
    } else if (r === 0 && n > 0) {
      maxLoanDSTI = maxEMI * n; // zero-rate edge case
    } else {
      maxLoanDSTI = 0;
    }
  }

  /* ─ 6. LTV-based max loan ────── */
  let effectiveLTV = rules.ltvCap;
  // Tiered LTV (India, HK, Thailand)
  if (rules.ltvTiers && p.propertyValue) {
    for (const tier of rules.ltvTiers) {
      if (p.propertyValue <= tier.upTo) { effectiveLTV = tier.ltv; break; }
    }
  }
  // Expat/national distinction (UAE)
  // For simplicity use the general cap unless we add a UI field for residency
  // Second home override
  if (!isFirst) {
    if (rules.ltvSecond != null) effectiveLTV = rules.ltvSecond;
    else if (rules.ltvSecondary != null) effectiveLTV = rules.ltvSecondary;
  }

  const maxLoanLTV = p.propertyValue * effectiveLTV;
  const minDownPayment = p.propertyValue * (1 - effectiveLTV);

  /* ─ 7. Total debt-to-income check (Norway, Sweden, Denmark) ────── */
  if (rules.totalDebtToIncomeMax) {
    const annualIncome = p.monthlyIncome * 12;
    const maxTotalDebt = annualIncome * rules.totalDebtToIncomeMax;
    // Assume existing debts are recurring; estimate outstanding balance roughly
    // as existingEMI * remaining months (use 180 as proxy). This is a simplification.
    const existingDebtEstimate = p.existingEMIs * 180;
    const maxNewLoanFromTDTI = Math.max(0, maxTotalDebt - existingDebtEstimate);
    if (maxNewLoanFromTDTI < maxLoanDSTI) {
      warnings.push(`Total debt must not exceed ${rules.totalDebtToIncomeMax}× gross annual income.`);
      maxLoanDSTI = Math.min(maxLoanDSTI, maxNewLoanFromTDTI);
    }
  }

  /* ─ 8. Requested loan (factoring in own contribution) ────── */
  const ownContribution = Math.max(0, p.ownContribution || 0);
  const requestedLoan = Math.max(0, p.propertyValue - ownContribution);
  if (ownContribution > 0 && ownContribution < minDownPayment) {
    warnings.push(`Your contribution (${ownContribution.toLocaleString()}) is below the minimum down payment (${Math.round(minDownPayment).toLocaleString()}) required by ${(1 - effectiveLTV) * 100}% LTV rules.`);
  }

  /* ─ 9. Binding constraint ────── */
  const eligibleLoan = Math.max(0, Math.min(maxLoanDSTI, maxLoanLTV, requestedLoan));
  let bindingConstraint;
  if (requestedLoan <= maxLoanDSTI && requestedLoan <= maxLoanLTV) bindingConstraint = 'contribution';
  else if (maxLoanDSTI <= maxLoanLTV) bindingConstraint = 'income';
  else bindingConstraint = 'property-value';

  /* ─ 10. Actual EMI for eligible loan ────── */
  const actualR = p.interestRate / 100 / 12;
  let actualEMI = 0;
  if (actualR > 0 && n > 0) {
    actualEMI = eligibleLoan * actualR * Math.pow(1 + actualR, n) / (Math.pow(1 + actualR, n) - 1);
  } else if (n > 0) {
    actualEMI = eligibleLoan / n;
  }

  const actualDSTI = p.monthlyIncome > 0 ? (actualEMI + p.existingEMIs) / p.monthlyIncome : 0;
  const actualLTV = p.propertyValue > 0 ? eligibleLoan / p.propertyValue : 0;
  const totalInterest = actualEMI * n - eligibleLoan;

  /* ─ 11. Recommended-tenure warning (Poland) ────── */
  if (rules.recommendedMaxTenure && effectiveTenure > rules.recommendedMaxTenure) {
    warnings.push(`KNF recommends ≤ ${rules.recommendedMaxTenure} years for creditworthiness — your ${effectiveTenure} years may receive stricter scrutiny.`);
  }

  /* ─ 12. Age warnings ────── */
  if (p.age < rules.minAge) {
    warnings.push(`Minimum borrower age is ${rules.minAge} in ${rules.country}.`);
  }

  return {
    eligible:          eligibleLoan > 0,
    eligibleLoan:      Math.round(eligibleLoan),
    maxLoanDSTI:       Math.round(maxLoanDSTI),
    maxLoanLTV:        Math.round(maxLoanLTV),
    maxEMI:            Math.round(maxEMI),
    actualEMI:         Math.round(actualEMI),
    effectiveTenure,
    effectiveLTV,
    dstiCapUsed:       dstiCap,
    actualDSTI:        Math.round(actualDSTI * 10000) / 10000,  // 4 decimal precision
    actualLTV:         Math.round(actualLTV * 10000) / 10000,
    requestedLoan:     Math.round(requestedLoan),
    minDownPayment:    Math.round(minDownPayment),
    totalInterest:     Math.round(totalInterest),
    totalPayment:      Math.round(actualEMI * n),
    calcRate,
    bindingConstraint,
    warnings,
    rulesUsed:         rules,
  };
}

/**
 * Get a human-readable country (or region) label for a currency code.
 */
function getCountryForCurrency(code) {
  return ELIG_RULES[code]?.country || 'Unknown';
}

/**
 * Return a compact summary of key regulations for the given currency.
 * Useful for displaying in the UI.
 */
function getRegulationSummary(code) {
  const r = ELIG_RULES[code];
  if (!r) return null;
  return {
    country:    r.country,
    regulator:  r.regulator,
    regulation: r.regulation,
    dstiCap:    r.dstiCap,
    ltvCap:     r.ltvCap,
    maxTenure:  r.maxTenureYears,
    lastUpdated: r.lastUpdated,
    incomeType:  r.incomeType || 'gross',
    notes:      r.notes,
  };
}
