#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)

pick_arg <- function(flag, default = NULL) {
  idx <- match(flag, args)
  if (!is.na(idx) && idx < length(args)) return(args[[idx + 1L]])
  default
}

has_flag <- function(flag) {
  any(args %in% flag)
}

script_dir <- normalizePath(dirname(sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE)[1])), winslash = "/", mustWork = TRUE)
project_root <- normalizePath(file.path(script_dir, ".."), winslash = "/", mustWork = TRUE)

econark_r_root <- pick_arg("--econark-r-root", Sys.getenv("ECONARK_R_ROOT", unset = ""))
if (!nzchar(econark_r_root)) {
  stop("Set ECONARK_R_ROOT or pass --econark-r-root to point at the econark-r checkout.")
}
econark_r_root <- normalizePath(econark_r_root, winslash = "/", mustWork = TRUE)

results_root <- pick_arg("--results-root", file.path(project_root, ".cache", "broad_run_manual"))
results_root <- normalizePath(results_root, winslash = "/", mustWork = FALSE)
fetchr_out_dir <- pick_arg("--fetchr-out-dir", file.path(project_root, "results"))
fetchr_out_dir <- normalizePath(fetchr_out_dir, winslash = "/", mustWork = FALSE)
interpol_raw_dir <- pick_arg("--interpol-raw-dir", file.path(project_root, ".cache", "interpol_raw"))
interpol_raw_dir <- normalizePath(interpol_raw_dir, winslash = "/", mustWork = TRUE)
job_limit_raw <- pick_arg("--job-limit", "")
job_limit <- suppressWarnings(as.integer(job_limit_raw))
if (!is.finite(job_limit) || job_limit <= 0L) job_limit <- NA_integer_
job_start_raw <- pick_arg("--job-start", "")
job_start <- suppressWarnings(as.integer(job_start_raw))
if (!is.finite(job_start) || job_start <= 0L) job_start <- NA_integer_
job_end_raw <- pick_arg("--job-end", "")
job_end <- suppressWarnings(as.integer(job_end_raw))
if (!is.finite(job_end) || job_end <= 0L) job_end <- NA_integer_
skip_prep <- has_flag("--skip-prep")
prep_csv_in <- pick_arg("--prep-csv", "")
prep_meta_in <- pick_arg("--prep-meta", "")
skip_finalize <- has_flag("--skip-finalize")

config_path <- file.path(project_root, "configs", "config_dass_poverty_outcomes_baseline.R")
run_root <- file.path(econark_r_root, "dass-R")
run_dir <- file.path(run_root, "run")

Sys.setenv(
  ECONARK_RESULTS_DIR = results_root,
  FETCHR_OUT_DIR = fetchr_out_dir,
  INTERPOL_RAW_DIR = interpol_raw_dir,
  DASS_THREADS = "1"
)

source(file.path(run_dir, "common.R"))
source(file.path(run_dir, "results_writer.R"))
source(file.path(run_dir, "results_utils.R"))
source(file.path(run_dir, "prep.R"))
source(file.path(run_dir, "design.R"))
source(file.path(run_dir, "lp.R"))
source(file.path(run_dir, "weak_iv_core.R"))
source(file.path(run_dir, "weak_iv_clr.R"))
source(file.path(run_dir, "lp_iv.R"))
source(file.path(run_dir, "dml.R"))
source(file.path(run_dir, "dml_iv.R"))
source(file.path(run_dir, "bh.R"))
source(file.path(run_dir, "romano_wolf_stepdown.R"))
source(file.path(run_dir, "perm_test.R"))
source(file.path(run_dir, "permutation_inference.R"))
source(file.path(run_dir, "sensitivity_bounds.R"))
source(file.path(run_dir, "endpoint_stability.R"))
source(file.path(run_dir, "synthetic_calibration_harness.R"))
source(file.path(run_dir, "synthetic_calibration_gate.R"))
source(file.path(run_dir, "idkit", "schema.R"))
source(file.path(run_dir, "idkit", "summarize_id.R"))
source(file.path(run_dir, "tmle.R"))
source(file.path(run_dir, "cf.R"))
source(file.path(run_dir, "report.R"))
source(file.path(run_dir, "contract_manifest.R"))
source(file.path(run_dir, "launcher.R"))

