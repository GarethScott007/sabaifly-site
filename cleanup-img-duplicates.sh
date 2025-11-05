#!/usr/bin/env bash
set -euo pipefail
TS=$(date +%Y%m%d-%H%M%S)
BACKUP="img-dup-backup-$TS"
echo "Creating backup folder: $BACKUP"
mkdir -p "$BACKUP"

LIST="img-duplicates-found.txt"
if [[ ! -f "$LIST" ]]; then
  echo "Cannot find $LIST in current folder." >&2
  exit 1
fi

while IFS= read -r p; do
  [[ -z "$p" ]] && continue
  if [[ -e "$p" ]]; then
    dst="$BACKUP/$p"
    mkdir -p "$(dirname "$dst")"
    echo "Moving $p -> $dst"
    mv "$p" "$dst"
  else
    echo "Skipping (not found): $p"
  fi
done < "$LIST"

echo "Done. Review $BACKUP then commit."
