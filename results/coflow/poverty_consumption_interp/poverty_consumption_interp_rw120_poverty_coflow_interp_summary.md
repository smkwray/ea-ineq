# CoFlow-R Summary (poverty_consumption_interp)

- Rolling window: `120`
- Mixed-frequency mode: `false`
- Regime-aware scoring: `disabled`
- Regime breaks: `none`
- FDR alpha: `0.15`
- FDR hypothesis level: `window`
- Pair score mode: `gate`
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

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.885 | 0.000 |
| 2 | Composite Transfers | 0.00 | 0.000 | -0.686 | 0.000 |
| 3 | Total Transfers | 0.00 | 0.000 | -0.634 | 0.000 |
| 4 | equity_wealth_proxy | 0.00 | 0.000 | 0.207 | 0.000 |
| 5 | credit_composite | 0.00 | 0.000 | 0.155 | 0.000 |
| 6 | revolving_credit | 0.00 | 0.000 | 0.154 | 0.000 |
| 7 | fhfa_hpi | 0.00 | 0.000 | 0.139 | 0.000 |
| 8 | social_security | 0.00 | 0.000 | -0.101 | 0.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.885 | 0.000 |
| 2 | Composite Transfers | 0.00 | 0.000 | -0.686 | 0.000 |
| 3 | Total Transfers | 0.00 | 0.000 | -0.634 | 0.000 |
| 4 | equity_wealth_proxy | 0.00 | 0.000 | 0.207 | 0.000 |
| 5 | credit_composite | 0.00 | 0.000 | 0.155 | 0.000 |
| 6 | revolving_credit | 0.00 | 0.000 | 0.154 | 0.000 |
| 7 | fhfa_hpi | 0.00 | 0.000 | 0.139 | 0.000 |
| 8 | social_security | 0.00 | 0.000 | -0.101 | 0.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | ui_benefits | NA | 0.000 | -0.885 | 0.000 |
| 2 | Composite Transfers | NA | 0.000 | -0.686 | 0.000 |
| 3 | Total Transfers | NA | 0.000 | -0.634 | 0.000 |
| 4 | equity_wealth_proxy | NA | 0.000 | 0.207 | 0.000 |
| 5 | credit_composite | NA | 0.000 | 0.155 | 0.000 |
| 6 | revolving_credit | NA | 0.000 | 0.154 | 0.000 |
| 7 | fhfa_hpi | NA | 0.000 | 0.139 | 0.000 |
| 8 | social_security | NA | 0.000 | -0.101 | 0.000 |

## Target: `pce_discretionary_idx`

### Mode: `positive`

Top 4 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | Composite Transfers | 0.00 | 0.000 | 0.296 | 0.000 |
| 2 | fhfa_hpi | 0.00 | 0.000 | 0.213 | 0.000 |
| 3 | ui_benefits | 0.00 | 0.000 | 0.136 | 0.000 |
| 4 | social_security | 0.00 | 0.000 | -0.086 | 0.000 |

### Mode: `negative`

Top 4 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | Composite Transfers | 0.00 | 0.000 | 0.296 | 0.000 |
| 2 | fhfa_hpi | 0.00 | 0.000 | 0.213 | 0.000 |
| 3 | ui_benefits | 0.00 | 0.000 | 0.136 | 0.000 |
| 4 | social_security | 0.00 | 0.000 | -0.086 | 0.000 |

### Mode: `least`

Top 4 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | Composite Transfers | NA | 0.000 | 0.296 | 0.000 |
| 2 | fhfa_hpi | NA | 0.000 | 0.213 | 0.000 |
| 3 | ui_benefits | NA | 0.000 | 0.136 | 0.000 |
| 4 | social_security | NA | 0.000 | -0.086 | 0.000 |

## Target: `pce_fcsu_idx`

### Mode: `positive`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.648 | 0.000 |
| 2 | Composite Transfers | 0.00 | 0.000 | -0.492 | 0.000 |
| 3 | Total Transfers | 0.00 | 0.000 | -0.451 | 0.000 |
| 4 | fhfa_hpi | 0.00 | 0.000 | 0.227 | 0.000 |
| 5 | cc_delinquency | 0.00 | 0.000 | 0.203 | 0.000 |
| 6 | social_security | 0.00 | 0.000 | -0.145 | 0.000 |
| 7 | Federal Funds Rate | 0.00 | 0.000 | 0.102 | 0.000 |
| 8 | equity_wealth_proxy | 0.00 | 0.000 | 0.031 | 0.000 |

