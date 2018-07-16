export class World {
    public width: number;
    public height: number;
    public cellWidth: number;
    public cellHeight: number;
    public cellThickness: number;
    public basic_block_geometry: any;
    public basicCube: any;
    public material: any;

    constructor(THREE: any){
        this.basic_block_geometry = new THREE.BoxGeometry(this.cellWidth,this.cellHeight,this.cellThickness);
        const texture_loader = new THREE.TextureLoader();

        const side_texture_string = 'img/grass_side.png';
        const side_texture = texture_loader.load(side_texture_string);
        side_texture.magFilter = THREE.NearestFilter;
        side_texture.minFilter = THREE.LinearMipMapLinearFilter;

        const top_texture_string = 'img/grass_top.png';
        const top_texture = texture_loader.load(top_texture_string);
        top_texture.magFilter = THREE.NearestFilter;
        top_texture.minFilter = THREE.LinearMipMapLinearFilter;

        const bottom_texture_string = 'img/dirt.png';
        const bottom_texture = texture_loader.load(bottom_texture_string);
        bottom_texture.magFilter = THREE.NearestFilter;
        bottom_texture.minFilter = THREE.LinearMipMapLinearFilter;

        this.material = [
            new THREE.MeshBasicMaterial({map: side_texture}),
            new THREE.MeshBasicMaterial({map: side_texture}),
            new THREE.MeshBasicMaterial({map: top_texture}),
            new THREE.MeshBasicMaterial({map: bottom_texture}),
            new THREE.MeshBasicMaterial({map: side_texture}),
            new THREE.MeshBasicMaterial({map: side_texture}),
        ];

        this.basicCube = new THREE.Mesh(this.basic_block_geometry, this.material);
    }

    setGridSize (width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    setBoxSize(width: number, height: number, thickness: number ) {
        this.cellHeight = height;
        this.cellWidth = width;
        this.cellThickness = thickness;
    }

    generate(THREE : any, scene: any) {
        this.basic_block_geometry = new THREE.BoxGeometry(this.cellWidth, this.cellHeight, this.cellThickness);
        console.log(this.basic_block_geometry);
        let pointer = new THREE.Object3D();
        let ArrayOfCubes = [];

        for(let HIndex = 0; HIndex < this.height; HIndex++) {

            let line = [];
            for(let WIndex = 0; WIndex < this.width; WIndex++) {
                let cube = this.createBlock(THREE);
                cube.position.x = HIndex * this.cellWidth;
                cube.position.z = WIndex * this.cellHeight;
                line.push(cube);
            }

            ArrayOfCubes.push(line);
        }

        ArrayOfCubes.forEach((elem) => {
            elem.forEach((cube) =>{
                pointer.add(cube);
            });
        });

        pointer.position.x -= ((this.width/2) * this.cellWidth);
        pointer.position.z -= ((this.height/2) * this.cellHeight);
        scene.add(pointer);
    }

    createBlock(THREE){


        let cube = new THREE.Mesh(this.basic_block_geometry, this.material);
        let frameScale = 1.01;
        let cubeWireframe = new THREE.LineSegments(
            new THREE.EdgesGeometry(this.basic_block_geometry.clone().scale(frameScale, frameScale, frameScale)),
            new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 })
        );

        cubeWireframe.visible = false;
        cube.add(cubeWireframe);

        return cube;
    }
}