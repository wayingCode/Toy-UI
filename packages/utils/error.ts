import { isString } from 'lodash-es'

class YoUIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'YoUIError'
  }
}

export function throwErorr(scope: string, msg: string) {
  throw new YoUIError(`[${scope}] ${msg}`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const err = isString(scope) ? new YoUIError(`[${scope}] ${msg}`) : scope
    console.warn(err)
  }
}