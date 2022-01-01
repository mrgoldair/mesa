/**
 * Mesa - Transducer
 * 
 * Transforming-reducer. Transducers enable the processing
 * of sequences in a single pass as opposed to creating however
 * many intermediate sequences per the regular use of map, filter etc
 */

import { compose } from './Fn';

/**
 * 
 */
const map =
  fn => rf => (res,input) =>
    rf(res,fn(input))

const inc =
  n => n + 1

/**
 * 
 */
const filter =
  fn => rf => (res,input) => {
    if (fn(input))
      return rf(res,input)
    return res
  }

const even =
  n => n % 2 == 0

let evenInc = compose(Rmap(inc))(Rfilter(even))

// xf conj [] [1,2,3,4,5,6,7,8,9,10]
const transduce =
  (xf,rf,init,xs) =>
    xs.reduce(xf(rf),init)

let r = transduce(evenInc, conj, [], [1,2,3,4,5,6,7,8,9])