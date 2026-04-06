CONFIG_THIS <- if (exists(".__CONFIG_PATH__", inherits = TRUE)) get(".__CONFIG_PATH__", inherits = TRUE) else file.path(getwd(), "config_dass_poverty_outcomes.R")
DASS_ROOT <- normalizePath(dirname(CONFIG_THIS), winslash = "/", mustWork = FALSE)
FETCHR_ROOT <- normalizePath(file.path(DASS_ROOT, "..", "fetchr-R"), winslash = "/", mustWork = FALSE)
RESULTS_ROOT_ENV <- Sys.getenv("ECONARK_RESULTS_DIR", unset = "")
RESULTS_ROOT <- if (nzchar(RESULTS_ROOT_ENV)) normalizePath(RESULTS_ROOT_ENV, winslash = "/", mustWork = FALSE) else file.path(tempdir(), "econark_results")
FETCHR_OUT_DIR_ENV <- Sys.getenv("FETCHR_OUT_DIR", unset = "")
FETCHR_OUT <- if (nzchar(FETCHR_OUT_DIR_ENV)) file.path(FETCHR_OUT_DIR_ENV, "fetchr-R", "poverty_consumption") else file.path(FETCHR_ROOT, "out", "poverty_consumption")
FETCHR_OUT_BASE <- if (nzchar(FETCHR_OUT_DIR_ENV)) file.path(FETCHR_OUT_DIR_ENV, "fetchr-R", "poverty_consumption") else "../fetchr-R/out/poverty_consumption"

OUT_DIR <- file.path(RESULTS_ROOT, "dass-R", "poverty_outcomes")
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

SERIES_SPECS <- list(
  list(name = "pce_essential_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_essential_idx.csv"), freq = "m"),
  list(name = "pce_discretionary_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_discretionary_idx.csv"), freq = "m"),
  list(name = "pce_fcsu_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_fcsu_idx.csv"), freq = "m"),
  list(name = "pce_essential_cex_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_essential_cex_idx.csv"), freq = "q"),
  list(name = "pce_discretionary_cex_idx", path = file.path(FETCHR_OUT_BASE, "derived", "pce_discretionary_cex_idx.csv"), freq = "q"),

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
  list(name = "transfer_composite_fp", path = file.path(FETCHR_OUT_BASE, "derived", "transfer_composite_fp.csv"), freq = "m"),
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
  "fed_funds", "transfers_total", "social_security", "ui_benefits", "snap_persons",
  "transfer_composite", "transfer_composite_fp", "household_networth", "credit_composite",
  "total_credit", "nonrevolving_credit", "revolving_credit", "cc_delinquency", "sp500",
  "equity_wealth_proxy", "home_equity", "fhfa_hpi",
  "top1_wealth_share", "top10_wealth_share", "bottom50_wealth_share",
  "wealth_share_gap_top10_bottom50", "wealth_share_gap_top1_bottom50",
  "gini_households_q", "median_hh_income_q", "poverty_all_q", "poverty_child_q",
  "gini_income_fred_q", "median_real_income_fred_q"
)

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

DESIGN_JOBS <- list(
  list(treatment = "fed_funds", outcome = "poverty_all_q", treatment_mode = "shock"),
  list(treatment = "fed_funds", outcome = "poverty_child_q", treatment_mode = "shock"),
  list(treatment = "fed_funds", outcome = "gini_households_q", treatment_mode = "shock"),
  list(treatment = "fed_funds", outcome = "median_real_income_fred_q", treatment_mode = "shock"),
  list(treatment = "fed_funds", outcome = "wealth_share_gap_top10_bottom50", treatment_mode = "shock"),
  list(treatment = "fed_funds", outcome = "wealth_share_gap_top1_bottom50", treatment_mode = "shock"),

  list(treatment = "transfer_composite", outcome = "poverty_all_q"),
  list(treatment = "transfer_composite", outcome = "poverty_child_q"),
  list(treatment = "transfer_composite", outcome = "gini_households_q"),
  list(treatment = "transfer_composite", outcome = "median_real_income_fred_q"),
  list(treatment = "transfer_composite", outcome = "wealth_share_gap_top10_bottom50"),
  list(treatment = "transfer_composite", outcome = "wealth_share_gap_top1_bottom50"),

  list(treatment = "ui_benefits", outcome = "poverty_all_q"),
  list(treatment = "ui_benefits", outcome = "poverty_child_q"),
  list(treatment = "ui_benefits", outcome = "gini_households_q"),
  list(treatment = "ui_benefits", outcome = "median_real_income_fred_q"),

  list(treatment = "social_security", outcome = "poverty_all_q"),
  list(treatment = "social_security", outcome = "poverty_child_q"),
  list(treatment = "social_security", outcome = "gini_households_q"),
  list(treatment = "social_security", outcome = "median_real_income_fred_q"),

  list(treatment = "snap_persons", outcome = "poverty_all_q"),
  list(treatment = "snap_persons", outcome = "poverty_child_q"),

  list(treatment = "credit_composite", outcome = "poverty_all_q"),
  list(treatment = "credit_composite", outcome = "poverty_child_q"),
  list(treatment = "credit_composite", outcome = "median_real_income_fred_q"),
  list(treatment = "credit_composite", outcome = "wealth_share_gap_top1_bottom50"),

  list(treatment = "revolving_credit", outcome = "poverty_all_q"),
  list(treatment = "revolving_credit", outcome = "poverty_child_q"),
  list(treatment = "cc_delinquency", outcome = "poverty_all_q"),
  list(treatment = "cc_delinquency", outcome = "poverty_child_q"),

  list(treatment = "household_networth", outcome = "gini_households_q"),
  list(treatment = "household_networth", outcome = "wealth_share_gap_top10_bottom50"),
  list(treatment = "household_networth", outcome = "wealth_share_gap_top1_bottom50"),
  list(treatment = "home_equity", outcome = "wealth_share_gap_top10_bottom50"),
  list(treatment = "home_equity", outcome = "wealth_share_gap_top1_bottom50")
)

RUNNER_THREADS <- 4
MATH_THREADS <- 1
