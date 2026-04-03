# CoFlow-R Summary (poverty_outcomes_mf)

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

## Target: `poverty_all_q`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Composite Transfers | 0.00 | 0.000 | 0.510 | 0.000 | NA | no | 1.000 |
| 2 | ui_benefits | 0.00 | 0.000 | 0.490 | 0.000 | NA | no | 1.000 |
| 3 | transfers_total | 0.00 | 0.000 | 0.482 | 0.000 | NA | no | 1.000 |
| 4 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | -0.222 | 0.000 | NA | no | 1.000 |
| 5 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | -0.294 | 0.000 | NA | no | 1.000 |
| 6 | Wealth Share Gap: Top 1% vs Bottom 50% | 0.00 | 0.000 | -0.292 | 0.000 | NA | no | 1.000 |
| 7 | fhfa_hpi | 0.00 | 0.000 | 0.103 | 0.000 | NA | no | 1.000 |
| 8 | top10_wealth_share | 0.00 | 0.000 | -0.211 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Composite Transfers | 0.00 | 0.000 | 0.510 | 0.000 | NA | no | 1.000 |
| 2 | ui_benefits | 0.00 | 0.000 | 0.490 | 0.000 | NA | no | 1.000 |
| 3 | transfers_total | 0.00 | 0.000 | 0.482 | 0.000 | NA | no | 1.000 |
| 4 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | -0.222 | 0.000 | NA | no | 1.000 |
| 5 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | -0.294 | 0.000 | NA | no | 1.000 |
| 6 | Wealth Share Gap: Top 1% vs Bottom 50% | 0.00 | 0.000 | -0.292 | 0.000 | NA | no | 1.000 |
| 7 | fhfa_hpi | 0.00 | 0.000 | 0.103 | 0.000 | NA | no | 1.000 |
| 8 | top10_wealth_share | 0.00 | 0.000 | -0.211 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Composite Transfers | NA | 0.000 | 0.510 | 0.000 | NA | no | 1.000 |
| 2 | ui_benefits | NA | 0.000 | 0.490 | 0.000 | NA | no | 1.000 |
| 3 | transfers_total | NA | 0.000 | 0.482 | 0.000 | NA | no | 1.000 |
| 4 | Median Real Income (FRED, Interpolated Quarterly) | NA | 0.000 | -0.222 | 0.000 | NA | no | 1.000 |
| 5 | Wealth Share Gap: Top 10% vs Bottom 50% | NA | 0.000 | -0.294 | 0.000 | NA | no | 1.000 |
| 6 | Wealth Share Gap: Top 1% vs Bottom 50% | NA | 0.000 | -0.292 | 0.000 | NA | no | 1.000 |
| 7 | fhfa_hpi | NA | 0.000 | 0.103 | 0.000 | NA | no | 1.000 |
| 8 | top10_wealth_share | NA | 0.000 | -0.211 | 0.000 | NA | no | 1.000 |

