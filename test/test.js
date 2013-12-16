
var lib = require( 'ise-debug' );
var expect = require( 'expect.js' );

describe( 'ise-debug', function() {

  it( 'should return Hello World', function() {
    expect( lib() ).to.be( 'Hello World' );
  } );

} );
