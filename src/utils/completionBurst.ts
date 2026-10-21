/** Trigger on each transition to completion, rearming below 100%. */
export function createCompletionBurst() {
  let completed = false;
  return {
    reach(progress: number, motionAllowed: boolean): boolean {
      if (progress < 100) {
        completed = false;
        return false;
      }
      if (completed) return false;
      completed = true;
      return motionAllowed;
    },
    reset() {
      completed = false;
    },
  };
}
