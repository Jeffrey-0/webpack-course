import('./a.js')
  .then(({ add }) => {
    console.log(add(1, 2))
  })
console.log(1)
