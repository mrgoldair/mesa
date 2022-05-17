/**
 * Laws for Maybe type
 */

import { Maybe, Some, Nil } from './Maybe.js';
import { identity, compose } from './Fn.js';

import fc from 'fast-check';

describe('Adheres to functor laws', () => {

  test('Identity :: map id a = a', () => {
    fc.assert(fc.property(fc.string(), x => {
      let maybe = Maybe.of(x).map(identity);
      return maybe.unwrap() === x;
    }))
  })

  // Mapping two functions should be the same as mapping the composition of those functions
  test('Composition :: map g . map h = map (g . h)', () => {
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

describe('Adheres to applicative functor laws',() => {

  test('Identity :: pure id <*> v = v ',() => {
    fc.assert(fc.property(fc.string(), x => {
      // Our value already in context
      let Mx = Some(x)
      // Applying Mx to our function in default context
      return Maybe.of(identity).ap(Mx).unwrap() === x
    }))
  })

  test('Homomorphism :: pure f <*> pure v = pure (f v)',() => {
    fc.assert(fc.property(fc.string(), x => {
      let Mleft  = Maybe.of(identity).ap(Maybe.of(x));
      let Mright = Maybe.of(identity(x));

      return Mleft.unwrap() === Mright.unwrap();
    }))
  })
})