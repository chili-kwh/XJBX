/*
调度器
实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有N个。
*/

class Scheduler {
  constructor(max) {
    this.max = max
    this.count = 0
    this.queue = []
  }

  async add(promiseCreator) {
    // 阻塞 等待
    if(this.count >= this.max){
      await new Promise((res)=>this.queue.push(res))
    }

    this.count++
    const res = await promiseCreator()
    this.count--

    // 当前执行完 恢复队列首位的执行 取消阻塞
    if(this.queue.length){
      this.queue.shift()()
    }

    // 返回执行结果Promise
    return res
  }
}


const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// 打印顺序是：2 3 1 4

