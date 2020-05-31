import '../font/iconfont.css'
import '../css/index.less'
import print from './print.js'
print()
console.log('test')
if (module.hot) {
  module.hot.accept('./print.js', function () {
    // print()
  })
}
