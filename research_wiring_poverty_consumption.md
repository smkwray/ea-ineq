# Poverty-Consumption Wiring Map

This archive packages the poverty/inequality specification using compact local snapshots extracted from the working project.

- The packaged source snapshots live under `inputs/`.

Snapshots packaged in this archive:

- `inputs/research_poverty_monthly.csv`
- `inputs/research_poverty_annual.csv`
- `inputs/research_poverty_fred_ext.csv`
- `inputs/research_poverty_recreation_goods.csv`

## Configs

- Fetch config: `configs/config_fetchr_poverty_consumption.R`
- DASS config: `configs/config_dass_poverty_consumption.R`
- DFLMX config: `configs/config_dflmx_poverty_consumption.R`
- Poverty outcomes suite (same fetchr outputs; different consumer configs):
  - CoFlow outputs archived under `results/coflow/`
  - DASS config: `configs/config_dass_poverty_outcomes.R`
  - DFLMX config: `configs/config_dflmx_poverty_outcomes.R`

## Proposal-to-Series Mapping

- Essential bundle components:
  - `housing_utilities`
  - `food_total`
  - `healthcare_pce`
  - `transport_svcs`
  - `clothing_footwear`
- Discretionary bundle components:
  - `recreation_svcs`
  - `recreation_goods` (from FRED `DREQRC1Q027SBEA` in `research_poverty_recreation_goods.csv`, quarter-end aligned)
  - `pce_durables` (from `PCEDG`)
  - `pce_financial_svcs` (from `FINCP`)
- Fiscal channels:
  - `transfers_total`
  - `social_security`
  - `ui_benefits`
  - `snap_persons`
- Monetary/wealth/credit channels:
  - `fed_funds`
  - `household_networth`
  - `equity_wealth_proxy` (from `dj_index`, used as long-sample equity proxy)
  - `home_equity`
  - `sp500` (kept in fetch outputs but excluded from causal jobs because the available sample starts in 2016 and fails missingness gates)
  - `fhfa_hpi`
  - `total_credit`
  - `nonrevolving_credit`
  - `revolving_credit`
  - `cc_delinquency`
- Distributional annual controls:
  - `gini_households_annual` -> `gini_households_q`
  - `median_hh_income_annual` -> `median_hh_income_q`
  - `poverty_all_annual` -> `poverty_all_q`
  - `poverty_child_annual` -> `poverty_child_q`
- Wealth-share inequality series:
  - `top1_wealth_share` (`WFRBST01134`)
  - `top10_wealth_share` (`WFRBSN09161`)
  - `bottom50_wealth_share` (`WFRBSB50215`)
- Annual income inequality FRED series:
  - `gini_income_fred_annual` (`SIPOVGINIUSA`) -> `gini_income_fred_q`
  - `median_real_income_fred_annual` (`MEHOINUSA672N`) -> `median_real_income_fred_q`

## Poverty/Inequality Outcomes Suite

This suite uses the same `fetchr-R` outputs but treats poverty/inequality series as outcomes (kept intentionally small/defensible):

- Core outcomes (active): `poverty_all_q`, `poverty_child_q`, `gini_households_q`, `median_real_income_fred_q`, `wealth_share_gap_top10_bottom50`, `wealth_share_gap_top1_bottom50`
- Headline treatments (active): `transfer_composite`, `ui_benefits`, `social_security`, `snap_persons`
- Secondary contrast treatments: `fed_funds` (shock), `credit_composite`, `revolving_credit`, `cc_delinquency`, `household_networth`, `home_equity`

### Question framing (current active design)

- `transfers-basic`: do fiscal transfers move poverty/inequality outcomes over short horizons?
- `program decomposition`: do `ui_benefits`, `social_security`, and `snap_persons` line up with the transfer-composite signal?
- `rates/credit contrast`: do `fed_funds`, `credit_composite`, and delinquency variables behave differently from transfer shocks?
- `wealth distribution contrast`: do `household_networth` and `home_equity` move the wealth-gap outcomes without matching the poverty results?
- `confirmatory/placebo structure`: DFLMX now restricts negative-control discovery to allowlisted wealth-gap outcomes instead of letting outcomes self-nominate as their own NC candidates.

## Derived Outcomes

- `pce_essential_idx`
- `pce_discretionary_idx`
- `pce_fcsu_idx`
- `pce_essential_cex_idx`
- `pce_discretionary_cex_idx`
- `pce_essential_v2_idx`
- `pce_discretionary_v2_idx`
- `pce_gap_v2`
- `pce_eshare_v2`

### Discretionary Calibration (Final)

- Included discretionary block base shares (top-quintile design prior):
  - recreation services: `0.06`
  - recreation goods: `0.04`
  - durables: `0.12`
  - financial services: `0.04`
- Final `pce_discretionary_idx` uses normalized included-block weights (sum to 1):
  - recreation services: `0.2307692308`
  - recreation goods: `0.1538461538`
  - durables: `0.4615384615`
  - financial services: `0.1538461538`
- Final `pce_discretionary_cex_idx` splits `w_entertainment_q` into:
  - `60%` recreation services
  - `40%` recreation goods

### Canon V2 Basket (ported from `ea-gender` logic)

- `pce_essential_v2_idx` is the CE-weighted essential basket:
  - housing/utilities
  - food
  - healthcare
- `pce_discretionary_v2_idx` is the symmetric CE-weighted discretionary basket:
  - recreation services
  - transport services
  - clothing/footwear
- `pce_gap_v2 = log(E/D)`
- `pce_eshare_v2 = E / (E + D)`

This v2 basket is the active headline consumption construction for the poverty/inequality project. The older `pce_essential_idx` / `pce_discretionary_idx` remain in the fetch outputs for backward comparison, but the active DASS/DFLMX question grid now centers the v2 outcomes.

## Derived Treatments

- `transfer_composite`
- `credit_composite`

## Archive Note

This is a packaged archive, not a standalone runtime tree. Use `results/` for the archived outputs, `configs/` for the packaged specifications, and `results_brief_20260403.md` for the April 3, 2026 summary.
