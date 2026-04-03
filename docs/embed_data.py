#!/usr/bin/env python3
"""Generate docs/data.js from packaged archive results.

Run from the repo root:
    python3 docs/embed_data.py
"""

from __future__ import annotations

import csv
import json
from collections import Counter, defaultdict
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
RESULTS = REPO / "results"
OUT = REPO / "docs" / "data.js"

# ── Result paths ─────────────────────────────────────────────────────────────

CONSUMPTION_DFLMX = RESULTS / "dflmx" / "poverty_consumption_baseline"
OUTCOMES_BASE_DFLMX = RESULTS / "dflmx" / "poverty_outcomes_baseline"
OUTCOMES_FULL_DFLMX = RESULTS / "dflmx" / "poverty_outcomes_full"

CONSUMPTION_DASS = RESULTS / "dass" / "poverty_consumption_baseline" / "results.csv"
OUTCOMES_BASE_DASS = RESULTS / "dass" / "poverty_outcomes_baseline" / "results.csv"
OUTCOMES_FULL_DASS = RESULTS / "dass" / "poverty_outcomes_full" / "results.csv"

# Fresh diagnostic results (optional — from focused runs)
TMP_BASE = Path("/tmp/econark_results_transfer_wealth.nFXCMa")
TMP_CONTRAST_DFLMX = TMP_BASE / "dflmx-R" / "poverty_outcomes_transfer_wealth_contrast"
TMP_CONTRAST_DASS = TMP_BASE / "dass-R" / "poverty_outcomes_transfer_wealth_contrast" / "results.csv"
TMP_DIAGNOSTIC_DASS = TMP_BASE / "dass-R" / "poverty_program_shock_diagnostic" / "results.csv"

# ── Labels and constants ─────────────────────────────────────────────────────

ESTIMATOR_ORDER = ["lp", "dml", "tmle", "cf", "lp_iv", "dml_iv"]
ESTIMATOR_LABELS = {
    "lp": "LP", "dml": "DML", "tmle": "TMLE",
    "cf": "CF", "lp_iv": "LP-IV", "dml_iv": "DML-IV",
}
TREATMENT_LABELS = {
    "transfer_composite": "Transfer Composite",
    "ui_benefits": "UI Benefits",
    "social_security": "Social Security",
    "snap_persons": "SNAP Participation",
    "household_networth": "Household Net Worth",
    "home_equity": "Home Equity",
    "fed_funds": "Fed Funds Rate",
    "credit_composite": "Credit Composite",
    "revolving_credit": "Revolving Credit",
    "cc_delinquency": "Credit Card Delinquency",
}
OUTCOME_LABELS = {
    "gini_households_q": "Household Gini",
    "poverty_all_q": "Overall Poverty Rate",
    "poverty_child_q": "Child Poverty Rate",
    "wealth_share_gap_top1_bottom50": "Top 1% vs Bottom 50% Wealth Gap",
    "wealth_share_gap_top10_bottom50": "Top 10% vs Bottom 50% Wealth Gap",
    "median_real_income_fred_q": "Median Real Income",
    "pce_essential_v2_idx": "Essential Spending Index",
    "pce_discretionary_v2_idx": "Discretionary Spending Index",
    "pce_gap_v2": "Essential vs Discretionary Gap",
    "pce_eshare_v2": "Essential Spending Share",
}

# Evidence hierarchy for treatments
TREATMENT_TIERS = {
    "transfer_composite": {"tier": "headline", "rank": 1},
    "ui_benefits": {"tier": "bridge", "rank": 2},
    "snap_persons": {"tier": "suggestive", "rank": 3},
    "social_security": {"tier": "appendix", "rank": 4},
    "household_networth": {"tier": "contrast", "rank": 5},
    "home_equity": {"tier": "contrast", "rank": 6},
    "fed_funds": {"tier": "contrast", "rank": 7},
    "credit_composite": {"tier": "contrast", "rank": 8},
    "revolving_credit": {"tier": "contrast", "rank": 9},
    "cc_delinquency": {"tier": "contrast", "rank": 10},
}

