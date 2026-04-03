# CoFlow-R Summary (poverty_consumption_mf)

- Rolling window: `40`
- Mixed-frequency mode: `true`
- Regime-aware scoring: `disabled`
- Regime breaks: `none`
- FDR alpha: `0.15`
- FDR hypothesis level: `pair`
- Pair score mode: `soft`
- Scoring profile: `publication_v2`
- Lag selection criterion: `bic`
- Cointegration method: `johansen`
- Cointegration alpha: `0.050`
- Modes: `positive, negative, least`
- Shortlist export: `enabled` (`top_n=5`)
- Publication gate: `enabled` (`strict=false`, `fail_on_fail=true`)

## Target: `pce_essential_idx`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.885 | 0.000 | NA | no | 1.000 |
| 2 | transfer_composite | 0.00 | 0.000 | -0.623 | 0.000 | NA | no | 1.000 |
| 3 | Total Transfers | 0.00 | 0.000 | -0.611 | 0.000 | NA | no | 1.000 |
| 4 | wealth_share_gap_top1_bottom50 | 0.00 | 0.000 | -0.189 | 0.000 | NA | no | 1.000 |
| 5 | top1_wealth_share | 0.00 | 0.000 | -0.035 | 0.000 | NA | no | 1.000 |
| 6 | poverty_all_q | 0.00 | 0.000 | 0.055 | 0.000 | NA | no | 1.000 |
| 7 | bottom50_wealth_share | 0.00 | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 8 | credit_composite | 0.00 | 0.000 | 0.164 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.885 | 0.000 | NA | no | 1.000 |
| 2 | transfer_composite | 0.00 | 0.000 | -0.623 | 0.000 | NA | no | 1.000 |
| 3 | Total Transfers | 0.00 | 0.000 | -0.611 | 0.000 | NA | no | 1.000 |
| 4 | wealth_share_gap_top1_bottom50 | 0.00 | 0.000 | -0.189 | 0.000 | NA | no | 1.000 |
| 5 | top1_wealth_share | 0.00 | 0.000 | -0.035 | 0.000 | NA | no | 1.000 |
| 6 | poverty_all_q | 0.00 | 0.000 | 0.055 | 0.000 | NA | no | 1.000 |
| 7 | bottom50_wealth_share | 0.00 | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 8 | credit_composite | 0.00 | 0.000 | 0.164 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | NA | 0.000 | -0.885 | 0.000 | NA | no | 1.000 |
| 2 | transfer_composite | NA | 0.000 | -0.623 | 0.000 | NA | no | 1.000 |
| 3 | Total Transfers | NA | 0.000 | -0.611 | 0.000 | NA | no | 1.000 |
| 4 | wealth_share_gap_top1_bottom50 | NA | 0.000 | -0.189 | 0.000 | NA | no | 1.000 |
| 5 | top1_wealth_share | NA | 0.000 | -0.035 | 0.000 | NA | no | 1.000 |
| 6 | poverty_all_q | NA | 0.000 | 0.055 | 0.000 | NA | no | 1.000 |
| 7 | bottom50_wealth_share | NA | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 8 | credit_composite | NA | 0.000 | 0.164 | 0.000 | NA | no | 1.000 |

## Target: `pce_discretionary_idx`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | gini_income_fred_q | 0.00 | 0.000 | 0.470 | 0.000 | NA | no | 1.000 |
| 2 | top10_wealth_share | 0.00 | 0.000 | -0.317 | 0.000 | NA | no | 1.000 |
| 3 | transfer_composite | 0.00 | 0.000 | 0.051 | 0.000 | NA | no | 1.000 |
| 4 | fhfa_hpi | 0.00 | 0.000 | 0.192 | 0.000 | NA | no | 1.000 |
| 5 | wealth_share_gap_top10_bottom50 | 0.00 | 0.000 | -0.187 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.174 | 0.000 | NA | no | 1.000 |
| 7 | Federal Funds Rate | 0.00 | 0.000 | -0.140 | 0.000 | NA | no | 1.000 |
| 8 | ui_benefits | 0.00 | 0.000 | 0.136 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | gini_income_fred_q | 0.00 | 0.000 | 0.470 | 0.000 | NA | no | 1.000 |
| 2 | top10_wealth_share | 0.00 | 0.000 | -0.317 | 0.000 | NA | no | 1.000 |
| 3 | transfer_composite | 0.00 | 0.000 | 0.051 | 0.000 | NA | no | 1.000 |
| 4 | fhfa_hpi | 0.00 | 0.000 | 0.192 | 0.000 | NA | no | 1.000 |
| 5 | wealth_share_gap_top10_bottom50 | 0.00 | 0.000 | -0.187 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.174 | 0.000 | NA | no | 1.000 |
| 7 | Federal Funds Rate | 0.00 | 0.000 | -0.140 | 0.000 | NA | no | 1.000 |
| 8 | ui_benefits | 0.00 | 0.000 | 0.136 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | gini_income_fred_q | NA | 0.000 | 0.470 | 0.000 | NA | no | 1.000 |
| 2 | top10_wealth_share | NA | 0.000 | -0.317 | 0.000 | NA | no | 1.000 |
| 3 | transfer_composite | NA | 0.000 | 0.051 | 0.000 | NA | no | 1.000 |
| 4 | fhfa_hpi | NA | 0.000 | 0.192 | 0.000 | NA | no | 1.000 |
| 5 | wealth_share_gap_top10_bottom50 | NA | 0.000 | -0.187 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | NA | 0.000 | -0.174 | 0.000 | NA | no | 1.000 |
| 7 | Federal Funds Rate | NA | 0.000 | -0.140 | 0.000 | NA | no | 1.000 |
| 8 | ui_benefits | NA | 0.000 | 0.136 | 0.000 | NA | no | 1.000 |

