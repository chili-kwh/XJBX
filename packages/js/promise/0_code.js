/* 手写Promise
* 1 构造器
* 2 状态值
* 3 resolve reject 拍平thenable
* 4 then
* - 兼容同步settle
* - 异步调用callback
* - 支持链式调用
* */

const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  FAILED: 'FAILED'
}

class MyPromise {
  constructor(fn) {
    this.status = STATUS.PENDING
    this.cbList = []
    this.thenList = []
    fn(this.resolve, this.reject)
  }


  resolve = (val) => {
    if (this.status !== STATUS.PENDING) return
    // 递归拍平thenable
    if (val?.then && val.then instanceof Function) {
      val.then(this.resolve)
      return;
    }

    this.status = STATUS.FULFILLED
    this.val = val

    while (this.cbList.length) {
      this.cbList.shift()(val)
    }
  }


  reject = (err) => {
    if (this.status !== STATUS.PENDING) return
    this.status = STATUS.FAILED
  }

  then = (cb) => {

    return new MyPromise((res, rej) => {

      const wrapCb = (cb) => {
        return (val) => {
          // 异步执行callback
          setTimeout(() => {
            const x = cb(val)
            x instanceof MyPromise ? x.then(res, rej) : res(x)
          })
        }
      }


      if (this.status === STATUS.PENDING) {
        this.cbList.push(wrapCb(cb))
      }

      // 兼容同步：执行then时 已经settled的状态
      if (this.status === STATUS.FULFILLED) {
        wrapCb(cb)(this.val)
      }

    })

  }

  static resolve = (val) => {
    return val instanceof MyPromise ? val : new MyPromise((res) => res(val))
  }

  // finally()方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。在finally之后，还可以继续then。并且会将值原封不动的传递给后面的then
  // PS. 有同学问我MyPromise.resolve(callback())的意义，这里补充解释一下：这个写法其实涉及到一个finally()的使用细节，finally()如果return了一个reject状态的Promise，将会改变当前Promise的状态，这个MyPromise.resolve就用于改变Promise状态，在finally()没有返回reject态Promise或throw错误的情况下，去掉MyPromise.resolve也是一样的

  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),             // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
      reason => MyPromise.resolve(callback()).then(() => { throw reason })  // reject同理
    )
  }



}


// case

new MyPromise((res, rej) => {
  console.log(1)
  res(11)
})
  .then(res => {
    console.log(res);
    return res * 2
  })
  .then(res => {
    console.log(res);
    return res * 2
  })
  .then(res => {
    console.log(res);
    return res * 2
  })

console.log('sync')

new MyPromise((res, rej) => {
  console.log(2)
  setTimeout(() => {
    res(10)
  }, 1000)
})
  .then(res => {
    console.log(res);
    return res * 2
  })
  .then(res => {
    console.log(res);
    return res * 2
  })
  .then(res => {
    console.log(res);
    return res * 2
  })

console.log('sync2')
// 1
// sync
// 2
// sync2
// 11
// 22
// 44
// 10
// 20
// 40

const thenable = {
  then: (res) => {
    res(1)
  }
}
const a = new MyPromise((res) => res(thenable)).then(res => {
  console.log('res' + res);
})

MyPromise.resolve(thenable).then(res => {
  console.log('res' + res);
})

MyPromise.resolve(111).then(res => {
  console.log('res' + res);
})