## Target: `poverty_child_q`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 2 | transfers_total | 0.00 | 0.000 | 0.515 | 0.000 | NA | no | 1.000 |
| 3 | Wealth Share Gap: Top 1% vs Bottom 50% | 0.00 | 0.000 | -0.424 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | -0.411 | 0.000 | NA | no | 1.000 |
| 5 | nonrevolving_credit | 0.00 | 0.000 | -0.409 | 0.000 | NA | no | 1.000 |
| 6 | ui_benefits | 0.00 | 0.000 | 0.354 | 0.000 | NA | no | 1.000 |
| 7 | Composite Transfers | 0.00 | 0.000 | 0.332 | 0.000 | NA | no | 1.000 |
| 8 | total_credit | 0.00 | 0.000 | -0.325 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 2 | transfers_total | 0.00 | 0.000 | 0.515 | 0.000 | NA | no | 1.000 |
| 3 | Wealth Share Gap: Top 1% vs Bottom 50% | 0.00 | 0.000 | -0.424 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | -0.411 | 0.000 | NA | no | 1.000 |
| 5 | nonrevolving_credit | 0.00 | 0.000 | -0.409 | 0.000 | NA | no | 1.000 |
| 6 | ui_benefits | 0.00 | 0.000 | 0.354 | 0.000 | NA | no | 1.000 |
| 7 | Composite Transfers | 0.00 | 0.000 | 0.332 | 0.000 | NA | no | 1.000 |
| 8 | total_credit | 0.00 | 0.000 | -0.325 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Median Real Income (FRED, Interpolated Quarterly) | NA | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 2 | transfers_total | NA | 0.000 | 0.515 | 0.000 | NA | no | 1.000 |
| 3 | Wealth Share Gap: Top 1% vs Bottom 50% | NA | 0.000 | -0.424 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | NA | 0.000 | -0.411 | 0.000 | NA | no | 1.000 |
| 5 | nonrevolving_credit | NA | 0.000 | -0.409 | 0.000 | NA | no | 1.000 |
| 6 | ui_benefits | NA | 0.000 | 0.354 | 0.000 | NA | no | 1.000 |
| 7 | Composite Transfers | NA | 0.000 | 0.332 | 0.000 | NA | no | 1.000 |
| 8 | total_credit | NA | 0.000 | -0.325 | 0.000 | NA | no | 1.000 |

## Target: `gini_households_q`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Wealth Share Gap: Top 1% vs Bottom 50% | 0.00 | 0.000 | -0.523 | 0.000 | NA | no | 1.000 |
| 2 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | -0.483 | 0.000 | NA | no | 1.000 |
| 3 | ui_benefits | 0.00 | 0.000 | 0.403 | 0.000 | NA | no | 1.000 |
| 4 | transfers_total | 0.00 | 0.000 | 0.392 | 0.000 | NA | no | 1.000 |
| 5 | nonrevolving_credit | 0.00 | 0.000 | 0.315 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.299 | 0.000 | NA | no | 1.000 |
| 7 | top1_wealth_share | 0.00 | 0.000 | -0.207 | 0.000 | NA | no | 1.000 |
| 8 | cc_delinquency | 0.00 | 0.000 | 0.205 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Wealth Share Gap: Top 1% vs Bottom 50% | 0.00 | 0.000 | -0.523 | 0.000 | NA | no | 1.000 |
| 2 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | -0.483 | 0.000 | NA | no | 1.000 |
| 3 | ui_benefits | 0.00 | 0.000 | 0.403 | 0.000 | NA | no | 1.000 |
| 4 | transfers_total | 0.00 | 0.000 | 0.392 | 0.000 | NA | no | 1.000 |
| 5 | nonrevolving_credit | 0.00 | 0.000 | 0.315 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.299 | 0.000 | NA | no | 1.000 |
| 7 | top1_wealth_share | 0.00 | 0.000 | -0.207 | 0.000 | NA | no | 1.000 |
| 8 | cc_delinquency | 0.00 | 0.000 | 0.205 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Wealth Share Gap: Top 1% vs Bottom 50% | NA | 0.000 | -0.523 | 0.000 | NA | no | 1.000 |
| 2 | Median Real Income (FRED, Interpolated Quarterly) | NA | 0.000 | -0.483 | 0.000 | NA | no | 1.000 |
| 3 | ui_benefits | NA | 0.000 | 0.403 | 0.000 | NA | no | 1.000 |
| 4 | transfers_total | NA | 0.000 | 0.392 | 0.000 | NA | no | 1.000 |
| 5 | nonrevolving_credit | NA | 0.000 | 0.315 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | NA | 0.000 | -0.299 | 0.000 | NA | no | 1.000 |
| 7 | top1_wealth_share | NA | 0.000 | -0.207 | 0.000 | NA | no | 1.000 |
| 8 | cc_delinquency | NA | 0.000 | 0.205 | 0.000 | NA | no | 1.000 |

