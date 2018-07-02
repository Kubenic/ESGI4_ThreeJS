import * as THREE from 'three';
import * as World from './world';
import {Controls} from './controls';
import {Actions} from "./actions";

const stats = require('../lib/stat.min.js')();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 1, 10000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
scene.background = new THREE.Color("rgb(66, 215, 244)");
scene.fog = new THREE.Fog( new THREE.Color("rgb(66, 215, 244)"), 500,1000);
camera.position.y = 70;
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new Controls(scene,camera,THREE,renderer);

const world = new World.World();
world.setGridSize(100,100);
world.setBoxSize(50,50,50);

world.generate(THREE, scene);

const actions = new Actions(THREE);

function update() {
    controls.updateControls(clock);
    actions.update(camera,scene);
}


window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth , window.innerHeight);
});



function animate() {

    stats.begin();
    update();
    renderer.render( scene, camera );

    stats.end();

    requestAnimationFrame( animate );

}

requestAnimationFrame( animate );