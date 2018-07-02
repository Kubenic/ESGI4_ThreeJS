import * as THREE from 'three';
import * as World from './world';
import {Controls} from './controls';
import {Actions} from "./actions";
import GrassBlock from './classes/grass';

const stats = require('../lib/stat.min.js')();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 1, 10000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
scene.background = new THREE.Color("rgb(66, 215, 244)");
scene.fog = new THREE.Fog(new THREE.Color("rgb(66, 215, 244)"), 500, 1000);
camera.position.y = 70;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new Controls(scene, camera, THREE, renderer);

// const world = new World.World();
// world.setGridSize(100,100);
// world.setBoxSize(50,50,50);

// world.generate(THREE, scene);

const blocks = [];
const indev = require('indev');
const generator = indev({seed: Math.random()});

const simplexGenerator = generator.simplex({min: 0, max: 12, frequency: 0.01, octaves: 8});

const worldSize = 30;
for (let x = 0; x < worldSize; x++) {
    for (let z = 0; z < worldSize; z++) {
        const y = simplexGenerator.in2D(x, z);
        blocks.push(new GrassBlock(x, y, z))
    }
}

for (let b = 0; b < blocks.length; b++) {
    blocks[b].addToScene(scene)
}

const actions = new Actions(THREE);

function update() {
    controls.updateControls(clock);
    actions.update(camera,scene);
}


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {

    stats.begin();
    update();
    renderer.render(scene, camera);

    stats.end();

    requestAnimationFrame(animate);

}

requestAnimationFrame(animate);