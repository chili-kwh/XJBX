// 'use strict'

const a = {
  name: '111',
  fn: () => {
    console.log(this) // {}
    return this
  },
  func: function(){
    console.log(this)
    return this
  }
}

//
// a.fn()
a.func() // a

const b = a.func
b() // window

console.log(this) // {} ??