VARIABLES = [
    {"name": "transfer_composite", "display": "Transfer Composite",
     "definition": "Broad transfer-support measure combining government transfers, Social Security, and unemployment insurance."},
    {"name": "ui_benefits", "display": "UI Benefits",
     "definition": "Unemployment-insurance transfer flow. Appears in both distributional-outcomes and consumption-composition suites."},
    {"name": "snap_persons", "display": "SNAP Participation",
     "definition": "Supplemental Nutrition Assistance Program beneficiary count proxy."},
    {"name": "social_security", "display": "Social Security",
     "definition": "Social Security payment flow. Shows DASS support but does not survive LP-based DFLMX screening."},
    {"name": "poverty_all_q", "display": "Overall Poverty Rate",
     "definition": "Quarterly poverty rate for the full population."},
    {"name": "poverty_child_q", "display": "Child Poverty Rate",
     "definition": "Quarterly poverty rate for children."},
    {"name": "gini_households_q", "display": "Household Gini",
     "definition": "Quarterly household-level inequality measure."},
    {"name": "median_real_income_fred_q", "display": "Median Real Income",
     "definition": "Quarterly median real income from FRED."},
    {"name": "wealth_share_gap_top1_bottom50", "display": "Top 1% vs Bottom 50% Wealth Gap",
     "definition": "Difference between top-1% and bottom-50% wealth shares."},
    {"name": "wealth_share_gap_top10_bottom50", "display": "Top 10% vs Bottom 50% Wealth Gap",
     "definition": "Difference between top-10% and bottom-50% wealth shares."},
    {"name": "pce_essential_v2_idx", "display": "Essential Spending Index",
     "definition": "Canon v2 basket: CE-weighted housing, food, and healthcare."},
    {"name": "pce_discretionary_v2_idx", "display": "Discretionary Spending Index",
     "definition": "Canon v2 basket: CE-weighted recreation, transport, and clothing."},
    {"name": "pce_gap_v2", "display": "Essential vs Discretionary Gap",
     "definition": "Log ratio of essential to discretionary spending, log(E/D)."},
    {"name": "pce_eshare_v2", "display": "Essential Spending Share",
     "definition": "Essential spending as a share of essential plus discretionary, E/(E+D)."},
]

# ── Helpers ──────────────────────────────────────────────────────────────────

def read_csv(path: Path) -> list[dict]:
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def safe_float(value, default=None):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def safe_int(value, default=0):
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return default


def safe_bool(value) -> bool:
    if isinstance(value, bool):
        return value
    return str(value).strip().upper() == "TRUE"


def count_rows(path: Path) -> int:
    if not path.exists():
        return 0
    with path.open(newline="", encoding="utf-8") as f:
        return max(sum(1 for _ in f) - 1, 0)


def clean_outcome(name: str) -> str:
    return name.replace("qend__", "") if name else name


def treatment_label(name: str) -> str:
    return TREATMENT_LABELS.get(name, name.replace("_", " ").title())


def outcome_label(name: str) -> str:
    clean = clean_outcome(name)
    return OUTCOME_LABELS.get(clean, clean.replace("_", " ").title())


def priority_label(value: str) -> str:
    return {"strong": "Headline-grade", "moderate": "Supportive", "weak": "Exploratory"}.get(
        value, value.title() if value else "Exploratory"
    )


def estimator_label(name: str) -> str:
    return ESTIMATOR_LABELS.get(name, name.upper())


def treatment_tier(name: str) -> str:
    return TREATMENT_TIERS.get(name, {}).get("tier", "contrast")


# ── DASS map ─────────────────────────────────────────────────────────────────

def load_dass_map(path: Path) -> dict[tuple[str, str, int], list[dict]]:
    if not path.exists():
        return {}
    data: dict[tuple[str, str, int], list[dict]] = defaultdict(list)
    for row in read_csv(path):
        key = (row["treatment"], row["outcome"], safe_int(row["horizon"]))
        data[key].append(row)
    for key in data:
        data[key].sort(key=lambda item: (
            ESTIMATOR_ORDER.index(item["estimator"])
            if item["estimator"] in ESTIMATOR_ORDER else 999
        ))
    return data


def summarize_estimators(rows: list[dict], reference_beta: float | None) -> dict:
    items = []
    sign_match_count = 0
    nominal_sig_count = 0
    supportive_count = 0
    available = 0

    for row in rows:
        estimate = safe_float(row.get("estimate"))
        p_value = safe_float(row.get("p"))
        if estimate is None:
            continue
        available += 1
        sign = "positive" if estimate > 0 else "negative" if estimate < 0 else "zero"
        sign_match = (
            reference_beta is not None and estimate != 0
            and ((estimate > 0 and reference_beta > 0) or (estimate < 0 and reference_beta < 0))
        )
        nominal_sig = p_value is not None and p_value <= 0.10
        if sign_match:
            sign_match_count += 1
        if nominal_sig:
            nominal_sig_count += 1
        if sign_match and nominal_sig:
            supportive_count += 1
        items.append({
            "estimator": row["estimator"],
            "label": estimator_label(row["estimator"]),
            "estimate": estimate,
            "ci_low": safe_float(row.get("ci_low")),
            "ci_high": safe_float(row.get("ci_high")),
            "p_value": p_value,
            "q_bh": safe_float(row.get("q_bh")),
            "sign": sign,
            "sign_match": bool(sign_match),
            "nominal_sig": bool(nominal_sig),
        })

    consensus = "mixed"
    if supportive_count >= 2:
        consensus = "multi-estimator support"
    elif sign_match_count >= 2:
        consensus = "directional support"
    elif available <= 1:
        consensus = "thin"

    return {
        "available": available,
        "sign_match_count": sign_match_count,
        "nominal_sig_count": nominal_sig_count,
        "supportive_count": supportive_count,
        "consensus": consensus,
        "items": items,
    }