## Target: `gini_income_fred_q`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.609 | 0.000 | NA | no | 1.000 |
| 2 | snap_persons | 0.00 | 0.000 | -0.508 | 0.000 | NA | no | 1.000 |
| 3 | nonrevolving_credit | 0.00 | 0.000 | 0.462 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | -0.120 | 0.000 | NA | no | 1.000 |
| 5 | top10_wealth_share | 0.00 | 0.000 | -0.274 | 0.000 | NA | no | 1.000 |
| 6 | Wealth Share Gap: Top 1% vs Bottom 50% | 0.00 | 0.000 | -0.301 | 0.000 | NA | no | 1.000 |
| 7 | Federal Funds Rate | 0.00 | 0.000 | 0.250 | 0.000 | NA | no | 1.000 |
| 8 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | 0.298 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.609 | 0.000 | NA | no | 1.000 |
| 2 | snap_persons | 0.00 | 0.000 | -0.508 | 0.000 | NA | no | 1.000 |
| 3 | nonrevolving_credit | 0.00 | 0.000 | 0.462 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | -0.120 | 0.000 | NA | no | 1.000 |
| 5 | top10_wealth_share | 0.00 | 0.000 | -0.274 | 0.000 | NA | no | 1.000 |
| 6 | Wealth Share Gap: Top 1% vs Bottom 50% | 0.00 | 0.000 | -0.301 | 0.000 | NA | no | 1.000 |
| 7 | Federal Funds Rate | 0.00 | 0.000 | 0.250 | 0.000 | NA | no | 1.000 |
| 8 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | 0.298 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | ui_benefits | NA | 0.000 | -0.609 | 0.000 | NA | no | 1.000 |
| 2 | snap_persons | NA | 0.000 | -0.508 | 0.000 | NA | no | 1.000 |
| 3 | nonrevolving_credit | NA | 0.000 | 0.462 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | NA | 0.000 | -0.120 | 0.000 | NA | no | 1.000 |
| 5 | top10_wealth_share | NA | 0.000 | -0.274 | 0.000 | NA | no | 1.000 |
| 6 | Wealth Share Gap: Top 1% vs Bottom 50% | NA | 0.000 | -0.301 | 0.000 | NA | no | 1.000 |
| 7 | Federal Funds Rate | NA | 0.000 | 0.250 | 0.000 | NA | no | 1.000 |
| 8 | Median Real Income (FRED, Interpolated Quarterly) | NA | 0.000 | 0.298 | 0.000 | NA | no | 1.000 |

## Target: `median_real_income_fred_q`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Federal Funds Rate | 0.00 | 0.000 | 0.316 | 0.000 | NA | no | 1.000 |
| 2 | top1_wealth_share | 0.00 | 0.000 | -0.252 | 0.000 | NA | no | 1.000 |
| 3 | top10_wealth_share | 0.00 | 0.000 | -0.224 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | -0.197 | 0.000 | NA | no | 1.000 |
| 5 | bottom50_wealth_share | 0.00 | 0.000 | 0.165 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 7 | equity_wealth_proxy | 0.00 | 0.000 | 0.160 | 0.000 | NA | no | 1.000 |
| 8 | fhfa_hpi | 0.00 | 0.000 | 0.023 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Federal Funds Rate | 0.00 | 0.000 | 0.316 | 0.000 | NA | no | 1.000 |
| 2 | top1_wealth_share | 0.00 | 0.000 | -0.252 | 0.000 | NA | no | 1.000 |
| 3 | top10_wealth_share | 0.00 | 0.000 | -0.224 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | -0.197 | 0.000 | NA | no | 1.000 |
| 5 | bottom50_wealth_share | 0.00 | 0.000 | 0.165 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 7 | equity_wealth_proxy | 0.00 | 0.000 | 0.160 | 0.000 | NA | no | 1.000 |
| 8 | fhfa_hpi | 0.00 | 0.000 | 0.023 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Federal Funds Rate | NA | 0.000 | 0.316 | 0.000 | NA | no | 1.000 |
| 2 | top1_wealth_share | NA | 0.000 | -0.252 | 0.000 | NA | no | 1.000 |
| 3 | top10_wealth_share | NA | 0.000 | -0.224 | 0.000 | NA | no | 1.000 |
| 4 | Wealth Share Gap: Top 10% vs Bottom 50% | NA | 0.000 | -0.197 | 0.000 | NA | no | 1.000 |
| 5 | bottom50_wealth_share | NA | 0.000 | 0.165 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | NA | 0.000 | -0.164 | 0.000 | NA | no | 1.000 |
| 7 | equity_wealth_proxy | NA | 0.000 | 0.160 | 0.000 | NA | no | 1.000 |
| 8 | fhfa_hpi | NA | 0.000 | 0.023 | 0.000 | NA | no | 1.000 |

