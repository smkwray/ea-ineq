# Results Brief (2026-04-03)

## Runs

- Baseline both-suites run with canon v2 basket and expanded transfer/outcomes grid:
  - `results/dass/poverty_consumption_baseline`
  - `results/dass/poverty_outcomes_baseline`
  - `results/dflmx/poverty_consumption_baseline`
  - `results/dflmx/poverty_outcomes_baseline`
- Full outcomes-suite run with repaired IV/NC screening:
  - `results/dass/poverty_outcomes_full`
  - `results/dflmx/poverty_outcomes_full`

## What changed

- Ported the `ea-gender` canon logic into this poverty project as a non-destructive `v2` basket:
  - `pce_essential_v2_idx`
  - `pce_discretionary_v2_idx`
  - `pce_gap_v2 = log(E/D)`
  - `pce_eshare_v2 = E / (E + D)`
- Re-centered the consumption suite on the `v2` basket rather than the older mixed necessity/discretionary split.
- Expanded the outcomes suite around transfer decomposition:
  - `transfer_composite`
  - `ui_benefits`
  - `social_security`
  - `snap_persons`
  - plus secondary monetary/credit/wealth contrasts
- Repaired DFLMX negative-control discovery so outcomes no longer self-nominate as their own NC candidates.
- Enforced an allowlist for NC outcomes in the full outcomes suite:
  - `wealth_share_gap_top10_bottom50`
  - `wealth_share_gap_top1_bottom50`

## Quality gates

- CoFlow publication gates: pass
- DASS contract manifests: fail=0
- DFLMX regression checks: PASS
- `econark-r` local framework fixes are still required for this branch; the packaged project should use this patched runtime snapshot, not a fresh upstream sync

## High-level signals

### Consumption suite (`dflmx-R/poverty_consumption_baseline`)

- DFLMX robust rows (`q<=0.10`): `2`
- Strongest v2 findings:
  - `ui_benefits -> pce_gap_v2 (h=1)` with `q≈2.0e-05`
  - `ui_benefits -> pce_eshare_v2 (h=1)` with `q≈7.3e-04`
- Interpretation:
  - the canon basket improves the consumption suite materially versus the prior `0` robust-row baseline
  - the strongest surviving signal is concentrated in `ui_benefits`, not the broad transfer composite

### Outcomes suite baseline (`dflmx-R/poverty_outcomes_baseline`)

- DFLMX robust rows (`q<=0.10`): `11`
- Headline pattern remains transfer-led:
  - `transfer_composite -> gini_households_q` at `h=2,4,8`
  - `transfer_composite -> poverty_all_q` at `h=2,4`
  - `transfer_composite -> poverty_child_q` at `h=2,4`
  - `transfer_composite -> wealth_share_gap_top1_bottom50` at `h=2,4`
  - `transfer_composite -> median_real_income_fred_q` at `h=8`
- Program-decomposition additions:
  - `ui_benefits -> wealth_share_gap_top1_bottom50 (h=4)` is robust
  - `ui_benefits` also shows sub-robust but suggestive rows on `gini_households_q` and `poverty_all_q`
  - `snap_persons` is suggestive but not robust
  - `social_security` remains weak in this screening pass

### Outcomes suite full (`dflmx-R/poverty_outcomes`)

- DFLMX robust rows (`q<=0.10`): `11`
- The transfer headline survives the full run
- Additional strong secondary row appears:
  - `household_networth -> wealth_share_gap_top1_bottom50 (h=2)`

## Confirmatory / IV-NC status

- The NC miner fix worked:
  - NC candidates now come from alternate allowlisted outcomes, not the focal outcome itself
- Full outcomes discovery summary:
  - `iv_candidates = 9`
  - `nc_candidates = 51`
  - `manifest_ready = 6`
- Substantive limitation remains:
  - most transfer poverty rows are still `insufficient_contract` because no allowlisted NC survives for those focal outcomes
- The only `ready_confirmatory` row in this run is:
  - `transfer_composite -> wealth_share_gap_top1_bottom50 (h=4)` using `F1` with `wealth_share_gap_top10_bottom50` as NC
- Practical interpretation:
  - poverty/inequality headline claims should still be framed as screening/reduced-form evidence
  - the repaired confirmatory layer is cleaner, but it is not yet strong enough to support a broad causal claim

## Packaging recommendation for `ea-ineq`

- Ready to package:
  - yes, if `ea-ineq` is built from this patched runtime snapshot rather than a fresh upstream sync
- Headline archive focus:
  - poverty/inequality outcomes suite first
  - canon v2 consumption suite second
- Methods note to carry into the archive:
  - local `econark-r` fixes were required because upstream had unresolved stage/config/NC bugs in this branch
