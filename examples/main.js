var debug1 = require( 'ise-debug' )();
var debug2 = require( 'ise-debug' )();

var div1 = document.getElementById('debug1');
var div2 = document.getElementById('debug2');
var socket = io.connect();

debug1.writeTo(console);
debug1.writeTo(div1);
debug1.readFrom(socket);

debug2.writeTo(div2);

function main() {
  hello();
  world();
}

function hello() {
  debug1('function state', {a: 10, b:10}, [1,2,3]);
  debug2('function 2', {a: 10, b:10}, [1,2,3]);
}

function world(x) {
  if ( !(typeof x === 'string') ) {
    throw new Error( 'Expect x to be a string, but got ' + x );
  }
  return x;
}

debug1('Should be called by null');

(function() {
  debug1('Should be called by anonymous function');
  debug2('function 2', {a: 10, b:10}, [1,2,3]);
})();

main();
