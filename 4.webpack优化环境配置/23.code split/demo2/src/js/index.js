// import { mul } from './test.js'
function sum (...args) {
  return args.reduce((p, c) => p + c, 0)
}
console.log(sum(1, 2, 3, 4, 5, 6))
// console.log(mul(2, 3))
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, sub }) => {
    console.log(mul(2, 3))
  })
  .catch(() => {
    console.log('加载失败')
  })
