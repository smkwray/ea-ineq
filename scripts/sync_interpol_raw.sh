#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DEST_DIR="${PROJECT_ROOT}/.cache/interpol_raw"
READY_FILE="${DEST_DIR}/.ready"

SRC_DIR="${1:-${INTERPOL_SOURCE_DIR:-}}"

if [[ -z "${SRC_DIR}" ]]; then
  echo "usage: scripts/sync_interpol_raw.sh /path/to/interpol/raw" >&2
  echo "or set INTERPOL_SOURCE_DIR=/path/to/interpol/raw" >&2
  exit 1
fi

if [[ ! -d "${SRC_DIR}" ]]; then
  echo "source directory does not exist: ${SRC_DIR}" >&2
  exit 1
fi

mkdir -p "${DEST_DIR}"
rm -f "${READY_FILE}"

rsync -a --delete --include='*.csv' --exclude='*' "${SRC_DIR}/" "${DEST_DIR}/"
touch "${READY_FILE}"

echo "synced interpol raw csv files to ${DEST_DIR}"
echo "ready marker: ${READY_FILE}"
