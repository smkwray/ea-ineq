# DFLMX-R Report

- IRF rows: 165
- Outcome rows: 105
- Robust rows (q<=0.10): 11
- Ranking source: outcome
- Tie-break effect size: abs(beta * shock_sd) when available

## Top findings
- transfer_composite -> gini_households_q (h=4): beta=1.653e-08, beta@1sd=0.0015 (sd=9.168e+04), p=6.510e-12, q=6.836e-10
- transfer_composite -> poverty_all_q (h=4): beta=1.945e-06, beta@1sd=0.1783 (sd=9.168e+04), p=3.367e-09, q=1.768e-07
- transfer_composite -> poverty_child_q (h=4): beta=3.419e-06, beta@1sd=0.3135 (sd=9.168e+04), p=1.538e-08, q=5.382e-07
- transfer_composite -> gini_households_q (h=2): beta=9.882e-09, beta@1sd=0.0009 (sd=9.168e+04), p=4.248e-08, q=1.115e-06
- transfer_composite -> poverty_all_q (h=2): beta=1.121e-06, beta@1sd=0.1027 (sd=9.168e+04), p=6.501e-07, q=1.365e-05
- transfer_composite -> poverty_child_q (h=2): beta=1.964e-06, beta@1sd=0.1801 (sd=9.168e+04), p=4.554e-06, q=7.969e-05
- transfer_composite -> wealth_share_gap_top1_bottom50 (h=2): beta=2.064e-06, beta@1sd=0.1893 (sd=9.168e+04), p=6.518e-05, q=0.0009
- household_networth -> wealth_share_gap_top1_bottom50 (h=2): beta=1.097e-10, beta@1sd=0.2175 (sd=1.983e+09), p=6.595e-05, q=0.0009
- transfer_composite -> wealth_share_gap_top1_bottom50 (h=4): beta=2.250e-06, beta@1sd=0.2062 (sd=9.168e+04), p=0.0002, q=0.0021
- transfer_composite -> gini_households_q (h=8): beta=1.109e-08, beta@1sd=0.0010 (sd=9.168e+04), p=0.0003, q=0.0030

## Guardrails
- Reduced-form evidence only.
- Effect sizes are reported both per-unit and per 1-sd shock (sd computed from estimated shocks in `shock_series.csv`).
- Channel rankings are screening outputs, not structural mediation proof.
