// call
Function.prototype.myCall = function(thisArg, ...args) {
  thisArg = thisArg || {}
  const s = Symbol('fn')
  const fn = this
  thisArg[s] = fn
  const res = thisArg[s](...args)
  delete thisArg[s]
  return res
}

// apply
Function.prototype.myApply = function (thisArg, args){
  thisArg = thisArg || {}
  const s = Symbol('fn')
  const fn = this
  thisArg[s] = fn
  const res = thisArg[s](...args)
  delete thisArg[s]
  return res
}

// bind
Function.prototype.myBind = function (thisArg, ...args) {
  const originFn = this

  const fn = function (...args1) {
    // 检查这个函数是否是通过 `new` 关键字调用的
    if (this instanceof fn) {
      // 如果 `fn` 是作为构造函数被调用（即通过 `new` 创建实例），
      // 需要创建新的实例，并且 `this` 指向新实例。
      // 通过 `new` 调用时，返回的是一个新对象，所以使用 `new originFn(...)` 来执行原始函数。
      return new originFn(...args, ...args1);
    } else {
      // 如果 `fn` 是作为普通函数被调用，`this` 会指向传入的 `thisArg`。
      // `apply` 方法将 `thisArg` 作为 `this`，并将所有参数合并后传递给原函数。
      return originFn.apply(thisArg, [...args, ...args1]);
    }
  }
  return fn
}


// 测试
const obj = {
  name: '写代码像蔡徐抻'
}

function foo(...args) {
  console.log(this.name)
  console.log(...args)
}

foo.myCall(obj, 1,2,3)
foo.myApply(obj, [1,2,3])
const f =  foo.myBind(obj, 1,2,3)
f(4,5)
console.log(new f(4,5))

function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log(this)
}

const boundPerson = Person.myBind(obj, 'Alice');

// 使用 `new` 调用时，`this` 指向新创建的实例
const person1 = new boundPerson(30);
console.log(person1);
const person2 =  boundPerson(30);
console.log(person2);

