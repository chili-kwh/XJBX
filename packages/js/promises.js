function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}

const light = function (timer, cb) {
  return new Promise(resolve => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}
const step = function () {
  Promise.resolve().then(() => {
    return light(3000, red)
  }).then(() => {
    return light(2000, green)
  }).then(() => {
    return light(1000, yellow)
  }).then(() => {
    return step()
  })
}

// step();

function main() {
  return Promise.all([
    light(3000, red),
    light(2000, green),
    light(1000, yellow)
  ]).then(main)
}

// main()

/*

function runAsync(x) {
  const p = new Promise(r => setTimeout(() => r(x), 1000))
  return p
}

function runReject(x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`), 1000 * x))
  return p
}

Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err))
*/

/*

function runAsync(x) {
  const p = new Promise(r =>
    setTimeout(() => r(x, console.log(x)), 1000)
  );
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runAsync(1),runReject(1)])
  .then(res => console.log("result: ", res))
  .catch(err => console.log(err));

*/
/*

const first = () => (new Promise((resolve, reject) => {
  console.log(3);
  let p = new Promise((resolve, reject) => {
    console.log(7);
    setTimeout(() => {
      console.log(5);
      resolve(6);
      console.log(p)
    }, 0)
    resolve(1);
  });
  resolve(2);
  p.then((arg) => {
    console.log(arg);
  });
}));

first().then((arg) => {
  console.log(arg);
});

console.log(4);

// 3 7 4 1 2 5 resolved：1
*/

/*

const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
}

console.log('script start');

async1().then(res => console.log(res));

console.log('script end');

Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))

setTimeout(() => {
  console.log('timer2')
}, 1000)

// script start， async1， promise1， script end，1 timer2 timer1
*/


const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resolve1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  // setTimeout(() => {
  //   console.log(p1)
  // }, 1000)
  return 111
})

const p2 = p1.finally(res => {
  console.log('finally', res)
  return 222
}).then((res)=>{
  console.log(123,res)
})

setTimeout(() => {
  console.log(p1)
  console.log(p2)
  console.log(p1===p2)
}, 0)

// resolve1 finally:undefined timer1 resolved:111
// .finally的返回值：上一个Promise or Error


new Promise((res, rej) => {
  rej(110)
  res(10)
}).then(res => {
  console.log(1, res)

}).catch(res => { // this.then(undefined, rejectFn) 透传
  console.log(2, res)

}).then(res => {
  console.log(3, res)
  // throw new Error('err')
  // return Promise.reject('err2')
  return 1234
})
  //   .catch(res=>{
  //   console.log(4,res)
  //   // throw new Error('err2')
  //   return Promise.reject('err2')
  //
  // })
  .finally(res => {
    console.log(5, res)
    // return Promise.reject('err2')

  }).then(res => {
  console.log(6, res)

}).catch(res => {
  console.log(7, res)

}).then(res => {
  console.log(8, res)

})
