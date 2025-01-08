"use strict";
console.log(this); // window

function foo1() {
  // console.trace()
  console.log(this); // undefined 严格模式函数内this会绑定到undefined
}

foo1()

/////

function foo() {
  console.log(this); // // window
}

(function () {
  "use strict";
  foo();
})();

(function () {
  "use strict";

  function foo() {
    console.log(this); // undefined
  }

  foo();
})();
