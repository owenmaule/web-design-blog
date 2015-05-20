function upDownVote( anchor, up )
{
	var ratingElement = anchor.parent(),
		articleID = ratingElement.parent().attr( 'id' ),
		scoreElement = $( ratingElement ).find( '.score' ),
		action = up ? 'upvote' : 'downvote';

	var request = $.ajax({
		url: action + '/' + articleID + '?async',
		method: 'GET',
		dataType: 'text'
	});

	request.done( function( rating ) {
		// Use server-side rating
		scoreElement.html( rating );
	});
	
	request.fail( function( jqXHR, textStatus ) {
		// Handle client-side
		var rating = parseInt( scoreElement.html() );

		if( isNaN( rating ) )
		{
			rating = 1;
		}
		if( up )
		{
			++rating;
			if( rating > 10 )
			{
				rating = 10;
			}
		} else {
			--rating;
			if( rating < 0 )
			{
				rating = 0;
			}
		}
		scoreElement.html( rating );
	});
	return false;
}

$( function() {

	$( 'div.rating .upvote' ).click( function() {
		return upDownVote( $( this ), true );
	} );

	$( 'div.rating .downvote' ).click( function() {
		return upDownVote( $( this ), false );
	} );
} );