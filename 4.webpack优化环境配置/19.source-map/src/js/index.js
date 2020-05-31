import '../font/iconfont.css'
import '../css/index.less'
import print from './print.js'
console.log('test');print()()
if (module.hot) {
  module.hot.accept('./print.js', function () {
    // print()
  })
}
