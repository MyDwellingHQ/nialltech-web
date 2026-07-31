# Niall Tech Mark — Optical Review Notes

Canonical geometry lives in `src/brand/niall-mark-geometry.mjs` (viewBox `0 0 120 120`).
Per spec §14, permitted optical corrections are **maximum ±1 SVG unit per vertex**, must be
documented here, and must not change the overall silhouette or structural ratios.

## Canonical paths (as implemented — the source of truth)

| Shape | Path |
| --- | --- |
| `main` | `M8 5H35L112 82V115H85L8 38Z` |
| `lowerLeft` | `M8 49L35 76V112L31 116H12L8 112Z` |
| `bluePillar` | `M88 5H108L112 9V70L88 46Z` |

## Optical corrections applied

| Shape | Vertex | Original | Adjusted | Reason | Visual effect |
| --- | --- | --- | --- | --- | --- |
| — | — | — | — | **None applied** | Canonical geometry shipped exactly as specified. |

The mark currently renders the exact canonical coordinates from the approved brand board. No
per-vertex optical corrections have been made. If a future optical review identifies a needed
adjustment (e.g. antialiasing balance, apparent thickness, small-size gap preservation, or
right-side optical weight), it will be recorded as a new row above with original coordinate,
adjusted coordinate, reason, and visual effect — and constrained to ±1 unit.

## Structural invariants (must not change)

- Artwork bounds: x 8→112, y 5→116 (width 104, height 111).
- Main structural thickness: ~27 units (≥ 24% of artwork width).
- Blue pillar width: ~24 units.
- Left negative-space channel: ~10–11 units vertical separation (never < 9).
- Blue-to-diagonal channel: ~8–10 units perpendicular separation.
- Width-to-height ratio: 104 / 111 ≈ 0.9369.
