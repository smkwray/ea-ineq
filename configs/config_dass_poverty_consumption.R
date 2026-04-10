CONFIG_THIS <- if (exists(".__CONFIG_PATH__", inherits = TRUE)) get(".__CONFIG_PATH__", inherits = TRUE) else file.path(getwd(), "config_dass_poverty_consumption.R")
DASS_ROOT <- normalizePath(dirname(CONFIG_THIS), winslash = "/", mustWork = FALSE)
PROJECT_ROOT <- normalizePath(file.path(DASS_ROOT, ".."), winslash = "/", mustWork = FALSE)
FETCHR_ROOT <- normalizePath(file.path(DASS_ROOT, "..", "fetchr-R"), winslash = "/", mustWork = FALSE)
RESULTS_ROOT_ENV <- Sys.getenv("ECONARK_RESULTS_DIR", unset = "")
RESULTS_ROOT <- if (nzchar(RESULTS_ROOT_ENV)) normalizePath(RESULTS_ROOT_ENV, winslash = "/", mustWork = FALSE) else file.path(tempdir(), "econark_results")
FETCHR_OUT_DIR_ENV <- Sys.getenv("FETCHR_OUT_DIR", unset = "")
FETCHR_OUT <- if (nzchar(FETCHR_OUT_DIR_ENV)) file.path(FETCHR_OUT_DIR_ENV, "fetchr-R", "poverty_consumption") else file.path(FETCHR_ROOT, "out", "poverty_consumption")
FETCHR_OUT_BASE <- if (nzchar(FETCHR_OUT_DIR_ENV)) file.path(FETCHR_OUT_DIR_ENV, "fetchr-R", "poverty_consumption") else "../fetchr-R/out/poverty_consumption"
INTERPOL_RAW_DIR_ENV <- Sys.getenv("INTERPOL_RAW_DIR", unset = "")
INTERPOL_CACHE_DIR <- file.path(PROJECT_ROOT, ".cache", "interpol_raw")
INTERPOL_READY_FILE <- file.path(INTERPOL_CACHE_DIR, ".ready")
INTERPOL_RAW_DIR <- if (nzchar(INTERPOL_RAW_DIR_ENV)) normalizePath(INTERPOL_RAW_DIR_ENV, winslash = "/", mustWork = FALSE) else if (file.exists(INTERPOL_READY_FILE)) normalizePath(INTERPOL_CACHE_DIR, winslash = "/", mustWork = FALSE) else NULL

OUT_DIR <- file.path(RESULTS_ROOT, "dass-R", "poverty_consumption")
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

DAILY_LAGS <- 90
WEEKLY_LAGS <- 8
MONTHLY_LAGS <- 12
QUARTERLY_LAGS <- 8
MAX_MISSING_PCT <- 65
STANDARDIZE <- FALSE

