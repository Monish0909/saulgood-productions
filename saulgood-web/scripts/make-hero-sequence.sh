#!/usr/bin/env bash
# Builds the scroll-scrub hero frame sequence.
# Usage: scripts/make-hero-sequence.sh [input.mp4]
#  - With an mp4: extracts frames from it (real client film, swap-in).
#  - Without: builds a Ken-Burns film from the placeholder photos.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/media/frames
mkdir -p "$OUT"; rm -f "$OUT"/f_*.webp
if [ "${1:-}" != "" ]; then
  ffmpeg -y -i "$1" -vf "fps=24,scale=1280:-2" -frames:v 150 -c:v libwebp -quality 72 "$OUT/f_%04d.webp"
else
  P=public/media/placeholder
  IMGS=(heritage-palace villa-pool aerial-resort suite-interior spa resort)
  ARGS=(); FC=""; i=0
  for n in "${IMGS[@]}"; do
    ARGS+=(-loop 1 -t 2.2 -i "$P/$n.jpg")
    FC+="[$i:v]scale=2400:-2,crop=2400:1350,zoompan=z='1.0+0.0009*on':d=36:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720:fps=24,setsar=1[v$i];"
    i=$((i+1))
  done
  # chain crossfades (0.5s) every 1.5s
  PREV="v0"
  for ((k=1;k<i;k++)); do
    OFF=$(awk "BEGIN{print $k*1.0}")
    FC+="[$PREV][v$k]xfade=transition=fade:duration=0.5:offset=$OFF[x$k];"; PREV="x$k"
  done
  ffmpeg -y "${ARGS[@]}" -filter_complex "${FC%;}" -map "[$PREV]" -r 24 -frames:v 150 -c:v libwebp -quality 72 "$OUT/f_%04d.webp"
fi
ls "$OUT" | wc -l
