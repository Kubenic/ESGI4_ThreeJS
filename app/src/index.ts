import * as THREE from 'three';

const stats = require('../lib/stat.min.js')();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );




function animate() {

    stats.begin();

    // monitored code goes here

    stats.end();

    requestAnimationFrame( animate );

}

requestAnimationFrame( animate );