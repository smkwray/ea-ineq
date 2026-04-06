CONFIG_THIS <- if (exists(".__CONFIG_PATH__", inherits = TRUE)) get(".__CONFIG_PATH__", inherits = TRUE) else file.path(getwd(), "config_fetchr_poverty_consumption.R")
FETCHR_ROOT <- normalizePath(dirname(CONFIG_THIS), winslash = "/", mustWork = FALSE)
FETCHR_OUT_DIR_ENV <- Sys.getenv("FETCHR_OUT_DIR", unset = "")
OUT_DIR <- if (nzchar(FETCHR_OUT_DIR_ENV)) file.path(FETCHR_OUT_DIR_ENV, "fetchr-R", "poverty_consumption") else file.path(FETCHR_ROOT, "out", "poverty_consumption")
RAW_DIR <- file.path(OUT_DIR, "raw")
CLEAN_DIR <- file.path(OUT_DIR, "clean")
INTERP_DIR <- file.path(OUT_DIR, "interp")
DERIVED_DIR <- file.path(OUT_DIR, "derived")
MIXED_DIR <- file.path(OUT_DIR, "mixed")

FETCH_SUMMARY_CSV <- file.path(OUT_DIR, "fetch_summary.csv")
CLEAN_SUMMARY_CSV <- file.path(OUT_DIR, "cleaning_summary.csv")
INTERP_SUMMARY_CSV <- file.path(OUT_DIR, "interpolation_summary.csv")
DERIVED_SUMMARY_CSV <- file.path(OUT_DIR, "derived_summary.csv")
MIXED_SUMMARY_CSV <- file.path(OUT_DIR, "mixed_summary.csv")
EVAL_SUMMARY_CSV <- file.path(OUT_DIR, "evaluation_summary.csv")
EVAL_RECOMMENDATIONS_JSON <- file.path(OUT_DIR, "evaluation_recommendations.json")
INTERP_CHOICES_JSON <- file.path(OUT_DIR, "interpolation_choices.json")
INTERP_RUN_REPORT_JSON <- file.path(OUT_DIR, "interpolation_run_report.json")
VALIDATION_REPORT_JSON <- file.path(OUT_DIR, "config_validation.json")
RUN_PROVENANCE_JSON <- file.path(OUT_DIR, "run_provenance.json")
OUTPUT_CONTRACT_REPORT_JSON <- file.path(OUT_DIR, "output_contract_report.json")
SCENARIO_DIR <- file.path(OUT_DIR, "scenarios")
SCENARIO_SUMMARY_JSON <- file.path(OUT_DIR, "scenario_summary.json")

HTTP_TIMEOUT_SECONDS <- 30
HTTP_USER_AGENT <- "fetchr-R/0.1"
FAIL_FAST <- TRUE

ANNUAL_SOURCE_PATH <- "examples/data/research_poverty_annual.csv"
ANNUAL_DATE_COL <- "date"

# Final discretionary calibration:
# Base top-quintile discretionary block shares (included components):
#   recreation_svcs=0.06, recreation_goods=0.04, durables=0.12, financial_svcs=0.04
# Normalize this included block to sum to 1.0 for stable interpretation.
DISC_BASE_REC_SVCS <- 0.06
DISC_BASE_REC_GOODS <- 0.04
DISC_BASE_DURABLES <- 0.12
DISC_BASE_FIN_SVCS <- 0.04
DISC_BASE_SUM <- DISC_BASE_REC_SVCS + DISC_BASE_REC_GOODS + DISC_BASE_DURABLES + DISC_BASE_FIN_SVCS

DISC_W_REC_SVCS <- DISC_BASE_REC_SVCS / DISC_BASE_SUM
DISC_W_REC_GOODS <- DISC_BASE_REC_GOODS / DISC_BASE_SUM
DISC_W_DURABLES <- DISC_BASE_DURABLES / DISC_BASE_SUM
DISC_W_FIN_SVCS <- DISC_BASE_FIN_SVCS / DISC_BASE_SUM

# Split the annual CEX entertainment share between services/goods.
DISC_CEX_ENT_SVCS_SPLIT <- 0.60
DISC_CEX_ENT_GOODS_SPLIT <- 0.40