# ── Finding panel builder ────────────────────────────────────────────────────

def build_finding_panel(
    dflmx_path: Path,
    dass_map: dict,
    q_threshold: float,
    limit: int | None = None,
    require_robust: bool = True,
    lead_map: dict | None = None,
    episode_map: dict | None = None,
    confirmatory_map: dict | None = None,
) -> list[dict]:
    rows = []
    for row in read_csv(dflmx_path / "findings_ranked.csv"):
        q_value = safe_float(row.get("q_value"))
        if q_value is None:
            continue
        if require_robust and q_value > q_threshold:
            continue
        if not require_robust and q_value <= q_threshold:
            continue
        t = row["treatment"]
        o = clean_outcome(row["outcome"])
        h = safe_int(row["horizon"])
        key = (t, o, h)
        beta = safe_float(row.get("beta"))
        estimator_summary = summarize_estimators(dass_map.get(key, []), beta)

        finding = {
            "treatment": t,
            "treatment_label": treatment_label(t),
            "treatment_tier": treatment_tier(t),
            "outcome": o,
            "outcome_label": outcome_label(row["outcome"]),
            "horizon": h,
            "beta": beta,
            "se": safe_float(row.get("se")),
            "ci_low": safe_float(row.get("ci_low")),
            "ci_high": safe_float(row.get("ci_high")),
            "p_value": safe_float(row.get("p_value")),
            "q_value": q_value,
            "r2": safe_float(row.get("r2")),
            "priority": row.get("priority", ""),
            "priority_label": priority_label(row.get("priority", "")),
            "robust": q_value <= q_threshold,
            "estimator_summary": estimator_summary,
            "row_label": f"{treatment_label(t)} \u2192 {outcome_label(row['outcome'])} (h={h})",
        }

        # Enrich with drilldown data
        if lead_map and key in lead_map:
            ld = lead_map[key]
            finding["lead_p"] = ld.get("p_joint_leads")
            finding["lead_reject"] = ld.get("reject")
        if episode_map and key in episode_map:
            ep = episode_map[key]
            finding["episode_all_pass"] = ep.get("all_pass")
            finding["episode_any_flip"] = ep.get("any_sign_flip")
        if confirmatory_map and key in confirmatory_map:
            cf = confirmatory_map[key]
            finding["confirmatory_status"] = cf.get("status")
            finding["confirmatory_contract"] = cf.get("contract_status")

        rows.append(finding)
    rows.sort(key=lambda item: (item["q_value"], -abs(item["beta"] or 0)))
    return rows[:limit] if limit else rows


# ── Lead / episode / confirmatory lookups ────────────────────────────────────

def build_lead_map(base: Path) -> dict:
    path = base / "lead_anticipation_checks.csv"
    if not path.exists():
        return {}
    out = {}
    for row in read_csv(path):
        key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
        out[key] = {
            "p_joint_leads": safe_float(row.get("p_joint_leads")),
            "reject": safe_bool(row.get("lead_reject_joint")),
        }
    return out


def build_episode_map(base: Path) -> dict:
    path = base / "episode_leaveout_summary.csv"
    if not path.exists():
        return {}
    out = {}
    for row in read_csv(path):
        key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
        out[key] = {
            "all_pass": safe_bool(row.get("all_pass")),
            "any_sign_flip": safe_bool(row.get("any_sign_flip")),
            "any_sig_loss": safe_bool(row.get("any_sig_loss")),
            "max_abs_delta": safe_float(row.get("max_abs_delta")),
        }
    return out


def build_confirmatory_map(base: Path) -> dict:
    path = base / "confirmatory_inference.csv"
    if not path.exists():
        return {}
    out = {}
    for row in read_csv(path):
        key = (row.get("treatment", ""), clean_outcome(row.get("outcome", "")), safe_int(row.get("horizon")))
        out[key] = {
            "status": row.get("status", ""),
            "contract_status": row.get("contract_status", ""),
        }
    return out


# ── Heatmap ──────────────────────────────────────────────────────────────────

