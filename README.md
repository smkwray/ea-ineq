# Fiscal Transfers, Poverty, Inequality, and Consumption Composition

**[Interactive results site](https://smkwray.github.io/ea-ineq/)**

This repository is the project-specific archive for an inequality-and-poverty research workflow built on [`econark`](https://github.com/smkwray/econark)'s R pipeline. It packages the compact input snapshots, the project configs, and the native DASS and DFLMX result trees for a simple question with a layered answer:

- Do transfer shocks move poverty and inequality outcomes?
- If they do, how broad is the evidence after screening, robustness checks, and estimator comparison?
- And, as a secondary question, do those same shocks tilt household spending toward essentials under a standardized essential-versus-discretionary basket?

The main story is transfer-led poverty and inequality relief. The consumption-composition block matters, but it is secondary.

## Project Questions

1. **Transfers and poverty.** Do broad transfer shocks -- combining government transfers, Social Security, and unemployment insurance -- reduce the overall poverty rate, the child poverty rate, and household inequality?
2. **Wealth and inequality.** Do transfer, wealth, and credit shocks narrow the gap between top and bottom wealth shares?
3. **Consumption composition.** Under a standardized essential/discretionary spending basket, do shocks shift the balance from discretionary spending (recreation, transport, clothing) toward essentials (housing, food, healthcare)?
4. **Contrast questions.** How do the Fed funds rate, credit conditions, and household net worth compare with the transfer block?
5. **Confirmatory status.** Which findings survive only the main screening stack, and which have actual IV/negative-control support?

## How to Read the Archive

This repository is richest when read as a two-layer evidence stack.

- **DFLMX** is the screening layer. It ranks local-projection (LP) impulse-response rows, applies FDR correction, and runs lead, episode leave-one-out, and confirmatory diagnostics.
- **DASS** is the estimation layer underneath it. It preserves the estimator-specific rows for the same treatment-outcome-horizon combinations, including LP, debiased machine learning (DML), targeted maximum likelihood (TMLE), causal forests (CF), LP-IV, and DML-IV.

That distinction matters. A row can survive the DFLMX screen and still have mixed cross-estimator support. The site and this README are built to show both the headline screen and the estimator backing for the same findings.

## Headline Results

The full outcomes run reports **11 robust rows** (q ≤ 0.10 after FDR correction). **9 of those 11** come from the broad transfer composite, and they cover four distinct outcome families:

| Treatment | Outcome | Horizons | Archive role |
|---|---|---|---|
| Transfer Composite | Household Gini (quarterly inequality) | h = 2, 4, 8 | Strongest inequality signal |
| Transfer Composite | Overall Poverty Rate (quarterly) | h = 2, 4 | Strong poverty headline |
| Transfer Composite | Child Poverty Rate (quarterly) | h = 2, 4 | Strong child-poverty headline |
| Transfer Composite | Top 1% vs Bottom 50% Wealth Gap | h = 2, 4 | Transfer-led wealth-gap signal |
| Transfer Composite | Median Real Income (quarterly) | h = 8 | Supporting income row |
| Household Net Worth | Top 1% vs Bottom 50% Wealth Gap | h = 2 | Strongest non-transfer robust row |

The substantive read is straightforward: transfers are the clearest and most repeated pattern in the archive. The evidence is broad across outcome families, not just concentrated in one dependent variable.

The methodological read is more careful: the DASS layer shows that cross-estimator backing is not equally strong for every robust row. Some headline rows have broader same-sign support than others. That is why the archive is presented as disciplined reduced-form evidence rather than as a clean causal proof stack.

## Secondary Results: Consumption Basket

The poverty archive includes a secondary pass that ports the essential-versus-discretionary logic from `ea-gender` as a standardized "v2" consumption basket:

- **Essential spending index** -- CE-weighted basket built from housing, food, and healthcare
- **Discretionary spending index** -- CE-weighted basket built from recreation, transport, and clothing
- **Essential-to-discretionary gap** -- log ratio of essential to discretionary spending
- **Essential spending share** -- essential spending as a fraction of combined essential plus discretionary

This improves the consumption side, but it does not overtake the poverty headline. The consumption baseline reports **2 robust rows**, both concentrated in UI benefits at one quarter out:

- UI benefits shift the essential-to-discretionary spending gap
- UI benefits raise the essential spending share

That is a meaningful result: unemployment-insurance shocks appear to tilt spending toward essentials one quarter out. But it remains a narrower and more selective block than the main transfer-poverty results.

## Confirmatory Status

The confirmatory layer is cleaner than it was before the April 2026 `econark-r` fixes, especially because the negative-control miner no longer allows outcomes to nominate themselves as their own NC candidates.

Even so, confirmatory coverage remains thin:

- Most headline transfer-poverty rows are still screening-only
- Only one row achieves ready-confirmatory status
- That row links the transfer composite to the top-1% vs bottom-50% wealth gap at h = 4

The archive supports a strong screening claim and a weaker confirmatory claim. The public-facing interpretation should stay at that level.

## Key Variables

| Variable | Plain-English name | Meaning |
|---|---|---|
| `transfer_composite` | Transfer Composite | Broad transfer-support measure combining government transfers, Social Security, and UI benefits |
| `ui_benefits` | UI Benefits | Unemployment-insurance transfer flow |
| `poverty_all_q` | Overall Poverty Rate | Quarterly poverty rate for the full population |
| `poverty_child_q` | Child Poverty Rate | Quarterly poverty rate for children |
| `gini_households_q` | Household Gini | Quarterly household-level inequality measure |
| `wealth_share_gap_top1_bottom50` | Top 1% vs Bottom 50% Wealth Gap | Difference between top-1% and bottom-50% wealth shares |
| `pce_essential_v2_idx` | Essential Spending Index | CE-weighted basket: housing, food, healthcare |
| `pce_discretionary_v2_idx` | Discretionary Spending Index | CE-weighted basket: recreation, transport, clothing |
| `pce_gap_v2` | Essential vs Discretionary Gap | Log ratio of essential to discretionary spending |
| `pce_eshare_v2` | Essential Spending Share | Essential spending as a share of essential plus discretionary |

## Repository Layout

- `configs/` -- packaged fetch, DASS, and DFLMX configs for the poverty/inequality project
- `inputs/` -- compact source snapshots used by the project fetch layer
- `results/coflow/` -- packaged CoFlow publication-gate outputs
- `results/dass/` -- estimation-layer outputs used for cross-estimator comparison (LP, DML, TMLE, CF, LP-IV, DML-IV)
- `results/dflmx/` -- screening-layer outputs used for the headline, robustness, and confirmatory narrative
- `docs/` -- static archive site; run `python3 docs/embed_data.py` to regenerate `docs/data.js`

## Packaged Runs

- **Consumption Baseline** -- the standardized v2 consumption run used for the secondary spending-composition question
- **Outcomes Baseline** -- the cleaner baseline poverty/inequality screen with LP and DML in the DASS layer
- **Outcomes Full** -- the richest archive run, adding broader DASS estimators (TMLE, CF, LP-IV, DML-IV) and the repaired IV/negative-control layer

## Framework Provenance

This project was built on [`econark`](https://github.com/smkwray/econark)'s R pipeline. The required `econark-r` runtime and confirmatory-plumbing fixes were upstreamed at commit `7cb68eb` ("Fix econark-r runtime and confirmatory plumbing").

This repository is the project archive, not the reusable framework repository.