## Target: `median_hh_income_q`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | 0.765 | 0.000 | NA | no | 1.000 |
| 2 | nonrevolving_credit | 0.00 | 0.000 | -0.407 | 0.000 | NA | no | 1.000 |
| 3 | bottom50_wealth_share | 0.00 | 0.000 | 0.282 | 0.000 | NA | no | 1.000 |
| 4 | ui_benefits | 0.00 | 0.000 | -0.235 | 0.000 | NA | no | 1.000 |
| 5 | equity_wealth_proxy | 0.00 | 0.000 | 0.173 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.109 | 0.000 | NA | no | 1.000 |
| 7 | total_credit | 0.00 | 0.000 | -0.145 | 0.000 | NA | no | 1.000 |
| 8 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | 0.066 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | 0.765 | 0.000 | NA | no | 1.000 |
| 2 | nonrevolving_credit | 0.00 | 0.000 | -0.407 | 0.000 | NA | no | 1.000 |
| 3 | bottom50_wealth_share | 0.00 | 0.000 | 0.282 | 0.000 | NA | no | 1.000 |
| 4 | ui_benefits | 0.00 | 0.000 | -0.235 | 0.000 | NA | no | 1.000 |
| 5 | equity_wealth_proxy | 0.00 | 0.000 | 0.173 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.109 | 0.000 | NA | no | 1.000 |
| 7 | total_credit | 0.00 | 0.000 | -0.145 | 0.000 | NA | no | 1.000 |
| 8 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | 0.066 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | Median Real Income (FRED, Interpolated Quarterly) | NA | 0.000 | 0.765 | 0.000 | NA | no | 1.000 |
| 2 | nonrevolving_credit | NA | 0.000 | -0.407 | 0.000 | NA | no | 1.000 |
| 3 | bottom50_wealth_share | NA | 0.000 | 0.282 | 0.000 | NA | no | 1.000 |
| 4 | ui_benefits | NA | 0.000 | -0.235 | 0.000 | NA | no | 1.000 |
| 5 | equity_wealth_proxy | NA | 0.000 | 0.173 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | NA | 0.000 | -0.109 | 0.000 | NA | no | 1.000 |
| 7 | total_credit | NA | 0.000 | -0.145 | 0.000 | NA | no | 1.000 |
| 8 | Wealth Share Gap: Top 10% vs Bottom 50% | NA | 0.000 | 0.066 | 0.000 | NA | no | 1.000 |

