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
    fp_by_key: dict[tuple[str, str], list[dict[str, str]]] = {}
    for row in fp_rows:
        fp_by_key.setdefault((row["channel"], row["h"]), []).append(row)

    compare_rows: list[dict[str, object]] = []
    for channel in sorted({row["channel"] for row in fp_rows}):
        for h in ("2", "4", "8"):
            ea_row = ea_by_key.get((channel, h))
            fp_group = sorted(fp_by_key.get((channel, h), []), key=lambda row: row["scenario_id"])
            row: dict[str, object] = {
                "channel": channel,
                "h": h,
                "comparison_basis": "fp_channel_envelope",
                "ea_scenario_id": ea_row["scenario_id"] if ea_row else "",
                "ea_scenario_label": ea_row["scenario_label"] if ea_row else "",
                "ea_dose_metric": ea_row["dose_metric"] if ea_row else "",
                "ea_dose_value": ea_row["dose_value"] if ea_row else "",
                "fp_scenario_count": len(fp_group),
                "fp_scenario_ids": "|".join(item["scenario_id"] for item in fp_group),
                "fp_dose_metric": fp_group[0]["dose_metric"] if fp_group else "",
                "notes": (
                    "Raw bridge deltas are aligned by channel and horizon, but ea-ineq still lacks "
                    "TRLOWZ/RYDPC analogs, so only fp-ineq can be normalized by delta_trlowz. "
                    "fp-ineq values are reported as channel envelopes across all published scenarios at this "
                    "channel and horizon."
                ),
            }

            for metric in METRICS:
                ea_val = maybe_float(ea_row.get(metric)) if ea_row else None
                fp_vals = [maybe_float(item.get(metric)) for item in fp_group]
                fp_vals = [value for value in fp_vals if value is not None]
                row[f"ea_{metric}"] = "" if ea_val is None else ea_val
                row[f"fp_{metric}_min"] = "" if not fp_vals else min(fp_vals)
                row[f"fp_{metric}_max"] = "" if not fp_vals else max(fp_vals)
                row[f"fp_{metric}_positive_count"] = sum(1 for value in fp_vals if value > 0)
                row[f"fp_{metric}_negative_count"] = sum(1 for value in fp_vals if value < 0)
                row[f"ea_within_fp_{metric}_envelope"] = (
                    "" if ea_val is None or not fp_vals else min(fp_vals) <= ea_val <= max(fp_vals)
                )

            compare_rows.append(row)

    compare_fieldnames = [
        "channel",
        "h",
        "comparison_basis",
        "ea_scenario_id",
        "ea_scenario_label",
        "ea_dose_metric",
        "ea_dose_value",
        "fp_scenario_count",
        "fp_scenario_ids",
        "fp_dose_metric",
    ]
    for metric in METRICS:
        compare_fieldnames.extend(
            [
                f"ea_{metric}",
                f"fp_{metric}_min",
                f"fp_{metric}_max",
                f"fp_{metric}_positive_count",
                f"fp_{metric}_negative_count",
                f"ea_within_fp_{metric}_envelope",
            ]
        )
    compare_fieldnames.append("notes")

    write_rows(OUT_COMPARE, compare_rows, compare_fieldnames)

    raw_direction_summary = {}
    for metric in ("delta_ipovall", "delta_ipovch", "delta_imedrinc"):
        all_positive = sum(1 for row in compare_rows if row.get(f"fp_{metric}_negative_count") == 0 and row.get(f"fp_{metric}_positive_count", 0) > 0)
        all_negative = sum(1 for row in compare_rows if row.get(f"fp_{metric}_positive_count") == 0 and row.get(f"fp_{metric}_negative_count", 0) > 0)
        mixed = sum(
            1 for row in compare_rows
            if row.get(f"fp_{metric}_positive_count", 0) > 0 and row.get(f"fp_{metric}_negative_count", 0) > 0
        )
        raw_direction_summary[metric] = {
            "all_positive_envelopes": all_positive,
            "all_negative_envelopes": all_negative,
            "mixed_sign_envelopes": mixed,
            "status": "fp_channel_envelope_direction_summary",
        }

    metadata = {
        "comparison_version": "v1",
        "comparison_basis": "fp_channel_envelope",
        "comparison_interpretation_status": "diagnostic_only",
        "polarity_audit_status": "completed_no_mechanical_sign_flip",
        "ea_bridge_csv": rel_to_repo(ea_csv),
        "ea_bridge_metadata": rel_to_repo(ea_meta),
        "fp_bridge_csv_source": rel_to_repo(fp_csv),
        "fp_bridge_metadata_source": rel_to_repo(fp_meta),
        "archived_fp_bridge_csv": rel_to_repo(ARCHIVE_FP_CSV),
        "archived_fp_bridge_metadata": rel_to_repo(ARCHIVE_FP_META),
        "channels": sorted({row["channel"] for row in fp_rows}),
        "horizons": [2, 4, 8],
        "metrics": METRICS,
        "raw_direction_summary": raw_direction_summary,
        "limitations": [
            "ea-ineq bridge rows are per native shock unit rather than delta_trlowz.",
            "ea-ineq currently leaves delta_trlowz and delta_rydpc blank.",
            "fp-ineq values are summarized as channel envelopes, not one-to-one scenario matches.",
            "The polarity audit rules out a simple sign-convention flip, but it does not resolve the deeper estimand mismatch.",
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
