/**
 * Created by mattputipong on 11/6/17.
 */

'use strict';

$( document ).ready( function() {
    let mapper = new Mapper();

    mapper.getJson( 'https://s3.amazonaws.com/mputipong/football-map-exercise/stadiums.geojson' )
        .then( json => mapper.addMarkers( json ) )
        .catch( err => console.log( err ) );
} );