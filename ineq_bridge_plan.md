# Inequality Bridge Plan

## Purpose

Make `ea-ineq` and `fp-ineq` comparable through one small shared bridge surface instead of trying to force the full pipelines to become structurally identical.

The bridge should answer:

- what happens to poverty and household-resource outcomes
- at the same horizons
- under a comparable transfer dose
- for a small common set of transfer channels

This document is intended to be sufficient for an implementation agent to work on the `ea-ineq` side directly without reconstructing context from prior chat.

## Current Status

### fp-ineq

Already implemented:

- bridge contract is defined here
- `fp-ineq` now emits a bridge artifact from the normal solved-bundle export
- checked-in bridge artifacts now exist in `fp-ineq/docs/`

Current `fp-ineq` bridge files:

- `docs/bridge_results.csv`
- `docs/bridge_metadata.json`

Current `fp-ineq` implementation path:

- `src/fp_ineq/export.py`

Current normalized `fp-ineq` bridge channels:

- `ui`
- `broad_federal_transfers`
- `transfer_composite`

Current mapped `fp-ineq` families:

- `ui`
- `federal-transfers`
- `transfer-composite`

### ea-ineq

Implemented in the archive and validated in an isolated remote staging runtime.

Current `ea-ineq` archive files:

- `configs/config_fetchr_poverty_consumption.R`
- `configs/config_dass_poverty_outcomes.R`
- `configs/config_dflmx_poverty_outcomes.R`
- `configs/config_dass_poverty_outcomes_bridge.R`
- `configs/config_dflmx_poverty_outcomes_bridge.R`
- `scripts/export_bridge_results.R`
- `scripts/compare_bridge_exports.py`

Current `ea-ineq` archived bridge outputs:

- `results/dass/poverty_outcomes_bridge/`
- `results/dflmx/poverty_outcomes_bridge/`
- `results/bridge/bridge_results.csv`
- `results/bridge/bridge_metadata.json`
- `results/bridge/fp_bridge_results.csv`
- `results/bridge/fp_bridge_metadata.json`
- `results/bridge/cross_repo_bridge_long.csv`
- `results/bridge/cross_repo_bridge_compare.csv`
- `results/bridge/cross_repo_bridge_metadata.json`

Current `ea-ineq` bridge behavior:

1. `transfers_total` is active as a bridge treatment
2. `transfer_composite_fp` exists as the `fp`-aligned additive treatment
3. the bridge export is emitted from the R side
4. the archive keeps the old `transfer_composite` in place, with no forced rename churn yet

Current `ea-ineq` bridge limitation:

- `ea-ineq` still does not expose direct `TRLOWZ` or `RYDPC` analogs
- bridge rows therefore use `dose_metric = "native_shock_unit"` and leave `delta_trlowz` / `delta_rydpc` blank
- that limitation is explicitly carried in `results/bridge/bridge_metadata.json`

Current `ea-ineq` comparison behavior:

1. the comparison script mirrors the current `fp-ineq` bridge files into `ea-ineq/results/bridge/`
2. it writes a full combined long table for both repos
3. it writes a side-by-side comparison table keyed by `channel x h`
4. the side-by-side table uses one explicit representative `fp` scenario per channel:
   - `ui` -> `ineq-ui-relief`
   - `broad_federal_transfers` -> `ineq-federal-transfer-relief`
   - `transfer_composite` -> `ineq-transfer-composite-medium`

## Shared Bridge Contract

Use one common bridge schema on both sides.

Primary bridge rows:

- one row per `scenario_id x h`
- baseline-relative deltas
- common horizons `h = 2, 4, 8`

Core columns:

- `bridge_version`
- `repo`
- `scenario_id`
- `scenario_label`
- `channel`
- `family`
- `h`
- `baseline_id`
- `dose_metric`
- `dose_value`
- `delta_trlowz`
- `delta_ipovall`
- `delta_ipovch`
- `delta_rydpc`
- `delta_iginihh`
- `delta_imedrinc`
- `notes`

Useful optional columns if cheap:

- `source_treatment`
- `source_outcome`
- `treatment_mode`
- `standardize`

Normalized bridge channels:

- `ui`
- `broad_federal_transfers`
- `transfer_composite`

Headline bridge measures:

- `TRLOWZ`
- `IPOVALL`
- `IPOVCH`
- `RYDPC`

