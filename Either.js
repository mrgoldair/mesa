/**
 * Mesa - Either
 */

const left = {
  kind: "Left",
  map: function(_) {
    return this
  }
}

const right = {
  kind: "Right",
  unwrap: function(){
    return this.value
  },
  map: function(fn){
    return Right(fn(this.value))
  }
}

// Pointed functor
const Either = {
  of (value){
    return Right(value)
  }
}

// Right type constructor
const Right =
  value =>
    Object.assign({ value }, right )

// Left type constructor
const Left =
  value =>
    Object.assign({ value }, left )

export {
  Either,
  Left,
  Right
}