def build_heatmap(dflmx_path: Path) -> dict:
    """Treatment x outcome x horizon grid with q-values for the heatmap chart."""
    path = dflmx_path / "findings_ranked.csv"
    if not path.exists():
        return {"cells": [], "treatments": [], "outcomes": [], "horizons": []}
    cells = []
    treatments = set()
    outcomes = set()
    horizons = set()
    for row in read_csv(path):
        t = row["treatment"]
        o = clean_outcome(row["outcome"])
        h = safe_int(row["horizon"])
        q = safe_float(row.get("q_value"))
        beta = safe_float(row.get("beta"))
        treatments.add(t)
        outcomes.add(o)
        horizons.add(h)
        cells.append({
            "treatment": t,
            "treatment_label": treatment_label(t),
            "outcome": o,
            "outcome_label": outcome_label(row["outcome"]),
            "horizon": h,
            "q_value": q,
            "p_value": safe_float(row.get("p_value")),
            "beta": beta,
            "robust": q is not None and q <= 0.10,
        })
    # Sort treatments by tier rank
    t_sorted = sorted(treatments, key=lambda x: TREATMENT_TIERS.get(x, {}).get("rank", 99))
    o_sorted = sorted(outcomes, key=lambda x: list(OUTCOME_LABELS.keys()).index(x) if x in OUTCOME_LABELS else 99)
    return {
        "cells": cells,
        "treatments": [{"name": t, "label": treatment_label(t), "tier": treatment_tier(t)} for t in t_sorted],
        "outcomes": [{"name": o, "label": outcome_label(o)} for o in o_sorted],
        "horizons": sorted(horizons),
    }


# ── IRF curves ───────────────────────────────────────────────────────────────

def build_irf_curves(dflmx_path: Path, key_treatments: list[str]) -> dict:
    """IRF small multiples: treatment -> outcome -> [{horizon, beta, ci_low, ci_high, q}]."""
    fdr_path = dflmx_path / "irf_lp_fdr.csv"
    if not fdr_path.exists():
        return {}
    curves: dict[str, dict[str, list]] = defaultdict(lambda: defaultdict(list))
    for row in read_csv(fdr_path):
        t = row["treatment"]
        if t not in key_treatments:
            continue
        o = clean_outcome(row["outcome"])
        h = safe_int(row["horizon"])
        curves[t][o].append({
            "horizon": h,
            "beta": safe_float(row.get("beta")),
            "se": safe_float(row.get("se")),
            "ci_low": safe_float(row.get("ci_low")),
            "ci_high": safe_float(row.get("ci_high")),
            "p_value": safe_float(row.get("p_value")),
            "q_value": safe_float(row.get("q_value")),
            "robust": safe_bool(row.get("robust")) if row.get("robust") else False,
        })
    # Sort each curve by horizon
    out = {}
    for t in curves:
        out[t] = {}
        for o in curves[t]:
            out[t][o] = sorted(curves[t][o], key=lambda x: x["horizon"])
    return out


# ── Estimator agreement matrix ───────────────────────────────────────────────

def build_estimator_matrix(dass_map: dict, headline_keys: list[tuple]) -> list[dict]:
    """Per-finding estimator comparison for headline rows."""
    matrix = []
    for key in headline_keys:
        t, o, h = key
        dass_rows = dass_map.get(key, [])
        estimators = {}
        for row in dass_rows:
            est = row["estimator"]
            estimate = safe_float(row.get("estimate"))
            if estimate is None:
                continue
            estimators[est] = {
                "estimate": estimate,
                "se": safe_float(row.get("se")),
                "ci_low": safe_float(row.get("ci_low")),
                "ci_high": safe_float(row.get("ci_high")),
                "p": safe_float(row.get("p")),
                "q_bh": safe_float(row.get("q_bh")),
            }
        if estimators:
            matrix.append({
                "treatment": t,
                "treatment_label": treatment_label(t),
                "outcome": o,
                "outcome_label": outcome_label(o),
                "horizon": h,
                "row_label": f"{treatment_label(t)} \u2192 {outcome_label(o)} (h={h})",
                "estimators": estimators,
            })
    return matrix


# ── Spec stability ───────────────────────────────────────────────────────────

def build_spec_stability(dflmx_path: Path) -> list[dict]:
    path = dflmx_path / "spec_stability_summary.csv"
    if not path.exists():
        return []
    out = []
    for row in read_csv(path):
        out.append({
            "spec_id": row.get("spec_id", ""),
            "k_factors": safe_int(row.get("k_factors")),
            "is_baseline": safe_bool(row.get("is_baseline")),
            "sign_match_rate": safe_float(row.get("sign_match_rate")),
            "priority_match_rate": safe_float(row.get("priority_match_rate")),
            "keyfinding_retention_rate": safe_float(row.get("keyfinding_retention_rate")),
            "stability_score": safe_float(row.get("stability_score")),
        })
    return out


# ── State dependence ─────────────────────────────────────────────────────────

