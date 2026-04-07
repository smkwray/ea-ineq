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
script_path <- normalizePath(script_arg %or% sys.frames()[[1]]$ofile %or% file.path(getwd(), "scripts", "compare_bridge_exports.R"), winslash = "/", mustWork = FALSE)
repo_root <- normalizePath(file.path(dirname(script_path), ".."), winslash = "/", mustWork = TRUE)
bridge_dir <- file.path(repo_root, "results", "bridge")

default_ea_csv <- file.path(bridge_dir, "bridge_results.csv")
default_ea_meta <- file.path(bridge_dir, "bridge_metadata.json")
archive_fp_csv <- file.path(bridge_dir, "fp_bridge_results.csv")
archive_fp_meta <- file.path(bridge_dir, "fp_bridge_metadata.json")
out_long <- file.path(bridge_dir, "cross_repo_bridge_long.csv")
out_compare <- file.path(bridge_dir, "cross_repo_bridge_compare.csv")
out_meta <- file.path(bridge_dir, "cross_repo_bridge_metadata.json")

metrics <- c(
  "delta_trlowz",
  "delta_ipovall",
  "delta_ipovch",
  "delta_rydpc",
  "delta_iginihh",
  "delta_imedrinc"
)

rel_to_repo <- function(path) {
  resolved <- normalizePath(path, winslash = "/", mustWork = FALSE)
  prefix <- paste0(repo_root, "/")
  if (startsWith(resolved, prefix)) {
    return(sub(paste0("^", prefix), "", resolved))
  }
  basename(path)
}

choose_source <- function(cli_path, env_name, archive_path) {
  if (!is.null(cli_path) && nzchar(cli_path)) {
    return(normalizePath(cli_path, winslash = "/", mustWork = FALSE))
  }
  env_path <- Sys.getenv(env_name, unset = "")
  if (nzchar(env_path)) {
    return(normalizePath(env_path, winslash = "/", mustWork = FALSE))
  }
  if (file.exists(archive_path)) {
    return(normalizePath(archive_path, winslash = "/", mustWork = FALSE))
  }
  stop(
    sprintf(
      "Missing fp bridge source; pass %s or set %s",
      if (grepl("CSV", env_name, fixed = TRUE)) "--fp-csv" else "--fp-meta",
      env_name
    )
  )
}

ea_csv <- normalizePath(arg_value("--ea-csv", default_ea_csv), winslash = "/", mustWork = FALSE)
ea_meta <- normalizePath(arg_value("--ea-meta", default_ea_meta), winslash = "/", mustWork = FALSE)
fp_csv <- choose_source(arg_value("--fp-csv", ""), "FP_INEQ_BRIDGE_CSV", archive_fp_csv)
fp_meta <- choose_source(arg_value("--fp-meta", ""), "FP_INEQ_BRIDGE_META", archive_fp_meta)

if (!file.exists(ea_csv)) {
  stop(sprintf("Missing ea bridge results: %s", ea_csv))
}
if (!file.exists(fp_csv)) {
  stop(sprintf("Missing fp bridge results: %s", fp_csv))
}

dir.create(bridge_dir, recursive = TRUE, showWarnings = FALSE)
if (normalizePath(fp_csv, winslash = "/", mustWork = FALSE) != normalizePath(archive_fp_csv, winslash = "/", mustWork = FALSE)) {
  file.copy(fp_csv, archive_fp_csv, overwrite = TRUE)
}
if (file.exists(fp_meta) && normalizePath(fp_meta, winslash = "/", mustWork = FALSE) != normalizePath(archive_fp_meta, winslash = "/", mustWork = FALSE)) {
  file.copy(fp_meta, archive_fp_meta, overwrite = TRUE)
}

ea <- fread(ea_csv, na.strings = c("", "NA"))
fp <- fread(if (file.exists(archive_fp_csv)) archive_fp_csv else fp_csv, na.strings = c("", "NA"))

long_dt <- rbindlist(list(ea, fp), use.names = TRUE, fill = TRUE)
setorder(long_dt, channel, h, repo, scenario_id)
fwrite(long_dt, out_long, na = "")

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

fp_work <- copy(fp)
fp_work[, h := as.character(h)]