## Target: `pce_fcsu_idx`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.611 | 0.000 | NA | no | 1.000 |
| 2 | Total Transfers | 0.00 | 0.000 | -0.439 | 0.000 | NA | no | 1.000 |
| 3 | transfer_composite | 0.00 | 0.000 | -0.414 | 0.000 | NA | no | 1.000 |
| 4 | fhfa_hpi | 0.00 | 0.000 | 0.212 | 0.000 | NA | no | 1.000 |
| 5 | poverty_all_q | 0.00 | 0.000 | -0.211 | 0.000 | NA | no | 1.000 |
| 6 | cc_delinquency | 0.00 | 0.000 | 0.203 | 0.000 | NA | no | 1.000 |
| 7 | wealth_share_gap_top1_bottom50 | 0.00 | 0.000 | -0.133 | 0.000 | NA | no | 1.000 |
| 8 | top1_wealth_share | 0.00 | 0.000 | -0.187 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.611 | 0.000 | NA | no | 1.000 |
| 2 | Total Transfers | 0.00 | 0.000 | -0.439 | 0.000 | NA | no | 1.000 |
| 3 | transfer_composite | 0.00 | 0.000 | -0.414 | 0.000 | NA | no | 1.000 |
| 4 | fhfa_hpi | 0.00 | 0.000 | 0.212 | 0.000 | NA | no | 1.000 |
| 5 | poverty_all_q | 0.00 | 0.000 | -0.211 | 0.000 | NA | no | 1.000 |
| 6 | cc_delinquency | 0.00 | 0.000 | 0.203 | 0.000 | NA | no | 1.000 |
| 7 | wealth_share_gap_top1_bottom50 | 0.00 | 0.000 | -0.133 | 0.000 | NA | no | 1.000 |
| 8 | top1_wealth_share | 0.00 | 0.000 | -0.187 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | NA | 0.000 | -0.611 | 0.000 | NA | no | 1.000 |
| 2 | Total Transfers | NA | 0.000 | -0.439 | 0.000 | NA | no | 1.000 |
| 3 | transfer_composite | NA | 0.000 | -0.414 | 0.000 | NA | no | 1.000 |
| 4 | fhfa_hpi | NA | 0.000 | 0.212 | 0.000 | NA | no | 1.000 |
| 5 | poverty_all_q | NA | 0.000 | -0.211 | 0.000 | NA | no | 1.000 |
| 6 | cc_delinquency | NA | 0.000 | 0.203 | 0.000 | NA | no | 1.000 |
| 7 | wealth_share_gap_top1_bottom50 | NA | 0.000 | -0.133 | 0.000 | NA | no | 1.000 |
| 8 | top1_wealth_share | NA | 0.000 | -0.187 | 0.000 | NA | no | 1.000 |

## Diagnostics

### Stacked block causality diagnostics

| Target | Candidate | Windows | Block size | Lag med (C->T) | Lag med (T->C) | Fwd sig share | Rev sig share | Gap | Fwd p med | Rev p med | Fwd F med | Rev F med | Coint share | Vecm share |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| pce_discretionary_idx | bottom50_wealth_share | 4 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | cc_delinquency | 3 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | Federal Funds Rate | 7 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | fhfa_hpi | 5 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | gini_households_q | 3 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | gini_income_fred_q | 5 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | poverty_all_q | 6 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | poverty_child_q | 7 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | snap_persons | 5 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | social_security | 1 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |

- Median directionality gap (C->T minus T->C): 0.000
- Median selected lag (C->T): 1.00

### Placebo sign-flip stability

| Target | Mode | Baseline top | Placebo top | Top-1 stable | Top score | Placebo top score | Top delta | Top delta ratio | Score corr | Candidates |
|---:|---|---|---|:---:|---:|---:|---:|---:|---:|
| pce_essential_idx | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 18 |
| pce_essential_idx | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 18 |
| pce_essential_idx | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 18 |
| pce_discretionary_idx | positive | gini_income_fred_q | gini_income_fred_q | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 15 |
| pce_discretionary_idx | negative | gini_income_fred_q | gini_income_fred_q | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 15 |
| pce_discretionary_idx | least | gini_income_fred_q | gini_income_fred_q | yes | n/a | n/a | n/a | n/a | n/a | 15 |
| pce_fcsu_idx | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 16 |
| pce_fcsu_idx | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 16 |
| pce_fcsu_idx | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 16 |

- Placebo top-1 stability: 100.0%
- Median placebo score-correlation: n/a

### Early/late holdout stability

| Target | Mode | Early top | Late top | Top-1 stable | Early top score | Late top score | Top delta | Top delta ratio | Score corr | Candidates |
|---:|---|---|---|:---:|---:|---:|---:|---:|---:|
| pce_essential_idx | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 11 |
| pce_essential_idx | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 11 |
| pce_essential_idx | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 11 |
| pce_discretionary_idx | positive | Federal Funds Rate | top10_wealth_share | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 5 |
| pce_discretionary_idx | negative | Federal Funds Rate | top10_wealth_share | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 5 |
| pce_discretionary_idx | least | Federal Funds Rate | top10_wealth_share | no | n/a | n/a | n/a | n/a | n/a | 5 |
| pce_fcsu_idx | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 10 |
| pce_fcsu_idx | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 10 |
| pce_fcsu_idx | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 10 |

- Holdout top-1 stability: 66.7%
- Median holdout score-correlation: n/a

