/* eslint-disable @typescript-eslint/no-explicit-any */
interface PromiseConstructor {
  withResolvers<T>(): {
    promise: Promise<T>
    resolve: (value: T | PromiseLike<T>) => void
    reject: (reason?: any) => void
  }
}
