/**
 * Mesa - Either
 */

const Either = {
  
  // Pointed functor / pure / return
  of (value){
    return Right(value);
  },

  map: function(fn){
    return this.kind === "Right"
            ? Right(fn(this.value))
            : this;
  },  

  unwrap: function(){
    return this.value
  }    
}

// Right type constructor
const Right =
  value =>
    Object.assign({ kind:"Right", value }, Either )

// Left type constructor
const Left =
  value =>
    Object.assign({ kind:"Left", value }, Either )

export {
  Either,
  Left,
  Right
}