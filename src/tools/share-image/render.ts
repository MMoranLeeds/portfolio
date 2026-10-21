import type { StudioTemplate } from "./config";

export interface StudioCard {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  focusX: number;
  focusY: number;
}
export interface StudioContent {
  name: string;
  role: string;
  headline: string;
  template?: StudioTemplate;
  supportingLine?: string;
}
const imageCache = new Map<string, Promise<HTMLImageElement>>();
export function forgetImage(src: string) {
  imageCache.delete(src);
}
function loadImage(src: string) {
  let pending = imageCache.get(src);
  if (!pending) {
    pending = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        imageCache.delete(src);
        reject(
          new Error(
            "An image could not be loaded. Choose a local image and try again.",
          ),
        );
      };
      image.src = src;
    });
    imageCache.set(src, pending);
  }
  return pending;
}
function wrappedLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  width: number,
) {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > width) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    lines.push(line);
  }
  return lines;
}
export async function drawShareImage(
  canvas: HTMLCanvasElement,
  content: StudioContent,
  cards: StudioCard[],
) {
  await document.fonts.ready;
  const linkedin = content.template === "linkedin";
  const caseStudy = content.template === "case-study";
  const activeCards = linkedin ? [] : caseStudy ? cards.slice(0, 1) : cards;
  const images = await Promise.all(
    activeCards.map((card) => loadImage(card.src)),
  );
  const palette = getComputedStyle(document.documentElement);
  const token = (name: string) => palette.getPropertyValue(name).trim();
  const font = token("--font");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser does not support canvas export.");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = token("--surface");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (linkedin) {
    drawLinkedinHeader(ctx, canvas.width, canvas.height, content, token, font);
    return;
  }
  ctx.fillStyle = token("--soft-surface");
  ctx.beginPath();
  ctx.ellipse(1030, 300, 630, 520, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.textBaseline = "top";
  ctx.fillStyle = token("--ink");
  ctx.font = `500 23px ${font}`;
  ctx.fillText(content.name, 52, 112, 350);
  const textWidth = caseStudy ? 390 : 350;
  let size = caseStudy ? 56 : 68;
  let lines: string[];
  do {
    ctx.font = `600 ${size}px ${font}`;
    lines = wrappedLines(ctx, content.headline, textWidth);
    if (
      lines.length <= 4 &&
      lines.every((line) => ctx.measureText(line).width <= textWidth)
    )
      break;
    size -= 2;
  } while (size > 28);
  if (
    lines.length > 4 ||
    lines.some((line) => ctx.measureText(line).width > textWidth)
  )
    throw new Error("Shorten the headline so it fits within four lines.");
  lines.forEach((line, index) =>
    ctx.fillText(line, 52, 190 + index * size * 1.14),
  );
  const roleY = Math.max(480, 190 + lines.length * size * 1.14 + 30);
  ctx.fillStyle = token("--accent");
  ctx.fillRect(52, roleY - 24, 44, 4);
  ctx.fillStyle = token("--text");
  ctx.font = `400 22px ${font}`;
  ctx.fillText(content.role, 52, roleY, textWidth);
  if (caseStudy) {
    ctx.font = `500 18px ${font}`;
    ctx.fillText("CASE STUDY", 52, 64);
  }
  // Draw background panels first, then the primary project in front.
  for (const index of caseStudy ? [0] : [1, 2, 0]) {
    const card = activeCards[index];
    const image = images[index];
    if (!card || !image) continue;
    ctx.save();
    ctx.translate(card.x + card.width / 2, card.y + card.height / 2);
    ctx.rotate((card.angle * Math.PI) / 180);
    const x = -card.width / 2;
    const y = -card.height / 2;
    ctx.shadowColor = token("--line");
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 12;
    ctx.fillStyle = token("--panel");
    ctx.beginPath();
    ctx.roundRect(x, y, card.width, card.height, 14);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.beginPath();
    ctx.roundRect(x + 7, y + 7, card.width - 14, card.height - 14, 9);
    ctx.clip();
    const scale = Math.max(
      (card.width - 14) / image.naturalWidth,
      (card.height - 14) / image.naturalHeight,
    );
    const w = image.naturalWidth * scale;
    const h = image.naturalHeight * scale;
    ctx.drawImage(
      image,
      x + 7 - ((w - card.width + 14) * card.focusX) / 100,
      y + 7 - ((h - card.height + 14) * card.focusY) / 100,
      w,
      h,
    );
    ctx.restore();
  }
}
// Keep the left 36% clear for the overlapping profile photograph.
// All colours and typography come from the current portfolio tokens.
function drawLinkedinHeader(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  content: StudioContent,
  token: (name: string) => string,
  font: string,
) {
  const x = width * 0.36;
  const textWidth = width * 0.59;
  ctx.strokeStyle = token("--line");
  ctx.lineWidth = 1.5;
  for (const [dx, dy] of [
    [0, -30],
    [65, 100],
    [-45, 245],
  ]) {
    ctx.beginPath();
    ctx.roundRect(width - 95 + dx!, dy!, 220, 220, 36);
    ctx.stroke();
  }
  const paragraphs = content.headline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (paragraphs.length > 2)
    throw new Error("Use at most two headline lines for the LinkedIn header.");
  let lines = paragraphs;
  let size = 64;
  for (; size >= 24; size -= 2) {
    ctx.font = `600 ${size}px ${font}`;
    if (paragraphs.length === 1) {
      const words = paragraphs[0]!.split(/\s+/);
      const splits = words
        .slice(1)
        .map((_, i) => [
          words.slice(0, i + 1).join(" "),
          words.slice(i + 1).join(" "),
        ]);
      splits.sort(
        (a, b) =>
          Math.max(...a.map((t) => ctx.measureText(t).width)) -
          Math.max(...b.map((t) => ctx.measureText(t).width)),
      );
      lines = splits[0] || paragraphs;
    }
    if (lines.every((line) => ctx.measureText(line).width <= textWidth)) break;
  }
  if (size < 24)
    throw new Error(
      "Shorten the LinkedIn headline so it fits within two lines.",
    );
  ctx.textBaseline = "top";
  ctx.fillStyle = token("--ink");
  const top = height * 0.21;
  lines.forEach((line, i) => ctx.fillText(line, x, top + i * size * 1.18));
  ctx.fillStyle = token("--accent");
  ctx.fillRect(x, height * 0.67, 80, 5);
  ctx.fillStyle = token("--text");
  let supportingSize = 24;
  const supporting = (content.supportingLine || "").replace(/\s+/g, " ");
  for (; supportingSize >= 16; supportingSize--) {
    ctx.font = `400 ${supportingSize}px ${font}`;
    if (ctx.measureText(supporting).width <= textWidth) break;
  }
  if (supportingSize < 16)
    throw new Error("Shorten the supporting line to fit the LinkedIn header.");
  ctx.fillText(supporting, x, height * 0.77);
}

export function exportCanvas(
  canvas: HTMLCanvasElement,
  format: "png" | "jpeg",
): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("Export failed. Try PNG or another image.")),
      `image/${format}`,
      0.94,
    ),
  );
}
