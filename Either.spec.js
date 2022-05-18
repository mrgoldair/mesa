/**
 * Either Spec
 * 
 * Using regular laws of FP
 */

import { Either, Right, Left } from './Either.js';
import { identity, compose as comp, map } from './Fn.js';
import fc from 'fast-check';

describe('Adheres to functor laws', () => {

  test('Identity :: map id a = a', () => {

    fc.assert(fc.property(fc.string(), s => {
      let either =
        Either.of(s)
              .map(identity)
      
      return either.unwrap() === s;
    }))
  })

  test('Composition :: map f . map g = map (f g)', () => {

    fc.assert(fc.property(fc.string(), s => {

      let fa = Either.of(s)

      // Our `f` which incs
      let f =
        n => n + 1
      
      // Our `g` which doubles                    
      let g =
        n => n * 2

      // map f • map g
      let mapmap = fa.map(f).map(g).unwrap();
      // map (f • g)
      let mapcompose = fa.map(comp(f,g)).unwrap();

      expect(mapmap).toEqual(mapcompose);
    }))
  })
})

describe('Either is an applicative functor', () => {

  test('Identity :: pure f <*> v = v', () => {
    fc.assert(fc.property(fc.string(), s => {
      // pure f <*> v
      let left = Either.of(identity).ap(Right(s));
      // v
      let right = s;

      return left.unwrap() === right;
    }))
  })

  test('Homomorphism :: pure f <*> pure a = pure (f a)', () => {
    fc.assert(fc.property(fc.string(), s => {
      // pure f <*> pure a
      let left =
        Either.of(identity)
          .ap(Either.of(s))
      // pure (f a)
      let right =
        Either.of(identity(s))

      return left.unwrap() === right.unwrap();
    }))
  })

  test('Composition :: (compose) <*> a <*> b <*> c = a <*> (b <*> c)', () => {
    let excl =
      s => s + "!"
  
    let caps =
      s => s.toUpperCase()

    fc.assert(fc.property(fc.string(), s => {
      // (compose) <*> a <*> b <*> c
      let left =
        Either.of(comp)
          .ap(Right(excl))
          .ap(Right(caps))
          .ap(Right(s))
      
      // a <*> (b <*> c)
      let right =
        Right(excl)
          .ap(Right(caps)
                .ap(Right(s)))

      return left.unwrap() === right.unwrap()
    }))
  })

  test('Interchange :: ', () => {})

})