def build_state_dependence(dflmx_path: Path, headline_keys: list[tuple]) -> list[dict]:
    """State-dependent effects from irf_lp_state_continuous for headline rows."""
    path = dflmx_path / "irf_lp_state_continuous.csv"
    if not path.exists():
        return []
    key_set = set(headline_keys)
    out = []
    for row in read_csv(path):
        key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
        if key not in key_set:
            continue
        out.append({
            "treatment": row["treatment"],
            "treatment_label": treatment_label(row["treatment"]),
            "outcome": clean_outcome(row["outcome"]),
            "outcome_label": outcome_label(row["outcome"]),
            "horizon": safe_int(row["horizon"]),
            "coef_base": safe_float(row.get("coef_base")),
            "coef_low_state": safe_float(row.get("coef_low_state")),
            "coef_high_state": safe_float(row.get("coef_high_state")),
            "state_gap": safe_float(row.get("coef_state_gap")),
            "p_state_gap": safe_float(row.get("p_state_gap")),
            "q_state_gap": safe_float(row.get("q_state_gap")),
            "row_label": f"{treatment_label(row['treatment'])} \u2192 {outcome_label(row['outcome'])} (h={safe_int(row['horizon'])})",
        })
    return out


# ── Variance attribution ────────────────────────────────────────────────────

def build_variance_attribution(dflmx_path: Path) -> list[dict]:
    path = dflmx_path / "variance_attribution.csv"
    if not path.exists():
        return []
    out = []
    for row in read_csv(path):
        out.append({
            "outcome": clean_outcome(row.get("outcome", "")),
            "outcome_label": outcome_label(row.get("outcome", "")),
            "factor": row.get("factor", ""),
            "share": safe_float(row.get("share")),
            "r2": safe_float(row.get("r2")),
        })
    return out


# ── Program hierarchy ────────────────────────────────────────────────────────

def build_program_hierarchy(
    findings: list[dict],
    dass_map: dict,
    diagnostic_dass: dict | None = None,
) -> list[dict]:
    """Build evidence summary for each program treatment."""
    programs = [
        ("transfer_composite", "headline", "Dominant signal across all poverty and inequality outcomes. 9 of 11 robust rows."),
        ("ui_benefits", "bridge", "Cross-suite bridge: appears in both distributional-outcomes and consumption-composition suites."),
        ("snap_persons", "suggestive", "Near the FDR boundary. Survives targeted DASS shock diagnostics but does not clear DFLMX FDR."),
        ("social_security", "appendix", "Support in DASS (especially DML) but not in LP-based DFLMX. Method-dependent."),
    ]
    hierarchy = []
    for t_name, tier, description in programs:
        # Count from main findings
        robust_rows = [f for f in findings if f["treatment"] == t_name and f["robust"]]
        near_rows = [f for f in findings if f["treatment"] == t_name and not f["robust"] and (f["q_value"] or 1) <= 0.30]

        # Get best diagnostic evidence if available
        diag_summary = None
        if diagnostic_dass:
            diag_rows = [r for r in diagnostic_dass if r.get("treatment") == t_name]
            if diag_rows:
                sig_lp = sum(1 for r in diag_rows if r.get("estimator") == "lp" and (safe_float(r.get("p")) or 1) <= 0.10)
                sig_dml = sum(1 for r in diag_rows if r.get("estimator") == "dml" and (safe_float(r.get("p")) or 1) <= 0.10)
                total_lp = sum(1 for r in diag_rows if r.get("estimator") == "lp")
                total_dml = sum(1 for r in diag_rows if r.get("estimator") == "dml")
                diag_summary = {
                    "lp_sig": sig_lp, "lp_total": total_lp,
                    "dml_sig": sig_dml, "dml_total": total_dml,
                }

        hierarchy.append({
            "treatment": t_name,
            "label": treatment_label(t_name),
            "tier": tier,
            "description": description,
            "robust_count": len(robust_rows),
            "near_count": len(near_rows),
            "outcomes_covered": list(set(f["outcome"] for f in robust_rows)),
            "diagnostic": diag_summary,
        })
    return hierarchy


# ── Funnel ───────────────────────────────────────────────────────────────────

def build_funnel_counts(dflmx_base: Path, robust_rows: list[dict], confirmatory_ready_count: int) -> list[dict]:
    episode_summary_path = dflmx_base / "episode_leaveout_summary.csv"
    episode_keys = {}
    if episode_summary_path.exists():
        for row in read_csv(episode_summary_path):
            key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
            episode_keys[key] = safe_bool(row["all_pass"])
    stable_robust = sum(
        1 for row in robust_rows
        if episode_keys.get((row["treatment"], row["outcome"], row["horizon"])) is True
    )
    return [
        {"stage": "LP IRF rows tested", "count": count_rows(dflmx_base / "irf_lp.csv")},
        {"stage": "Ranked findings", "count": count_rows(dflmx_base / "findings_ranked.csv")},
        {"stage": "FDR-surviving rows (q \u2264 0.10)", "count": len(robust_rows)},
        {"stage": "Episode-stable robust rows", "count": stable_robust},
        {"stage": "Ready confirmatory rows", "count": confirmatory_ready_count},
    ]


