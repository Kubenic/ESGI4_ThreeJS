export class Actions {
    private THREE : any;
    private mouse : any;
    private raycaster: any;
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
        //console.log(scene.children);
        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects( scene.children[1].children );

        if(intersects.length > 0 ){
            console.log(intersects[0]);
            console.log(intersects[0].object.uuid);
            console.log(intersects[0].faceIndex);
        }
       /* for ( var i = 0; i < intersects.length; i++ ) {

            intersects[ i ].object.material.color.set( 0xff0000 );

        }*/
    }
}