CONFIG_THIS <- if (exists(".__CONFIG_PATH__", inherits = TRUE)) get(".__CONFIG_PATH__", inherits = TRUE) else file.path(getwd(), "config_dass_poverty_consumption_baseline.R")
DASS_ROOT <- normalizePath(dirname(CONFIG_THIS), winslash = "/", mustWork = FALSE)
FETCHR_ROOT <- normalizePath(file.path(DASS_ROOT, "..", "fetchr-R"), winslash = "/", mustWork = FALSE)
RESULTS_ROOT_ENV <- Sys.getenv("ECONARK_RESULTS_DIR", unset = "")
RESULTS_ROOT <- if (nzchar(RESULTS_ROOT_ENV)) normalizePath(RESULTS_ROOT_ENV, winslash = "/", mustWork = FALSE) else file.path(tempdir(), "econark_results")
FETCHR_OUT_DIR_ENV <- Sys.getenv("FETCHR_OUT_DIR", unset = "")
FETCHR_OUT <- if (nzchar(FETCHR_OUT_DIR_ENV)) file.path(FETCHR_OUT_DIR_ENV, "fetchr-R", "poverty_consumption") else file.path(FETCHR_ROOT, "out", "poverty_consumption")
FETCHR_OUT_BASE <- if (nzchar(FETCHR_OUT_DIR_ENV)) file.path(FETCHR_OUT_DIR_ENV, "fetchr-R", "poverty_consumption") else "../fetchr-R/out/poverty_consumption"

OUT_DIR <- file.path(RESULTS_ROOT, "dass-R", "poverty_consumption_baseline")
OUT_CSV <- file.path(OUT_DIR, "stacked_quarterly.csv")
OUT_META_MD <- file.path(OUT_DIR, "stacked_quarterly_meta.md")
RESULTS_CSV <- file.path(OUT_DIR, "results.csv")
ESTIMATOR_DIAGNOSTICS_CSV <- file.path(OUT_DIR, "estimator_diagnostics.csv")
REPORT_MD <- file.path(OUT_DIR, "report.md")
CONTRACT_MANIFEST_CSV <- file.path(OUT_DIR, "contract_manifest.csv")
REPORT_MIN_N <- 20

START_DATE <- "1990-03-31"
END_DATE <- "2025-12-31"
CUTOFF_POLICY <- "quarter_start"

DAILY_LAGS <- 30
WEEKLY_LAGS <- 8
MONTHLY_LAGS <- 12
QUARTERLY_LAGS <- 8
MAX_MISSING_PCT <- 65
STANDARDIZE <- FALSE

# Baseline profile: keep SERIES_SPECS identical to the full config so wiring stays stable.
SERIES_SPECS <- local({
  p <- file.path(DASS_ROOT, "config_dass_poverty_consumption.R")
  env <- new.env(parent = baseenv())
  env$`.__CONFIG_PATH__` <- p
  sys.source(p, envir = env)
  env$SERIES_SPECS
})

PREP_INCLUDE_QUARTER_END <- local({
  p <- file.path(DASS_ROOT, "config_dass_poverty_consumption.R")
  env <- new.env(parent = baseenv())
  env$`.__CONFIG_PATH__` <- p
  sys.source(p, envir = env)
  env$PREP_INCLUDE_QUARTER_END
})

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

IV_HAC_LAGS <- 4
IV_Z_MAX <- 60
IV_Z_SELECT <- "corr_t_then_variance"
IV_INCLUDE_W <- TRUE
IV_MIN_FIRST_STAGE_F <- 10
IV_W_MAX <- 150
LP_IV_W_MAX <- 150
DML_IV_W_MAX <- 150

DESIGN_DEFAULTS <- list(
  folds = 5,
  horizons = c(1, 2),
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

# Baseline: core policy channel grid centered on the canon v2 basket.
BASE_TREATMENTS <- c("fed_funds", "transfer_composite", "social_security", "ui_benefits", "snap_persons", "household_networth", "credit_composite")
BASE_OUTCOMES <- c("pce_essential_v2_idx", "pce_discretionary_v2_idx", "pce_gap_v2", "pce_eshare_v2")

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