### Mode: `negative`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | ui_benefits | 0.00 | 0.000 | -0.648 | 0.000 |
| 2 | Composite Transfers | 0.00 | 0.000 | -0.492 | 0.000 |
| 3 | Total Transfers | 0.00 | 0.000 | -0.451 | 0.000 |
| 4 | fhfa_hpi | 0.00 | 0.000 | 0.227 | 0.000 |
| 5 | cc_delinquency | 0.00 | 0.000 | 0.203 | 0.000 |
| 6 | social_security | 0.00 | 0.000 | -0.145 | 0.000 |
| 7 | Federal Funds Rate | 0.00 | 0.000 | 0.102 | 0.000 |
| 8 | equity_wealth_proxy | 0.00 | 0.000 | 0.031 | 0.000 |

### Mode: `least`

Top 8 candidates:

| Rank | Candidate | Score | Sig Share | Median Corr | Coint Share |
|---:|---|---:|---:|---:|---:|
| 1 | ui_benefits | NA | 0.000 | -0.648 | 0.000 |
| 2 | Composite Transfers | NA | 0.000 | -0.492 | 0.000 |
| 3 | Total Transfers | NA | 0.000 | -0.451 | 0.000 |
| 4 | fhfa_hpi | NA | 0.000 | 0.227 | 0.000 |
| 5 | cc_delinquency | NA | 0.000 | 0.203 | 0.000 |
| 6 | social_security | NA | 0.000 | -0.145 | 0.000 |
| 7 | Federal Funds Rate | NA | 0.000 | 0.102 | 0.000 |
| 8 | equity_wealth_proxy | NA | 0.000 | 0.031 | 0.000 |

## Diagnostics

### Stacked block causality diagnostics

| Target | Candidate | Windows | Block size | Lag med (C->T) | Lag med (T->C) | Fwd sig share | Rev sig share | Gap | Fwd p med | Rev p med | Fwd F med | Rev F med | Coint share | Vecm share |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| pce_discretionary_idx | fhfa_hpi | 6 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | social_security | 3 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | Composite Transfers | 3 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_discretionary_idx | ui_benefits | 3 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_essential_idx | cc_delinquency | 3 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_essential_idx | credit_composite | 6 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_essential_idx | equity_wealth_proxy | 3 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_essential_idx | Federal Funds Rate | 9 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_essential_idx | fhfa_hpi | 11 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |
| pce_essential_idx | revolving_credit | 6 | 1 | 1.00 | 1.00 | 0.000 | 0.000 | 0.000 | n/a | n/a | n/a | n/a | 1.000 | 1.000 |

- Median directionality gap (C->T minus T->C): 0.000
- Median selected lag (C->T): 1.00

### Placebo sign-flip stability

| Target | Mode | Baseline top | Placebo top | Top-1 stable | Top score | Placebo top score | Top delta | Top delta ratio | Score corr | Candidates |
|---:|---|---|---|:---:|---:|---:|---:|---:|---:|
| pce_essential_idx | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 10 |
| pce_essential_idx | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 10 |
| pce_essential_idx | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 10 |
| pce_discretionary_idx | positive | Composite Transfers | Composite Transfers | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 4 |
| pce_discretionary_idx | negative | Composite Transfers | Composite Transfers | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 4 |
| pce_discretionary_idx | least | Composite Transfers | Composite Transfers | yes | n/a | n/a | n/a | n/a | n/a | 4 |
| pce_fcsu_idx | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 8 |
| pce_fcsu_idx | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 8 |
| pce_fcsu_idx | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 8 |

- Placebo top-1 stability: 100.0%
- Median placebo score-correlation: n/a

### Early/late holdout stability

| Target | Mode | Early top | Late top | Top-1 stable | Early top score | Late top score | Top delta | Top delta ratio | Score corr | Candidates |
|---:|---|---|---|:---:|---:|---:|---:|---:|---:|
| pce_essential_idx | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 8 |
| pce_essential_idx | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 8 |
| pce_essential_idx | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 8 |
| pce_discretionary_idx | positive | fhfa_hpi | fhfa_hpi | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 1 |
| pce_discretionary_idx | negative | fhfa_hpi | fhfa_hpi | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 1 |
| pce_discretionary_idx | least | fhfa_hpi | fhfa_hpi | yes | n/a | n/a | n/a | n/a | n/a | 1 |
| pce_fcsu_idx | positive | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 7 |
| pce_fcsu_idx | negative | ui_benefits | ui_benefits | yes | 0.000 | 0.000 | 0.000 | n/a | n/a | 7 |
| pce_fcsu_idx | least | ui_benefits | ui_benefits | yes | n/a | n/a | n/a | n/a | n/a | 7 |

- Holdout top-1 stability: 100.0%
- Median holdout score-correlation: n/a

