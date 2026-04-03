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
BRIEF = REPO / "results_brief_20260403.md"

CONSUMPTION_DFLMX = RESULTS / "dflmx" / "poverty_consumption_baseline"
OUTCOMES_BASE_DFLMX = RESULTS / "dflmx" / "poverty_outcomes_baseline"
OUTCOMES_FULL_DFLMX = RESULTS / "dflmx" / "poverty_outcomes_full"

CONSUMPTION_DASS = RESULTS / "dass" / "poverty_consumption_baseline" / "results.csv"
OUTCOMES_BASE_DASS = RESULTS / "dass" / "poverty_outcomes_baseline" / "results.csv"
OUTCOMES_FULL_DASS = RESULTS / "dass" / "poverty_outcomes_full" / "results.csv"

ESTIMATOR_ORDER = ["lp", "dml", "tmle", "cf", "lp_iv", "dml_iv"]
ESTIMATOR_LABELS = {
    "lp": "LP",
    "dml": "DML",
    "tmle": "TMLE",
    "cf": "CF",
    "lp_iv": "LP-IV",
    "dml_iv": "DML-IV",
}
TREATMENT_LABELS = {
    "transfer_composite": "Transfer Composite",
    "ui_benefits": "UI Benefits",
    "social_security": "Social Security",
    "snap_persons": "SNAP",
    "household_networth": "Household Net Worth",
    "home_equity": "Home Equity",
    "fed_funds": "Fed Funds",
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
VARIABLES = [
    {
        "name": "transfer_composite",
        "display": "Transfer Composite",
        "source": "Derived from transfers, Social Security, and UI",
        "definition": "Broad transfer-support measure used for the headline poverty and inequality question.",
    },
    {
        "name": "ui_benefits",
        "display": "UI Benefits",
        "source": "FRED / national accounts transfer series",
        "definition": "Unemployment-insurance transfer flow used both on its own and inside the broader transfer composite.",
    },
    {
        "name": "poverty_all_q",
        "display": "Overall Poverty Rate",
        "source": "Quarterly poverty panel",
        "definition": "Quarterly poverty rate for the full population.",
    },
    {
        "name": "poverty_child_q",
        "display": "Child Poverty Rate",
        "source": "Quarterly poverty panel",
        "definition": "Quarterly poverty rate for children, used as the most policy-salient poverty outcome in the archive.",
    },
    {
        "name": "gini_households_q",
        "display": "Household Gini",
        "source": "Quarterly inequality panel",
        "definition": "Quarterly household-level inequality measure used as the main distributional concentration outcome.",
    },
    {
        "name": "wealth_share_gap_top1_bottom50",
        "display": "Top 1% vs Bottom 50% Wealth Gap",
        "source": "Distributional wealth panel",
        "definition": "Difference between the wealth share of the top 1 percent and the wealth share of the bottom 50 percent.",
    },
    {
        "name": "pce_essential_v2_idx",
        "display": "Essential Spending Index",
        "source": "Derived from BEA/CEX inputs",
        "definition": "Canon v2 essential basket built from housing, food, and healthcare using CE-style weights.",
    },
    {
        "name": "pce_discretionary_v2_idx",
        "display": "Discretionary Spending Index",
        "source": "Derived from BEA/CEX inputs",
        "definition": "Canon v2 discretionary basket built from recreation, transport, and clothing using symmetric weights.",
    },
    {
        "name": "pce_gap_v2",
        "display": "Essential vs Discretionary Gap",
        "source": "Derived",
        "definition": "Log ratio of essential to discretionary spending, written as log(E/D).",
    },
    {
        "name": "pce_eshare_v2",
        "display": "Essential Spending Share",
        "source": "Derived",
        "definition": "Essential spending as a share of combined essential plus discretionary spending, E / (E + D).",
    },
]


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
    mapping = {
        "strong": "Headline-grade",
        "moderate": "Supportive",
        "weak": "Exploratory",
    }
    return mapping.get(value, value.title() if value else "Exploratory")


def estimator_label(name: str) -> str:
    return ESTIMATOR_LABELS.get(name, name.upper())


def load_dass_map(path: Path) -> dict[tuple[str, str, int], list[dict]]:
    data: dict[tuple[str, str, int], list[dict]] = defaultdict(list)
    for row in read_csv(path):
        key = (row["treatment"], row["outcome"], safe_int(row["horizon"]))
        data[key].append(row)
    for key in data:
        data[key].sort(
            key=lambda item: (
                ESTIMATOR_ORDER.index(item["estimator"])
                if item["estimator"] in ESTIMATOR_ORDER
                else 999
            )
        )
    return data


def summarize_estimators(rows: list[dict], reference_beta: float | None) -> dict:
    items = []
    sign_match_count = 0
    nominal_sig_count = 0
    supportive_count = 0
    available = 0

    for row in rows:
        estimator = row["estimator"]
        estimate = safe_float(row.get("estimate"))
        p_value = safe_float(row.get("p"))
        q_bh = safe_float(row.get("q_bh"))
        if estimate is None:
            continue
        available += 1
        sign = "positive" if estimate > 0 else "negative" if estimate < 0 else "zero"
        sign_match = (
            reference_beta is not None
            and estimate != 0
            and ((estimate > 0 and reference_beta > 0) or (estimate < 0 and reference_beta < 0))
        )
        nominal_sig = p_value is not None and p_value <= 0.10
        if sign_match:
            sign_match_count += 1
        if nominal_sig:
            nominal_sig_count += 1
        if sign_match and nominal_sig:
            supportive_count += 1
        items.append(
            {
                "estimator": estimator,
                "label": estimator_label(estimator),
                "estimate": estimate,
                "ci_low": safe_float(row.get("ci_low")),
                "ci_high": safe_float(row.get("ci_high")),
                "p_value": p_value,
                "q_bh": q_bh,
                "sign": sign,
                "sign_match": bool(sign_match),
                "nominal_sig": bool(nominal_sig),
                "notes": row.get("notes", ""),
            }
        )

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


def build_finding_panel(
    dflmx_path: Path,
    dass_map: dict[tuple[str, str, int], list[dict]],
    q_threshold: float,
    limit: int | None = None,
    require_robust: bool = True,
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
        key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
        dass_rows = dass_map.get(key, [])
        beta = safe_float(row.get("beta"))
        estimator_summary = summarize_estimators(dass_rows, beta)
        rows.append(
            {
                "treatment": row["treatment"],
                "treatment_label": treatment_label(row["treatment"]),
                "outcome": clean_outcome(row["outcome"]),
                "outcome_label": outcome_label(row["outcome"]),
                "horizon": safe_int(row["horizon"]),
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
                "row_label": f"{treatment_label(row['treatment'])} -> {outcome_label(row['outcome'])} (h={safe_int(row['horizon'])})",
            }
        )
    rows.sort(key=lambda item: (item["q_value"], -abs(item["beta"] or 0)))
    return rows[:limit] if limit else rows


def build_story_counts(headline_rows: list[dict], consumption_rows: list[dict], confirmatory: dict) -> dict:
    transfer_headline = sum(1 for row in headline_rows if row["treatment"] == "transfer_composite")
    outcome_counter = Counter(row["outcome"] for row in headline_rows)
    treatment_counter = Counter(row["treatment"] for row in headline_rows)
    return {
        "headline_robust_rows": len(headline_rows),
        "transfer_headline_rows": transfer_headline,
        "headline_outcomes_covered": len(outcome_counter),
        "headline_treatments_covered": len(treatment_counter),
        "consumption_robust_rows": len(consumption_rows),
        "confirmatory_ready_rows": len(confirmatory["ready_confirmatory"]),
    }


def build_funnel_counts(
    dflmx_base: Path,
    robust_rows: list[dict],
    confirmatory_ready_count: int,
) -> list[dict]:
    findings = read_csv(dflmx_base / "findings_ranked.csv")
    episode_summary = read_csv(dflmx_base / "episode_leaveout_summary.csv")
    episode_keys = {
        (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"])): safe_bool(row["all_pass"])
        for row in episode_summary
    }
    stable_robust = sum(
        1
        for row in robust_rows
        if episode_keys.get((row["treatment"], row["outcome"], row["horizon"])) is True
    )
    return [
        {"stage": "LP IRF rows", "count": count_rows(dflmx_base / "irf_lp.csv")},
        {"stage": "Ranked findings", "count": len(findings)},
        {"stage": "FDR-surviving rows", "count": len(robust_rows)},
        {"stage": "Episode-stable robust rows", "count": stable_robust},
        {"stage": "Ready confirmatory rows", "count": confirmatory_ready_count},
    ]


def build_episode_data(base: Path, label_lookup: dict[tuple[str, str, int], str]) -> dict:
    summary = []
    summary_path = base / "episode_leaveout_summary.csv"
    if summary_path.exists():
        for row in read_csv(summary_path):
            key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
            summary.append(
                {
                    "treatment": row["treatment"],
                    "treatment_label": treatment_label(row["treatment"]),
                    "outcome": clean_outcome(row["outcome"]),
                    "outcome_label": outcome_label(row["outcome"]),
                    "horizon": safe_int(row["horizon"]),
                    "all_pass": safe_bool(row.get("all_pass")),
                    "any_sign_flip": safe_bool(row.get("any_sign_flip")),
                    "any_sig_loss": safe_bool(row.get("any_sig_loss")),
                    "max_abs_delta": safe_float(row.get("max_abs_delta")),
                    "label": label_lookup.get(key, f"{treatment_label(row['treatment'])} -> {outcome_label(row['outcome'])} (h={safe_int(row['horizon'])})"),
                }
            )

    checks = []
    checks_path = base / "episode_leaveout_checks.csv"
    if checks_path.exists():
        for row in read_csv(checks_path):
            key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
            sign_flip = safe_bool(row.get("sign_flip"))
            sig_loss = safe_bool(row.get("sig_loss"))
            checks.append(
                {
                    "label": label_lookup.get(key, f"{treatment_label(row['treatment'])} -> {outcome_label(row['outcome'])} (h={safe_int(row['horizon'])})"),
                    "episode": row.get("window_label", ""),
                    "pass_episode": not sign_flip and not sig_loss,
                }
            )
    return {"summary": summary, "checks": checks}


def build_lead_checks(base: Path, label_lookup: dict[tuple[str, str, int], str]) -> list[dict]:
    path = base / "lead_anticipation_checks.csv"
    out = []
    if not path.exists():
        return out
    for row in read_csv(path):
        key = (row["treatment"], clean_outcome(row["outcome"]), safe_int(row["horizon"]))
        out.append(
            {
                "treatment": row["treatment"],
                "outcome": clean_outcome(row["outcome"]),
                "horizon": safe_int(row["horizon"]),
                "label": label_lookup.get(key, f"{treatment_label(row['treatment'])} -> {outcome_label(row['outcome'])} (h={safe_int(row['horizon'])})"),
                "p_joint_leads": safe_float(row.get("p_joint_leads")),
                "lead_reject_joint": safe_bool(row.get("lead_reject_joint")),
            }
        )
    out.sort(key=lambda item: item["p_joint_leads"] if item["p_joint_leads"] is not None else 1.0)
    return out


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


def build_run_summary(name: str, dflmx_base: Path, dass_path: Path, note: str) -> dict:
    findings = read_csv(dflmx_base / "findings_ranked.csv")
    robust_rows = [row for row in findings if safe_float(row.get("q_value"), 1.0) <= 0.10]
    estimators = Counter(row["estimator"] for row in read_csv(dass_path))
    estimator_list = [estimator_label(name) for name in ESTIMATOR_ORDER if name in estimators]
    return {
        "name": name,
        "note": note,
        "irf_rows": count_rows(dflmx_base / "irf_lp.csv"),
        "findings_rows": len(findings),
        "robust_rows": len(robust_rows),
        "estimators": estimator_list,
    }


def build_data() -> dict:
    brief = BRIEF.read_text(encoding="utf-8") if BRIEF.exists() else ""

    outcomes_full_dass = load_dass_map(OUTCOMES_FULL_DASS)
    consumption_dass = load_dass_map(CONSUMPTION_DASS)

    headline_rows = build_finding_panel(
        OUTCOMES_FULL_DFLMX,
        outcomes_full_dass,
        q_threshold=0.10,
        require_robust=True,
    )
    consumption_robust = build_finding_panel(
        CONSUMPTION_DFLMX,
        consumption_dass,
        q_threshold=0.10,
        require_robust=True,
    )
    secondary_rows = build_finding_panel(
        OUTCOMES_FULL_DFLMX,
        outcomes_full_dass,
        q_threshold=0.10,
        limit=8,
        require_robust=False,
    )
    secondary_rows = [row for row in secondary_rows if row["q_value"] <= 0.30]
    consumption_top = build_finding_panel(
        CONSUMPTION_DFLMX,
        consumption_dass,
        q_threshold=0.10,
        limit=8,
        require_robust=False,
    )

    confirmatory = build_confirmatory(OUTCOMES_FULL_DFLMX)
    story_counts = build_story_counts(headline_rows, consumption_robust, confirmatory)
    label_lookup = {
        (row["treatment"], row["outcome"], row["horizon"]): row["row_label"]
        for row in headline_rows + secondary_rows + consumption_robust + consumption_top
    }

    return {
        "meta": {
            "title": "Fiscal Transfers, Poverty, Inequality, and Consumption Composition",
            "subtitle": "Project-specific archive built on econark's R pipeline",
            "archive_date": "2026-04-03",
            "econark_commit": "7cb68eb",
        },
        "overview": {
            "headline_stat": f"{story_counts['headline_robust_rows']} robust rows",
            "headline_label": (
                f"{story_counts['transfer_headline_rows']} are transfer-composite rows, covering "
                f"{story_counts['headline_outcomes_covered']} distinct poverty or inequality outcomes."
            ),
            "takeaway": (
                "Transfers are the main story in this archive. The strongest screen-positive evidence "
                "links the transfer composite to lower poverty, lower child poverty, a lower household Gini, "
                "and a narrower top-versus-bottom wealth-share gap. The canon v2 consumption basket adds a "
                "secondary result: UI benefits tilt spending toward essentials one quarter out."
            ),
        },
        "questions": [
            {
                "tag": "Q1",
                "tier": "headline",
                "title": "Do transfer shocks move poverty and inequality outcomes?",
                "description": "This is the archive headline. The full outcomes run is dominated by transfer-composite responses in poverty, child poverty, inequality, and wealth-gap outcomes.",
            },
            {
                "tag": "Q2",
                "tier": "secondary",
                "title": "Which transfer programs matter individually?",
                "description": "UI, Social Security, and SNAP are broken out to ask whether the broad transfer result is driven by a narrower program channel.",
            },
            {
                "tag": "Q3",
                "tier": "secondary",
                "title": "Do shocks shift essential versus discretionary spending?",
                "description": "The canon v2 basket ports the essential-versus-discretionary logic from ea-gender into the poverty archive and tests whether policy shocks rebalance spending.",
            },
            {
                "tag": "Q4",
                "tier": "suggestive",
                "title": "How do rates, credit, and wealth compare with transfers?",
                "description": "Fed funds, credit conditions, and household net worth are included as contrasts. They matter for some rows, but they do not dominate the archive the way transfers do.",
            },
            {
                "tag": "Q5",
                "tier": "methods",
                "title": "How much of this survives the confirmatory layer?",
                "description": "The IV/negative-control pipeline is cleaner after the econark-r fixes, but confirmatory coverage remains much narrower than the screening evidence.",
            },
        ],
        "key_variables": VARIABLES,
        "story_counts": story_counts,
        "headline_findings": headline_rows,
        "secondary_findings": secondary_rows,
        "consumption_findings": consumption_robust,
        "consumption_supporting": consumption_top,
        "funnel_counts": build_funnel_counts(
            OUTCOMES_FULL_DFLMX,
            headline_rows,
            len(confirmatory["ready_confirmatory"]),
        ),
        "episodes": build_episode_data(OUTCOMES_FULL_DFLMX, label_lookup),
        "lead_checks": build_lead_checks(OUTCOMES_FULL_DFLMX, label_lookup),
        "confirmatory": confirmatory,
        "runs": [
            build_run_summary(
                "Consumption Baseline",
                CONSUMPTION_DFLMX,
                CONSUMPTION_DASS,
                "Canon v2 spending-basket run used for the secondary consumption-composition question.",
            ),
            build_run_summary(
                "Outcomes Baseline",
                OUTCOMES_BASE_DFLMX,
                OUTCOMES_BASE_DASS,
                "Cleaner baseline poverty/inequality screen with LP and DML in the DASS layer.",
            ),
            build_run_summary(
                "Outcomes Full",
                OUTCOMES_FULL_DFLMX,
                OUTCOMES_FULL_DASS,
                "Full archive run with broader estimator families and the repaired IV/negative-control layer.",
            ),
        ],
        "brief_markdown": brief,
    }


def main() -> None:
    data = build_data()
    OUT.write_text("const DATA = " + json.dumps(data, indent=2) + ";\n", encoding="utf-8")
    print(f"wrote {OUT}")
    print(f"  headline rows: {len(data['headline_findings'])}")
    print(f"  secondary rows: {len(data['secondary_findings'])}")
    print(f"  consumption robust rows: {len(data['consumption_findings'])}")
    print(f"  ready confirmatory rows: {len(data['confirmatory']['ready_confirmatory'])}")


if __name__ == "__main__":
    main()