Secondary bridge measures:

- `IGINIHH`
- `IMEDRINC`

Dose normalization:

- preferred common dose metric is `delta_trlowz`
- keep raw deltas in the bridge export
- do later normalization in R from the bridge table rather than hard-coding too much into each repo

Important caveat:

- `fp-ineq` already has `TRLOWZ`
- `ea-ineq` may not already expose a direct `TRLOWZ` analog

Therefore the `ea-ineq` implementation should use this decision rule:

1. if a comparable transfer-resource bridge scalar can be computed cleanly, emit `dose_metric = "delta_trlowz"` and fill `dose_value`
2. if not, still emit the full bridge table with the same row structure, use the best clearly defined native scalar as `dose_value`, and state the temporary limitation in `notes`
3. do not block the bridge rollout on perfect scalar parity if the rows, horizons, outcomes, and channel mapping can already be standardized

The preferred end state is still a common transfer-resource dose scalar. The fallback is a bridge table that is otherwise aligned and ready for a later normalization pass.

## Repo Mapping

### fp-ineq

Map native families to normalized bridge channels:

| `fp-ineq` family | Bridge channel |
| --- | --- |
| `ui` | `ui` |
| `federal-transfers` | `broad_federal_transfers` |
| `transfer-composite` | `transfer_composite` |

Native bridge variables:

- `TRLOWZ`
- `IPOVALL`
- `IPOVCH`
- `RYDPC`
- `IGINIHH`
- `IMEDRINC`

Implementation choice already made:

- keep the existing Python solve/export path
- emit a machine-readable bridge artifact from the existing solved bundle export
- keep the public site behavior unchanged
- let a later R comparison layer read the bridge artifact directly

### ea-ineq

Target bridge treatments and normalized channel mapping:

| Bridge channel | Preferred `ea-ineq` treatment | Notes |
| --- | --- | --- |
| `ui` | `ui_benefits` | direct UI bridge |
| `broad_federal_transfers` | `transfers_total` | best broad-transfer bridge to `fp` `TRGH`; do not force a SNAP equivalence |
| `transfer_composite` | `transfer_composite_fp` | new additive treatment aligned to the published `fp` transfer-composite family |

Recommended sequence:

1. add `transfers_total` to the active treatment surface
2. add `transfer_composite_fp` without renaming the current `transfer_composite` first
3. add a reduced bridge config using only the shared bridge treatments and outcomes
4. write the same bridge schema from the R side

## ea-ineq Required Config Targets

The implementation agent should inspect and likely edit these files first:

- `configs/config_fetchr_poverty_consumption.R`
- `configs/config_dass_poverty_outcomes.R`
- `configs/config_dflmx_poverty_outcomes.R`

If the repo already supports bridge-specific configs, prefer adding:

- `configs/config_dass_poverty_outcomes_bridge.R`
- `configs/config_dflmx_poverty_outcomes_bridge.R`

That is cleaner than overloading the main production configs too aggressively.

Implementation note:

- this is now the chosen pattern in `ea-ineq`
- additive base-config changes make the new treatment discoverable
- bridge-only configs keep the reduced comparison surface isolated from the broader production result grid

## ea-ineq Treatment Instructions

### 1. Activate `transfers_total`

Reason:

- this is the closest existing `ea-ineq` treatment to the public `fp-ineq` interpretation of `TRGH`
- in `fp-ineq`, `TRGH` is publicly documented as a broad federal household-transfer channel, not SNAP specifically

Expected action:

- add `transfers_total` to the active treatment surface
- make sure it appears in the DASS job grid
- make sure it appears in DFLMX `MANUAL_TREATMENTS`

### 2. Add `transfer_composite_fp`

This is the most important new additive treatment.

Original GPT Pro rationale:

- current `ea-ineq` `transfer_composite` appears to combine `transfers_total + social_security + ui_benefits`
- `fp-ineq` historically stages `ITRCOMP` from UI benefits + Social Security benefits + SNAP participation
- therefore the shared label `transfer_composite` currently hides an ingredient mismatch

Recommended implementation sequence:

- keep existing `transfer_composite` in place for now
- add `transfer_composite_fp` as a new treatment first
- only rename the current `transfer_composite` to something like `transfer_composite_legacy` later if confusion remains high

Suggested expression block in `config_fetchr_poverty_consumption.R`:

