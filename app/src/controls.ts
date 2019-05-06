export class Controls {
    private scene: any;
    private camera: any;
    private THREE: any;
    private renderer: any;
    private mouseEvent: any;
    private pitchObject: any;
    private yawObject: any;
    private hitboxObject: any;
    private cubeSize : any ;
    public isPointerLocked: boolean = false;
    private moveState: any = {
        left: false,
        right: false,
        up: false,
        down: false,
    };
    constructor(scene: any, camera: any, THREE: any, renderer: any, world: any){
        this.scene = scene;
        this.camera = camera;
        this.THREE = THREE;
        this.renderer = renderer;
        this.cubeSize = {
            width : world.cellWidth,
            height : world.cellHeight
        };

        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(this.camera);
        this.yawObject = new THREE.Object3D();

        this.yawObject.add(this.pitchObject);
        this.scene.add(this.yawObject);
        this.hitboxObject = new THREE.Object3D;

        this.hitboxObject.width = this.cubeSize.width +5;
        this.hitboxObject.height = (this.cubeSize.height * 2) +5;
        this.yawObject.position.y = this.hitboxObject.position.y + (this.cubeSize.height * 1.5);
        this.yawObject.position.x = this.hitboxObject.position.x;
        this.yawObject.position.z = this.hitboxObject.position.z;

        this.camera.position.y = this.hitboxObject.position.y + (this.cubeSize.height / 2);
        this.camera.position.x =  this.yawObject.position.x;
        this.camera.position.z =  15;


        let testBlock = world.createBlock(THREE);
        testBlock.position.y = this.hitboxObject.position.y - this.cubeSize.height * 2;
        testBlock.position.x = this.hitboxObject.position.x;
        testBlock.position.z = this.hitboxObject.position.z;
        this.hitboxObject.add(testBlock);
        this.scene.add(this.hitboxObject);
        console.log(this.hitboxObject.children[0]);

        window.addEventListener('click',this.enablePointerLock.bind(this), false);
        //document.body.addEventListener('focusout',this.disablePointerLock.bind(this), false);
        window.addEventListener('keydown', this.enableMoveState.bind(this), false);
        window.addEventListener('keyup', this.disableMoveState.bind(this), false);

        this.mouseEvent = window.addEventListener('mousemove', this.mouseTracker.bind(this), false);
    }

    listeningPointerLock(e){
        e.preventDefault();
        if(document.hasFocus()){
            this.isPointerLocked = true;
        }else{
            document.exitPointerLock();
            this.isPointerLocked = false;
        }

    }
    mouseTracker(e){

        if(this.isPointerLocked){

            const movementX = e.movementX;
            const movementY = e.movementY;
            this.yawObject.rotation.y -= movementX * 0.001;
            this.pitchObject.rotation.x -= movementY * 0.001;
            this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));

            this.hitboxObject.rotation.y -= movementX * 0.001;

        }
    }

    enablePointerLock(e){
        e.preventDefault();
        document.addEventListener('pointerlockchange', this.listeningPointerLock.bind(this), false);
        document.addEventListener('mozpointerlockchange', this.listeningPointerLock.bind(this), false);
        document.addEventListener('webkitpointerlockchange', this.listeningPointerLock.bind(this), false);
        this.renderer.domElement.requestPointerLock();


    }

    enableMoveState(e){
        switch(e.keyCode){
            case 37:
            case 81:
                if(!this.moveState.left){
                    this.moveState.left = true;
                }
                break;
            case 38:
            case 90:
                if(!this.moveState.up){
                    this.moveState.up = true;
                }
                break;
            case 39:
            case 68:
                if(!this.moveState.right){
                    this.moveState.right = true;
                }
                break;
            case 40:
            case 83:
                if(!this.moveState.down){
                    this.moveState.down = true;
                }
                break;
        }
    }

     disableMoveState(e){
        switch(e.keyCode){
            case 37:
            case 81:
                this.moveState.left = false;
                break;
            case 38:
            case 90:
                this.moveState.up = false;
                break;
            case 39:
            case 68:
                this.moveState.right = false;
                break;
            case 40:
            case 83:
                this.moveState.down = false;
                break;
        }}

        updateControls(clock: any, scene: any){
            let delta = clock.getDelta();
            let dir = new this.THREE.Vector3();
            let raycaster = new this.THREE.Raycaster();


            if(this.moveState.up) {
                dir.z -= 10;
            }

            if(this.moveState.down) {
                dir.z += 10;
            }
            if(this.moveState.left) {
                dir.x -= 10;
            }
            if(this.moveState.right) {
                dir.x += 10;
            }

            const speed = 300;
            dir.normalize();

            this.hitboxObject.translateX(dir.x * delta * speed );
            this.hitboxObject.translateZ(dir.z * delta * speed );
            let origin = new this.THREE.Vector3(this.yawObject.position.x,10,this.yawObject.position.z);
            let direction = new this.THREE.Vector3(this.hitboxObject.position.x,10,this.hitboxObject.position.z);


            let RayDectetor = new this.THREE.Raycaster(origin, direction, 0, 100);
            console.log(RayDectetor);
            let moveInterSect = RayDectetor.intersectObjects(scene.children[0].children);
            if(moveInterSect.length[0]){
                console.log(moveInterSect);
            }
            this.yawObject.translateX(dir.x * delta * speed );
            this.yawObject.translateZ(dir.z * delta * speed );
        }

}