# ── Episode data ─────────────────────────────────────────────────────────────

def build_episode_data(base: Path, label_lookup: dict) -> dict:
    summary = []
    summary_path = base / "episode_leaveout_summary.csv"
    if summary_path.exists():
        for row in read_csv(summary_path):
            key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
            summary.append({
                "treatment": row["treatment"],
                "treatment_label": treatment_label(row["treatment"]),
                "outcome": clean_outcome(row["outcome"]),
                "outcome_label": outcome_label(row["outcome"]),
                "horizon": safe_int(row["horizon"]),
                "all_pass": safe_bool(row.get("all_pass")),
                "any_sign_flip": safe_bool(row.get("any_sign_flip")),
                "any_sig_loss": safe_bool(row.get("any_sig_loss")),
                "label": label_lookup.get(key, f"{treatment_label(row['treatment'])} \u2192 {outcome_label(row['outcome'])} (h={safe_int(row['horizon'])})"),
            })

    checks = []
    checks_path = base / "episode_leaveout_checks.csv"
    if checks_path.exists():
        for row in read_csv(checks_path):
            key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
            sign_flip = safe_bool(row.get("sign_flip"))
            sig_loss = safe_bool(row.get("sig_loss"))
            checks.append({
                "label": label_lookup.get(key, f"{treatment_label(row['treatment'])} \u2192 {outcome_label(row['outcome'])} (h={safe_int(row['horizon'])})"),
                "episode": row.get("window_label", ""),
                "pass_episode": not sign_flip and not sig_loss,
            })
    return {"summary": summary, "checks": checks}


# ── Lead checks ──────────────────────────────────────────────────────────────

def build_lead_checks(base: Path, label_lookup: dict) -> list[dict]:
    path = base / "lead_anticipation_checks.csv"
    if not path.exists():
        return []
    out = []
    for row in read_csv(path):
        key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
        out.append({
            "treatment": row["treatment"],
            "outcome": clean_outcome(row["outcome"]),
            "horizon": safe_int(row["horizon"]),
            "label": label_lookup.get(key, f"{treatment_label(row['treatment'])} \u2192 {outcome_label(row['outcome'])} (h={safe_int(row['horizon'])})"),
            "p_joint_leads": safe_float(row.get("p_joint_leads")),
            "lead_reject_joint": safe_bool(row.get("lead_reject_joint")),
        })
    out.sort(key=lambda item: item["p_joint_leads"] if item["p_joint_leads"] is not None else 1.0)
    return out


# ── Confirmatory ─────────────────────────────────────────────────────────────

def build_confirmatory(base: Path) -> dict:
    gate = {}
    gate_path = base / "iv_gate_summary.csv"
    if gate_path.exists():
        for row in read_csv(gate_path):
            gate[row.get("metric", "")] = row.get("value", "")

    ready = []
    screening = []
    inference_path = base / "confirmatory_inference.csv"
    if inference_path.exists():
        for row in read_csv(inference_path):
            item = {
                "treatment": row.get("treatment", ""),
                "treatment_label": treatment_label(row.get("treatment", "")),
                "outcome": clean_outcome(row.get("outcome", "")),
                "outcome_label": outcome_label(row.get("outcome", "")),
                "horizon": safe_int(row.get("horizon")),
                "iv_candidate": row.get("iv_candidate", ""),
                "negative_control_candidate": row.get("negative_control_candidate", ""),
                "status": row.get("status", ""),
                "contract_status": row.get("contract_status", ""),
                "q_value": safe_float(row.get("q_value")),
            }
            if item["status"] == "ready_confirmatory":
                ready.append(item)
            elif item["contract_status"] == "ready":
                screening.append(item)

    return {
        "discovery_enabled": gate.get("discovery_enabled", "0"),
        "iv_candidates": gate.get("iv_candidates", "0"),
        "nc_candidates": gate.get("nc_candidates", "0"),
        "manifest_ready": gate.get("manifest_ready", "0"),
        "ready_confirmatory": ready,
        "screening_only_ready": screening,
    }


# ── Run summary ──────────────────────────────────────────────────────────────

def build_run_summary(name: str, run_key: str, dflmx_base: Path, dass_path: Path, note: str) -> dict:
    findings = read_csv(dflmx_base / "findings_ranked.csv") if (dflmx_base / "findings_ranked.csv").exists() else []
    robust_rows = [row for row in findings if safe_float(row.get("q_value"), 1.0) <= 0.10]
    estimators = Counter(row["estimator"] for row in read_csv(dass_path)) if dass_path.exists() else Counter()
    estimator_list = [estimator_label(e) for e in ESTIMATOR_ORDER if e in estimators]
    return {
        "key": run_key,
        "name": name,
        "note": note,
        "irf_rows": count_rows(dflmx_base / "irf_lp.csv"),
        "findings_rows": len(findings),
        "robust_rows": len(robust_rows),
        "estimators": estimator_list,
    }


