# Fiscal Transfers, Poverty, Inequality, and Consumption Composition

**[Interactive results site](https://smkwray.github.io/ea-ineq/)**

This archive examines whether fiscal transfer shocks reduce poverty, narrow inequality, and shift the balance of household spending toward essentials. It uses local projections, debiased machine learning, and a multi-layer screening pipeline to separate robust findings from noise.

The main story is transfer-led poverty and inequality relief. The consumption-composition block matters, but it is secondary.

This archive now also packages a public bridge surface for comparison to `fp-ineq`.

## Current Snapshot

| Metric | Count |
|---|---|
| Robust headline rows (q ≤ 0.10) | 11 |
| Transfer-composite rows | 10 of 11 |
| Distinct outcome families | 5 |
| Robust consumption rows | 2 |
| Ready confirmatory rows | 1 |
| DASS estimators available | LP, DML, TMLE, CF, LP-IV, DML-IV |

Cross-check: `python3 docs/embed_data.py` computes these counts from the packaged results and prints them to stdout. If the numbers above drift from the build output, update them here.

## Evidence Hierarchy

The archive ranks transfer programs by the strength and breadth of their evidence:

1. **Headline: Transfer Composite.** Dominant signal across all poverty and inequality outcomes. Ten of eleven robust rows. Covers overall poverty, child poverty, household Gini, and the top-1%-versus-bottom-50% wealth-share gap at multiple horizons.

2. **Strong internal bridge within this archive: UI Benefits.** Appears in both the distributional-outcomes suite (Gini, wealth-share gap) and the consumption-composition suite (essential-versus-discretionary gap and essential spending share). This cross-suite presence makes it the most credible individual program result inside `ea-ineq`; it should not be read by itself as cross-repo validation.

3. **Stable suggestive: SNAP Participation.** Near the FDR boundary in the main DFLMX screen (best row: overall poverty at h = 4, q = 0.26). Survives targeted DASS shock diagnostics. Not a headline result, but stable enough to note.

4. **Method-dependent / appendix: Social Security.** Shows support in DASS (especially DML in shock mode) but does not survive LP-based DFLMX screening. Should not be promoted to headline.

## Headline Results

| Treatment | Outcome | Horizons (quarters) | Role |
|---|---|---|---|
| Transfer Composite | Household Gini | 2, 4, 8 | Strongest inequality signal |
| Transfer Composite | Overall Poverty Rate | 2, 4 | Strong poverty headline |
| Transfer Composite | Child Poverty Rate | 2, 4 | Strong child poverty headline |
| Transfer Composite | Top 1% vs Bottom 50% Wealth Gap | 2, 4 | Transfer-led wealth-gap signal |
| Transfer Composite | Median Real Income | 8 | Supporting income row |
| Household Net Worth | Top 1% vs Bottom 50% Wealth Gap | 2 | Strongest non-transfer robust row |

## Consumption Results

The canon v2 basket (ported from ea-gender) produces **2 robust rows**, both from UI benefits at one quarter out:

- UI benefits shifts the essential-to-discretionary spending gap
- UI benefits raises the essential spending share

This is meaningful but narrower than the main transfer-poverty headline.

## Cross-Repo Bridge

This archive now packages a public bridge layer that aligns `ea-ineq` to `fp-ineq` on the same three transfer channels and the same three horizons.

Bridge channels:

- `ui`
- `broad_federal_transfers`
- `transfer_composite`

Bridge horizons:

- `2`
- `4`
- `8`

Archived bridge artifacts:

- `results/bridge/bridge_results.csv`
- `results/bridge/bridge_metadata.json`
- `results/bridge/fp_bridge_results.csv`
- `results/bridge/fp_bridge_metadata.json`
- `results/bridge/cross_repo_bridge_long.csv`
- `results/bridge/cross_repo_bridge_compare.csv`
- `results/bridge/cross_repo_bridge_metadata.json`

Bridge-specific result trees:

- `results/dass/poverty_outcomes_bridge/`
- `results/dflmx/poverty_outcomes_bridge/`

Important limitation:

- `ea-ineq` still does not expose direct `TRLOWZ` or `RYDPC` analogs
- bridge rows therefore use `dose_metric = native_shock_unit` and leave `delta_trlowz` / `delta_rydpc` blank
- `fp-ineq` remains the normalized side of the current bridge because it already publishes `delta_trlowz`
- the current side-by-side compare uses temporary representative `fp-ineq` anchor scenarios rather than full `fp-ineq` channel envelopes
- the current bridge remains public, but it should be read as infrastructure-ready and interpretation-limited until the bridge polarity audit is complete

The interactive site now includes a Bridge section that surfaces the side-by-side comparison directly, but the table is currently a diagnostic scaffold rather than evidence of cross-repo agreement or disagreement.

## Confirmatory Status

Confirmatory coverage remains thin:

- Most headline rows are screening-only (survive DFLMX but lack IV/negative-control support)
- One row achieves ready-confirmatory status: Transfer Composite → Top 1% vs Bottom 50% Wealth Gap at h = 4

The archive supports a strong screening claim and a weaker confirmatory claim.

## How to Read the Archive

This repository is richest when read as a two-layer evidence stack:

- **DFLMX** is the screening layer. It ranks LP impulse-response rows, applies BH-FDR correction, and runs lead, episode leave-one-out, and confirmatory diagnostics.
- **DASS** is the estimation layer underneath it. It preserves estimator-specific rows (LP, DML, TMLE, CF, LP-IV, DML-IV) for the same treatment-outcome-horizon combinations.

A row can survive the DFLMX screen and still have mixed cross-estimator support. The site shows both the headline screen and the estimator backing.

## Quick Start

Regenerate the data layer and preview the site:

```bash
python3 scripts/compare_bridge_exports.py  # refresh cross-repo bridge comparison tables
python3 docs/embed_data.py       # writes docs/data.js from packaged results
python3 -m http.server -d docs   # preview at http://localhost:8000
```

## Repository Layout

- `configs/` — packaged fetch, DASS, and DFLMX configs
- `inputs/` — compact source snapshots
- `results/coflow/` — CoFlow publication-gate outputs
- `results/dass/` — estimation-layer outputs (LP, DML, TMLE, CF, LP-IV, DML-IV)
- `results/dflmx/` — screening-layer outputs (headline, robustness, confirmatory)
- `results/bridge/` — cross-repo bridge exports and archived `fp-ineq` bridge inputs
- `scripts/` — bridge export and comparison helpers
- `docs/` — static archive site; `embed_data.py` regenerates `data.js`

## Packaged Runs

- **Full Outcomes** — richest run with all six DASS estimators and the repaired IV/negative-control layer
- **Baseline Outcomes** — cleaner baseline screen with LP and DML
- **Consumption Baseline** — canon v2 spending-basket run for the secondary consumption question
- **Bridge Outcomes** — reduced comparison surface for `ui_benefits`, `transfers_total`, and `transfer_composite_fp`

The bridge layer is additive. It does not replace or overwrite the existing baseline or full packaged result trees.

## Framework Provenance

Built on [econark](https://github.com/smkwray/econark)'s R pipeline. Required runtime and confirmatory-plumbing fixes were upstreamed at commit `7cb68eb`.

This repository is the project archive, not the reusable framework repository.