SERIES_SPECS <- list(
  list(name = "pce_essential_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_essential_idx.csv"), freq = "m"),
  list(name = "pce_discretionary_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_discretionary_idx.csv"), freq = "m"),
  list(name = "pce_fcsu_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_fcsu_idx.csv"), freq = "m"),
  list(name = "pce_essential_cex_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_essential_cex_idx.csv"), freq = "q"),
  list(name = "pce_discretionary_cex_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_discretionary_cex_idx.csv"), freq = "q"),
  list(name = "pce_essential_v2_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_essential_v2_idx.csv"), freq = "m"),
  list(name = "pce_discretionary_v2_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_discretionary_v2_idx.csv"), freq = "m"),
  list(name = "pce_gap_v2", path = file.path(FETCHR_OUT_BASE, "derived", "pce_gap_v2.csv"), freq = "m"),
  list(name = "pce_eshare_v2", path = file.path(FETCHR_OUT_BASE, "derived", "pce_eshare_v2.csv"), freq = "m"),

  list(name = "fed_funds", path = file.path(FETCHR_OUT_BASE, "raw", "fed_funds.csv"), freq = "m"),
  list(name = "transfers_total", path = file.path(FETCHR_OUT_BASE, "raw", "transfers_total.csv"), freq = "m"),
  list(name = "social_security", path = file.path(FETCHR_OUT_BASE, "raw", "social_security.csv"), freq = "m"),
  list(name = "ui_benefits", path = file.path(FETCHR_OUT_BASE, "raw", "ui_benefits.csv"), freq = "m"),
  list(name = "snap_persons", path = file.path(FETCHR_OUT_BASE, "raw", "snap_persons.csv"), freq = "m"),
  list(name = "household_networth", path = file.path(FETCHR_OUT_BASE, "raw", "household_networth.csv"), freq = "m"),
  list(name = "sp500", path = file.path(FETCHR_OUT_BASE, "raw", "sp500.csv"), freq = "m"),
  list(name = "equity_wealth_proxy", path = file.path(FETCHR_OUT_BASE, "raw", "equity_wealth_proxy.csv"), freq = "m"),
  list(name = "home_equity", path = file.path(FETCHR_OUT_BASE, "raw", "home_equity.csv"), freq = "m"),
  list(name = "fhfa_hpi", path = file.path(FETCHR_OUT_BASE, "raw", "fhfa_hpi.csv"), freq = "m"),
  list(name = "total_credit", path = file.path(FETCHR_OUT_BASE, "raw", "total_credit.csv"), freq = "m"),
  list(name = "nonrevolving_credit", path = file.path(FETCHR_OUT_BASE, "raw", "nonrevolving_credit.csv"), freq = "m"),
  list(name = "revolving_credit", path = file.path(FETCHR_OUT_BASE, "raw", "revolving_credit.csv"), freq = "m"),
  list(name = "cc_delinquency", path = file.path(FETCHR_OUT_BASE, "raw", "cc_delinquency.csv"), freq = "m"),
  list(name = "recession_nber", path = file.path(FETCHR_OUT_BASE, "raw", "recession_nber.csv"), freq = "m"),
  list(name = "top1_wealth_share", path = file.path(FETCHR_OUT_BASE, "raw", "top1_wealth_share.csv"), freq = "q"),
  list(name = "top10_wealth_share", path = file.path(FETCHR_OUT_BASE, "raw", "top10_wealth_share.csv"), freq = "q"),
  list(name = "bottom50_wealth_share", path = file.path(FETCHR_OUT_BASE, "raw", "bottom50_wealth_share.csv"), freq = "q"),

  list(name = "transfer_composite", path = file.path(FETCHR_OUT_BASE, "derived", "transfer_composite.csv"), freq = "m"),
  list(name = "credit_composite", path = file.path(FETCHR_OUT_BASE, "derived", "credit_composite.csv"), freq = "m"),
  list(name = "wealth_share_gap_top10_bottom50", path = file.path(FETCHR_OUT_BASE, "derived", "wealth_share_gap_top10_bottom50.csv"), freq = "q"),
  list(name = "wealth_share_gap_top1_bottom50", path = file.path(FETCHR_OUT_BASE, "derived", "wealth_share_gap_top1_bottom50.csv"), freq = "q"),

  list(name = "gini_households_q", path = file.path(FETCHR_OUT_BASE, "interp", "gini_households_q.csv"), freq = "q"),
  list(name = "median_hh_income_q", path = file.path(FETCHR_OUT_BASE, "interp", "median_hh_income_q.csv"), freq = "q"),
  list(name = "poverty_all_q", path = file.path(FETCHR_OUT_BASE, "interp", "poverty_all_q.csv"), freq = "q"),
  list(name = "poverty_child_q", path = file.path(FETCHR_OUT_BASE, "interp", "poverty_child_q.csv"), freq = "q"),
  list(name = "gini_income_fred_q", path = file.path(FETCHR_OUT_BASE, "interp", "gini_income_fred_q.csv"), freq = "q"),
  list(name = "median_real_income_fred_q", path = file.path(FETCHR_OUT_BASE, "interp", "median_real_income_fred_q.csv"), freq = "q")
)

