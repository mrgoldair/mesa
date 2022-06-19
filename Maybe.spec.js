/**
 * Maybe Spec
 * 
 * Using regular laws of FP.
 */

import { Maybe, Some, Nil } from './Maybe.js';
import { identity, compose } from './Fn.js';
import fc from 'fast-check';

describe('Adheres to functor laws', () => {

  test('Identity :: map id a = a', () => {

    fc.assert(fc.property(fc.string(), x => {
      let maybe =
        Maybe.of(x)
             .map(identity);

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

  test('Interchange :: u <*> pure y = pure ($ y) <*> u', () => {})

  test('Composition :: (compose) <*> a <*> b <*> c = a <*> (b <*> c)', () => {

    let excl =
      s => s + "!"
    
    let caps =
      s => s.toUpperCase()

    fc.assert(fc.property(fc.string(), s => {
      let m = Some(s)

      // (compose) <*> a <*> b <*> c
      let left =
        Maybe.of(compose)
          .ap(Maybe.of(caps))
          .ap(Maybe.of(excl))
          .ap(m).unwrap()

      // a <*> (b <*> c)
      let right =
        Maybe.of(excl)
          .ap(Maybe.of(caps).ap(m))
          .unwrap()
      
      return left === right;
    }))
  })
})

describe('Adheres to monad laws',() => {
  
  test('Left Identity :: return a >>= h = h a',() => {
    fc.assert(fc.property(fc.string(), s => {
      let f = t => Some(s + "!");

      let ma = Maybe.of(s)
      let mb = ma.bind(f)

      let mc = f(s)

      return mb.unwrap() === mc.unwrap();
    }))
  })
})