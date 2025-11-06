#!/usr/bin/env bash
set -euo pipefail
TS=$(date +%Y%m%d-%H%M%S); BACKUP="img-dup-backup-$TS"; mkdir -p "$BACKUP"
while IFS= read -r p; do
  [[ -z "$p" ]] && continue
  if [[ -e "$p" ]]; then
    dst="$BACKUP/$p"; mkdir -p "$(dirname "$dst")"; mv "$p" "$dst"; echo "Moved: $p"
  else
    echo "Skipped: $p"
  fi
done < img-duplicates-found.txt
echo "Done. Review $BACKUP then commit."
