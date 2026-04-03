# Fiscal Transfers, Poverty, Inequality, and Consumption Composition

This archive contains the project-specific `econark-r` configurations, compact source-input snapshots, and packaged CoFlow/DASS/DFLMX outputs for an inequality-and-poverty project built on `econark`'s R pipeline. The archive is organized around two linked questions:

- Do transfer shocks move poverty and inequality outcomes over short and medium horizons?
- Under a canon `v2` consumption basket, do transfers and credit conditions shift the balance between essential and discretionary spending?

The strongest archived evidence is in the poverty/inequality outcomes suite, where `transfer_composite` dominates the robust screening results. The canon `v2` basket materially improves the consumption-composition side, but that block remains secondary to the transfer-outcomes story.

## Project Questions

- Transfer shocks and poverty: do `transfer_composite`, `ui_benefits`, `social_security`, and `snap_persons` shift `poverty_all_q`, `poverty_child_q`, and `gini_households_q`?
- Wealth and inequality: how do `household_networth` and `home_equity` map into `wealth_share_gap_top10_bottom50` and `wealth_share_gap_top1_bottom50`?
- Monetary and credit contrasts: how do `fed_funds`, `credit_composite`, `revolving_credit`, and `cc_delinquency` compare with transfer shocks?
- Consumption composition under the canon `v2` basket: do shocks move `pce_essential_v2_idx`, `pce_discretionary_v2_idx`, `pce_gap_v2`, and `pce_eshare_v2`?
- Confirmatory screening: which treatment-outcome pairs survive the repaired IV/negative-control discovery layer, and which remain screening-only?

## Data And Variable Construction

The compact input snapshots live in `inputs/`:

- `research_poverty_monthly.csv`
- `research_poverty_annual.csv`
- `research_poverty_fred_ext.csv`
- `research_poverty_recreation_goods.csv`

The active fetch, DASS, and DFLMX specifications are stored in `configs/`. The archive preserves both full and baseline profiles for the poverty-consumption and poverty-outcomes suites.

Main constructed variables are:

- `pce_essential_v2_idx`: CE-weighted essential basket using housing/utilities, food, and healthcare.
- `pce_discretionary_v2_idx`: symmetric CE-weighted discretionary basket using recreation services, transport services, and clothing/footwear.
- `pce_gap_v2 = log(E/D)`.
- `pce_eshare_v2 = E / (E + D)`.
- `transfer_composite = transfers_total + social_security + ui_benefits`.
- `credit_composite = total_credit + nonrevolving_credit + revolving_credit`.
- `wealth_share_gap_top10_bottom50 = top10_wealth_share - bottom50_wealth_share`.
- `wealth_share_gap_top1_bottom50 = top1_wealth_share - bottom50_wealth_share`.

The older `pce_essential_idx` / `pce_discretionary_idx` construction remains in the fetch outputs for backward comparison, but the active archived consumption question grid centers the `v2` outcomes above.

## Results Summary

The archive packages two key runs:

- Baseline both-suites run:
  `results/dass/poverty_consumption_baseline`, `results/dass/poverty_outcomes_baseline`, `results/dflmx/poverty_consumption_baseline`, and `results/dflmx/poverty_outcomes_baseline`
- Full outcomes-suite run:
  `results/dass/poverty_outcomes_full` and `results/dflmx/poverty_outcomes_full`

The canon `v2` basket improves the consumption suite relative to the earlier basket. `results/dflmx/poverty_consumption_baseline/dflmx_report.md` reports two robust rows (`q <= 0.10`), both concentrated in `ui_benefits`: `ui_benefits -> pce_gap_v2 (h=1)` and `ui_benefits -> pce_eshare_v2 (h=1)`.

The outcomes suite remains the headline. `results/dflmx/poverty_outcomes_baseline/dflmx_report.md` reports eleven robust rows, led by `transfer_composite` on `gini_households_q`, `poverty_all_q`, `poverty_child_q`, and `wealth_share_gap_top1_bottom50`. The full outcomes run in `results/dflmx/poverty_outcomes_full/dflmx_report.md` preserves that transfer-led pattern and adds a strong `household_networth -> wealth_share_gap_top1_bottom50 (h=2)` row.

The confirmatory layer is cleaner than before but still limited. The negative-control miner was repaired so outcomes no longer nominate themselves as their own NC candidates. Even so, most transfer-poverty rows remain screening-only because suitable allowlisted negative controls are sparse. In the packaged full outcomes run, the only `ready_confirmatory` row is `transfer_composite -> wealth_share_gap_top1_bottom50 (h=4)` using `F1` with `wealth_share_gap_top10_bottom50` as the screened NC.

## Repository Layout

- `configs/` contains the packaged fetch, DASS, and DFLMX R configs.
- `inputs/` contains the compact source snapshots used by the project-specific fetch config.
- `results/coflow/` contains the packaged CoFlow outputs.
- `results/dass/` contains packaged DASS outputs for the baseline and full runs.
- `results/dflmx/` contains packaged DFLMX outputs for the baseline and full runs.
- `docs/` contains a lightweight static archive site. Run `python docs/embed_data.py` from this archive root to regenerate `docs/data.js`.
- `results_brief_20260403.md` records the April 3, 2026 archive summary.
- `research_wiring_poverty_consumption.md` records the wiring map and question framing.

## Framework Provenance

This archive was produced with a patched local `econark-r` runtime. The validated framework fixes were then prepared for upstreaming into `smkwray/econark`, so the archive should be read as a project built on `econark`'s R pipeline with local April 3, 2026 fixes applied.
