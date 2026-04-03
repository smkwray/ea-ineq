# DFLMX-R Report

- IRF rows: 84
- Outcome rows: 56
- Robust rows (q<=0.10): 2
- Ranking source: outcome
- Tie-break effect size: abs(beta * shock_sd) when available

## Top findings
- ui_benefits -> pce_gap_v2 (h=1): beta=1.891e-06, beta@1sd=0.0146 (sd=7710.0575), p=3.646e-07, q=2.042e-05
- ui_benefits -> pce_eshare_v2 (h=1): beta=2.396e-07, beta@1sd=0.0018 (sd=7710.0575), p=2.596e-05, q=0.0007
- ui_benefits -> pce_gap_v2 (h=2): beta=1.478e-06, beta@1sd=0.0114 (sd=7710.0575), p=0.0061, q=0.1141
- ui_benefits -> pce_discretionary_v2_idx (h=1): beta=-0.1704, beta@1sd=-1313.9361 (sd=7710.0575), p=0.0121, q=0.1687
- ui_benefits -> pce_eshare_v2 (h=2): beta=1.895e-07, beta@1sd=0.0015 (sd=7710.0575), p=0.0193, q=0.2157
- transfer_composite -> pce_gap_v2 (h=1): beta=2.041e-07, beta@1sd=0.0187 (sd=9.168e+04), p=0.0667, q=0.4294
- credit_composite -> pce_essential_v2_idx (h=1): beta=8.182e-05, beta@1sd=763.1395 (sd=9.327e+06), p=0.0727, q=0.4294
- snap_persons -> pce_eshare_v2 (h=2): beta=3.159e-07, beta@1sd=0.0016 (sd=5015.7815), p=0.0978, q=0.4294
- snap_persons -> pce_essential_v2_idx (h=2): beta=0.3452, beta@1sd=1731.4520 (sd=5015.7815), p=0.1019, q=0.4294
- transfer_composite -> pce_eshare_v2 (h=1): beta=2.482e-08, beta@1sd=0.0023 (sd=9.168e+04), p=0.1051, q=0.4294

## Guardrails
- Reduced-form evidence only.
- Effect sizes are reported both per-unit and per 1-sd shock (sd computed from estimated shocks in `shock_series.csv`).
- Channel rankings are screening outputs, not structural mediation proof.
