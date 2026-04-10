#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

R_BIN="${R_BIN:-$(command -v Rscript || true)}"
ECONARK_R_ROOT="${ECONARK_R_ROOT:-}"
BATCHES_ROOT="${BATCHES_ROOT:-$PROJECT_ROOT/.cache/remote_broad_batches}"
PREP_CSV="${PREP_CSV:-$PROJECT_ROOT/.cache/dass_smoke/stacked_quarterly.csv}"
PREP_META="${PREP_META:-$PROJECT_ROOT/.cache/dass_smoke/stacked_quarterly_meta.md}"
JOB_TOTAL="${JOB_TOTAL:-108}"
BATCH_COUNT="${BATCH_COUNT:-6}"

if [[ -z "${R_BIN}" ]]; then
  echo "Set R_BIN or ensure Rscript is on PATH." >&2
  exit 1
fi

if [[ -z "${ECONARK_R_ROOT}" ]]; then
  echo "Set ECONARK_R_ROOT to the econark-r checkout." >&2
  exit 1
fi

mkdir -p "$BATCHES_ROOT"

jobs_per_batch=$(( (JOB_TOTAL + BATCH_COUNT - 1) / BATCH_COUNT ))

for ((i=1; i<=BATCH_COUNT; i++)); do
  start=$(( (i - 1) * jobs_per_batch + 1 ))
  end=$(( i * jobs_per_batch ))
  if (( start > JOB_TOTAL )); then
    break
  fi
  if (( end > JOB_TOTAL )); then
    end=$JOB_TOTAL
  fi
  batch_root="$BATCHES_ROOT/batch_$(printf '%02d' "$i")"
  mkdir -p "$batch_root"
  log_path="$batch_root/run.log"
  echo "[launch-batches] batch $i range $start-$end -> $batch_root"
  nohup "$R_BIN" "$SCRIPT_DIR/run_broad_poverty_outcomes_baseline.R" \
    --results-root "$batch_root" \
    --skip-prep \
    --skip-finalize \
    --prep-csv "$PREP_CSV" \
    --prep-meta "$PREP_META" \
    --job-start "$start" \
    --job-end "$end" \
    --econark-r-root "$ECONARK_R_ROOT" \
    >"$log_path" 2>&1 </dev/null &
  echo $! > "$batch_root/pid"
done

echo "[launch-batches] launched under $BATCHES_ROOT"