## Target: `wealth_share_gap_top10_bottom50`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | total_credit | 0.00 | 0.000 | 0.285 | 0.000 | NA | no | 1.000 |
| 2 | ui_benefits | 0.00 | 0.000 | 0.283 | 0.000 | NA | no | 1.000 |
| 3 | fhfa_hpi | 0.00 | 0.000 | -0.240 | 0.000 | NA | no | 1.000 |
| 4 | Composite Credit | 0.00 | 0.000 | 0.121 | 0.000 | NA | no | 1.000 |
| 5 | revolving_credit | 0.00 | 0.000 | 0.124 | 0.000 | NA | no | 1.000 |
| 6 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | -0.197 | 0.000 | NA | no | 1.000 |
| 7 | Composite Transfers | 0.00 | 0.000 | -0.154 | 0.000 | NA | no | 1.000 |
| 8 | snap_persons | 0.00 | 0.000 | -0.116 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | total_credit | 0.00 | 0.000 | 0.285 | 0.000 | NA | no | 1.000 |
| 2 | ui_benefits | 0.00 | 0.000 | 0.283 | 0.000 | NA | no | 1.000 |
| 3 | fhfa_hpi | 0.00 | 0.000 | -0.240 | 0.000 | NA | no | 1.000 |
| 4 | Composite Credit | 0.00 | 0.000 | 0.121 | 0.000 | NA | no | 1.000 |
| 5 | revolving_credit | 0.00 | 0.000 | 0.124 | 0.000 | NA | no | 1.000 |
| 6 | Median Real Income (FRED, Interpolated Quarterly) | 0.00 | 0.000 | -0.197 | 0.000 | NA | no | 1.000 |
| 7 | Composite Transfers | 0.00 | 0.000 | -0.154 | 0.000 | NA | no | 1.000 |
| 8 | snap_persons | 0.00 | 0.000 | -0.116 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | total_credit | NA | 0.000 | 0.285 | 0.000 | NA | no | 1.000 |
| 2 | ui_benefits | NA | 0.000 | 0.283 | 0.000 | NA | no | 1.000 |
| 3 | fhfa_hpi | NA | 0.000 | -0.240 | 0.000 | NA | no | 1.000 |
| 4 | Composite Credit | NA | 0.000 | 0.121 | 0.000 | NA | no | 1.000 |
| 5 | revolving_credit | NA | 0.000 | 0.124 | 0.000 | NA | no | 1.000 |
| 6 | Median Real Income (FRED, Interpolated Quarterly) | NA | 0.000 | -0.197 | 0.000 | NA | no | 1.000 |
| 7 | Composite Transfers | NA | 0.000 | -0.154 | 0.000 | NA | no | 1.000 |
| 8 | snap_persons | NA | 0.000 | -0.116 | 0.000 | NA | no | 1.000 |

## Target: `wealth_share_gap_top1_bottom50`

### Mode: `positive`

Top 7 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | equity_wealth_proxy | 0.00 | 0.000 | 0.881 | 0.000 | NA | no | 1.000 |
| 2 | cc_delinquency | 0.00 | 0.000 | -0.368 | 0.000 | NA | no | 1.000 |
| 3 | ui_benefits | 0.00 | 0.000 | -0.260 | 0.000 | NA | no | 1.000 |
| 4 | Federal Funds Rate | 0.00 | 0.000 | 0.189 | 0.000 | NA | no | 1.000 |
| 5 | top10_wealth_share | 0.00 | 0.000 | -0.206 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.126 | 0.000 | NA | no | 1.000 |
| 7 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | 0.114 | 0.000 | NA | no | 1.000 |

### Mode: `negative`

Top 7 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | equity_wealth_proxy | 0.00 | 0.000 | 0.881 | 0.000 | NA | no | 1.000 |
| 2 | cc_delinquency | 0.00 | 0.000 | -0.368 | 0.000 | NA | no | 1.000 |
| 3 | ui_benefits | 0.00 | 0.000 | -0.260 | 0.000 | NA | no | 1.000 |
| 4 | Federal Funds Rate | 0.00 | 0.000 | 0.189 | 0.000 | NA | no | 1.000 |
| 5 | top10_wealth_share | 0.00 | 0.000 | -0.206 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | 0.00 | 0.000 | -0.126 | 0.000 | NA | no | 1.000 |
| 7 | Wealth Share Gap: Top 10% vs Bottom 50% | 0.00 | 0.000 | 0.114 | 0.000 | NA | no | 1.000 |

### Mode: `least`

