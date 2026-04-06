# DFLMX-R Report

- IRF rows: 54
- Outcome rows: 36
- Robust rows (q<=0.10): 24
- Ranking source: outcome

## Top findings
- transfers_total -> gini_households_q (h=4): beta=0.0000, p=0.0000, q=0.0000
- transfers_total -> gini_households_q (h=2): beta=0.0000, p=0.0000, q=0.0000
- transfers_total -> poverty_child_q (h=4): beta=0.0000, p=0.0000, q=0.0000
- transfers_total -> poverty_all_q (h=4): beta=0.0000, p=0.0000, q=0.0000
- transfers_total -> poverty_all_q (h=2): beta=0.0000, p=0.0000, q=0.0000
- transfers_total -> poverty_child_q (h=2): beta=0.0000, p=0.0000, q=0.0000
- transfers_total -> gini_households_q (h=8): beta=0.0000, p=0.0001, q=0.0006
- transfers_total -> median_real_income_fred_q (h=8): beta=-0.0057, p=0.0010, q=0.0040
- transfer_composite_fp -> poverty_child_q (h=4): beta=0.0000, p=0.0010, q=0.0040
- transfer_composite_fp -> poverty_all_q (h=4): beta=0.0000, p=0.0015, q=0.0055

## Guardrails
- Reduced-form evidence only.
- Channel rankings are screening outputs, not structural mediation proof.
