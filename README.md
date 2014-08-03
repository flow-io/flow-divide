flow-divide
===========

Transform stream factory to perform scalar division on streamed numeric data values.

Note: this module is provided for semantic convenience. Its functionality is the same as `flow-multiply`, where the `scalar` (divisor) is simply its fractional equivalent; i.e., for scalar multiplication, `scalar = 1/d`, where `d` is the divisor.


## Installation

``` bash
$ npm install flow-divide
```

## API

To create a stream factory,

``` javascript
var divStream = require( 'flow-divide' );

// Create a new factory:
var dStream = divStream();
```

### dStream.divisor( [value] )

This method is a setter/getter. If no `value` is provided, returns the `divisor`; default is `1`. To set the `divisor`,

``` javascript
dStream.divisor( 10 );
```

### dStream.stream()

To create a new scalar division stream,

``` javascript
var stream = dStream.stream();
```


## Usage

Methods are chainable.

``` javascript
divStream()
	.divisor( 10 )
	.stream()
	.pipe( /* writable stream */ );
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	dStream = require( 'flow-divide' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round(Math.random()*10);
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new scalar division stream:
var stream = dStream()
	.divisor( 10 )
	.stream();

// Pipe the data:
readStream.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ) {
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

