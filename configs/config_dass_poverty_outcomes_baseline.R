CONFIG_THIS <- if (exists(".__CONFIG_PATH__", inherits = TRUE)) get(".__CONFIG_PATH__", inherits = TRUE) else file.path(getwd(), "config_dass_poverty_outcomes_baseline.R")
DASS_ROOT <- normalizePath(dirname(CONFIG_THIS), winslash = "/", mustWork = FALSE)
RESULTS_ROOT_ENV <- Sys.getenv("ECONARK_RESULTS_DIR", unset = "")
RESULTS_ROOT <- if (nzchar(RESULTS_ROOT_ENV)) normalizePath(RESULTS_ROOT_ENV, winslash = "/", mustWork = FALSE) else file.path(tempdir(), "econark_results")

OUT_DIR <- file.path(RESULTS_ROOT, "dass-R", "poverty_outcomes_baseline")
OUT_CSV <- file.path(OUT_DIR, "stacked_quarterly.csv")
OUT_META_MD <- file.path(OUT_DIR, "stacked_quarterly_meta.md")
RESULTS_CSV <- file.path(OUT_DIR, "results.csv")
ESTIMATOR_DIAGNOSTICS_CSV <- file.path(OUT_DIR, "estimator_diagnostics.csv")
REPORT_MD <- file.path(OUT_DIR, "report.md")
CONTRACT_MANIFEST_CSV <- file.path(OUT_DIR, "contract_manifest.csv")
REPORT_MIN_N <- 20

# Baseline profile: inherit inputs + settings from the full poverty-outcomes config.
FULL_PATH <- file.path(DASS_ROOT, "config_dass_poverty_outcomes.R")
FULL_ENV <- new.env(parent = baseenv())
FULL_ENV$`.__CONFIG_PATH__` <- FULL_PATH
sys.source(FULL_PATH, envir = FULL_ENV)

FETCHR_OUT <- FULL_ENV$FETCHR_OUT
FETCHR_OUT_BASE <- FULL_ENV$FETCHR_OUT_BASE
START_DATE <- FULL_ENV$START_DATE
END_DATE <- FULL_ENV$END_DATE
CUTOFF_POLICY <- FULL_ENV$CUTOFF_POLICY
DAILY_LAGS <- FULL_ENV$DAILY_LAGS
WEEKLY_LAGS <- FULL_ENV$WEEKLY_LAGS
MONTHLY_LAGS <- FULL_ENV$MONTHLY_LAGS
QUARTERLY_LAGS <- FULL_ENV$QUARTERLY_LAGS
MAX_MISSING_PCT <- FULL_ENV$MAX_MISSING_PCT
STANDARDIZE <- FULL_ENV$STANDARDIZE
SERIES_SPECS <- FULL_ENV$SERIES_SPECS
PREP_INCLUDE_QUARTER_END <- FULL_ENV$PREP_INCLUDE_QUARTER_END
AUTO_SERIES_DIR <- FULL_ENV$AUTO_SERIES_DIR
AUTO_SERIES_INCLUDE_REGEX <- FULL_ENV$AUTO_SERIES_INCLUDE_REGEX
AUTO_SERIES_EXCLUDE_REGEX <- FULL_ENV$AUTO_SERIES_EXCLUDE_REGEX
AUTO_SERIES_NAME_MODE <- FULL_ENV$AUTO_SERIES_NAME_MODE
AUTO_SERIES_SKIP_EXISTING <- FULL_ENV$AUTO_SERIES_SKIP_EXISTING
AUTO_SERIES_REQUIRE_DATE_VALUE <- FULL_ENV$AUTO_SERIES_REQUIRE_DATE_VALUE
AUTO_SERIES_FREQ_ALLOW <- FULL_ENV$AUTO_SERIES_FREQ_ALLOW
AUTO_SERIES_MIN_OBS <- FULL_ENV$AUTO_SERIES_MIN_OBS

DESIGN_OUT_DIR <- file.path(OUT_DIR, "design")
LP_OUT_DIR <- file.path(OUT_DIR, "lp")
DML_OUT_DIR <- file.path(OUT_DIR, "dml")
LP_IV_OUT_DIR <- file.path(OUT_DIR, "lp_iv")
DML_IV_OUT_DIR <- file.path(OUT_DIR, "dml_iv")
TMLE_OUT_DIR <- file.path(OUT_DIR, "tmle")
CF_OUT_DIR <- file.path(OUT_DIR, "cf")

# Baseline: reduce estimator fan-out.
RUN_LP <- TRUE
RUN_DML <- TRUE
RUN_LP_IV <- FALSE
RUN_DML_IV <- FALSE
RUN_TMLE <- FALSE
RUN_CF <- FALSE
RUN_REPORT <- TRUE
RUN_CONTRACT_MANIFEST <- TRUE

RUN_BH <- TRUE
RUN_ROMANO_WOLF <- FALSE
RUN_PERM_TEST <- FALSE
RUN_SENSITIVITY_BOUNDS <- FALSE
RUN_ENDPOINT_STABILITY <- FALSE

IV_HAC_LAGS <- FULL_ENV$IV_HAC_LAGS
IV_Z_MAX <- FULL_ENV$IV_Z_MAX
IV_Z_SELECT <- FULL_ENV$IV_Z_SELECT
IV_INCLUDE_W <- FULL_ENV$IV_INCLUDE_W
IV_MIN_FIRST_STAGE_F <- FULL_ENV$IV_MIN_FIRST_STAGE_F
IV_W_MAX <- FULL_ENV$IV_W_MAX
LP_IV_W_MAX <- FULL_ENV$LP_IV_W_MAX
DML_IV_W_MAX <- FULL_ENV$DML_IV_W_MAX

DESIGN_DEFAULTS <- list(
  folds = 5,
  horizons = c(2, 4, 8),
  binary = FALSE,
  binary_quantile = 0.75,
  make_stationary = FALSE,
  standardize = FALSE,
  w_tag = NULL,
  drop_start = NULL,
  drop_end = NULL,
  drop_tag = NULL,
  drop_w_series = c("recession_nber_daily")
)

BASE_TREATMENTS <- c("fed_funds", "transfer_composite", "ui_benefits", "social_security", "snap_persons", "credit_composite")
BASE_OUTCOMES <- c(
  "poverty_all_q",
  "poverty_child_q",
  "gini_households_q",
  "median_real_income_fred_q",
  "wealth_share_gap_top10_bottom50",
  "wealth_share_gap_top1_bottom50"
)

DESIGN_JOBS <- local({
  jobs <- list()
  for (treat in BASE_TREATMENTS) {
    for (out in BASE_OUTCOMES) {
      job <- list(treatment = treat, outcome = out)
      if (identical(treat, "fed_funds")) job$treatment_mode <- "shock"
      jobs[[length(jobs) + 1L]] <- job
    }
  }
  jobs
})

RUNNER_THREADS <- 4
MATH_THREADS <- 1
