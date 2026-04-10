#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)

pick_arg <- function(flag, default = NULL) {
  idx <- match(flag, args)
  if (!is.na(idx) && idx < length(args)) return(args[[idx + 1L]])
  default
}

script_dir <- normalizePath(dirname(sub("^--file=", "", grep("^--file=", commandArgs(FALSE), value = TRUE)[1])), winslash = "/", mustWork = TRUE)
project_root <- normalizePath(file.path(script_dir, ".."), winslash = "/", mustWork = TRUE)

econark_r_root <- pick_arg("--econark-r-root", Sys.getenv("ECONARK_R_ROOT", unset = ""))
if (!nzchar(econark_r_root)) stop("Set ECONARK_R_ROOT or pass --econark-r-root.")
econark_r_root <- normalizePath(econark_r_root, winslash = "/", mustWork = TRUE)

batches_root <- pick_arg("--batches-root", file.path(project_root, ".cache", "remote_broad_batches"))
batches_root <- normalizePath(batches_root, winslash = "/", mustWork = TRUE)
results_root <- pick_arg("--results-root", file.path(project_root, ".cache", "remote_broad_run_full"))
results_root <- normalizePath(results_root, winslash = "/", mustWork = FALSE)
prep_csv_in <- pick_arg("--prep-csv", "")
prep_meta_in <- pick_arg("--prep-meta", "")

run_root <- file.path(econark_r_root, "dass-R")
run_dir <- file.path(run_root, "run")
config_path <- file.path(project_root, "configs", "config_dass_poverty_outcomes_baseline.R")

source(file.path(run_dir, "common.R"))
source(file.path(run_dir, "bh.R"))
source(file.path(run_dir, "report.R"))
source(file.path(run_dir, "contract_manifest.R"))

union_rbind <- function(dfs) {
  if (length(dfs) == 0L) return(data.frame())
  cols <- unique(unlist(lapply(dfs, names), use.names = FALSE))
  dfs2 <- lapply(dfs, function(df) {
    miss <- setdiff(cols, names(df))
    for (col in miss) df[[col]] <- NA
    df[, cols, drop = FALSE]
  })
  do.call(rbind, dfs2)
}

Sys.setenv(ECONARK_RESULTS_DIR = results_root)
cfg <- dass_load_config(config_path)

out_dir <- resolve_cfg_path(cfg$OUT_DIR, cfg)
dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)

out_csv <- resolve_cfg_path(cfg$OUT_CSV, cfg)
out_meta <- resolve_cfg_path(cfg$OUT_META_MD, cfg)
results_csv <- resolve_cfg_path(cfg$RESULTS_CSV, cfg)

if (nzchar(prep_csv_in)) {
  prep_csv_src <- normalizePath(prep_csv_in, winslash = "/", mustWork = TRUE)
  if (!isTRUE(file.copy(prep_csv_src, out_csv, overwrite = TRUE))) {
    stop(sprintf("Failed copying prep csv from %s", prep_csv_src))
  }
}
if (nzchar(prep_meta_in)) {
  prep_meta_src <- normalizePath(prep_meta_in, winslash = "/", mustWork = TRUE)
  if (!isTRUE(file.copy(prep_meta_src, out_meta, overwrite = TRUE))) {
    stop(sprintf("Failed copying prep meta from %s", prep_meta_src))
  }
}

batch_results <- sort(Sys.glob(file.path(batches_root, "batch_*", "dass-R", "poverty_outcomes_baseline", "results.csv")))
if (length(batch_results) == 0L) stop(sprintf("No batch results found under %s", batches_root))

dfs <- lapply(batch_results, function(path) utils::read.csv(path, stringsAsFactors = FALSE))
all_results <- union_rbind(dfs)
utils::write.csv(all_results, results_csv, row.names = FALSE)

message(sprintf("[finalize-batches] batches: %d", length(batch_results)))
message(sprintf("[finalize-batches] merged rows: %d", nrow(all_results)))

bh_time <- system.time(run_bh(cfg))
message(sprintf("[finalize-batches] bh complete in %.1fs", bh_time[["elapsed"]]))
report_time <- system.time(run_report(cfg))
message(sprintf("[finalize-batches] report complete in %.1fs", report_time[["elapsed"]]))
manifest_time <- system.time(run_contract_manifest(cfg))
message(sprintf("[finalize-batches] manifest complete in %.1fs", manifest_time[["elapsed"]]))

message(sprintf("[finalize-batches] results csv: %s", results_csv))
