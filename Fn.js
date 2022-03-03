/**
 * Mesa - Functions
 * 
 * Module for functions that operate on other functions
 */

/**
 * 
 * @param {*} fn
 * @returns 
 */
const identity =
  val => val

/**
 * Takes a function of n args and turns it into n functions of 1 arg
 * @param {fn} - Function to curry
 * @returns {fn} - Curried function
 */
 const curry =
  fn => {
    const curryFn = gatheredArgs => {
      return (...argument) => {
        // Combine the args gathered so far with the current invocations args
        let args = [ ...gatheredArgs, ...argument ];
        // If we have the full number (or more), call our function
        if (args.length >= fn.length)
          return fn.apply(null, args.slice(0, fn.length))
        // Otherwise we need to return a function to wait for the remainder args
        return curryFn(args)
      }
    }
    // Initially we have no args to pass
    return curryFn([])
  }

/**
 * The composition of two functions `f` and `g`
 * @param {*} f 
 * @param {*} g 
 * @returns {fn} - The composition of `f` and `g`
 */
const compose =
  (f, g) =>
    x => g(f(x))

/**
 * Acts as a functional facade for calling `map`
 * via dot notation on a type
 * 
 * @param {fn} - A unary function
 * @param {container} - A functor
 */
const map =
  curry((fn,container) => container.map(fn))

export { identity, curry, compose, map }