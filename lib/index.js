/**
*
*	STREAM: divide
*
*
*	DESCRIPTION:
*		- Transform stream factory to perform scalar division on streamed numeric data values.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/08/01: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] through2
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Through2 module:
		through2 = require( 'through2' );


	// FUNCTIONS //

	/**
	* FUNCTION: onData( divisor )
	*	Returns a callback which performs scalar division.
	*
	* @private
	* @param {Number} divisor
	* @returns {Function} callback
	*/
	function onData( divisor ) {
		/**
		* FUNCTION: onData( newVal, encoding, clbk )
		*	Data event handler. Performs scalar division.
		*
		* @private
		* @param {Number} newVal - streamed data value
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after performing scalar division. Function accepts two arguments: [ error, chunk ].
		*/
		return function onData( newVal, encoding, clbk ) {
			clbk( null, newVal/divisor );
		}; // end FUNCTION onData()
	} // end FUNCTION onData()


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {Stream} Stream instance
	*/
	function Stream() {
		this._divisor = 1;
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: divisor( value )
	*	Setter and getter for the divisor. If a value is provided, sets the divisor. If no value is provided, returns the divisor.
	*
	* @param {Number} value - divisor
	* @returns {Stream|Number} Stream instance or divisor
	*/
	Stream.prototype.divisor = function( value ) {
		if ( !arguments.length ) {
			return this._divisor;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new Error( 'divsior()::invalid input argument. Divisor must be numeric.' );
		}
		this._divisor = value;
		return this;
	}; // end METHOD divisor()

	/**
	* METHOD: stream()
	*	Returns a through stream for performing scalar division.
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through2({'objectMode': true}, onData( this._divisor ) );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();