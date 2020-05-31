// import { mul } from './test.js'
console.log('index.js加载了')
// console.log(mul)
document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(1, 3))
  })
}
