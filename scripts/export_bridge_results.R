#!/usr/bin/env Rscript

suppressPackageStartupMessages({
  library(data.table)
  library(jsonlite)
})

args <- commandArgs(trailingOnly = TRUE)
arg_value <- function(flag, default = NULL) {
  idx <- match(flag, args)
  if (is.na(idx) || idx == length(args)) {
    return(default)
  }
  args[[idx + 1L]]
}

`%or%` <- function(x, y) {
  if (is.null(x) || !nzchar(x)) y else x
}

script_arg <- sub("^--file=", "", commandArgs(FALSE)[grepl("^--file=", commandArgs(FALSE))][1] %or% "")
script_path <- normalizePath(script_arg %or% sys.frames()[[1]]$ofile %or% file.path(getwd(), "scripts", "export_bridge_results.R"), winslash = "/", mustWork = FALSE)
repo_root <- normalizePath(file.path(dirname(script_path), ".."), winslash = "/", mustWork = TRUE)

results_root <- normalizePath(arg_value("--results-root", file.path(repo_root, "results")), winslash = "/", mustWork = FALSE)
out_csv <- arg_value("--out-csv", file.path(results_root, "bridge", "bridge_results.csv"))
out_json <- arg_value("--out-json", file.path(results_root, "bridge", "bridge_metadata.json"))
dflmx_dir <- normalizePath(arg_value("--dflmx-dir", file.path(results_root, "dflmx", "poverty_outcomes_bridge")), winslash = "/", mustWork = FALSE)

dir.create(dirname(out_csv), recursive = TRUE, showWarnings = FALSE)
dir.create(dirname(out_json), recursive = TRUE, showWarnings = FALSE)

source_csv <- file.path(dflmx_dir, "irf_lp_fdr.csv")
if (!file.exists(source_csv)) {
  stop(sprintf("Missing DFLMX bridge source: %s", source_csv))
}

channel_map <- c(
  ui_benefits = "ui",
  transfers_total = "broad_federal_transfers",
  transfer_composite_fp = "transfer_composite"
)

label_map <- c(
  ui_benefits = "UI Benefits",
  transfers_total = "Broad Federal Transfers",
  transfer_composite_fp = "Transfer Composite (FP-aligned)"
)

metric_map <- c(
  poverty_all_q = "delta_ipovall",
  poverty_child_q = "delta_ipovch",
  gini_households_q = "delta_iginihh",
  median_real_income_fred_q = "delta_imedrinc"
)

horizons <- c(2L, 4L, 8L)
dt <- fread(source_csv)
dt <- dt[
  treatment %in% names(channel_map) &
  outcome %in% names(metric_map) &
  as.integer(horizon) %in% horizons
]

if (!nrow(dt)) {
  stop("No bridge rows found in DFLMX output")
}

dt[, horizon := as.integer(horizon)]
dt[, metric_col := unname(metric_map[outcome])]
wide <- dcast(
  dt,
  treatment + horizon ~ metric_col,
  value.var = "beta"
)

required_cols <- c("delta_ipovall", "delta_ipovch", "delta_iginihh", "delta_imedrinc")
for (col in required_cols) {
  if (!col %in% names(wide)) {
    wide[, (col) := as.numeric(NA)]
  }
}

setorder(wide, treatment, horizon)
wide[, bridge_version := "v1"]
wide[, repo := "ea"]
wide[, scenario_id := treatment]
wide[, scenario_label := unname(label_map[treatment])]
wide[, channel := unname(channel_map[treatment])]
wide[, family := treatment]
wide[, h := horizon]
wide[, baseline_id := "implicit_zero_shock"]
wide[, dose_metric := "native_shock_unit"]
wide[, dose_value := 1.0]
wide[, delta_trlowz := as.numeric(NA)]
wide[, delta_rydpc := as.numeric(NA)]
wide[, notes := "ea-ineq bridge does not yet expose a TRLOWZ or RYDPC analog; coefficients are DFLMX LP responses per native treatment shock unit."]

out <- wide[, .(
  bridge_version,
  repo,
  scenario_id,
  scenario_label,
  channel,
  family,
  h,
  baseline_id,
  dose_metric,
  dose_value,
  delta_trlowz,
  delta_ipovall,
  delta_ipovch,
  delta_rydpc,
  delta_iginihh,
  delta_imedrinc,
  notes
)]

fwrite(out, out_csv)

meta <- list(
  bridge_version = "v1",
  repo = "ea",
  source_csv = source_csv,
  channels_by_treatment = as.list(channel_map),
  horizons = as.list(horizons),
  dose_metric = "native_shock_unit",
  headline_metrics = list("delta_ipovall", "delta_ipovch"),
  secondary_metrics = list("delta_iginihh", "delta_imedrinc"),
  unavailable_metrics = list("delta_trlowz", "delta_rydpc"),
  notes = "Bridge rows are taken from DFLMX LP results. `delta_trlowz` and `delta_rydpc` are not currently available in ea-ineq and remain blank."
)

write_json(meta, out_json, auto_unbox = TRUE, pretty = TRUE)
cat(sprintf("Wrote %s and %s\n", out_csv, out_json))