SERIES <- list(
  list(name = "housing_utilities", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "housing_utilities"),
  list(name = "food_total", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "food_total"),
  list(name = "healthcare_pce", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "healthcare_pce"),
  list(name = "transport_svcs", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "transport_svcs"),
  list(name = "clothing_footwear", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "clothing_footwear"),
  list(name = "recreation_svcs", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "recreation_svcs"),
  list(name = "recreation_goods", source = "csv_file", path = "examples/data/research_poverty_recreation_goods.csv", date_col = "date", value_col = "recreation_goods"),
  list(name = "pce_durables", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "PCEDG"),
  list(name = "pce_financial_svcs", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "FINCP"),

  list(name = "fed_funds", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "Fed_Funds"),
  list(name = "transfers_total", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "transfers_total"),
  list(name = "social_security", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "social_security"),
  list(name = "ui_benefits", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "ui_benefits"),
  list(name = "snap_persons", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "snap_persons"),
  list(name = "household_networth", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "household_networth"),
  list(name = "sp500", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "sp500"),
  list(name = "equity_wealth_proxy", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "dj_index"),
  list(name = "home_equity", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "home_equity"),
  list(name = "fhfa_hpi", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "fhfa_hpi"),
  list(name = "total_credit", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "TOTALSL"),
  list(name = "nonrevolving_credit", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "NONREVSL"),
  list(name = "revolving_credit", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "revolving_credit"),
  list(name = "cc_delinquency", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "cc_delinquency"),
  list(name = "recession_nber", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "nber_recession"),
  list(name = "recession_nber_daily", source = "csv_file", path = "examples/data/research_poverty_monthly.csv", date_col = "date", value_col = "nber_recession_daily"),
  list(name = "top1_wealth_share", source = "csv_file", path = "examples/data/research_poverty_fred_ext.csv", date_col = "date", value_col = "top1_wealth_share"),
  list(name = "top10_wealth_share", source = "csv_file", path = "examples/data/research_poverty_fred_ext.csv", date_col = "date", value_col = "top10_wealth_share"),
  list(name = "bottom50_wealth_share", source = "csv_file", path = "examples/data/research_poverty_fred_ext.csv", date_col = "date", value_col = "bottom50_wealth_share"),
  list(name = "gini_income_fred_annual", source = "csv_file", path = "examples/data/research_poverty_fred_ext.csv", date_col = "date", value_col = "gini_income_fred"),
  list(name = "median_real_income_fred_annual", source = "csv_file", path = "examples/data/research_poverty_fred_ext.csv", date_col = "date", value_col = "median_real_income_fred"),

  list(name = "w_housing_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "w_housing"),
  list(name = "w_food_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "w_food"),
  list(name = "w_healthcare_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "w_healthcare"),
  list(name = "w_transport_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "w_transport"),
  list(name = "w_entertainment_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "w_entertainment"),
  list(name = "w_apparel_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "w_apparel"),
  list(name = "gini_households_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "gini_households"),
  list(name = "median_hh_income_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "median_hh_income"),
  list(name = "poverty_all_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "poverty_all"),
  list(name = "poverty_child_annual", source = "csv_file", path = ANNUAL_SOURCE_PATH, date_col = ANNUAL_DATE_COL, value_col = "poverty_child")
)

CLEANING_TASKS <- list()

INTERPOLATION_TASKS <- list(
  list(name = "w_housing_q", input_name = "w_housing_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "w_food_q", input_name = "w_food_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "w_healthcare_q", input_name = "w_healthcare_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "w_transport_q", input_name = "w_transport_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "w_entertainment_q", input_name = "w_entertainment_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "w_apparel_q", input_name = "w_apparel_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "gini_households_q", input_name = "gini_households_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "median_hh_income_q", input_name = "median_hh_income_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "poverty_all_q", input_name = "poverty_all_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "poverty_child_q", input_name = "poverty_child_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "gini_income_fred_q", input_name = "gini_income_fred_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE),
  list(name = "median_real_income_fred_q", input_name = "median_real_income_fred_annual", method = "annual_to_quarterly_denton", conversion = "mean", low_agg = "last", positive = TRUE)
)

EVALUATION_TASKS <- list()

DERIVED_SERIES <- list(
  list(name = "pce_essential_idx", expression = "0.37*S(\"housing_utilities\") + 0.15*S(\"food_total\") + 0.08*S(\"healthcare_pce\") + 0.12*S(\"transport_svcs\") + 0.05*S(\"clothing_footwear\")", positive = TRUE),
  list(
    name = "pce_discretionary_idx",
    expression = sprintf(
      "%.10f*S(\"recreation_svcs\") + %.10f*S(\"recreation_goods\") + %.10f*S(\"pce_durables\") + %.10f*S(\"pce_financial_svcs\")",
      DISC_W_REC_SVCS, DISC_W_REC_GOODS, DISC_W_DURABLES, DISC_W_FIN_SVCS
    ),
    positive = TRUE
  ),
  list(name = "pce_fcsu_idx", expression = "0.55*S(\"housing_utilities\") + 0.20*S(\"food_total\") + 0.05*S(\"clothing_footwear\") + 0.20*S(\"transport_svcs\")", positive = TRUE),

  list(name = "pce_essential_cex_idx", expression = "S(\"w_housing_q\")*S(\"housing_utilities\") + S(\"w_food_q\")*S(\"food_total\") + S(\"w_healthcare_q\")*S(\"healthcare_pce\") + S(\"w_transport_q\")*S(\"transport_svcs\") + S(\"w_apparel_q\")*S(\"clothing_footwear\")", positive = TRUE),
  list(
    name = "pce_discretionary_cex_idx",
    expression = sprintf(
      "(%.10f*S(\"w_entertainment_q\"))*S(\"recreation_svcs\") + (%.10f*S(\"w_entertainment_q\"))*S(\"recreation_goods\") + 0.12*S(\"pce_durables\") + 0.04*S(\"pce_financial_svcs\")",
      DISC_CEX_ENT_SVCS_SPLIT, DISC_CEX_ENT_GOODS_SPLIT
    ),
    positive = TRUE
  ),
  list(
    name = "pce_essential_v2_idx",
    expression = "(S(\"w_housing_q\")*S(\"housing_utilities\") + S(\"w_food_q\")*S(\"food_total\") + S(\"w_healthcare_q\")*S(\"healthcare_pce\")) / clip(S(\"w_housing_q\") + S(\"w_food_q\") + S(\"w_healthcare_q\"), lower = 1e-08)",
    positive = TRUE
  ),
  list(
    name = "pce_discretionary_v2_idx",
    expression = "(S(\"w_entertainment_q\")*S(\"recreation_svcs\") + S(\"w_transport_q\")*S(\"transport_svcs\") + S(\"w_apparel_q\")*S(\"clothing_footwear\")) / clip(S(\"w_entertainment_q\") + S(\"w_transport_q\") + S(\"w_apparel_q\"), lower = 1e-08)",
    positive = TRUE
  ),
  list(
    name = "pce_gap_v2",
    expression = "log(clip(S(\"pce_essential_v2_idx\"), lower = 1e-08) / clip(S(\"pce_discretionary_v2_idx\"), lower = 1e-08))",
    positive = FALSE
  ),
  list(
    name = "pce_eshare_v2",
    expression = "S(\"pce_essential_v2_idx\") / clip(S(\"pce_essential_v2_idx\") + S(\"pce_discretionary_v2_idx\"), lower = 1e-08)",
    positive = TRUE
  ),

  list(name = "transfer_composite", expression = "S(\"transfers_total\") + S(\"social_security\") + S(\"ui_benefits\")", positive = TRUE),
  list(name = "transfer_composite_fp", expression = "S(\"ui_benefits\") + S(\"social_security\") + S(\"snap_persons\")", positive = TRUE),
  list(name = "credit_composite", expression = "S(\"total_credit\") + S(\"nonrevolving_credit\") + S(\"revolving_credit\")", positive = TRUE),
  list(name = "wealth_share_gap_top10_bottom50", expression = "S(\"top10_wealth_share\") - S(\"bottom50_wealth_share\")", positive = FALSE),
  list(name = "wealth_share_gap_top1_bottom50", expression = "S(\"top1_wealth_share\") - S(\"bottom50_wealth_share\")", positive = FALSE)
)

COFLOW_MONTHLY_SERIES <- c(
  "pce_essential_idx", "pce_discretionary_idx", "pce_fcsu_idx",
  "pce_essential_cex_idx", "pce_discretionary_cex_idx",
  "pce_essential_v2_idx", "pce_discretionary_v2_idx", "pce_gap_v2", "pce_eshare_v2",
  "fed_funds", "transfers_total", "social_security", "ui_benefits", "snap_persons",
  "household_networth", "equity_wealth_proxy", "home_equity", "fhfa_hpi",
  "total_credit", "nonrevolving_credit", "revolving_credit", "cc_delinquency",
  "transfer_composite", "transfer_composite_fp", "credit_composite", "recession_nber"
)

COFLOW_QUARTERLY_SERIES <- c(
  "top1_wealth_share", "top10_wealth_share", "bottom50_wealth_share",
  "wealth_share_gap_top10_bottom50", "wealth_share_gap_top1_bottom50",
  "gini_households_q", "median_hh_income_q", "poverty_all_q", "poverty_child_q",
  "gini_income_fred_q", "median_real_income_fred_q"
)

build_mix_columns <- function(monthly_series, quarterly_series) {
  cols <- list()
  for (nm in monthly_series) {
    cols[[length(cols) + 1]] <- list(
      ref = nm,
      name = nm,
      role = "monthly",
      source_frequency = "M",
      agg = "last"
    )
  }
  for (nm in quarterly_series) {
    cols[[length(cols) + 1]] <- list(
      ref = nm,
      name = nm,
      role = "quarterly",
      source_frequency = "Q",
      agg = "last"
    )
  }
  cols
}

COFLOW_MIX_COLUMNS <- build_mix_columns(COFLOW_MONTHLY_SERIES, COFLOW_QUARTERLY_SERIES)

MIXED_OUTPUT_TASKS <- list(
  list(
    name = "coflow_lvl",
    columns = COFLOW_MIX_COLUMNS,
    transform = "none",
    canonical_dense_name = "final_lvl.csv",
    canonical_sparse_name = "mixed_lvl.csv"
  ),
  list(
    name = "coflow_tfd",
    columns = COFLOW_MIX_COLUMNS,
    transform = "difference",
    diff_mode = "auto_log",
    canonical_dense_name = "final_tfd.csv",
    canonical_sparse_name = "mixed_tfd.csv"
  )
)
