/**
 * List Spec
 * 
 * Using regular laws of FP
 */

import { List, Cons, Nil, first } from './List.js';
import { identity, compose as comp, map } from './Fn.js';
import fc from 'fast-check';

describe('Adheres to functor laws', () => {

  test('Identity :: map id a = a', () => {

    fc.assert(fc.property(fc.integer(), s => {
      let list =
        List.of(s)
              .map(identity)
      
      return first(list) === s;
    }))
  })

  test('Composition :: map f . map g = map (f g)', () => {

    fc.assert(fc.property(fc.integer(), n => {

      let list = List.of(n)

      // Our `f` which incs
      let f =
        n => n + 1
      
      // Our `g` which doubles
      let g =
        n => n * 2

      // map f • map g
      let mapmap = first(list.map(f).map(g));
      // map (f • g)
      let mapcompose = first(list.map(comp(f,g)));

      expect(mapmap).toEqual(mapcompose);
    }))
  })
})