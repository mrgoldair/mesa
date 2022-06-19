/**
 * Mesa - Maybe
 */

/**
 * Serves as the base struct for our type
 */
const Maybe = {

  // pure / return
  // Puts value in minimal context
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
      return console.error("Maybe :: ap :: second argument must be of type Maybe")

    if (typeof this.value !== "function")
      return console.error("Maybe :: ap :: first argument must be a function")

    return this.kind === "Nil"
      ? Nil()
      : maybe.map(this.value)
  },

  bind: function(fn){

    if(typeof fn !== "function")
      return console.error("Maybe :: bind :: argument fn must be a function")
    
    return this.kind === "Nil"
              ? Nil()
              : fn(this.value);
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