/**
 * Mesa - Group
 */

import { conj } from './List.js';
import { curry } from './Fn.js';

// Gathers `xs` into groups of `n`
const groupsOf =
  curry((n,xs) => {
    // Prepare
    let res = [];
    // Fill
    for (let i = 0;i <= xs.length;i += n){
      res = conj(xs.slice(i,i + n), res)
    }
    // Return
    return res.filter(xs => xs.length != 0);
  })

// Turns a sequence `xs` into a hash-map where keys are determined by `fn`
const groupBy =
  (fn, xs) => {
    return xs.reduce((acc,curr) => {
      return {
        ...acc,
        [fn(curr)]: acc[fn(curr)]
                    ? conj(curr, acc[fn(curr)])
                    : acc[fn(curr)] = [curr]
    }}, {})
  }

module.exports = {
  groupBy,
  groupsOf,
  everyNth
}