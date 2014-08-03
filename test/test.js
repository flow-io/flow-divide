
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	divStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-divide', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( divStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to set/get the divisor', function test() {
		var dStream = divStream();
		expect( dStream.divisor ).to.be.a( 'function' );
	});

	it( 'should set the divisor', function test() {
		var dStream = divStream();
		dStream.divisor( 100 );
		assert.strictEqual( dStream.divisor(), 100 );
	});

	it( 'should not allow a non-numeric divisor', function test() {
		var dStream = divStream(),
			values = [
				'5',
				[],
				{},
				null,
				undefined,
				NaN,
				false,
				function(){}
			];
		
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				dStream.divisor( value );
			};
		}
	});

	it( 'should provide a default behavior of having a divisor equal to 1', function test( done ) {
		var data, expected, dStream;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 1,2,3,4,5 ];

		// Create a new scalar division stream:
		dStream = divStream()
			.stream();

		// Mock reading from the stream:
		utils.readStream( dStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, dStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

	it( 'should scale piped data initialized with an arbitrary divisor', function test( done ) {
		var data, expected, dStream, DIVISOR = 10;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 0.1,0.2,0.3,0.4,0.5 ];

		// Create a new scalar division stream:
		dStream = divStream()
			.divisor( DIVISOR )
			.stream();

		// Mock reading from the stream:
		utils.readStream( dStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, dStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

});