Top 7 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share | Pair q | Pair Rej | Pair Mult |
|---:|---|---:|---:|---:|---:|---:|:---:|---:|
| 1 | equity_wealth_proxy | NA | 0.000 | 0.881 | 0.000 | NA | no | 1.000 |
| 2 | cc_delinquency | NA | 0.000 | -0.368 | 0.000 | NA | no | 1.000 |
| 3 | ui_benefits | NA | 0.000 | -0.260 | 0.000 | NA | no | 1.000 |
| 4 | Federal Funds Rate | NA | 0.000 | 0.189 | 0.000 | NA | no | 1.000 |
| 5 | top10_wealth_share | NA | 0.000 | -0.206 | 0.000 | NA | no | 1.000 |
| 6 | snap_persons | NA | 0.000 | -0.126 | 0.000 | NA | no | 1.000 |
| 7 | Wealth Share Gap: Top 10% vs Bottom 50% | NA | 0.000 | 0.114 | 0.000 | NA | no | 1.000 |

## Diagnostics

### Stacked block causality diagnostics

| Target | Candidate | Windows | Block size | Lag med (C->T) | Lag med (T->C) | Fwd sig share | Rev sig share | Gap | Fwd p med | Rev p med | Fwd F med | Rev F med | Coint share | Vecm share |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| gini_households_q | bottom50_wealth_share | 5 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | cc_delinquency | 7 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | Federal Funds Rate | 7 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | fhfa_hpi | 27 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | Median Real Income (FRED, Interpolated Quarterly) | 28 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | nonrevolving_credit | 3 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | snap_persons | 6 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | top10_wealth_share | 4 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | top1_wealth_share | 13 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| gini_households_q | transfers_total | 1 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |

- Median directionality gap (C->T minus T->C): 0.000
- Median selected lag (C->T): 1.00

### Placebo sign-flip stability

| Target | Mode | Baseline top | Placebo top | Top-1 stable | Top score | Placebo top score | Top delta | Top delta ratio | Score corr | Candidates |
|---:|---|---|---|:---:|---:|---:|---:|---:|---:|
| poverty_all_q | positive | Composite Transfers | Composite Transfers | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 16 |
| poverty_all_q | negative | Composite Transfers | Composite Transfers | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 16 |
| poverty_all_q | least | Composite Transfers | Composite Transfers | yes | n/a | n/a | n/a | n/a | n/a | 16 |
| poverty_child_q | positive | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 16 |
| poverty_child_q | negative | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 16 |
| poverty_child_q | least | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | n/a | n/a | n/a | n/a | n/a | 16 |
| gini_households_q | positive | Wealth Share Gap: Top 1% vs Bottom 50% | Wealth Share Gap: Top 1% vs Bottom 50% | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 13 |
| gini_households_q | negative | Wealth Share Gap: Top 1% vs Bottom 50% | Wealth Share Gap: Top 1% vs Bottom 50% | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 13 |
| gini_households_q | least | Wealth Share Gap: Top 1% vs Bottom 50% | Wealth Share Gap: Top 1% vs Bottom 50% | yes | n/a | n/a | n/a | n/a | n/a | 13 |
| gini_income_fred_q | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 12 |
| gini_income_fred_q | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 12 |
| gini_income_fred_q | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 12 |
| median_real_income_fred_q | positive | Federal Funds Rate | Federal Funds Rate | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 13 |
| median_real_income_fred_q | negative | Federal Funds Rate | Federal Funds Rate | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 13 |
| median_real_income_fred_q | least | Federal Funds Rate | Federal Funds Rate | yes | n/a | n/a | n/a | n/a | n/a | 13 |
| median_hh_income_q | positive | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 14 |
| median_hh_income_q | negative | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 14 |
| median_hh_income_q | least | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | n/a | n/a | n/a | n/a | n/a | 14 |
| wealth_share_gap_top10_bottom50 | positive | total_credit | total_credit | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 11 |
| wealth_share_gap_top10_bottom50 | negative | total_credit | total_credit | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 11 |
| wealth_share_gap_top10_bottom50 | least | total_credit | total_credit | yes | n/a | n/a | n/a | n/a | n/a | 11 |
| wealth_share_gap_top1_bottom50 | positive | equity_wealth_proxy | equity_wealth_proxy | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 7 |
| wealth_share_gap_top1_bottom50 | negative | equity_wealth_proxy | equity_wealth_proxy | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 7 |
| wealth_share_gap_top1_bottom50 | least | equity_wealth_proxy | equity_wealth_proxy | yes | n/a | n/a | n/a | n/a | n/a | 7 |

