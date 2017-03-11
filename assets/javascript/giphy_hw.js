/*jslint node:false*/
/*jslint loopfunc:true*/
/*jslint browser:true*/
/*jslist jquery:true*/

var topics = [ "Fibonacci spiral", "Finding The North Star", "Shapes in nature", "Malala Yousafzai", "CPR" ];

function createButton( text ) {
	var button = $( "<input>" );
	button.attr( 'type', 'button' );
	button.attr( 'value', text );
	button.click( function () {
		var giphyGet = $.get( "https://api.giphy.com/v1/gifs/search?q=" + text + "&api_key=dc6zaTOxFJmzC&limit=10&r=pg-13" );
		giphyGet.done( function ( responseData ) {
			console.log( responseData );
			$( '#gallery' ).html( '' );
			for ( var i = 0; i < responseData.data.length; i++ ) {
				var newImage = $( '<img>' ).attr( 'src', responseData.data[ i ].images.fixed_height_still.url );
				newImage.css( 'animation-play-state', 'paused' );
				newImage.attr( 'data-still', responseData.data[ i ].images.fixed_height_still.url );
				newImage.attr( 'data-animate', responseData.data[ i ].images.fixed_height.url );
				newImage.attr( 'data-state', "still" );
				newImage.attr( 'alt', 'rating: ' + responseData.data[ i ].rating );
				newImage.click( function () {
					var state = $( this ).attr( "data-state" );
					// If the clicked image's state is still, update its src attribute to what its data-animate value is.
					// Then, set the image's data-state to animate
					// Else set src to the data-still value
					if ( state === "still" ) {
						$( this ).attr( "src", $( this ).attr( "data-animate" ) );
						$( this ).attr( "data-state", "animate" );
					} else {
						$( this ).attr( "src", $( this ).attr( "data-still" ) );
						$( this ).attr( "data-state", "still" );
					}
				} );
				$( '#gallery' ).append( newImage );
				var ratingDiv = $( "<div>" );
				ratingDiv.text( newImage.attr( 'alt' ) );
				$( "#gallery" ).append( ratingDiv );
				//alert( ratingDiv );
			}
		} );
	} );
	$( "#buttons" ).append( button );
}
$( document ).ready( function () {
	"use strict";
	$( '#addbutton' ).click( function () { createButton( $( "#newInput" ).val() ) } );
	for ( var i = 0; i < topics.length; i++ ) {

//generic input
		var newButton = $( "<input>" );
		// assigned an id from the location in the index
		newButton.attr( 'id', 'topic-' + i );
		// <input id="topic-i"></input>
		//input type creates a button in html not text
		newButton.attr( 'type', 'button' );
		// <input id="topic-i" type="button"></input>
		//value is assigned from the items in the array
		newButton.attr( 'value', topics[ i ] );
		// <input id="topic-i" type="button" value="Value of topics[i]"></input>
		//creates a new click handler
		newButton.click( function () {
			var giphyGet = $.get( "https://api.giphy.com/v1/gifs/search?q=" +
				$( this ).val() +
				"&api_key=dc6zaTOxFJmzC&limit=10&r=pg-13" );
			giphyGet.done( function ( data ) {
				console.log( "Yay, got data!", data );
				$( '#gallery' ).html( '' );
				for ( var i = 0; i < data.data.length; i++ ) {
					var newImage = $( '<img>' ).attr( 'src', data.data[ i ].images.fixed_height_still.url );
					newImage.css( 'animation-play-state', 'paused' );
					newImage.attr( 'data-still', data.data[ i ].images.fixed_height_still.url );
					newImage.attr( 'data-animate', data.data[ i ].images.fixed_height.url );
					newImage.attr( 'data-state', "still" );
					newImage.attr( 'alt', 'rating: ' + data.data[ i ].rating );
					newImage.click( function () {
						var state = $( this ).attr( "data-state" );
						// If the clicked image's state is still, update its src attribute to what its data-animate value is.
						// Then, set the image's data-state to animate
						// Else set src to the data-still value
						if ( state === "still" ) {
							$( this ).attr( "src", $( this ).attr( "data-animate" ) );
							$( this ).attr( "data-state", "animate" );
						} else {
							$( this ).attr( "src", $( this ).attr( "data-still" ) );
							$( this ).attr( "data-state", "still" );
						}
					} );
					$( '#gallery' ).append( newImage );
					var ratingDiv = $( "<div>" );
					ratingDiv.text( newImage.attr( 'alt' ) );
					$( "#gallery" ).append( ratingDiv );
				}
			} );
		} );
		$( "#buttons" ).append( newButton );
	}
} );