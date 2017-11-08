'use strict';

export default function( env ) {
    return require( `./config/webpack.${env}.config.js` );
}