- Placebo top-1 stability: 100.0%
- Median placebo score-correlation: n/a

### Early/late holdout stability

| Target | Mode | Early top | Late top | Top-1 stable | Early top score | Late top score | Top delta | Top delta ratio | Score corr | Candidates |
|---:|---|---|---|:---:|---:|---:|---:|---:|---:|
| poverty_all_q | positive | nonrevolving_credit | Median Real Income (FRED, Interpolated Quarterly) | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 8 |
| poverty_all_q | negative | nonrevolving_credit | Median Real Income (FRED, Interpolated Quarterly) | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 8 |
| poverty_all_q | least | nonrevolving_credit | Median Real Income (FRED, Interpolated Quarterly) | no | n/a | n/a | n/a | n/a | n/a | 8 |
| poverty_child_q | positive | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 7 |
| poverty_child_q | negative | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 7 |
| poverty_child_q | least | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | n/a | n/a | n/a | n/a | n/a | 7 |
| gini_households_q | positive | Wealth Share Gap: Top 1% vs Bottom 50% | Median Real Income (FRED, Interpolated Quarterly) | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 9 |
| gini_households_q | negative | Wealth Share Gap: Top 1% vs Bottom 50% | Median Real Income (FRED, Interpolated Quarterly) | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 9 |
| gini_households_q | least | Wealth Share Gap: Top 1% vs Bottom 50% | Median Real Income (FRED, Interpolated Quarterly) | no | n/a | n/a | n/a | n/a | n/a | 9 |
| gini_income_fred_q | positive | Wealth Share Gap: Top 1% vs Bottom 50% | ui_benefits | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 9 |
| gini_income_fred_q | negative | Wealth Share Gap: Top 1% vs Bottom 50% | ui_benefits | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 9 |
| gini_income_fred_q | least | Wealth Share Gap: Top 1% vs Bottom 50% | ui_benefits | no | n/a | n/a | n/a | n/a | n/a | 9 |
| median_real_income_fred_q | positive | Wealth Share Gap: Top 10% vs Bottom 50% | Federal Funds Rate | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 6 |
| median_real_income_fred_q | negative | Wealth Share Gap: Top 10% vs Bottom 50% | Federal Funds Rate | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 6 |
| median_real_income_fred_q | least | Wealth Share Gap: Top 10% vs Bottom 50% | Federal Funds Rate | no | n/a | n/a | n/a | n/a | n/a | 6 |
| median_hh_income_q | positive | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 7 |
| median_hh_income_q | negative | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 7 |
| median_hh_income_q | least | Median Real Income (FRED, Interpolated Quarterly) | Median Real Income (FRED, Interpolated Quarterly) | yes | n/a | n/a | n/a | n/a | n/a | 7 |
| wealth_share_gap_top10_bottom50 | positive | Median Real Income (FRED, Interpolated Quarterly) | fhfa_hpi | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 4 |
| wealth_share_gap_top10_bottom50 | negative | Median Real Income (FRED, Interpolated Quarterly) | fhfa_hpi | no | 0.000 | 0.000 | 0.000 | n/a | n/a | 4 |
| wealth_share_gap_top10_bottom50 | least | Median Real Income (FRED, Interpolated Quarterly) | fhfa_hpi | no | n/a | n/a | n/a | n/a | n/a | 4 |
| wealth_share_gap_top1_bottom50 | positive | Federal Funds Rate | Federal Funds Rate | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 2 |
| wealth_share_gap_top1_bottom50 | negative | Federal Funds Rate | Federal Funds Rate | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 2 |
| wealth_share_gap_top1_bottom50 | least | Federal Funds Rate | Federal Funds Rate | yes | n/a | n/a | n/a | n/a | n/a | 2 |

- Holdout top-1 stability: 37.5%
- Median holdout score-correlation: n/a

