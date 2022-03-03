/**
 * Mesa - Maybe
 */

/**
 * Serves as the base struct for our type
 */
const maybe = {
  unwrap: function () {
    return this.value;
  },
  map: function (fn) {
    return this.kind == "Nil" ? Nil() : Maybe.of(fn(this.value));
  }
}

const Some =
  value => {
    return Object.assign({
      kind: "Some",
      value,
    }, maybe)
  }

const Nil =
  () => {
    return Object.assign({
      kind: "Nil"
    }, maybe)
  }

const Maybe = {
  of: value => {
    return value !== null ? Some(value) : Nil()
  }
}

export {
  Maybe
}