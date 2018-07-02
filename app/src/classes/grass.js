import Block from './block'
import {MeshPhongMaterial, NearestFilter, TextureLoader} from 'three'

const loader = new TextureLoader();

// side of grass texture
const side_texture = loader.load('img/grass_side.png');
side_texture.magFilter = NearestFilter;
const grass_side = new MeshPhongMaterial({map: side_texture});
// top of grass texture
const top_texture = loader.load('img/grass_top.png');
top_texture.magFilter = NearestFilter;
const grass_top = new MeshPhongMaterial({map: top_texture});
// bottom of grass texture
const bottom_texture = loader.load('img/dirt.png');
bottom_texture.magFilter = NearestFilter;
const grass_bottom = new MeshPhongMaterial({map: bottom_texture});

export default class GrassBlock extends Block {
    constructor(x, y, z, options) {
        super({x, y, z});
        this.mesh.material = [grass_side, grass_side, grass_top, grass_bottom, grass_side, grass_side];
        this.name = 'grassblock'
    }
}
