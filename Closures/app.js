function greet(whattosay) {

  return function (name) {
    console.log(whattosay + " " + name);
  };

}

greet('Hi')('Colton')
//Invoking a function that returns a function.
//Logs 'Hi Colton'.

var sayHi = greet('Hi')
sayHi('Colton')
//This works as well and logs 'Hi Colton'.

//Any function inside the function will have access to everything outside of it's memory space.
//Even though the execution context for greet() is gone, the memory space it created for 'whattosay' isn't.
//Here we can say the execution context has 'closed in' its outer variables.

function buildFunctions() {

  var arr = []

  for (var i = 0; i < 3; i++) {

    arr.push(
      function() {
        console.log(i)
      }
      //Push 3 anonymous functions into the array.
      //Remember, these functions aren't being called yet, only created.
    )

  }
  return arr
}

var fs = buildFunctions()

//Call all 3 functions inside the array within buildFunctions()
fs[0]()
fs[1]()
fs[2]()
//Logs 3 3 3.
//By the time we've left the for loop, i is 3.
//So the array now consists of 3 functions logging i.
//But by the time fs[0]() etc. is called (which is outside the function), they don't have access to a variable i.
//So they look outside (up the scope chain) and see that i === 3.
//So each function logs 3.
//The functions are only able to tell you what is in memory RIGHT NOW. Not at the time the function was created.
//Only right now, when we are executing the function.


//Here's some ways we can write this in a way that DOES log 1 2 3
//With ES6, we can use let.
function buildFunctions2() {

  var arr = []

  for (let i = 0; i < 3; i++) {
    //Uses let instead of var.
    //Let is scoped into the block (the curly braces).
    //So each time the for loop runs, we are making i a new variable in memory.

    arr.push(
      function() {
        console.log(i)
      }

    )

  }
  return arr
}

var fs2 = buildFunctions2()

fs2[0]()
fs2[1]()
fs2[2]()
//Logs 0 1 2

//Below ES6, we can use a separate execution context for each function being pushed into the array.
//A parent scope that holds the current value of i as the loop goes.
function buildFunctions3() {

  var arr = []

  for (var i = 0; i < 3; i++) {

    //Can use an IIFE (Immediately Invoked Function Expression)
    arr.push(
      (function(j) {
        return function() {
          console.log(j)
        }
      }(i))
      //Now the function is running each time through the loop.
      //So each function has its own execution context.
      //So j is stored in each execution context.
      //And each time function(j) is invoked (which is immediately)
      //It's passed the current value of i.
      //It doesn't need to go up the scop chain anymore to find i.
    )

  }
  return arr
}

var fs3 = buildFunctions3()

fs3[0]()
fs3[1]()
fs3[2]()