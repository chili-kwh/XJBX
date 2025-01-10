var obj = {
  a: 1,
  foo: function (b) {
    b = b || this.a // 2
    return function (c) {
      console.log(this.a + b + c)
    }
  }
}
var a = 2
var obj2 = { a: 3 }

obj.foo(a).call(obj2, 1) // a3+b2+c1
obj.foo.call(obj2)(1) // a2 b3 c1


/*
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = function () {
    return function () {
      console.log(this)
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
person1.foo1()
person1.foo2()()
*/

var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = () => {
    console.log(this.name)
  }
}
var person2 = {
  name: 'person2',
  foo2: () => {
    console.log(this.name)
  }
}
var person1 = new Person('person1')

person1.foo1()
person1.foo2()
//person1.foo2()为箭头函数，this由外层作用域决定，且指向函数定义时的this而非执行时，
// 在这里它的外层作用域是函数Person，且这个是构造函数，并且使用了new来生成了对象person1，
// 所以此时this的指向是为person1。
person2.foo2()


function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  console.log(5);
}

//请写出以下输出结果：
Foo.getName();
getName(); // hoist
Foo().getName(); // overwrite
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
