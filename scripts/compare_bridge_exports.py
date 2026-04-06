#!/usr/bin/env python3
"""Build archive-local bridge comparison tables for ea-ineq vs fp-ineq."""

from __future__ import annotations

import csv
import json
import os
import shutil
from argparse import ArgumentParser
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
BRIDGE_DIR = REPO / "results" / "bridge"

DEFAULT_EA_CSV = BRIDGE_DIR / "bridge_results.csv"
DEFAULT_EA_META = BRIDGE_DIR / "bridge_metadata.json"

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


def parse_args() -> object:
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--ea-csv", type=Path, default=DEFAULT_EA_CSV)
    parser.add_argument("--ea-meta", type=Path, default=DEFAULT_EA_META)
    parser.add_argument("--fp-csv", type=Path)
    parser.add_argument("--fp-meta", type=Path)
    return parser.parse_args()


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


def rel_to_repo(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO.resolve()))
    except ValueError:
        return path.name


def choose_fp_source(cli_path: Path | None, env_name: str, archive_path: Path) -> Path:
    if cli_path:
        return cli_path
    env_path = os.environ.get(env_name, "")
    if env_path:
        return Path(env_path)
    if archive_path.exists():
        return archive_path
    raise SystemExit(
        f"Missing fp bridge source; pass --{'fp-csv' if 'CSV' in env_name else 'fp-meta'} "
        f"or set {env_name}"
    )


def main() -> None:
    args = parse_args()
    ea_csv = args.ea_csv
    ea_meta = args.ea_meta
    fp_csv = choose_fp_source(args.fp_csv, "FP_INEQ_BRIDGE_CSV", ARCHIVE_FP_CSV)
    fp_meta = choose_fp_source(args.fp_meta, "FP_INEQ_BRIDGE_META", ARCHIVE_FP_META)

    if not ea_csv.exists():
        raise SystemExit(f"Missing ea bridge results: {ea_csv}")
    if not fp_csv.exists():
        raise SystemExit(f"Missing fp bridge results: {fp_csv}")

    BRIDGE_DIR.mkdir(parents=True, exist_ok=True)
    if fp_csv.resolve() != ARCHIVE_FP_CSV.resolve():
        shutil.copy2(fp_csv, ARCHIVE_FP_CSV)
    if fp_meta.exists() and fp_meta.resolve() != ARCHIVE_FP_META.resolve():
        shutil.copy2(fp_meta, ARCHIVE_FP_META)

    ea_rows = read_rows(ea_csv)
    fp_rows = read_rows(ARCHIVE_FP_CSV if ARCHIVE_FP_CSV.exists() else fp_csv)

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
                    "TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. "
                    "Directional agreement remains unaudited and should not yet be interpreted."
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

    raw_direction_summary = {}
    for metric in ("delta_ipovall", "delta_ipovch", "delta_imedrinc"):
        matches = sum(1 for row in compare_rows if row.get(f"sign_match_{metric}") == "match")
        opposite = sum(1 for row in compare_rows if row.get(f"sign_match_{metric}") == "opposite")
        raw_direction_summary[metric] = {
            "matches": matches,
            "opposites": opposite,
            "status": "unaudited_raw_direction_relation",
        }

    metadata = {
        "comparison_version": "v1",
        "comparison_basis": "temporary_representative_fp_scenarios",
        "comparison_interpretation_status": "diagnostic_only",
        "polarity_audit_status": "pending",
        "ea_bridge_csv": rel_to_repo(ea_csv),
        "ea_bridge_metadata": rel_to_repo(ea_meta),
        "fp_bridge_csv_source": rel_to_repo(fp_csv),
        "fp_bridge_metadata_source": rel_to_repo(fp_meta),
        "archived_fp_bridge_csv": rel_to_repo(ARCHIVE_FP_CSV),
        "archived_fp_bridge_metadata": rel_to_repo(ARCHIVE_FP_META),
        "representative_fp_scenarios": REPRESENTATIVE_FP_SCENARIOS,
        "channels": sorted(REPRESENTATIVE_FP_SCENARIOS),
        "horizons": [2, 4, 8],
        "metrics": METRICS,
        "raw_direction_summary": raw_direction_summary,
        "limitations": [
            "ea-ineq bridge rows are per native shock unit rather than delta_trlowz.",
            "ea-ineq currently leaves delta_trlowz and delta_rydpc blank.",
            "The current comparison uses temporary representative fp-ineq anchor scenarios rather than full fp channel envelopes.",
            "Raw direction flags are unaudited. They should not yet be read as evidence of cross-repo agreement or disagreement.",
            "fp representative scenarios are explicit medium/default choices rather than exhaustive families.",
        ],
        "outputs": {
            "long_csv": rel_to_repo(OUT_LONG),
            "compare_csv": rel_to_repo(OUT_COMPARE),
        },
    }
    OUT_META.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")

    print(f"Wrote {OUT_LONG}")
    print(f"Wrote {OUT_COMPARE}")
    print(f"Wrote {OUT_META}")


if __name__ == "__main__":
    main()
