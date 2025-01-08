console.log('stack [1]');
setTimeout(() => console.log("macro [2]"), 0);
setTimeout(() => console.log("macro [3]"), 1);

const p = Promise.resolve();
for (let i = 0; i < 3; i++) p.then(() => {
  setTimeout(() => {
    console.log('stack [4]')
    setTimeout(() => console.log("macro [5]"), 0);
    p.then(() => console.log('micro [6]'));
  }, 0);
  console.log("stack [7]");
});

console.log("macro [8]");

/*
* stack [1]
* macro [8]
* stack [7]
* stack [7]
* stack [7]
* macro [2]
* macro [3] // 这个执行顺序不保证
*
*
* stack [4]'
* micro [6]
* stack [4]'
* micro [6]
* stack [4]'
* micro [6]
*
*
* macro [5]
* macro [5]
* macro [5]
*
*
* */

console.log('开始');


Promise.resolve().then(() => {
  console.log('Promise 回调');
});

process.nextTick(() => {
  console.log('nextTick 回调');
});

console.log('结束');
