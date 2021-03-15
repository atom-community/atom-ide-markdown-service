/**
 * A class to allow the JavaScript event loop continue for a given interval between each iteration of a CPU intensive loop
 * If the time spent in the loop reaches the given maxTime, the operation is killed
 */
export class EventLoopYielder {
  private delayMs: number
  private maxTimeMs: number
  private started: number
  private lastYield: number

  constructor(delayMs: number, maxTimeMs: number) {
    this.delayMs = delayMs
    this.maxTimeMs = maxTimeMs
    this.started = performance.now()
    this.lastYield = this.started
  }

  /**
   * Call yield method inside your heavy loop
   * @returns it will be `false` if the operation has exceeded the given max time (`true` otherwise).
   */
  public async yield(): Promise<boolean> {
    const now = performance.now()
    if (now - this.lastYield > this.delayMs) {
      await new Promise(setImmediate)
      this.lastYield = now
    }
    if (now - this.started > this.maxTimeMs) {
      return false
    }
    return true
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
