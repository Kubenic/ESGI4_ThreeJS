export class Actions {
    private THREE : any;
    private mouse : any;
    private raycaster: any;
    private target: any;
    private controls: any;
    private hit: any;
    private world: any;
    public blocksToAdd: Array<object> = [];
    public blocksToRemove: Array<object> = [];

    constructor(THREE, controls, world) {
        this.THREE = THREE;
        this.controls = controls;
        this.raycaster = new this.THREE.Raycaster();
        this.mouse = new this.THREE.Vector2();
        this.world = world;
        window.addEventListener('mousemove',this.onMouseMove.bind(this),false);
        window.addEventListener('click',this.onMouseClick.bind(this), false)
    }


    onMouseMove( event ) {
        event.preventDefault();
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    }

    onMouseClick( event ) {
        event.preventDefault();
        if(this.controls.isPointerLocked){
            switch(event.which) {
                case 1 :
                    this.eraseBlock();
                    break;
                case 3 :
                    this.createBlock();
                    break;
            }
        }
    }

    createBlock(){

        let cube = this.world.createBlock(this.THREE);

        switch( this.hit.faceIndex ){
            case 0 :
            case 1 :
                cube.position.x = this.hit.object.position.x + this.hit.object.geometry.parameters.width;
                cube.position.z = this.hit.object.position.z ;
                cube.position.y = this.hit.object.position.y ;
                break;
            case 2 :
            case 3 :
                cube.position.x = this.hit.object.position.x - this.hit.object.geometry.parameters.width;
                cube.position.z = this.hit.object.position.z ;
                cube.position.y = this.hit.object.position.y ;
                break;
            case 4 :
            case 5 :
                cube.position.x = this.hit.object.position.x ;
                cube.position.z = this.hit.object.position.z ;
                cube.position.y = this.hit.object.position.y + this.hit.object.geometry.parameters.height;
                break;
            case 8 :
            case 9 :
                cube.position.x = this.hit.object.position.x ;
                cube.position.z = this.hit.object.position.z  + this.hit.object.geometry.parameters.width;
                cube.position.y = this.hit.object.position.y ;
                break;
            case 10 :
            case 11 :
                cube.position.x = this.hit.object.position.x ;
                cube.position.z = this.hit.object.position.z  - this.hit.object.geometry.parameters.width;
                cube.position.y = this.hit.object.position.y ;
        }

        this.blocksToAdd.push(cube);


    }

    eraseBlock(){
        this.blocksToRemove.push(this.hit);
        // console.log(this.blocksToRemove);
    }

    update (camera: any ,scene: any) {
        if(this.blocksToRemove.length > 0 ){
            this.blocksToRemove.forEach((cube: any) => {
               scene.children.forEach((child) => {
                    child.remove(cube.object);
               });
            });
            this.blocksToRemove = [];
        }
        if(this.blocksToAdd.length > 0){
            this.blocksToAdd.forEach((cube: object) =>{
                scene.children.forEach((child) => {
                    if(child.children.length > 100) {
                        child.add(cube);
                    }
                });

            });
            this.blocksToAdd = [];
        }
        this.raycaster.setFromCamera( new this.THREE.Vector2(), camera );
        let blocks = scene.children[0].children;


        if (blocks) {
            // calculate objects intersecting the picking ray
            let hits = this.raycaster.intersectObjects( blocks );
            if(hits.length > 0 ){
                let hit = hits[0];
                let wireframe = hit.object.children[0];

                //If the targeted wireframe is the same as the last, return
                if (this.target) {
                    if (this.target.uuid == wireframe.uuid && hit.faceIndex === this.hit.faceIndex) {
                        return;
                    }
                    this.hit = hit;
                    this.target.visible = false;
                }

                wireframe.visible = true;
                this.target = wireframe;
            }
        }
    }
}