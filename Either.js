/**
 * Mesa - Either
 */

const Either = {
  
  // Pointed functor / pure / return
  of (value){
    return Right(value);
  },

  unwrap: function(){
    return this.value
  },

  map: function(fn){
    return this.kind === "Right"
            ? Right(fn(this.value))
            : this;
  },

  ap: function(either){
    return this.kind === "Right"
            ? either.map(this.value)
            : this;
  },

  // fn :: a -> ma
  bind: function(fn){
    return this.kind === "Left"
            ? Left()
            : fn(this.value);
  }
}

// Right type constructor
const Right =
  value =>
    Object.assign({ kind:"Right", value }, Either )

// Left type constructor
const Left =
  () =>
    Object.assign({ kind:"Left" }, Either )

export {
  Either,
  Left,
  Right
}