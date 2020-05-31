import { mul } from './test'
import '../css/index.css'
function sum (...args) {
  return args.reduce((p, c) => p + c, 0)
}
console.log(sum(1, 2, 3, 4, 5, 6))
console.log(mul(2, 5))

// 注册serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功')
      })
      .catch(() => {
        console.log('注册失败')
      })
  })
}
