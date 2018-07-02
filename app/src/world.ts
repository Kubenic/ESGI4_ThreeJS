export class World {
    public width: number;
    public height: number;
    public cellWidth: number;
    public cellHeight: number;
    public cellThickness: number;
    public basic_block_geometry: any;

    constructor(){
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
        this.basic_block_geometry = new THREE.BoxGeometry(this.cellWidth,this.cellHeight,this.cellThickness);
        let pointer = new THREE.Object3D();
        let ArrayOfCubes = [];

        for(let HIndex = 0; HIndex < this.height; HIndex++) {

            let line = [];
            for(let WIndex = 0; WIndex < this.width; WIndex++) {
                let rgb = {
                    max: 1,
                    min: 0,
                };
                let r = Math.random() * (rgb.max - rgb.min) + rgb.min;
                let g = Math.random() * (rgb.max - rgb.min) + rgb.min;
                let b = Math.random() * (rgb.max - rgb.min) + rgb.min;
                let color = new THREE.Color( r,g,b );

                let cube = new THREE.Mesh(this.basic_block_geometry, new THREE.MeshBasicMaterial({ color: color}));
                cube.position.x = HIndex*this.cellWidth;
                cube.position.z = WIndex*this.cellHeight;

                let frameScale = 1.01;
                let cubeWireframe = new THREE.LineSegments(
                    new THREE.EdgesGeometry(this.basic_block_geometry.clone().scale(frameScale, frameScale, frameScale)),
                    new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 })
                );

                cubeWireframe.visible = false;
                cube.add(cubeWireframe);

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
}