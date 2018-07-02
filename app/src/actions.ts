export class Actions {
    private THREE : any;
    private mouse : any;
    private raycaster: any;
    private target: any;

    constructor(THREE) {
        this.THREE = THREE;
        this.raycaster = new this.THREE.Raycaster();
        this.mouse = new this.THREE.Vector2();

        window.addEventListener('mousemove',this.onMouseMove.bind(this),false)
    }

    onMouseMove( event ) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    }

    update (camera: any ,scene: any) {
        this.raycaster.setFromCamera( this.mouse, camera );
        let blocks = scene.children[1].children;

        if (blocks) {
            // calculate objects intersecting the picking ray
            let hits = this.raycaster.intersectObjects( blocks );
            if(hits.length > 0 ){
                let hit = hits[0];
                let wireframe = hit.object.children[0];

                //If the targeted wireframe is the same as the last, return
                if (this.target) {
                    if (this.target.uuid == wireframe.uuid) {
                        return;
                    }

                    this.target.visible = false;
                }

                wireframe.visible = true;
                this.target = wireframe;
            }
        }
    }
}