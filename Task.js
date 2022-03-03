/**
 * Mesa - Task
 * 
 * A wrapper around Fetch for better composition
 */

function Task(computation){
  this.fork = computation;
}

Task.prototype.of = function(b){
  return new Task(function (_, res){
    return res(b)
  })
}

Task.prototype.map = function(fn){
  return new Task()
}