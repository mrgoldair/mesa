/**
 * Functor laws for Maybe type
 */

import { Maybe } from './Maybe.js';
import { identity, compose } from './Fn.js';

import fc from 'fast-check';

describe('Maybe functor laws', () => {

  // Mapping the identity function returns the functor unchanged
  it('Maybe adheres to the identity functor law', () => {
    fc.assert(fc.property(fc.string(), s => {
      let maybe = Maybe.of(s).map(identity);
      return maybe.unwrap() == s;
    }))
  })

  const inc =
    n => n + 1

  const double =
    n => n * 2

  const incDouble =
    compose(double,inc)

  // Mapping two functions should be the same as mapping the composition of those functions
  it('Maybe adheres to the composition functor law', () => {
    fc.assert(fc.property(fc.integer(), n => {
      let a = Maybe.of(n).map(inc).map(double)
      let b = Maybe.of(n).map(incDouble)

      return a.unwrap() === b.unwrap()
    }))
  })
})