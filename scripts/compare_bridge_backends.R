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
script_path <- normalizePath(script_arg %or% sys.frames()[[1]]$ofile %or% file.path(getwd(), "scripts", "compare_bridge_backends.R"), winslash = "/", mustWork = FALSE)
repo_root <- normalizePath(file.path(dirname(script_path), ".."), winslash = "/", mustWork = TRUE)
bridge_dir <- file.path(repo_root, "results", "bridge")

ea_csv <- file.path(bridge_dir, "bridge_results.csv")
ea_meta <- file.path(bridge_dir, "bridge_metadata.json")
out_compare <- file.path(bridge_dir, "cross_repo_bridge_compare_backends.csv")
out_meta <- file.path(bridge_dir, "cross_repo_bridge_backends_metadata.json")

metrics <- c(
  "delta_trlowz",
  "delta_ipovall",
  "delta_ipovch",
  "delta_rydpc",
  "delta_iginihh",
  "delta_imedrinc"
)

fp_sources <- list(
  "fp-r" = list(
    csv_env = "FP_INEQ_BRIDGE_FPR_CSV",
    meta_env = "FP_INEQ_BRIDGE_FPR_META",
    archive_csv = file.path(bridge_dir, "fp_bridge_results_fpr.csv"),
    archive_meta = file.path(bridge_dir, "fp_bridge_metadata_fpr.json"),
    source_label_csv = "fp-ineq/reports/phase1_distribution_block_fprremote2/bridge_results.csv",
    source_label_meta = "fp-ineq/reports/phase1_distribution_block_fprremote2/bridge_metadata.json"
  ),
  "fpexe" = list(
    csv_env = "FP_INEQ_BRIDGE_FPEXE_CSV",
    meta_env = "FP_INEQ_BRIDGE_FPEXE_META",
    archive_csv = file.path(bridge_dir, "fp_bridge_results_fpexe.csv"),
    archive_meta = file.path(bridge_dir, "fp_bridge_metadata_fpexe.json"),
    source_label_csv = "fp-ineq/reports/phase1_distribution_block_fpexe/bridge_results.csv",
    source_label_meta = "fp-ineq/reports/phase1_distribution_block_fpexe/bridge_metadata.json"
  )
)

rel_to_repo <- function(path) {
  resolved <- normalizePath(path, winslash = "/", mustWork = FALSE)
  prefix <- paste0(repo_root, "/")
  if (startsWith(resolved, prefix)) {
    return(sub(paste0("^", prefix), "", resolved))
  }
  basename(path)
}

choose_source <- function(path_env, archive_path, label) {
  env_path <- Sys.getenv(path_env, unset = "")
  if (nzchar(env_path)) {
    return(list(path = normalizePath(env_path, winslash = "/", mustWork = FALSE), label = label))
  }
  if (file.exists(archive_path)) {
    return(list(path = normalizePath(archive_path, winslash = "/", mustWork = FALSE), label = rel_to_repo(archive_path)))
  }
  stop(sprintf("Missing bridge source for %s. Set %s or populate %s first.", label, path_env, archive_path))
}

envelope_summary <- function(dt, metric) {
  vals <- dt[[metric]]
  vals <- vals[!is.na(vals)]
  if (!length(vals)) {
    return(list(min = NA_real_, max = NA_real_, positive_count = 0L, negative_count = 0L))
  }
  list(
    min = min(vals),
    max = max(vals),
    positive_count = sum(vals > 0),
    negative_count = sum(vals < 0)
  )
}

if (!file.exists(ea_csv)) {
  stop(sprintf("Missing ea bridge results: %s", ea_csv))
}

dir.create(bridge_dir, recursive = TRUE, showWarnings = FALSE)
ea <- fread(ea_csv, na.strings = c("", "NA"))
ea_lookup <- unique(ea[, .(
  channel,
  h = as.character(h),
  ea_scenario_id = scenario_id,
  ea_scenario_label = scenario_label,
  ea_dose_metric = dose_metric,
  ea_dose_value = dose_value,
  ea_delta_trlowz = delta_trlowz,
  ea_delta_ipovall = delta_ipovall,
  ea_delta_ipovch = delta_ipovch,
  ea_delta_rydpc = delta_rydpc,
  ea_delta_iginihh = delta_iginihh,
  ea_delta_imedrinc = delta_imedrinc
)])

compare_rows <- list()
metadata_sources <- list()
backend_summary <- list()

