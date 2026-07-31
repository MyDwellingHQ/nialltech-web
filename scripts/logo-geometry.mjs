/**
 * Shared Niall Tech logo geometry.
 * Production master uses the medium gap variation.
 */

export const COLORS = {
  navy: "#0B1320",
  blue: "#146BFF",
  cyan: "#22C1FF",
  slate: "#475569",
  lightGray: "#E5E7EB",
  white: "#FFFFFF",
  black: "#000000",
};

export const GAP_PRESETS = {
  hairline: 2.2,
  medium: 5,
  chamfered: 5,
};

/** @typedef {'hairline' | 'medium' | 'chamfered'} GapStyle */
/** @typedef {'color' | 'navy' | 'white' | 'black'} ColorMode */

/**
 * Icon mark paths for a 100×100 viewBox.
 * Three discrete stadium shapes with intentional gaps.
 * @param {GapStyle} gapStyle
 */
export function iconShapes(gapStyle = "medium") {
  const gap = GAP_PRESETS[gapStyle];
  const w = 14.5;
  const leftX = 21;
  const top = 15;
  const bottom = 85;
  const rightX = 64.5;
  const rightH = 37;
  const radius = w / 2;

  // Diagonal endpoints leave `gap` clearance from pillars
  const diagX1 = leftX + w + gap + radius * 0.15;
  const diagY1 = top + radius + 1.5;
  const diagX2 = rightX + w * 0.35;
  const diagY2 = bottom - radius - 1;
  const stroke = w;

  const left = {
    type: "rect",
    x: leftX,
    y: top,
    width: w,
    height: bottom - top,
    rx: radius,
  };

  const right = {
    type: "rect",
    x: rightX,
    y: top,
    width: w,
    height: rightH,
    rx: radius,
  };

  const diagonal =
    gapStyle === "chamfered"
      ? {
          type: "chamfered",
          x1: diagX1,
          y1: diagY1,
          x2: diagX2,
          y2: diagY2,
          width: stroke,
          chamfer: 3.2,
        }
      : {
          type: "line",
          x1: diagX1,
          y1: diagY1,
          x2: diagX2,
          y2: diagY2,
          width: stroke,
        };

  return { left, right, diagonal, gap };
}

/**
 * @param {object} diagonal
 */
export function diagonalToPath(diagonal) {
  if (diagonal.type === "line") {
    return null; // rendered as <line>
  }

  // Chamfered diagonal: flat-cut ends instead of round caps
  const { x1, y1, x2, y2, width, chamfer } = diagonal;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const hw = width / 2;
  // Offset along axis for chamfer
  const c = Math.min(chamfer, hw * 0.9);

  // Chamfered stadium approximation
  const a1x = x1 + px * hw + ux * c;
  const a1y = y1 + py * hw + uy * c;
  const a2x = x1 - px * hw + ux * c;
  const a2y = y1 - py * hw + uy * c;
  const b1x = x2 + px * hw - ux * c;
  const b1y = y2 + py * hw - uy * c;
  const b2x = x2 - px * hw - ux * c;
  const b2y = y2 - py * hw - uy * c;
  const t1x = x1 + px * (hw - c);
  const t1y = y1 + py * (hw - c);
  const t2x = x1 - px * (hw - c);
  const t2y = y1 - py * (hw - c);
  const t3x = x2 + px * (hw - c);
  const t3y = y2 + py * (hw - c);
  const t4x = x2 - px * (hw - c);
  const t4y = y2 - py * (hw - c);

  return `M ${t1x.toFixed(2)} ${t1y.toFixed(2)} L ${a1x.toFixed(2)} ${a1y.toFixed(2)} L ${b1x.toFixed(2)} ${b1y.toFixed(2)} L ${t3x.toFixed(2)} ${t3y.toFixed(2)} L ${t4x.toFixed(2)} ${t4y.toFixed(2)} L ${b2x.toFixed(2)} ${b2y.toFixed(2)} L ${a2x.toFixed(2)} ${a2y.toFixed(2)} L ${t2x.toFixed(2)} ${t2y.toFixed(2)} Z`;
}

/**
 * @param {ColorMode} mode
 */
export function resolveColors(mode) {
  switch (mode) {
    case "white":
      return { primary: COLORS.white, accent: COLORS.white };
    case "black":
      return { primary: COLORS.black, accent: COLORS.black };
    case "navy":
      return { primary: COLORS.navy, accent: COLORS.navy };
    case "color":
    default:
      return { primary: COLORS.navy, accent: COLORS.blue };
  }
}

/**
 * @param {GapStyle} gapStyle
 * @param {ColorMode} mode
 */
export function renderIconMarkup(gapStyle = "medium", mode = "color") {
  const { left, right, diagonal } = iconShapes(gapStyle);
  const { primary, accent } = resolveColors(mode);
  const parts = [];

  parts.push(
    `<rect x="${left.x}" y="${left.y}" width="${left.width}" height="${left.height}" rx="${left.rx}" fill="${primary}"/>`,
  );

  if (diagonal.type === "line") {
    parts.push(
      `<line x1="${diagonal.x1}" y1="${diagonal.y1}" x2="${diagonal.x2}" y2="${diagonal.y2}" stroke="${primary}" stroke-width="${diagonal.width}" stroke-linecap="round"/>`,
    );
  } else {
    parts.push(`<path d="${diagonalToPath(diagonal)}" fill="${primary}"/>`);
  }

  parts.push(
    `<rect x="${right.x}" y="${right.y}" width="${right.width}" height="${right.height}" rx="${right.rx}" fill="${accent}"/>`,
  );

  return parts.join("\n  ");
}

/**
 * @param {object} opts
 */
export function wrapSvg(opts) {
  const {
    viewBox,
    width,
    height,
    content,
    title = "Niall Tech logo",
  } = opts;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  ${content}
</svg>
`;
}
