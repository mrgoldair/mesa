/**
 * Mesa - List
 * 
 * Provides multiple values as a recursive data structure
 */

// type List =
//    Nil | Cons a List

const List = {
  of (value){
    return Cons(value, Nil())
  },

  map: function(fn){
    return Cons(fn(this.value), this.rest.map(fn))
  }
}

const Cons =
  (value, list = Nil()) => {

    if (!(list.kind === "Cons" || list.kind === "Nil"))
      console.error("List.js - Cons :: list arg must be of type List", list)

    return Object.assign({
            kind: "Cons",
            value,
            rest: list
          }, List)
  }

const Nil =
  () => ({
    kind: "Nil",

    map (_){
      return Nil()
    }
  })

const first =
  ({ value }) =>
    value

export {
  List,
  Cons,
  Nil,
  first
}