# ── Story counts (snapshot) ─────────────────────────────────────────────────

def build_snapshot(headline_rows, consumption_rows, confirmatory, dass_path) -> dict:
    transfer_headline = sum(1 for row in headline_rows if row["treatment"] == "transfer_composite")
    outcome_counter = Counter(row["outcome"] for row in headline_rows)
    treatment_counter = Counter(row["treatment"] for row in headline_rows)
    dass_estimators = []
    if dass_path.exists():
        dass_estimators = sorted(set(row["estimator"] for row in read_csv(dass_path)))
        dass_estimators = [estimator_label(e) for e in ESTIMATOR_ORDER if e in [r["estimator"] for r in read_csv(dass_path)]]
    # De-dup
    seen = set()
    unique_est = []
    for e in dass_estimators:
        if e not in seen:
            unique_est.append(e)
            seen.add(e)
    return {
        "headline_robust": len(headline_rows),
        "consumption_robust": len(consumption_rows),
        "transfer_rows": transfer_headline,
        "distinct_outcomes": len(outcome_counter),
        "distinct_treatments": len(treatment_counter),
        "confirmatory_ready": len(confirmatory["ready_confirmatory"]),
        "dass_estimators": unique_est,
    }


# ── Main build ───────────────────────────────────────────────────────────────

