#!/usr/bin/env python3
"""Build backend-aware bridge comparison tables for ea-ineq vs fp-ineq."""

from __future__ import annotations

import csv
import json
import shutil
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
BRIDGE_DIR = REPO / "results" / "bridge"

EA_CSV = BRIDGE_DIR / "bridge_results.csv"
EA_META = BRIDGE_DIR / "bridge_metadata.json"

FP_SOURCES = {
    "fp-r": {
        "csv": Path("/Users/shanewray/malus/proj/fp-ineq/reports/phase1_distribution_block/bridge_results.csv"),
        "meta": Path("/Users/shanewray/malus/proj/fp-ineq/reports/phase1_distribution_block/bridge_metadata.json"),
        "archive_csv": BRIDGE_DIR / "fp_bridge_results_fpr.csv",
        "archive_meta": BRIDGE_DIR / "fp_bridge_metadata_fpr.json",
        "source_label_csv": "fp-ineq/reports/phase1_distribution_block/bridge_results.csv",
        "source_label_meta": "fp-ineq/reports/phase1_distribution_block/bridge_metadata.json",
    },
    "fpexe": {
        "csv": Path("/Users/shanewray/malus/proj/fp-ineq/reports/phase1_distribution_block_fpexe/bridge_results.csv"),
        "meta": Path("/Users/shanewray/malus/proj/fp-ineq/reports/phase1_distribution_block_fpexe/bridge_metadata.json"),
        "archive_csv": BRIDGE_DIR / "fp_bridge_results_fpexe.csv",
        "archive_meta": BRIDGE_DIR / "fp_bridge_metadata_fpexe.json",
        "source_label_csv": "fp-ineq/reports/phase1_distribution_block_fpexe/bridge_results.csv",
        "source_label_meta": "fp-ineq/reports/phase1_distribution_block_fpexe/bridge_metadata.json",
    },
}

OUT_COMPARE = BRIDGE_DIR / "cross_repo_bridge_compare_backends.csv"
OUT_META = BRIDGE_DIR / "cross_repo_bridge_backends_metadata.json"

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
        writer.writerows(rows)


def maybe_float(value: str | None) -> float | None:
    if value in (None, "", "NA"):
        return None
    return float(value)


def rel_to_repo(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO.resolve()))
    except ValueError:
        return path.name


def envelope_summary(rows: list[dict[str, str]], metric: str) -> dict[str, object]:
    values = [maybe_float(row.get(metric)) for row in rows]
    values = [value for value in values if value is not None]
    if not values:
        return {
            "min": "",
            "max": "",
            "positive_count": 0,
            "negative_count": 0,
        }
    return {
        "min": min(values),
        "max": max(values),
        "positive_count": sum(1 for value in values if value > 0),
        "negative_count": sum(1 for value in values if value < 0),
    }