PREP_INCLUDE_QUARTER_END <- c(
  "pce_essential_idx", "pce_discretionary_idx", "pce_fcsu_idx",
  "pce_essential_cex_idx", "pce_discretionary_cex_idx",
  "pce_essential_v2_idx", "pce_discretionary_v2_idx", "pce_gap_v2", "pce_eshare_v2",
  "fed_funds", "transfers_total", "social_security", "ui_benefits", "snap_persons",
  "transfer_composite", "household_networth", "credit_composite",
  "total_credit", "nonrevolving_credit", "revolving_credit", "cc_delinquency", "sp500",
  "equity_wealth_proxy", "home_equity", "fhfa_hpi",
  "top1_wealth_share", "top10_wealth_share", "bottom50_wealth_share",
  "wealth_share_gap_top10_bottom50", "wealth_share_gap_top1_bottom50",
  "gini_households_q", "median_hh_income_q", "poverty_all_q", "poverty_child_q",
  "gini_income_fred_q", "median_real_income_fred_q"
)

# Broader automatic control universe from the legacy interpol/raw tree.
# Manual SERIES_SPECS remain the paper-facing treatments/outcomes.
AUTO_SERIES_DIR <- INTERPOL_RAW_DIR
AUTO_SERIES_INCLUDE_REGEX <- "\\.csv$"
AUTO_SERIES_EXCLUDE_REGEX <- NULL
AUTO_SERIES_NAME_MODE <- "auto"
AUTO_SERIES_SKIP_EXISTING <- TRUE
AUTO_SERIES_REQUIRE_DATE_VALUE <- TRUE
AUTO_SERIES_FREQ_ALLOW <- c("d", "w", "m", "q")
AUTO_SERIES_MIN_OBS <- 4

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

IV_HAC_LAGS <- 4
IV_Z_MAX <- 60
IV_Z_SELECT <- "corr_t_then_variance"
IV_INCLUDE_W <- TRUE
IV_MIN_FIRST_STAGE_F <- 10
IV_W_MAX <- 150
LP_IV_W_MAX <- 150
DML_IV_W_MAX <- 150

RUN_BH <- TRUE
RUN_ROMANO_WOLF <- TRUE
RUN_PERM_TEST <- TRUE
PERM_N <- 300
PERM_OUT_DIR <- file.path(OUT_DIR, "perm")
PERM_SUMMARY_CSV <- file.path(OUT_DIR, "permutation_inference.csv")
ROMANO_WOLF_NULL_DRAWS_CSV <- file.path(OUT_DIR, "romano_wolf_null_draws.csv")

RUN_SENSITIVITY_BOUNDS <- TRUE
SENSITIVITY_GAMMA <- 1.5
SENSITIVITY_BOUNDS_CSV <- file.path(OUT_DIR, "sensitivity_bounds.csv")

RUN_ENDPOINT_STABILITY <- TRUE
ENDPOINT_STABILITY_MAX_DELTA <- 1.0
ENDPOINT_STABILITY_CSV <- file.path(OUT_DIR, "endpoint_stability.csv")

RUN_SYNTHETIC_CALIBRATION <- TRUE
SYNTHETIC_CALIBRATION_ALPHA <- 0.10
SYNTHETIC_CALIBRATION_MIN_POWER <- 0.50
SYNTHETIC_CALIBRATION_HARNESS_CSV <- file.path(OUT_DIR, "synthetic_calibration_harness.csv")
SYNTHETIC_CALIBRATION_GATE_CSV <- file.path(OUT_DIR, "synthetic_calibration_gate.csv")

RUN_IDKIT <- TRUE
IDKIT_SCHEMA_VERSION <- "1.0.0"
IDKIT_OUT_DIR <- file.path(OUT_DIR, "id")
IDKIT_ESTIMATES_CSV <- file.path(IDKIT_OUT_DIR, "id_estimates.csv")
IDKIT_DIAGNOSTICS_CSV <- file.path(IDKIT_OUT_DIR, "id_diagnostics.csv")
IDKIT_SUMMARY_CSV <- file.path(IDKIT_OUT_DIR, "id_summary.csv")
IDKIT_COMPARISON_CSV <- file.path(IDKIT_OUT_DIR, "id_design_compare.csv")
IDKIT_ASSUMPTIONS_MD <- file.path(IDKIT_OUT_DIR, "id_assumptions.md")
IDKIT_MIN_N_OBS <- 30
IDKIT_MAX_ENDPOINT_DELTA <- 1.0
IDKIT_ALPHA <- 0.10
IDKIT_CONFIRM_ALPHA <- 0.05
IDKIT_ASSUMPTIONS <- c(
  "Parallel trends in pre-period windows around treatment timing.",
  "No anticipation before treatment timing.",
  "No synchronized omitted shocks jointly driving treatment and outcome."
)

