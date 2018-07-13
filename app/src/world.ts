export class World {
    public width: number;
    public height: number;
    public cellWidth: number;
    public cellHeight: number;
    public cellThickness: number;
    public basic_block_geometry: any;
    public materials: {};
    public texture_loader: any;

    constructor(THREE: any){
        this.texture_loader = new THREE.CubeTextureLoader();
        // side of grass texture

        const side_texture = 'img/grass_side.png';
        const top_texture = 'img/grass_top.png';
        const bottom_texture = 'img/dirt.png';
        this.materials = this.texture_loader.load([
            side_texture, side_texture,
            top_texture, bottom_texture,
            side_texture, side_texture
        ]);

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
        this.basic_block_geometry = new THREE.BoxGeometry(this.cellWidth,this.cellHeight,this.cellThickness);

        let cube = new THREE.Mesh(this.basic_block_geometry, new THREE.MeshBasicMaterial({
            color: 0xffffff, envMap: this.materials
        }));

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