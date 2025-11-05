#!/usr/bin/env bash
set -euo pipefail
if [[ $# -lt 1 ]]; then
  echo "Usage: $0 img-dup-backup-YYYYMMDD-HHMMSS" >&2
  exit 1
fi
rm -rf "$1"
echo "Deleted backup folder: $1"
