/**
 * Mesa - IO Container
 */

const io = {
  kind: "IO",
  map: function(fn){
    return IO.of(() => { return fn(this.run()) })
  },
  // Perform our IO
  run: function(){
    return this.value();
  }
}

let IO = {
  // Our pointed functor
  of: function(fn){
    //
    if (typeof fn !== "function")
      return Object.assign({ value:function() { return fn }}, io)
    //
    return Object.assign({ value:fn, }, io)
  },
}

export { IO }