for (backend in names(fp_sources)) {
  config <- fp_sources[[backend]]
  source_csv <- choose_source(config$csv_env, config$archive_csv, config$source_label_csv)
  source_meta <- choose_source(config$meta_env, config$archive_meta, config$source_label_meta)

  if (normalizePath(source_csv$path, winslash = "/", mustWork = FALSE) != normalizePath(config$archive_csv, winslash = "/", mustWork = FALSE)) {
    file.copy(source_csv$path, config$archive_csv, overwrite = TRUE)
  }
  if (file.exists(source_meta$path) && normalizePath(source_meta$path, winslash = "/", mustWork = FALSE) != normalizePath(config$archive_meta, winslash = "/", mustWork = FALSE)) {
    file.copy(source_meta$path, config$archive_meta, overwrite = TRUE)
  }

  fp <- fread(config$archive_csv, na.strings = c("", "NA"))
  fp[, h := as.character(h)]

  metadata_sources[[backend]] <- list(
    csv_source = source_csv$label,
    meta_source = source_meta$label,
    archived_csv = rel_to_repo(config$archive_csv),
    archived_meta = rel_to_repo(config$archive_meta)
  )
  backend_summary[[backend]] <- list(
    row_count = nrow(fp),
    channels = as.list(sort(unique(fp$channel))),
    scenario_ids = as.list(sort(unique(fp$scenario_id)))
  )

  for (channel_val in sort(unique(fp$channel))) {
    for (h_val in c("2", "4", "8")) {
      fp_group <- fp[channel == channel_val & h == h_val]
      ea_row <- ea_lookup[channel == channel_val & h == h_val]
      row <- data.table(
        fp_backend = backend,
        channel = channel_val,
        h = h_val,
        comparison_basis = "fp_channel_envelope_by_backend",
        ea_scenario_id = if (nrow(ea_row)) ea_row$ea_scenario_id[[1]] else "",
        ea_scenario_label = if (nrow(ea_row)) ea_row$ea_scenario_label[[1]] else "",
        ea_dose_metric = if (nrow(ea_row)) ea_row$ea_dose_metric[[1]] else "",
        ea_dose_value = if (nrow(ea_row)) ea_row$ea_dose_value[[1]] else "",
        fp_scenario_count = nrow(fp_group),
        fp_scenario_ids = if (nrow(fp_group)) paste(fp_group$scenario_id, collapse = "|") else "",
        fp_dose_metric = if (nrow(fp_group)) fp_group$dose_metric[[1]] else "",
        notes = paste(
          "Backend-specific fp-ineq channel envelope. ea-ineq remains on native shock units,",
          "while fp-ineq remains normalized on delta_trlowz."
        )
      )

      for (metric in metrics) {
        ea_col <- paste0("ea_", metric)
        fp_min_col <- paste0("fp_", metric, "_min")
        fp_max_col <- paste0("fp_", metric, "_max")
        fp_pos_col <- paste0("fp_", metric, "_positive_count")
        fp_neg_col <- paste0("fp_", metric, "_negative_count")
        within_col <- paste0("ea_within_fp_", metric, "_envelope")

        ea_val <- if (nrow(ea_row) && ea_col %in% names(ea_row)) ea_row[[ea_col]][[1]] else NA_real_
        summary <- envelope_summary(fp_group, metric)

        row[[ea_col]] <- ea_val
        row[[fp_min_col]] <- summary$min
        row[[fp_max_col]] <- summary$max
        row[[fp_pos_col]] <- summary$positive_count
        row[[fp_neg_col]] <- summary$negative_count
        row[[within_col]] <- if (is.na(ea_val) || is.na(summary$min)) NA else (summary$min <= ea_val && ea_val <= summary$max)
      }

      compare_rows[[length(compare_rows) + 1L]] <- row
    }
  }
}

compare_dt <- rbindlist(compare_rows, use.names = TRUE, fill = TRUE)
compare_dt[, h_sort := as.integer(h)]
setorder(compare_dt, channel, h_sort, fp_backend)
compare_dt[, h_sort := NULL]
fwrite(compare_dt, out_compare, na = "")

backend_parity <- list()
if (all(c("fp-r", "fpexe") %in% names(fp_sources))) {
  fpr <- fread(fp_sources[["fp-r"]]$archive_csv, na.strings = c("", "NA"))
  fpexe <- fread(fp_sources[["fpexe"]]$archive_csv, na.strings = c("", "NA"))
  setkey(fpr, scenario_id, h)
  setkey(fpexe, scenario_id, h)
  merged <- fpr[fpexe, nomatch = 0L, allow.cartesian = FALSE]
  diffs <- list()
  for (metric in metrics) {
    left <- merged[[paste0("i.", metric)]]
    right <- merged[[metric]]
    diff_vals <- abs(left - right)
    diff_vals[is.na(diff_vals)] <- 0
    idx <- which.max(diff_vals)
    diffs[[metric]] <- list(
      max_abs_diff = diff_vals[[idx]],
      max_abs_diff_at = list(
        scenario_id = merged$scenario_id[[idx]],
        h = as.integer(merged$h[[idx]])
      )
    )
  }
  backend_parity <- list(
    "fp-r_vs_fpexe" = list(
      status = if (all(vapply(diffs, function(x) identical(as.numeric(x$max_abs_diff), 0), logical(1)))) "identical_on_current_bridge_surface" else "differs_on_current_bridge_surface",
      metrics = diffs
    )
  )
}

metadata <- list(
  comparison_version = "v1",
  comparison_basis = "fp_channel_envelope_by_backend",
  comparison_interpretation_status = "diagnostic_only",
  ea_bridge_csv = rel_to_repo(ea_csv),
  ea_bridge_metadata = rel_to_repo(ea_meta),
  fp_backends = metadata_sources,
  backend_summary = backend_summary,
  backend_parity = backend_parity,
  channels = as.list(sort(unique(compare_dt$channel))),
  horizons = as.list(c(2L, 4L, 8L)),
  metrics = as.list(metrics),
  limitations = list(
    "ea-ineq bridge rows remain per native shock unit rather than delta_trlowz.",
    "Both fp-ineq backends are summarized as channel envelopes rather than one-to-one scenario matches.",
    "Backend-level comparison still does not resolve the deeper estimand mismatch between ea-ineq and fp-ineq."
  ),
  outputs = list(
    compare_csv = rel_to_repo(out_compare)
  )
)

write_json(metadata, out_meta, auto_unbox = TRUE, pretty = TRUE, digits = NA)
cat(sprintf("Wrote %s\n", out_compare))
cat(sprintf("Wrote %s\n", out_meta))
