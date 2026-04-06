#!/usr/bin/env python3
"""Build archive-local bridge comparison tables for ea-ineq vs fp-ineq."""

from __future__ import annotations

import csv
import json
import shutil
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
BRIDGE_DIR = REPO / "results" / "bridge"

DEFAULT_EA_CSV = BRIDGE_DIR / "bridge_results.csv"
DEFAULT_EA_META = BRIDGE_DIR / "bridge_metadata.json"
DEFAULT_FP_CSV = Path("/Users/shanewray/malus/proj/fp-ineq/docs/bridge_results.csv")
DEFAULT_FP_META = Path("/Users/shanewray/malus/proj/fp-ineq/docs/bridge_metadata.json")

ARCHIVE_FP_CSV = BRIDGE_DIR / "fp_bridge_results.csv"
ARCHIVE_FP_META = BRIDGE_DIR / "fp_bridge_metadata.json"
OUT_LONG = BRIDGE_DIR / "cross_repo_bridge_long.csv"
OUT_COMPARE = BRIDGE_DIR / "cross_repo_bridge_compare.csv"
OUT_META = BRIDGE_DIR / "cross_repo_bridge_metadata.json"

REPRESENTATIVE_FP_SCENARIOS = {
    "ui": "ineq-ui-relief",
    "broad_federal_transfers": "ineq-federal-transfer-relief",
    "transfer_composite": "ineq-transfer-composite-medium",
}

METRICS = [
    "delta_trlowz",
    "delta_ipovall",
    "delta_ipovch",
    "delta_rydpc",
    "delta_iginihh",
    "delta_imedrinc",
]


def read_rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def write_rows(path: Path, rows: list[dict[str, object]], fieldnames: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def maybe_float(value: str | None) -> float | None:
    if value in (None, "", "NA"):
        return None
    return float(value)


def safe_div(numerator: float | None, denominator: float | None) -> float | None:
    if numerator is None or denominator in (None, 0.0):
        return None
    return numerator / denominator


def sign_match(left: float | None, right: float | None) -> str:
    if left is None or right is None or left == 0 or right == 0:
        return ""
    return "match" if (left > 0 and right > 0) or (left < 0 and right < 0) else "opposite"


def main() -> None:
    if not DEFAULT_EA_CSV.exists():
        raise SystemExit(f"Missing ea bridge results: {DEFAULT_EA_CSV}")
    if not DEFAULT_FP_CSV.exists():
        raise SystemExit(f"Missing fp bridge results: {DEFAULT_FP_CSV}")

    BRIDGE_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(DEFAULT_FP_CSV, ARCHIVE_FP_CSV)
    if DEFAULT_FP_META.exists():
        shutil.copy2(DEFAULT_FP_META, ARCHIVE_FP_META)

    ea_rows = read_rows(DEFAULT_EA_CSV)
    fp_rows = read_rows(DEFAULT_FP_CSV)

    long_rows = sorted(
        ea_rows + fp_rows,
        key=lambda row: (row["channel"], int(row["h"]), row["repo"], row["scenario_id"]),
    )
    write_rows(OUT_LONG, long_rows, list(long_rows[0].keys()))

    ea_by_key = {(row["channel"], row["h"]): row for row in ea_rows}
    fp_rep_rows = {
        (row["channel"], row["h"]): row
        for row in fp_rows
        if REPRESENTATIVE_FP_SCENARIOS.get(row["channel"]) == row["scenario_id"]
    }

    compare_rows: list[dict[str, object]] = []
    for channel in sorted(REPRESENTATIVE_FP_SCENARIOS):
        for h in ("2", "4", "8"):
            ea_row = ea_by_key.get((channel, h))
            fp_row = fp_rep_rows.get((channel, h))
            row: dict[str, object] = {
                "channel": channel,
                "h": h,
                "comparison_basis": "representative_fp_scenario",
                "representative_fp_rule": REPRESENTATIVE_FP_SCENARIOS[channel],
                "ea_scenario_id": ea_row["scenario_id"] if ea_row else "",
                "ea_scenario_label": ea_row["scenario_label"] if ea_row else "",
                "ea_dose_metric": ea_row["dose_metric"] if ea_row else "",
                "ea_dose_value": ea_row["dose_value"] if ea_row else "",
                "fp_scenario_id": fp_row["scenario_id"] if fp_row else "",
                "fp_scenario_label": fp_row["scenario_label"] if fp_row else "",
                "fp_dose_metric": fp_row["dose_metric"] if fp_row else "",
                "fp_dose_value": fp_row["dose_value"] if fp_row else "",
                "notes": (
                    "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks "
                    "TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz."
                ),
            }

            fp_trlowz = maybe_float(fp_row["delta_trlowz"]) if fp_row else None
            for metric in METRICS:
                ea_val = maybe_float(ea_row.get(metric)) if ea_row else None
                fp_val = maybe_float(fp_row.get(metric)) if fp_row else None
                row[f"ea_{metric}"] = "" if ea_val is None else ea_val
                row[f"fp_{metric}"] = "" if fp_val is None else fp_val
                row[f"sign_match_{metric}"] = sign_match(ea_val, fp_val)
                row[f"fp_{metric}_per_trlowz"] = "" if metric == "delta_trlowz" else (
                    "" if safe_div(fp_val, fp_trlowz) is None else safe_div(fp_val, fp_trlowz)
                )

            compare_rows.append(row)

    compare_fieldnames = [
        "channel",
        "h",
        "comparison_basis",
        "representative_fp_rule",
        "ea_scenario_id",
        "ea_scenario_label",
        "ea_dose_metric",
        "ea_dose_value",
        "fp_scenario_id",
        "fp_scenario_label",
        "fp_dose_metric",
        "fp_dose_value",
    ]
    for metric in METRICS:
        compare_fieldnames.extend(
            [
                f"ea_{metric}",
                f"fp_{metric}",
                f"sign_match_{metric}",
                f"fp_{metric}_per_trlowz",
            ]
        )
    compare_fieldnames.append("notes")

    write_rows(OUT_COMPARE, compare_rows, compare_fieldnames)

    metadata = {
        "comparison_version": "v1",
        "ea_bridge_csv": str(DEFAULT_EA_CSV),
        "ea_bridge_metadata": str(DEFAULT_EA_META),
        "fp_bridge_csv_source": str(DEFAULT_FP_CSV),
        "fp_bridge_metadata_source": str(DEFAULT_FP_META),
        "archived_fp_bridge_csv": str(ARCHIVE_FP_CSV),
        "archived_fp_bridge_metadata": str(ARCHIVE_FP_META),
        "representative_fp_scenarios": REPRESENTATIVE_FP_SCENARIOS,
        "channels": sorted(REPRESENTATIVE_FP_SCENARIOS),
        "horizons": [2, 4, 8],
        "metrics": METRICS,
        "limitations": [
            "ea-ineq bridge rows are per native shock unit rather than delta_trlowz.",
            "ea-ineq currently leaves delta_trlowz and delta_rydpc blank.",
            "fp representative scenarios are explicit medium/default choices rather than exhaustive families.",
        ],
        "outputs": {
            "long_csv": str(OUT_LONG),
            "compare_csv": str(OUT_COMPARE),
        },
    }
    OUT_META.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")

    print(f"Wrote {OUT_LONG}")
    print(f"Wrote {OUT_COMPARE}")
    print(f"Wrote {OUT_META}")


if __name__ == "__main__":
    main()