def build_data() -> dict:
    # Load DASS maps
    outcomes_full_dass = load_dass_map(OUTCOMES_FULL_DASS)
    consumption_dass = load_dass_map(CONSUMPTION_DASS)

    # Load drilldown maps
    lead_map = build_lead_map(OUTCOMES_FULL_DFLMX)
    episode_map = build_episode_map(OUTCOMES_FULL_DFLMX)
    confirmatory_map = build_confirmatory_map(OUTCOMES_FULL_DFLMX)

    # Build finding panels
    headline_rows = build_finding_panel(
        OUTCOMES_FULL_DFLMX, outcomes_full_dass, q_threshold=0.10,
        require_robust=True, lead_map=lead_map, episode_map=episode_map,
        confirmatory_map=confirmatory_map,
    )
    consumption_robust = build_finding_panel(
        CONSUMPTION_DFLMX, consumption_dass, q_threshold=0.10, require_robust=True,
    )
    secondary_rows = build_finding_panel(
        OUTCOMES_FULL_DFLMX, outcomes_full_dass, q_threshold=0.10,
        limit=12, require_robust=False, lead_map=lead_map, episode_map=episode_map,
    )
    secondary_rows = [row for row in secondary_rows if row["q_value"] <= 0.30]
    consumption_top = build_finding_panel(
        CONSUMPTION_DFLMX, consumption_dass, q_threshold=0.10,
        limit=8, require_robust=False,
    )

    confirmatory = build_confirmatory(OUTCOMES_FULL_DFLMX)

    # Label lookup for charts
    label_lookup = {
        (row["treatment"], row["outcome"], row["horizon"]): row["row_label"]
        for row in headline_rows + secondary_rows + consumption_robust + consumption_top
    }

    # Headline keys for focused data
    headline_keys = [(r["treatment"], r["outcome"], r["horizon"]) for r in headline_rows]
    all_findings = headline_rows + secondary_rows

    # Load fresh diagnostic DASS (optional)
    diagnostic_dass_rows = None
    if TMP_DIAGNOSTIC_DASS.exists():
        diagnostic_dass_rows = read_csv(TMP_DIAGNOSTIC_DASS)

    # Build snapshot
    snapshot = build_snapshot(headline_rows, consumption_robust, confirmatory, OUTCOMES_FULL_DASS)

    data = {
        "meta": {
            "title": "Fiscal Transfers, Poverty, Inequality, and Consumption Composition",
            "subtitle": "Project-specific archive built on econark\u2019s R pipeline",
            "archive_date": "2026-04-03",
            "econark_commit": "7cb68eb",
        },
        "snapshot": snapshot,
        "overview": {
            "headline_stat": f"{snapshot['headline_robust']} robust rows",
            "headline_label": (
                f"{snapshot['transfer_rows']} are transfer-composite rows, covering "
                f"{snapshot['distinct_outcomes']} distinct poverty or inequality outcomes."
            ),
            "takeaway": (
                "Transfers are the dominant story in this archive. The transfer composite drives "
                "robust responses in poverty, child poverty, household inequality, and the wealth-share gap. "
                "UI benefits serve as the cross-suite bridge, appearing in both distributional outcomes "
                "and the consumption-composition block. The canon v2 consumption basket adds a secondary "
                "result: UI benefits tilt spending toward essentials one quarter out."
            ),
        },
        "questions": [
            {"tag": "Q1", "tier": "headline",
             "title": "Do transfer shocks move poverty and inequality outcomes?",
             "description": "Archive headline. The full outcomes run is dominated by transfer-composite responses across poverty, child poverty, inequality, and wealth-gap outcomes."},
            {"tag": "Q2", "tier": "secondary",
             "title": "Which transfer programs matter individually?",
             "description": "UI benefits is the strongest program-level bridge. SNAP participation is stable-suggestive. Social Security is method-dependent."},
            {"tag": "Q3", "tier": "secondary",
             "title": "Do shocks shift essential versus discretionary spending?",
             "description": "The canon v2 basket ports the essential-versus-discretionary logic from ea-gender. UI benefits shifts the spending balance one quarter out."},
            {"tag": "Q4", "tier": "suggestive",
             "title": "How do rates, credit, and wealth compare with transfers?",
             "description": "Fed funds, credit conditions, and household net worth are included as contrasts. They do not dominate the archive the way transfers do."},
            {"tag": "Q5", "tier": "methods",
             "title": "How much of this survives the confirmatory layer?",
             "description": "Confirmatory coverage is narrower than screening evidence. One row achieves ready-confirmatory status."},
        ],
        "key_variables": VARIABLES,

        # Evidence hierarchy
        "hierarchy": build_program_hierarchy(all_findings, outcomes_full_dass, diagnostic_dass_rows),

        # Headline findings with drilldown enrichment
        "headline_findings": headline_rows,
        "secondary_findings": secondary_rows,
        "consumption_findings": consumption_robust,
        "consumption_supporting": consumption_top,

        # New chart data
        "heatmap": build_heatmap(OUTCOMES_FULL_DFLMX),
        "irf_curves": build_irf_curves(
            OUTCOMES_FULL_DFLMX,
            ["transfer_composite", "ui_benefits", "household_networth", "snap_persons"],
        ),
        "estimator_matrix": build_estimator_matrix(outcomes_full_dass, headline_keys),
        "spec_stability": build_spec_stability(OUTCOMES_FULL_DFLMX),
        "state_dependence": build_state_dependence(OUTCOMES_FULL_DFLMX, headline_keys),
        "variance_attribution": build_variance_attribution(OUTCOMES_FULL_DFLMX),

        # Pipeline data
        "funnel_counts": build_funnel_counts(
            OUTCOMES_FULL_DFLMX, headline_rows, len(confirmatory["ready_confirmatory"]),
        ),
        "episodes": build_episode_data(OUTCOMES_FULL_DFLMX, label_lookup),
        "lead_checks": build_lead_checks(OUTCOMES_FULL_DFLMX, label_lookup),
        "confirmatory": confirmatory,

        # Run summaries
        "runs": [
            build_run_summary("Full Outcomes", "outcomes_full",
                OUTCOMES_FULL_DFLMX, OUTCOMES_FULL_DASS,
                "Full archive run with broader estimator families (LP, DML, TMLE, CF, LP-IV, DML-IV) and the repaired IV/negative-control layer."),
            build_run_summary("Baseline Outcomes", "outcomes_baseline",
                OUTCOMES_BASE_DFLMX, OUTCOMES_BASE_DASS,
                "Cleaner baseline poverty/inequality screen with LP and DML in the DASS layer."),
            build_run_summary("Consumption Baseline", "consumption_baseline",
                CONSUMPTION_DFLMX, CONSUMPTION_DASS,
                "Canon v2 spending-basket run used for the secondary consumption-composition question."),
        ],
    }
    return data


def main() -> None:
    data = build_data()
    OUT.write_text("const DATA = " + json.dumps(data, indent=2) + ";\n", encoding="utf-8")
    size_kb = OUT.stat().st_size / 1024
    print(f"wrote {OUT} ({size_kb:.0f} KB)")
    print(f"  snapshot: {data['snapshot']}")
    print(f"  headline rows: {len(data['headline_findings'])}")
    print(f"  secondary rows: {len(data['secondary_findings'])}")
    print(f"  consumption robust: {len(data['consumption_findings'])}")
    print(f"  heatmap cells: {len(data['heatmap']['cells'])}")
    print(f"  irf curves: {sum(len(v) for v in data['irf_curves'].values())} outcome series")
    print(f"  estimator matrix: {len(data['estimator_matrix'])} rows")
    print(f"  hierarchy: {[h['label'] + ' (' + h['tier'] + ')' for h in data['hierarchy']]}")


if __name__ == "__main__":
    main()
