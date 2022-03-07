/**
 * Mesa - Maybe
 */

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