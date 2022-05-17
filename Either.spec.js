/**
 * Laws for Either type
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