def main() -> None:
    if not EA_CSV.exists():
        raise SystemExit(f"Missing ea bridge results: {EA_CSV}")

    BRIDGE_DIR.mkdir(parents=True, exist_ok=True)
    ea_rows = read_rows(EA_CSV)
    ea_by_key = {(row["channel"], row["h"]): row for row in ea_rows}

    compare_rows: list[dict[str, object]] = []
    metadata_sources = {}
    backend_summary = {}
    backend_parity = {}

    for backend, config in FP_SOURCES.items():
        if not config["csv"].exists():
            raise SystemExit(f"Missing fp backend bridge results for {backend}: {config['csv']}")
        shutil.copy2(config["csv"], config["archive_csv"])
        if config["meta"].exists():
            shutil.copy2(config["meta"], config["archive_meta"])

        fp_rows = read_rows(config["archive_csv"])
        fp_by_key: dict[tuple[str, str], list[dict[str, str]]] = {}
        for row in fp_rows:
            fp_by_key.setdefault((row["channel"], row["h"]), []).append(row)

        metadata_sources[backend] = {
            "csv_source": config["source_label_csv"],
            "meta_source": config["source_label_meta"],
            "archived_csv": rel_to_repo(config["archive_csv"]),
            "archived_meta": rel_to_repo(config["archive_meta"]),
        }

        backend_summary[backend] = {
            "row_count": len(fp_rows),
            "channels": sorted({row["channel"] for row in fp_rows}),
            "scenario_ids": sorted({row["scenario_id"] for row in fp_rows}),
        }

        for channel in sorted({row["channel"] for row in fp_rows}):
            for h in ("2", "4", "8"):
                ea_row = ea_by_key.get((channel, h))
                fp_group = sorted(fp_by_key.get((channel, h), []), key=lambda row: row["scenario_id"])
                row: dict[str, object] = {
                    "fp_backend": backend,
                    "channel": channel,
                    "h": h,
                    "comparison_basis": "fp_channel_envelope_by_backend",
                    "ea_scenario_id": ea_row["scenario_id"] if ea_row else "",
                    "ea_scenario_label": ea_row["scenario_label"] if ea_row else "",
                    "ea_dose_metric": ea_row["dose_metric"] if ea_row else "",
                    "ea_dose_value": ea_row["dose_value"] if ea_row else "",
                    "fp_scenario_count": len(fp_group),
                    "fp_scenario_ids": "|".join(item["scenario_id"] for item in fp_group),
                    "fp_dose_metric": fp_group[0]["dose_metric"] if fp_group else "",
                    "notes": (
                        "Backend-specific fp-ineq channel envelope. ea-ineq remains on native shock units, "
                        "while fp-ineq remains normalized on delta_trlowz."
                    ),
                }
                for metric in METRICS:
                    ea_val = maybe_float(ea_row.get(metric)) if ea_row else None
                    summary = envelope_summary(fp_group, metric)
                    row[f"ea_{metric}"] = "" if ea_val is None else ea_val
                    row[f"fp_{metric}_min"] = summary["min"]
                    row[f"fp_{metric}_max"] = summary["max"]
                    row[f"fp_{metric}_positive_count"] = summary["positive_count"]
                    row[f"fp_{metric}_negative_count"] = summary["negative_count"]
                    row[f"ea_within_fp_{metric}_envelope"] = (
                        "" if ea_val is None or summary["min"] == "" else summary["min"] <= ea_val <= summary["max"]
                    )
                compare_rows.append(row)

    fieldnames = [
        "fp_backend",
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
        fieldnames.extend(
            [
                f"ea_{metric}",
                f"fp_{metric}_min",
                f"fp_{metric}_max",
                f"fp_{metric}_positive_count",
                f"fp_{metric}_negative_count",
                f"ea_within_fp_{metric}_envelope",
            ]
        )
    fieldnames.append("notes")

    compare_rows.sort(key=lambda row: (row["channel"], int(row["h"]), row["fp_backend"]))
    write_rows(OUT_COMPARE, compare_rows, fieldnames)

    metadata = {
        "comparison_version": "v1",
        "comparison_basis": "fp_channel_envelope_by_backend",
        "comparison_interpretation_status": "diagnostic_only",
        "ea_bridge_csv": rel_to_repo(EA_CSV),
        "ea_bridge_metadata": rel_to_repo(EA_META),
        "fp_backends": metadata_sources,
        "backend_summary": backend_summary,
        "backend_parity": backend_parity,
        "channels": sorted({row["channel"] for row in compare_rows}),
        "horizons": [2, 4, 8],
        "metrics": METRICS,
        "limitations": [
            "ea-ineq bridge rows remain per native shock unit rather than delta_trlowz.",
            "Both fp-ineq backends are summarized as channel envelopes rather than one-to-one scenario matches.",
            "Backend-level comparison still does not resolve the deeper estimand mismatch between ea-ineq and fp-ineq.",
        ],
        "outputs": {
            "compare_csv": rel_to_repo(OUT_COMPARE),
        },
    }
    if {"fp-r", "fpexe"} <= set(FP_SOURCES):
        fpr_rows = read_rows(FP_SOURCES["fp-r"]["archive_csv"])
        fpexe_rows = read_rows(FP_SOURCES["fpexe"]["archive_csv"])
        diffs = {}
        fpr_by_key = {(row["scenario_id"], row["h"]): row for row in fpr_rows}
        fpexe_by_key = {(row["scenario_id"], row["h"]): row for row in fpexe_rows}
        for metric in METRICS:
            max_abs_diff = 0.0
            max_abs_diff_key = None
            for key, fpr_row in fpr_by_key.items():
                fpexe_row = fpexe_by_key[key]
                diff = abs(float(fpr_row[metric]) - float(fpexe_row[metric]))
                if diff >= max_abs_diff:
                    max_abs_diff = diff
                    max_abs_diff_key = {"scenario_id": key[0], "h": int(key[1])}
            diffs[metric] = {
                "max_abs_diff": max_abs_diff,
                "max_abs_diff_at": max_abs_diff_key,
            }
        metadata["backend_parity"] = {
            "fp-r_vs_fpexe": {
                "status": "identical_on_current_bridge_surface" if all(item["max_abs_diff"] == 0.0 for item in diffs.values()) else "differs_on_current_bridge_surface",
                "metrics": diffs,
            }
        }
    OUT_META.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT_COMPARE}")
    print(f"Wrote {OUT_META}")


if __name__ == "__main__":
    main()
