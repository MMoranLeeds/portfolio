export interface ControlRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** Stack above every horizontally aligned control, including one already above the baseline. */
export function floatingOffset(
  base: ControlRect,
  obstacles: ControlRect[],
  gap = 12,
) {
  const offset = Math.max(
    0,
    ...obstacles
      .filter(
        (obstacle) =>
          base.left < obstacle.right + gap && base.right > obstacle.left - gap,
      )
      .map((obstacle) => base.bottom - obstacle.top + gap),
  );
  return { offset: Math.ceil(offset), fits: base.top - offset >= 16 };
}
