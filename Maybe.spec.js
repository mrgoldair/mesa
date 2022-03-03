/**
 * Laws for Maybe type
 */

import { Maybe } from './Maybe.js';
import { identity, compose } from './Fn.js';

import fc from 'fast-check';

describe('Adheres to functor laws', () => {

  test('Maybe adheres to identity functor law', () => {
    fc.assert(fc.property(fc.string(), s => {
      let maybe = Maybe.of(s).map(identity);
      return maybe.unwrap() == s;
    }))
  })

  // Mapping two functions should be the same as mapping the composition of those functions
  test('Maybe adheres to composition functor law', () => {
    const inc =
    n => n + 1

    const double =
      n => n * 2

    const incDouble =
      compose(inc,double)

    fc.assert(fc.property(fc.integer(), n => {
      let a = Maybe.of(n).map(inc).map(double)
      let b = Maybe.of(n).map(incDouble)

      return a.unwrap() === b.unwrap()
    }))
  })
})