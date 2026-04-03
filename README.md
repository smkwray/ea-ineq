# Fiscal Transfers, Poverty, Inequality, and Consumption Composition

**[Interactive results site](https://smkwray.github.io/ea-ineq/)**

This repository is the project-specific archive for an inequality-and-poverty research workflow built on `econark`'s R pipeline. It packages the compact input snapshots, the project configs, and the native DASS and DFLMX result trees for a simple question with a layered answer:

- do transfer shocks move poverty and inequality outcomes?
- if they do, how broad is the evidence after screening, robustness checks, and estimator comparison?
- and, as a secondary question, do those same shocks tilt household spending toward essentials under a canon essential-versus-discretionary basket?

The main story is transfer-led poverty and inequality relief. The consumption-composition block matters, but it is secondary.

## Project Questions

- Transfer shocks and poverty: do `transfer_composite`, `ui_benefits`, `social_security`, and `snap_persons` move `poverty_all_q`, `poverty_child_q`, and `gini_households_q`?
- Wealth and inequality: do transfers, wealth, and credit shocks move `wealth_share_gap_top1_bottom50` and `wealth_share_gap_top10_bottom50`?
- Consumption composition: under the canon `v2` basket, do shocks move `pce_essential_v2_idx`, `pce_discretionary_v2_idx`, `pce_gap_v2`, and `pce_eshare_v2`?
- Contrast questions: how do `fed_funds`, `credit_composite`, `revolving_credit`, and `household_networth` compare with the transfer block?
- Confirmatory status: which rows survive only the main screening stack, and which have actual IV/negative-control support?

## How To Read The Archive

This repository is richest when read as a two-layer evidence stack.

- `DFLMX` is the screening layer. It ranks LP impulse-response rows, applies FDR correction, and runs lead, episode leave-one-out, and confirmatory diagnostics.
- `DASS` is the estimation layer underneath it. It preserves the estimator-specific rows for the same treatment-outcome-horizon combinations, including LP, DML, and, in the full outcomes run, TMLE, CF, LP-IV, and DML-IV.

That distinction matters. A row can survive the DFLMX screen and still have mixed cross-estimator support. The site and this README are built to show both the headline screen and the estimator backing for the same findings.

## Headline Results

The full outcomes run reports **11 robust rows** with `q <= 0.10`. **9 of those 11** come from `transfer_composite`, and they cover four distinct outcome families:

| Treatment | Outcome | Horizons | Archive role |
|---|---|---|---|
| `transfer_composite` | `gini_households_q` | `h=2,4,8` | strongest inequality signal |
| `transfer_composite` | `poverty_all_q` | `h=2,4` | strong poverty headline |
| `transfer_composite` | `poverty_child_q` | `h=2,4` | strong child-poverty headline |
| `transfer_composite` | `wealth_share_gap_top1_bottom50` | `h=2,4` | transfer-led wealth-gap signal |
| `transfer_composite` | `median_real_income_fred_q` | `h=8` | supporting income row |
| `household_networth` | `wealth_share_gap_top1_bottom50` | `h=2` | strongest non-transfer robust row |

The substantive read is straightforward: transfers are the clearest and most repeated pattern in the archive. The evidence is broad across outcome families, not just concentrated in one dependent variable.

The methodological read is more careful: the DASS layer shows that cross-estimator backing is not equally strong for every robust row. Some headline rows have broader same-sign support than others. That is why the archive is presented as disciplined reduced-form evidence rather than as a clean causal proof stack.

## Secondary Results: Canon v2 Consumption Basket

The poverty archive includes a non-destructive `v2` pass that ports the essential-versus-discretionary logic from `ea-gender`.

The active `v2` variables are:

- `pce_essential_v2_idx`: CE-weighted essential basket using housing, food, and healthcare
- `pce_discretionary_v2_idx`: CE-weighted discretionary basket using recreation, transport, and clothing
- `pce_gap_v2 = log(E/D)`
- `pce_eshare_v2 = E / (E + D)`

This improves the consumption side, but it does not overtake the poverty headline. The consumption baseline reports **2 robust rows**, both concentrated in `ui_benefits` at `h=1`:

- `ui_benefits -> pce_gap_v2`
- `ui_benefits -> pce_eshare_v2`

That is a meaningful result: UI shocks appear to tilt spending toward essentials one quarter out. But it remains a narrower and more selective block than the main transfer-poverty results.

## Confirmatory Status

The confirmatory layer is cleaner than it was before the April 3, 2026 `econark-r` fixes, especially because the negative-control miner no longer allows outcomes to nominate themselves as their own NC candidates.

Even so, confirmatory coverage remains thin:

- most headline transfer-poverty rows are still `screening_only`
- only one row is `ready_confirmatory`
- that row is `transfer_composite -> wealth_share_gap_top1_bottom50 (h=4)`

So the archive supports a strong screening claim and a weaker confirmatory claim. The public-facing interpretation should stay at that level.

## Key Variables In Plain English

| Variable | Meaning |
|---|---|
| `transfer_composite` | Broad transfer-support measure combining major transfer flows, including Social Security and UI |
| `ui_benefits` | Unemployment-insurance transfer flow |
| `poverty_all_q` | Quarterly poverty rate for the full population |
| `poverty_child_q` | Quarterly child poverty rate |
| `gini_households_q` | Quarterly household inequality measure |
| `wealth_share_gap_top1_bottom50` | Difference between top-1% and bottom-50% wealth shares |
| `pce_essential_v2_idx` | Essential spending basket built from housing, food, and healthcare |
| `pce_discretionary_v2_idx` | Discretionary spending basket built from recreation, transport, and clothing |
| `pce_gap_v2` | Log ratio of essential to discretionary spending |
| `pce_eshare_v2` | Essential share of combined essential-plus-discretionary spending |

## Repository Layout

- `configs/` contains the packaged fetch, DASS, and DFLMX configs for the poverty/inequality project
- `inputs/` contains the compact source snapshots used by the project fetch layer
- `results/coflow/` contains packaged CoFlow outputs
- `results/dass/` contains the estimation-layer outputs used for estimator comparison
- `results/dflmx/` contains the screening-layer outputs used for the headline, robustness, and confirmatory narrative
- `docs/` contains the static archive site; run `python3 docs/embed_data.py` to regenerate `docs/data.js`

## Packaged Runs

- `poverty_consumption_baseline`
  The canon `v2` consumption run used for the secondary spending-composition question.
- `poverty_outcomes_baseline`
  The cleaner baseline poverty/inequality screen with LP and DML in the DASS layer.
- `poverty_outcomes_full`
  The richest archive run, adding broader DASS estimators and the repaired IV/negative-control layer.

## Framework Provenance

This project was built on `econark`'s R pipeline. The required `econark-r` runtime and confirmatory-plumbing fixes were upstreamed to [`smkwray/econark`](https://github.com/smkwray/econark) at commit `7cb68eb` (`Fix econark-r runtime and confirmatory plumbing`).

This repository is the project archive, not the reusable framework repository.
