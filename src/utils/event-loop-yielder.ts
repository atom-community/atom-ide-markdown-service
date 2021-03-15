/**
 * A helper to allow the JavaScript event loop continue for a given interval between each
 * iteration of a CPU intensive loop. If the time spent in the loop reaches the given
 * maxTime, the operation is killed.
 *
 * @returns An async function to call inside your heavy loop. It will return `false` if
 *     the operation has exceeded the given max time (`true` otherwise).
 */
export function eventLoopYielder(delayMs: number, maxTimeMs: number) {
  const started = performance.now()
  let lastYield = started
  return async function (): Promise<boolean> {
    const now = performance.now()
    if (now - lastYield > delayMs) {
      await new Promise(setImmediate)
      lastYield = now
    }
    return now - started <= maxTimeMs
  }
}

/** Throws maximum time reached error */
export function maxTimeError(name: string, timeS: number) {
  const err = new Error("Max time reached")
  atom.notifications.addError(`${name} took more than ${timeS} seconds to complete`, {
    dismissable: true,
    description: `${name} took too long to complete and was terminated.`,
    stack: err.stack,
  })
  return err
}