```r
list(
  name = "transfer_composite_fp",
  expression = 'S("ui_benefits") + S("social_security") + S("snap_persons")',
  positive = TRUE
)
```

Optional later cleanup if the repo is ready for the churn:

```r
list(
  name = "transfer_composite_legacy",
  expression = 'S("transfers_total") + S("social_security") + S("ui_benefits")',
  positive = TRUE
)
```

Do not make the rename the first step unless the repo is already prepared for downstream updates.

## ea-ineq DASS Job Grid

The bridge surface should include these outcomes:

- `poverty_all_q`
- `poverty_child_q`
- `gini_households_q`
- `median_real_income_fred_q`

Recommended treatment mode:

- `treatment_mode = "shock"`

Minimum bridge-oriented job additions:

```r
list(treatment = "transfers_total",       outcome = "poverty_all_q",             treatment_mode = "shock"),
list(treatment = "transfers_total",       outcome = "poverty_child_q",           treatment_mode = "shock"),
list(treatment = "transfers_total",       outcome = "gini_households_q",         treatment_mode = "shock"),
list(treatment = "transfers_total",       outcome = "median_real_income_fred_q", treatment_mode = "shock"),
list(treatment = "transfer_composite_fp", outcome = "poverty_all_q",             treatment_mode = "shock"),
list(treatment = "transfer_composite_fp", outcome = "poverty_child_q",           treatment_mode = "shock"),
list(treatment = "transfer_composite_fp", outcome = "gini_households_q",         treatment_mode = "shock"),
list(treatment = "transfer_composite_fp", outcome = "median_real_income_fred_q", treatment_mode = "shock")
```

The implementation agent should also check whether `ui_benefits` already spans the full bridge outcome set. If not, extend `ui_benefits` to the same four bridge outcomes.

## ea-ineq DFLMX Instructions

Current design note from GPT Pro:

- DFLMX already uses `QUESTION_SOURCE = "dass_active_jobs"`

That means the bridge surface can stay compact if DASS remains the source of truth.

Expected DFLMX actions:

- add `transfers_total` to `MANUAL_TREATMENTS`
- add `transfer_composite_fp` to `MANUAL_TREATMENTS`
- keep horizons aligned with the bridge contract: `2, 4, 8`
- prefer a small, intentional bridge config rather than broadening the whole production grid immediately

## ea-ineq Methods and Interpretation Rules

These are important and should be reflected in labels, config comments, or method notes.

### Do not force false one-to-one program matches

- do not describe `transfers_total` as “SNAP”
- do not treat `fp` `TRGH` as a SNAP-only variable
- do not treat `fp` `TRSH` as clean Social Security only

### Preserve this channel interpretation

- `ui_benefits` is the best `ea` bridge for the `fp` UI channel
- `transfers_total` is the best `ea` bridge for broad federal household transfers
- `transfer_composite_fp` is the best `ea` bridge to the published `fp` transfer-composite family

### Why `transfer_composite_fp`

Carry this distinction explicitly:

- the published `fp` comparison surface is not a separately published `ITRCOMP` family
- but the closest compositional comparison is still UI + Social Security + SNAP-style support, not `transfers_total + social_security + ui_benefits`

This should be visible in method notes or comments so later readers do not assume the old `ea` composite and the `fp` composite are already aligned.

## ea-ineq Bridge Export Requirements

The `ea-ineq` side should write the same bridge schema as `fp-ineq`.

Minimum acceptable deliverable:

- one bridge CSV
- one optional bridge metadata JSON
- rows for `h = 2, 4, 8`
- normalized channels set to `ui`, `broad_federal_transfers`, `transfer_composite`
- one row per treatment-horizon pair
- baseline-relative deltas

Suggested file names:

- `bridge_results.csv`
- `bridge_metadata.json`

Suggested metadata fields:

- `bridge_version`
- `repo`
- `channels_by_treatment`
- `horizons`
- `dose_metric`
- `headline_metrics`
- `secondary_metrics`

## ea-ineq Open Method Decision

The biggest open bridge-method question on the `ea` side is the dose scalar.

The implementing agent should decide in this order:

1. can a comparable transfer-resource bridge scalar be computed cleanly
2. if yes, use it as `dose_value`
3. if no, emit the bridge table anyway with the best available native scalar and document the limitation in `notes`

