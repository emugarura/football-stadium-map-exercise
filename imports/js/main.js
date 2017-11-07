/**
 * Created by mattputipong on 11/6/17.
 */

'use strict';

$( document ).ready( function() {
	let mapper = new Mapper();

	mapper.getJson( 'https://s3.amazonaws.com/mputipong/football-map-exercise/stadiums.geojson' ).then( json => {
		mapper.addMarkers( json );
	} );
} );

class Mapper {
	constructor() {
		this.osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
		this.osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
		this.osm = L.tileLayer( this.osmUrl, {
			maxZoom     : 18,
			attribution : this.osmAttrib
		} );
		this.map = L.map( 'map' ).setView( [ 40, -100 ], 4 ).addLayer( this.osm );
	}

	getJson( file ) {
		return new Promise( ( res, rej ) => {
			$.get( file )
				.done( resp => res( JSON.parse( resp ) ) )
				.fail( err => rej( err ) );
		} );
	}

	addMarkers( data ) {
		let allStadiums = L.geoJson( data, {
			pointToLayer: ( feat, latlng ) => {
				let html = this.markerHtml( feat.properties );

				return L.marker( latlng ).on( 'mouseover', function() {
					this.bindPopup( html ).openPopup();
				} );
			},
			onEachFeature: feat => {
				let html = this.tableHtml( feat.properties );
				$( '#nfl-table tbody' ).append( html );
			}
		} );

		allStadiums.addTo( this.map );
	}

	markerHtml( data ) {
		return $([
			"<table class='table table-bordered'>",
			"   <tbody>",
			"       <tr>",
			"           <th>Stadium</th>",
			`           <td>${data.Stadium}</td>`,
			"       </tr>",
			"       <tr>",
			"           <th>Team</th>",
			`           <td>${data.Team}</td>`,
			"       </tr>",
			"   </tbody>",
			"</table>"
		].join('\n')).get( 0 );
	}

	tableHtml( data ) {
		return $([
			"<tr>",
			`   <td>${data.Stadium}</td>`,
			`   <td>${data.Team}</td>`,
			`   <td>${data.League}</td>`,
			"</tr>"
		].join('\n')).get( 0 );
	}
}