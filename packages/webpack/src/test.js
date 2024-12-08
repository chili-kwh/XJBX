const oBody = document.querySelector('body');
const oScript = document.createElement('script');
oScript.src = '//baidu.com';
oScript.onload = () => {
  console.log('loaded')
};

setTimeout(() => {
  oBody.appendChild(oScript);
}, 2000)

