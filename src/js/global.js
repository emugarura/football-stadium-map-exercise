/**
 * Created by mattputipong on 11/7/17.
 */

'use strict';

import Mapper from './Mapper';

$( document ).ready( function() {
    let mapper = new Mapper();

    mapper.getJson( 'https://s3.amazonaws.com/mputipong/football-map-exercise/stadiums.geojson' )
        .then( json => mapper.addMarkers( json ) )
        .catch( err => console.log( err ) );
} );