Do not hold the bridge rollout hostage to perfect scalar alignment if the rows, horizons, outcomes, and channel mapping can already be standardized.

## Original GPT Pro Recommendations Worth Preserving

These are the substantive comparability recommendations that remain worth carrying into the `ea-ineq` work.

1. Promote `transfers_total` as the broad-transfer bridge treatment.
2. Split the current `ea` transfer composite into the old version and an `fp`-aligned version.
3. Use the bridge surface to compare `ui`, `broad federal transfers`, and `transfer composite` rather than pretending all program labels map one-to-one.
4. Keep `snap_persons` and `social_security` expansion as appendix-level work, not the first comparability task.
5. Treat any wealth bridge as optional, later, and expert-only.

Where the recommended implementation here is softer than GPT Pro:

- add `transfer_composite_fp` first
- delay any rename of the current `ea` `transfer_composite` until after the bridge is working
- avoid broad internal rename churn unless it clearly buys clarity

## Priority Order

### Do Now

1. Freeze the bridge schema and channel labels.
2. Keep `fp-ineq` bridge export generated from the existing solved bundle.
3. Add an `ea-ineq` bridge config centered on `ui_benefits`, `transfers_total`, and `transfer_composite_fp`.

For `ea-ineq`, the first implementation pass should be:

1. update fetchr treatment definitions
2. update the DASS job grid
3. update DFLMX manual treatments
4. emit bridge export files
5. add a short methods note if the dose scalar is still provisional

### Do Next

1. Compare the two bridge exports in R.
2. Decide whether to publish a bridge appendix or keep it analytic-only.
3. Extend appendix-only decomposition treatments like `snap_persons` and `social_security` if still useful.

### Do Later

1. Consider renaming internal `fp-ineq` lever names if they keep causing interpretation problems.
2. Consider an expert-only wealth bridge if a stronger second comparison chapter is worth the added work.
3. Keep any full `fp-r` solver parity work separate from the bridge rollout.

## fp-ineq Tasks

Completed:

1. bridge metadata constants and family-to-channel mapping added in the export layer
2. bridge rows derived from the already-exported scenario series using the shared baseline
3. `bridge_results.csv` and `bridge_metadata.json` now written into the solved bundle directory
4. regression tests added for bridge schema, channel mapping, horizons, and baseline-relative deltas
5. bridge artifact kept non-disruptive to the current public site

## Remote Execution Notes For ea-ineq

These notes matter because the `ea-ineq` archive is not itself the runnable framework layout.

Validated execution host:

- `ssh shanewray@100.71.19.72`

Important environment notes:

- use `/opt/homebrew/bin/Rscript` explicitly or prepend `/opt/homebrew/bin` to `PATH`
- use an isolated `R_LIBS_USER`
- do not run directly inside the live Google Drive archive or live framework tree

Validated staging pattern:

- stage root: `~/tmp/ea_bridge_run`
- copy runtime dirs into staging:
  - `fetchr-R`
  - `dass-R`
  - `dflmx-R`
- copy project configs into the staged runtime dirs
- set:
  - `ECONARK_RESULTS_DIR="$STAGE/results"`
  - `FETCHR_OUT_DIR="$STAGE/results"`
  - `R_LIBS_USER="$STAGE/rlib"`

Important framework lineage note:

- the Google Drive `econark-r` snapshot was missing `dflmx-R/run/contracts.R`
- the older OneDrive framework snapshot contained that file
- copying only that missing file into the isolated staging runtime was enough to make DFLMX bridge runs pass
- `contracts.R` has now been copied into the shared Google Drive `econark-r/dflmx-R/run/` tree locally and on the remote host
- the shared Google Drive framework now passes a direct `dflmx-R` contracts-stage smoke check

Validated run order:

1. `fetchr-R/0.R --config config_fetchr_poverty_consumption.R`
2. `dass-R/0.R --config config_dass_poverty_outcomes_bridge.R`
3. `dflmx-R/0.R --config config_dflmx_poverty_outcomes_bridge.R --stage all --regression-check`
4. `scripts/export_bridge_results.R`

Current archived bridge output shape after validation:

- 9 rows total
- channels:
  - `ui`
  - `broad_federal_transfers`
  - `transfer_composite`
- horizons:
  - `2`
  - `4`
  - `8`
