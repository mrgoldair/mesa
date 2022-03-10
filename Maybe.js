/**
 * Mesa - Maybe
 */

import { map, ap } from "./Fn";

/**
 * Serves as the base struct for our type
 */
const Maybe = {

  of: value => {
    return value !== null ? Some(value) : Nil()
  },

  unwrap: function () {
    return this.value;
  },

  map: function (fn) {
    return this.kind === "Nil"
      ? Nil()
      : Maybe.of(fn(this.value));
  },

  ap: function(maybe) {
    if (!(maybe.kind === "Nil" | maybe.kind === "Some"))
      return console.error("ap :: argument must be of type Maybe")

    return this.kind === "Nil"
      ? Nil()
      : maybe.map(this.value)
  }
}

const Some =
  value =>
    Object.assign({ kind: "Some", value }, Maybe)

const Nil =
  () =>
    Object.assign({ kind: "Nil" }, Maybe)

export {
  Maybe,
  Some,
  Nil
}