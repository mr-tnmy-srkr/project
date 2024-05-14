/* function wrapAsync (fn){
    return function(req,res,next)=>{
        fn(req,res,next).catch(err =>next(err));
    }
} */

/* module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}; */

// or

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};


/* both of these code snippets are functionally equivalent. They both define a middleware function that wraps another function (fn) and ensures that any promise returned by fn is properly handled, passing any caught errors to the next function.

The only difference between the two snippets is how the catch block is defined:

In the first snippet, fn(req, res, next).catch((err) => next(err)); explicitly specifies next(err) as the function to call when an error occurs.

In the second snippet, fn(req, res, next).catch(next); directly passes the next function as the catch handler, which implicitly passes any caught error to next.

Both approaches achieve the same result: catching errors from the promise returned by fn and passing them to the Express error handling middleware. */