DESIGN_DEFAULTS <- list(
  treatment_mode = "level",
  binary = FALSE,
  folds = 5,
  shock_oos = "expanding",
  shock_l1_ratio = 0.1,
  shock_cv = 3,
  shock_max_iter = 10000,
  shock_w_max = 120,
  shock_w_select = "corr_t_then_variance",
  placebo_lead = 0,
  cum_horizon = 0,
  make_stationary = FALSE,
  standardize = FALSE,
  w_tag = NULL,
  drop_start = NULL,
  drop_end = NULL,
  drop_tag = NULL,
  drop_w_series = c("recession_nber_daily")
)

DESIGN_JOBS <- list(
  list(treatment = "fed_funds", outcome = "pce_essential_v2_idx", horizons = c(1, 2, 3, 4), treatment_mode = "shock"),
  list(treatment = "fed_funds", outcome = "pce_discretionary_v2_idx", horizons = c(1, 2, 3, 4), treatment_mode = "shock"),
  list(treatment = "fed_funds", outcome = "pce_gap_v2", horizons = c(1, 2, 3, 4), treatment_mode = "shock"),
  list(treatment = "fed_funds", outcome = "pce_eshare_v2", horizons = c(1, 2, 3, 4), treatment_mode = "shock"),
  list(treatment = "transfer_composite", outcome = "pce_essential_v2_idx", horizons = c(1, 2, 3, 4)),
  list(treatment = "transfer_composite", outcome = "pce_discretionary_v2_idx", horizons = c(1, 2, 3, 4)),
  list(treatment = "transfer_composite", outcome = "pce_gap_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "transfer_composite", outcome = "pce_eshare_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "social_security", outcome = "pce_essential_v2_idx", horizons = c(1, 2, 3, 4)),
  list(treatment = "social_security", outcome = "pce_gap_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "social_security", outcome = "pce_eshare_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "ui_benefits", outcome = "pce_essential_v2_idx", horizons = c(1, 2, 3, 4)),
  list(treatment = "ui_benefits", outcome = "pce_gap_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "ui_benefits", outcome = "pce_eshare_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "snap_persons", outcome = "pce_essential_v2_idx", horizons = c(1, 2, 3, 4)),
  list(treatment = "snap_persons", outcome = "pce_gap_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "snap_persons", outcome = "pce_eshare_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "household_networth", outcome = "pce_discretionary_v2_idx", horizons = c(1, 2, 3, 4)),
  list(treatment = "household_networth", outcome = "pce_gap_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "household_networth", outcome = "pce_eshare_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "home_equity", outcome = "pce_discretionary_v2_idx", horizons = c(1, 2)),
  list(treatment = "home_equity", outcome = "pce_gap_v2", horizons = c(1, 2)),
  list(treatment = "credit_composite", outcome = "pce_discretionary_v2_idx", horizons = c(1, 2, 3, 4)),
  list(treatment = "credit_composite", outcome = "pce_gap_v2", horizons = c(1, 2, 3, 4)),
  list(treatment = "revolving_credit", outcome = "pce_discretionary_v2_idx", horizons = c(1, 2)),
  list(treatment = "revolving_credit", outcome = "pce_gap_v2", horizons = c(1, 2)),
  list(treatment = "cc_delinquency", outcome = "pce_discretionary_v2_idx", horizons = c(1, 2)),
  list(treatment = "cc_delinquency", outcome = "pce_gap_v2", horizons = c(1, 2))
)

RUNNER_THREADS <- 4
MATH_THREADS <- 1
