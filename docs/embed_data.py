#!/usr/bin/env python3
"""Generate docs/data.js from packaged archive results."""

from __future__ import annotations

import csv
import json
import os
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
RESULTS = REPO / "results"
OUT = REPO / "docs" / "data.js"
BRIEF = REPO / "results_brief_20260403.md"


def read_csv(path: Path) -> list[dict]:
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def count_rows(path: Path) -> int:
    with path.open(newline="", encoding="utf-8") as f:
        return max(sum(1 for _ in f) - 1, 0)


def top_rows(path: Path, n: int = 8) -> list[dict]:
    rows = read_csv(path)
    out = []
    for row in rows[:n]:
        out.append(
            {
                "treatment": row.get("treatment", ""),
                "outcome": row.get("outcome", ""),
                "horizon": row.get("horizon", ""),
                "beta": row.get("beta", ""),
                "p_value": row.get("p_value", ""),
                "q_value": row.get("q_value", ""),
                "robust": row.get("robust", ""),
            }
        )
    return out


def report_summary(name: str, rel_dir: str) -> dict:
    base = RESULTS / "dflmx" / rel_dir
    report = (base / "dflmx_report.md").read_text(encoding="utf-8")
    irf_rows = count_rows(base / "irf_lp.csv")
    findings_rows = count_rows(base / "findings_ranked.csv")
    robust_rows = 0
    for row in read_csv(base / "findings_ranked.csv"):
        try:
            if float(row.get("q_value", "")) <= 0.10:
                robust_rows += 1
        except ValueError:
            continue
    return {
        "name": name,
        "dir": rel_dir,
        "irf_rows": irf_rows,
        "findings_rows": findings_rows,
        "robust_rows": robust_rows,
        "report_excerpt": "\n".join(report.splitlines()[:16]),
        "top_findings": top_rows(base / "findings_ranked.csv"),
    }


def confirmatory_summary() -> dict:
    base = RESULTS / "dflmx" / "poverty_outcomes_full"
    gate = {row["metric"]: row["value"] for row in read_csv(base / "iv_gate_summary.csv")}
    confirmatory = read_csv(base / "confirmatory_inference.csv")
    ready = []
    screening = []
    for row in confirmatory:
        item = {
            "treatment": row.get("treatment", ""),
            "outcome": row.get("outcome", ""),
            "horizon": row.get("horizon", ""),
            "factor": row.get("factor", ""),
            "iv_candidate": row.get("iv_candidate", ""),
            "negative_control_candidate": row.get("negative_control_candidate", ""),
            "contract_status": row.get("contract_status", ""),
            "status": row.get("status", ""),
            "p_value": row.get("p_value", ""),
            "q_value": row.get("q_value", ""),
        }
        if row.get("status") == "ready_confirmatory":
            ready.append(item)
        elif row.get("contract_status") == "ready":
            screening.append(item)
    return {
        "discovery_enabled": gate.get("discovery_enabled", "0"),
        "iv_candidates": gate.get("iv_candidates", "0"),
        "nc_candidates": gate.get("nc_candidates", "0"),
        "manifest_ready": gate.get("manifest_ready", "0"),
        "ready_confirmatory": ready,
        "screening_only_ready": screening[:8],
    }


def build_data() -> dict:
    brief = BRIEF.read_text(encoding="utf-8")
    return {
        "meta": {
            "title": "Fiscal Transfers, Poverty, Inequality, and Consumption Composition",
            "subtitle": "Project-specific econark-r archive for the ea-ineq package.",
            "archive_date": "2026-04-03",
        },
        "questions": [
            {
                "tag": "Headline",
                "title": "Transfers and poverty",
                "description": "Do transfer shocks move poverty and inequality outcomes over short and medium horizons?",
            },
            {
                "tag": "Decomposition",
                "title": "Program-level channels",
                "description": "Do UI, Social Security, and SNAP line up with the broader transfer-composite signal?",
            },
            {
                "tag": "Consumption",
                "title": "Canon v2 basket",
                "description": "Under the ea-gender-style essential/discretionary split, do shocks shift pce_gap_v2 and pce_eshare_v2?",
            },
            {
                "tag": "Contrast",
                "title": "Rates, credit, and wealth",
                "description": "How do fed funds, credit, and wealth shocks compare with transfer shocks on poverty and wealth-gap outcomes?",
            },
            {
                "tag": "Methods",
                "title": "Confirmatory screen",
                "description": "Which rows survive the repaired IV/NC discovery layer, and which remain screening-only?",
            },
        ],
        "key_variables": [
            {"name": "pce_essential_v2_idx", "definition": "CE-weighted essential basket: housing + food + healthcare"},
            {"name": "pce_discretionary_v2_idx", "definition": "CE-weighted discretionary basket: recreation + transport + clothing"},
            {"name": "pce_gap_v2", "definition": "log(E/D) under the canon v2 basket"},
            {"name": "pce_eshare_v2", "definition": "E / (E + D) under the canon v2 basket"},
            {"name": "transfer_composite", "definition": "transfers_total + social_security + ui_benefits"},
            {"name": "wealth_share_gap_top1_bottom50", "definition": "top1 wealth share minus bottom50 wealth share"},
        ],
        "runs": [
            report_summary("Consumption baseline", "poverty_consumption_baseline"),
            report_summary("Outcomes baseline", "poverty_outcomes_baseline"),
            report_summary("Outcomes full", "poverty_outcomes_full"),
        ],
        "confirmatory": confirmatory_summary(),
        "brief_markdown": brief,
    }


def main() -> None:
    data = build_data()
    OUT.write_text("const DATA = " + json.dumps(data, indent=2) + ";\n", encoding="utf-8")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