cfg <- dass_load_config(config_path)
set_results_provenance_context(cfg)
on.exit(clear_results_provenance_context(), add = TRUE)

message(sprintf("[broad-run] config: %s", config_path))
message(sprintf("[broad-run] results_root: %s", results_root))
message(sprintf("[broad-run] fetchr_out_dir: %s", fetchr_out_dir))
message(sprintf("[broad-run] interpol_raw_dir: %s", interpol_raw_dir))

dir.create(resolve_cfg_path(cfg$OUT_DIR, cfg), recursive = TRUE, showWarnings = FALSE)
dir.create(resolve_cfg_path(cfg$DESIGN_OUT_DIR, cfg), recursive = TRUE, showWarnings = FALSE)
dir.create(resolve_cfg_path(cfg$LP_OUT_DIR, cfg), recursive = TRUE, showWarnings = FALSE)
dir.create(resolve_cfg_path(cfg$DML_OUT_DIR, cfg), recursive = TRUE, showWarnings = FALSE)

out_csv <- resolve_cfg_path(cfg$OUT_CSV, cfg)
out_meta <- resolve_cfg_path(cfg$OUT_META_MD, cfg)

if (isTRUE(skip_prep)) {
  if (!nzchar(prep_csv_in)) stop("--skip-prep requires --prep-csv")
  prep_csv_src <- normalizePath(prep_csv_in, winslash = "/", mustWork = TRUE)
  prep_meta_src <- if (nzchar(prep_meta_in)) normalizePath(prep_meta_in, winslash = "/", mustWork = TRUE) else ""
  dir.create(dirname(out_csv), recursive = TRUE, showWarnings = FALSE)
  ok <- file.copy(prep_csv_src, out_csv, overwrite = TRUE)
  if (!isTRUE(ok)) stop(sprintf("Failed copying prep csv from %s", prep_csv_src))
  if (nzchar(prep_meta_src)) {
    ok_meta <- file.copy(prep_meta_src, out_meta, overwrite = TRUE)
    if (!isTRUE(ok_meta)) stop(sprintf("Failed copying prep meta from %s", prep_meta_src))
  }
  message(sprintf("[broad-run] prep reused from %s", prep_csv_src))
} else {
  prep_time <- system.time(
    run_prep(
      cfg,
      include_quarter_end = cfg$PREP_INCLUDE_QUARTER_END,
      out_csv = out_csv,
      out_meta = out_meta
    )
  )
  message(sprintf("[broad-run] prep complete in %.1fs", prep_time[["elapsed"]]))
}

defaults <- if (is.null(cfg$DESIGN_DEFAULTS)) list() else cfg$DESIGN_DEFAULTS
jobs <- .expand_jobs(cfg$DESIGN_JOBS, defaults)
job_total <- length(jobs)
if (!is.na(job_start) || !is.na(job_end)) {
  start_idx <- if (is.na(job_start)) 1L else min(max(1L, job_start), job_total)
  end_idx <- if (is.na(job_end)) job_total else min(max(start_idx, job_end), job_total)
  jobs <- jobs[seq.int(start_idx, end_idx)]
  message(sprintf("[broad-run] job_slice: %d-%d of %d", start_idx, end_idx, job_total))
}
if (!is.na(job_limit)) jobs <- jobs[seq_len(min(length(jobs), job_limit))]
message(sprintf("[broad-run] job_count: %d", length(jobs)))

.or_null <- function(x, f = function(v) v) {
  if (is.null(x)) return(NULL)
  f(x)
}

