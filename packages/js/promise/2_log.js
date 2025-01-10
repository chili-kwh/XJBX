// 使用Promise实现每隔1秒输出1,2,3

function sleep(t){
  return new Promise((res)=>{
    setTimeout(res, t)
  })
}

let arr = [1,2,3]
async function log(){
  for(let i of arr){
    console.log(i)
    await sleep(1000)
  }
  log()
}

log()
