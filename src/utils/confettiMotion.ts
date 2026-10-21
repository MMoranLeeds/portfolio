/** Sample a gravity-like arc with drag and a little paper flutter. */
export function confettiFrames(index: number, wide: boolean): Keyframe[] {
  const direction = wide
    ? -100 + ((index * 47) % 161)
    : -125 + ((index * 47) % 251);
  const height = 105 + ((index * 29) % 100);
  const fall = 125 + ((index * 17) % 60);
  const spin = (index % 2 ? 1 : -1) * (420 + index * 23);
  return Array.from({ length: 49 }, (_, step) => {
    const t = step / 48;
    const drift = direction * (1 - Math.exp(-3 * t));
    const flutter = Math.sin(t * Math.PI * 6 + index) * 7 * t;
    const y = -4 * height * t * (1 - t) + fall * t * t;
    return {
      offset: t,
      transform: `translate3d(${drift + flutter}px, ${y}px, 0) rotate(${spin * t}deg) rotateY(${720 * t + index * 15}deg) rotateX(${360 * t}deg)`,
      opacity: t < 0.04 ? t / 0.04 : t > 0.88 ? (1 - t) / 0.12 : 1,
    };
  });
}

export const confettiCleanupMs = 3400;
export function confettiTiming(index: number): KeyframeAnimationOptions {
  return {
    duration: 2300 + ((index * 71) % 750),
    delay: (index % 5) * 45,
    easing: "linear",
    fill: "both",
  };
}
