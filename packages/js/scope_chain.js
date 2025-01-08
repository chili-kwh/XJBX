var me = 'emma1';

function a() {
  var me = 'emma2';
  b();
  c()

  function b() {
    console.log(me);
  }
}

function c() {
  console.log(me);
}

a()
// emma2
// emma1
