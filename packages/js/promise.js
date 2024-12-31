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