summary_rows <- list()
channels <- sort(unique(fp_work$channel))
for (channel_val in channels) {
  for (h_val in c("2", "4", "8")) {
    fp_group <- fp_work[channel == channel_val & h == h_val]
    ea_row <- ea_lookup[channel == channel_val & h == h_val]
    row <- data.table(
      channel = channel_val,
      h = h_val,
      comparison_basis = "fp_channel_envelope",
      ea_scenario_id = if (nrow(ea_row)) ea_row$ea_scenario_id[[1]] else "",
      ea_scenario_label = if (nrow(ea_row)) ea_row$ea_scenario_label[[1]] else "",
      ea_dose_metric = if (nrow(ea_row)) ea_row$ea_dose_metric[[1]] else "",
      ea_dose_value = if (nrow(ea_row)) ea_row$ea_dose_value[[1]] else "",
      fp_scenario_count = nrow(fp_group),
      fp_scenario_ids = if (nrow(fp_group)) paste(fp_group$scenario_id, collapse = "|") else "",
      fp_dose_metric = if (nrow(fp_group)) fp_group$dose_metric[[1]] else "",
      notes = paste(
        "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks",
        "TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz.",
        "fp-ineq values are reported as channel envelopes across all published scenarios at this",
        "channel and horizon."
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
      fp_vals <- fp_group[[metric]]
      fp_vals <- fp_vals[!is.na(fp_vals)]

      row[[ea_col]] <- ea_val
      row[[fp_min_col]] <- if (length(fp_vals)) min(fp_vals) else NA_real_
      row[[fp_max_col]] <- if (length(fp_vals)) max(fp_vals) else NA_real_
      row[[fp_pos_col]] <- sum(fp_vals > 0, na.rm = TRUE)
      row[[fp_neg_col]] <- sum(fp_vals < 0, na.rm = TRUE)
      row[[within_col]] <- if (is.na(ea_val) || !length(fp_vals)) NA else (min(fp_vals) <= ea_val && ea_val <= max(fp_vals))
    }

    summary_rows[[length(summary_rows) + 1L]] <- row
  }
}

compare_dt <- rbindlist(summary_rows, use.names = TRUE, fill = TRUE)
fwrite(compare_dt, out_compare, na = "")

raw_direction_summary <- list()
for (metric in c("delta_ipovall", "delta_ipovch", "delta_imedrinc")) {
  pos_col <- paste0("fp_", metric, "_positive_count")
  neg_col <- paste0("fp_", metric, "_negative_count")
  raw_direction_summary[[metric]] <- list(
    all_positive_envelopes = compare_dt[get(pos_col) > 0 & get(neg_col) == 0, .N],
    all_negative_envelopes = compare_dt[get(pos_col) == 0 & get(neg_col) > 0, .N],
    mixed_sign_envelopes = compare_dt[get(pos_col) > 0 & get(neg_col) > 0, .N],
    status = "fp_channel_envelope_direction_summary"
  )
}

metadata <- list(
  comparison_version = "v1",
  comparison_basis = "fp_channel_envelope",
  comparison_interpretation_status = "diagnostic_only",
  polarity_audit_status = "completed_no_mechanical_sign_flip",
  ea_bridge_csv = rel_to_repo(ea_csv),
  ea_bridge_metadata = rel_to_repo(ea_meta),
  fp_bridge_csv_source = rel_to_repo(fp_csv),
  fp_bridge_metadata_source = rel_to_repo(fp_meta),
  archived_fp_bridge_csv = rel_to_repo(archive_fp_csv),
  archived_fp_bridge_metadata = rel_to_repo(archive_fp_meta),
  channels = as.list(sort(unique(fp$channel))),
  horizons = as.list(c(2L, 4L, 8L)),
  metrics = as.list(metrics),
  raw_direction_summary = raw_direction_summary,
  limitations = list(
    "ea-ineq bridge rows are per native shock unit rather than delta_trlowz.",
    "ea-ineq currently leaves delta_trlowz and delta_rydpc blank.",
    "fp-ineq values are summarized as channel envelopes, not one-to-one scenario matches.",
    "The polarity audit rules out a simple sign-convention flip, but it does not resolve the deeper estimand mismatch."
  ),
  outputs = list(
    long_csv = rel_to_repo(out_long),
    compare_csv = rel_to_repo(out_compare)
  )
)

write_json(metadata, out_meta, auto_unbox = TRUE, pretty = TRUE, digits = NA)
cat(sprintf("Wrote %s\n", out_long))
cat(sprintf("Wrote %s\n", out_compare))
cat(sprintf("Wrote %s\n", out_meta))