for (i in seq_along(jobs)) {
  job <- jobs[[i]]
  message(sprintf(
    "[broad-run] job %d/%d: %s -> %s h=%d mode=%s",
    i, length(jobs), as.character(job$treatment), as.character(job$outcome),
    as.integer(job$horizon),
    ifelse(is.null(job$treatment_mode), "level", as.character(job$treatment_mode))
  ))

  design_time <- system.time(
  dres <- run_design(
    cfg = cfg,
    treatment = as.character(job$treatment),
    outcome = as.character(job$outcome),
    horizon = as.integer(job$horizon),
    cum_horizon = ifelse(is.null(job$cum_horizon), 0, as.integer(job$cum_horizon)),
    treatment_mode = ifelse(is.null(job$treatment_mode), "level", as.character(job$treatment_mode)),
    binary = ifelse(is.null(job$binary), FALSE, isTRUE(job$binary)),
    binary_quantile = ifelse(is.null(job$binary_quantile), 0.75, as.numeric(job$binary_quantile)),
    folds = ifelse(is.null(job$folds), 5, as.integer(job$folds)),
    shock_l1_ratio = ifelse(is.null(job$shock_l1_ratio), 0.1, as.numeric(job$shock_l1_ratio)),
    shock_cv = ifelse(is.null(job$shock_cv), 3, as.integer(job$shock_cv)),
    shock_max_iter = ifelse(is.null(job$shock_max_iter), 10000, as.integer(job$shock_max_iter)),
    shock_w_max = .or_null(job$shock_w_max, as.integer),
    shock_w_select = ifelse(is.null(job$shock_w_select), "variance", as.character(job$shock_w_select)),
    shock_oos = ifelse(is.null(job$shock_oos), "expanding", as.character(job$shock_oos)),
    placebo_lead = ifelse(is.null(job$placebo_lead), 0, as.integer(job$placebo_lead)),
    drop_start = .or_null(job$drop_start, as.character),
    drop_end = .or_null(job$drop_end, as.character),
    drop_tag = .or_null(job$drop_tag, as.character),
    drop_w_series = ifelse(is.null(job$drop_w_series), character(), as.character(job$drop_w_series)),
    w_tag = .or_null(job$w_tag, as.character),
    make_stationary = ifelse(is.null(job$make_stationary), FALSE, isTRUE(job$make_stationary)),
    standardize = ifelse(is.null(job$standardize), FALSE, isTRUE(job$standardize))
  )
  )
  message(sprintf("[broad-run] design complete in %.1fs -> %s", design_time[["elapsed"]], dres$design_csv))

  if (isTRUE(cfg$RUN_LP)) {
    lp_time <- system.time(run_lp(cfg, dres$design_csv, dres$meta_json))
    message(sprintf("[broad-run] lp complete in %.1fs", lp_time[["elapsed"]]))
  }
  if (isTRUE(cfg$RUN_DML)) {
    dml_time <- system.time(run_dml(cfg, dres$design_csv, dres$meta_json))
    message(sprintf("[broad-run] dml complete in %.1fs", dml_time[["elapsed"]]))
  }
}

if (!isTRUE(skip_finalize)) {
  if (isTRUE(cfg$RUN_BH)) {
    bh_time <- system.time(run_bh(cfg))
    message(sprintf("[broad-run] bh complete in %.1fs", bh_time[["elapsed"]]))
  }
  if (isTRUE(cfg$RUN_REPORT)) {
    report_time <- system.time(run_report(cfg))
    message(sprintf("[broad-run] report complete in %.1fs", report_time[["elapsed"]]))
  }
  if (isTRUE(cfg$RUN_CONTRACT_MANIFEST)) {
    manifest_time <- system.time(run_contract_manifest(cfg))
    message(sprintf("[broad-run] manifest complete in %.1fs", manifest_time[["elapsed"]]))
  }
} else {
  message("[broad-run] finalize skipped")
}

message("[broad-run] complete")
