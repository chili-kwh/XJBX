// 实现一个批量请求函数，要求能够限制并发量
const url = "https://www.baidu.com/s?wd=javascript";
const urls = new Array(10).fill(url);
(async () => {
  const res = await multiRequest(urls, 5);
  console.log('res');
  console.log(res);
})()

async function multiRequest(urls, n) {

  return new Promise((res) => {

    const length = urls.length
    let resolved = 0
    let index = 0
    let results = []

    for (; index < n; index++) {
      run(index)
    }

    async function run(i) {
      if (i >= length) return

      results[i] = await fetch(urls[i], i)
      resolved++
      if (resolved >= length) {
        console.log('done')
        res(results)
      }

      run(index++)
    }
  })
}


function fetch(url, i) {
  console.log('fetch' + url + i)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('fetched')
    }, Math.random() * 2000)
  })
}
