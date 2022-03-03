/**
 * Laws for Either type
 */

import { Either, Right, Left } from './Either.js';
import { identity, compose as comp, map } from './Fn.js';

describe('Adheres to functor laws', () => {

  test('Either adheres to identity functor law', () => {
    // fmap id = id
    let either = Either.of("law")

    expect(either.map(identity).unwrap()).toBe(either.unwrap());
  })

  test('Either adheres to composition functor law', () => {
    // Our functor of 2
    let fa = Either.of(2)
    // Our `f` which incs
    let f =
      n => n + 1
    // Our `g` which doubles
    let g =
      n => n * 2
    // Our `fg` which incs then doubles
    let fg = comp(f,g)
    // fmap g (fmap f F) = fmap (f • g) F
    expect(fa.map(f).map(g).unwrap()).toEqual(fa.map(fg).unwrap())
  })
})