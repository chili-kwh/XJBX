// 异步加载图片的方法

function loadImg(src) {
  return new Promise((res, rej) => {

    const img = new Image()
    img.onload = res
    img.onerror = (err) => {
      rej(err)
    }
    img.src = src
  })

}

/*
限制异步操作的并发个数并尽可能快的完成全部
有8个图片资源的url，已经存储在数组urls中。
urls类似于['https://image1.png', 'https://image2.png', ....]
而且已经有一个函数function loadImg，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。
但有一个要求，任何时刻同时下载的链接数量不可以超过3个。
请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。
*/
