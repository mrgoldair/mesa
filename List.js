/**
 * Mesa - List
 */

import { curry, compose } from './Fn.js';

/**
 * A curried version of the built-in map
 */
const map =
  Fn.curry((fn, xs) => xs.map(fn))

/**
 * A curried version of the built-in filter
 */
const filter =
  Fn.curry((fn, xs) => xs.filter(fn))

/**
 * A curried version of the built-in reduce
 */
const reduce =
  Fn.curry((fn, init, xs) => xs.reduce(fn,init))

/**
 * Push `item` onto the front of `xs`
 * @param {*} xs - An array-like structure
 * @param {*} item 
 * @returns A copy of `xs` with `item` at the front
 * @type {a -> [a] -> [a]}
 */

const cons =
  (item, xs) => {
    let copy = xs.slice()
    copy.unshift(item)
    return copy
  }

/**
 * Push `item` onto the back of `xs`
 * @param {*} item - An array-like structure
 * @param {*} xs 
 * @returns A copy of `xs` with `item` at the back
 * @type {a -> [a] -> [a]}
 */
const conj =
(item, xs) => {
  let copy = xs.slice()
  copy.push(item)
  return copy
}

/**
 * 
 */
const slidingOf =
  Fn.curry((size, xs) => {
    let groups = [];
    for (let i = 0;i <= (xs.length - size);i++){
      groups.push(xs.slice(i, i + size))
    }
    return groups;
  })

/**
 * 
 */
const map2 =
  Fn.curry((fn, a, b) => {
    // Take the shortest so we don't get nulls
    let limit = Math.min(a.length, b.length);
    let r = [];
    for (let i = 0;i < limit;i++){
      r.push( fn(a[i],b[i]) )
    }
    return r;
  })

/**
 * `nth` item of an array-like
 * - Does not bounds check
 */
const nth =
  Fn.curry((nth, xs) => xs[nth])

/**
 * First item of an array-like
 * - Does not bounds check
 * @type {[a] -> a}
 */
const first =
  xs =>
    nth(0,xs)

/**
 * Last item of an array-like
 * - Does not bounds check
 * @type {[a] -> a}
 */
const last =
  xs =>
    xs[xs.length - 1]

/**
 * Determines whether an array-like is empty
 * - Does not bounds check
 * @type {[] -> bool}
 */
const empty =
  xs =>
    xs.length == 0

/**
 * A sequence featuring only every `nth` item
 * @type {number -> number -> [a] -> [a]}
 */
const everyNth =
  curry((nth, start, xs) => {
    // Prepare
    let res = [];
    // Fill
    for (let i = start;i <= xs.length;i += nth){
      // Add `xs[i]` to the back of `res`
      res = conj(xs[i], res)
    }
    // Return
    return res.filter(n => n);
  })

module.exports = {
  sum,
  map,
  map2,
  filter,
  reduce,
  slidingOf,
  nth,
  everyNth,
  first,
  last,
  conj,
  empty
}