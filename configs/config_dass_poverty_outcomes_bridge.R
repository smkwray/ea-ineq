CONFIG_THIS <- if (exists(".__CONFIG_PATH__", inherits = TRUE)) get(".__CONFIG_PATH__", inherits = TRUE) else file.path(getwd(), "config_dass_poverty_outcomes_bridge.R")
DASS_ROOT <- normalizePath(dirname(CONFIG_THIS), winslash = "/", mustWork = FALSE)
RESULTS_ROOT_ENV <- Sys.getenv("ECONARK_RESULTS_DIR", unset = "")
RESULTS_ROOT <- if (nzchar(RESULTS_ROOT_ENV)) normalizePath(RESULTS_ROOT_ENV, winslash = "/", mustWork = FALSE) else file.path(tempdir(), "econark_results")

OUT_DIR <- file.path(RESULTS_ROOT, "dass-R", "poverty_outcomes_bridge")
OUT_CSV <- file.path(OUT_DIR, "stacked_quarterly.csv")
OUT_META_MD <- file.path(OUT_DIR, "stacked_quarterly_meta.md")
RESULTS_CSV <- file.path(OUT_DIR, "results.csv")
ESTIMATOR_DIAGNOSTICS_CSV <- file.path(OUT_DIR, "estimator_diagnostics.csv")
REPORT_MD <- file.path(OUT_DIR, "report.md")
CONTRACT_MANIFEST_CSV <- file.path(OUT_DIR, "contract_manifest.csv")
REPORT_MIN_N <- 20

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

DESIGN_OUT_DIR <- file.path(OUT_DIR, "design")
LP_OUT_DIR <- file.path(OUT_DIR, "lp")
DML_OUT_DIR <- file.path(OUT_DIR, "dml")
LP_IV_OUT_DIR <- file.path(OUT_DIR, "lp_iv")
DML_IV_OUT_DIR <- file.path(OUT_DIR, "dml_iv")
TMLE_OUT_DIR <- file.path(OUT_DIR, "tmle")
CF_OUT_DIR <- file.path(OUT_DIR, "cf")

RUN_LP <- TRUE
RUN_DML <- TRUE
RUN_LP_IV <- TRUE
RUN_DML_IV <- TRUE
RUN_TMLE <- TRUE
RUN_CF <- TRUE
RUN_REPORT <- TRUE
RUN_CONTRACT_MANIFEST <- TRUE

IV_HAC_LAGS <- FULL_ENV$IV_HAC_LAGS
IV_Z_MAX <- FULL_ENV$IV_Z_MAX
IV_Z_SELECT <- FULL_ENV$IV_Z_SELECT
IV_INCLUDE_W <- FULL_ENV$IV_INCLUDE_W
IV_MIN_FIRST_STAGE_F <- FULL_ENV$IV_MIN_FIRST_STAGE_F
IV_W_MAX <- FULL_ENV$IV_W_MAX
LP_IV_W_MAX <- FULL_ENV$LP_IV_W_MAX
DML_IV_W_MAX <- FULL_ENV$DML_IV_W_MAX

RUN_BH <- TRUE
RUN_ROMANO_WOLF <- TRUE
RUN_PERM_TEST <- TRUE
PERM_N <- FULL_ENV$PERM_N
PERM_OUT_DIR <- file.path(OUT_DIR, "perm")
PERM_SUMMARY_CSV <- file.path(OUT_DIR, "permutation_inference.csv")
ROMANO_WOLF_NULL_DRAWS_CSV <- file.path(OUT_DIR, "romano_wolf_null_draws.csv")

RUN_SENSITIVITY_BOUNDS <- TRUE
SENSITIVITY_GAMMA <- FULL_ENV$SENSITIVITY_GAMMA
SENSITIVITY_BOUNDS_CSV <- file.path(OUT_DIR, "sensitivity_bounds.csv")

RUN_ENDPOINT_STABILITY <- TRUE
ENDPOINT_STABILITY_MAX_DELTA <- FULL_ENV$ENDPOINT_STABILITY_MAX_DELTA
ENDPOINT_STABILITY_CSV <- file.path(OUT_DIR, "endpoint_stability.csv")

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

BRIDGE_TREATMENTS <- c("ui_benefits", "transfers_total", "transfer_composite_fp")
BRIDGE_OUTCOMES <- c("poverty_all_q", "poverty_child_q", "gini_households_q", "median_real_income_fred_q")

DESIGN_JOBS <- local({
  jobs <- list()
  for (treat in BRIDGE_TREATMENTS) {
    for (out in BRIDGE_OUTCOMES) {
      jobs[[length(jobs) + 1L]] <- list(
        treatment = treat,
        outcome = out,
        treatment_mode = "shock"
      )
    }
  }
  jobs
})

RUNNER_THREADS <- 4
MATH_THREADS <- 1
