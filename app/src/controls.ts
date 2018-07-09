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

        this.hitboxObject.width = this.cubeSize.width;
        this.hitboxObject.height = this.cubeSize.height * 2;
        this.hitboxObject.position.y = this.cubeSize.width;
        this.yawObject.position.y = this.hitboxObject.position.y + (this.cubeSize.height * 1.5);
        this.yawObject.position.x = this.hitboxObject.position.x + (this.cubeSize.width / 2);
        this.yawObject.position.z = this.hitboxObject.position.x + (this.cubeSize.width / 2);
        let testBlock = world.createBlock(THREE);
        testBlock.position.y = this.hitboxObject.position.y;
        testBlock.position.x = this.hitboxObject.position.x;
        testBlock.position.z = this.hitboxObject.position.z;
        this.hitboxObject.add(testBlock);
        this.scene.add(this.hitboxObject);
        window.addEventListener('click',this.enablePointerLock.bind(this), false);
        window.addEventListener('keydown', this.enableMoveState.bind(this), false);
        window.addEventListener('keyup', this.disableMoveState.bind(this), false);

    }

    listeningPointerLock(e){
        e.preventDefault();
        this.isPointerLocked = !this.isPointerLocked;

    }
    mouseTracker(e){
        e.preventDefault();
        if(this.isPointerLocked){

            const movementX = e.movementX;
            const movementY = e.movementY;
            this.yawObject.rotation.y -= movementX * 0.001;
            this.pitchObject.rotation.x -= movementY * 0.001;
            this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));

            this.hitboxObject.rotation.y -= movementX * 0.001;
            /*this.hitboxObject.rotation.x -= movementX * 0.001;
            this.hitboxObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.hitboxObject.rotation.x));*/
        }
    }
    enablePointerLock(e){
        e.preventDefault();
        this.renderer.domElement.requestPointerLock();
        document.addEventListener('pointerlockchange', this.listeningPointerLock.bind(this), false);
        document.addEventListener('mozpointerlockchange', this.listeningPointerLock.bind(this), false);
        document.addEventListener('webkitpointerlockchange', this.listeningPointerLock.bind(this), false);
        this.mouseEvent = window.addEventListener('mousemove', this.mouseTracker.bind(this), false);
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

        updateControls(clock: any){
            let delta = clock.getDelta();
            let dir = new this.THREE.Vector3();

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

            dir.normalize();
            const speed = 300;

            this.yawObject.translateX(dir.x * delta * speed);
            this.yawObject.translateZ(dir.z * delta * speed);

            this.hitboxObject.translateX(dir.x * delta * speed);
            this.hitboxObject.translateZ(dir.z * delta * speed);

            /*this.hitboxObject.position.x = this.yawObject.position.x;
            this.hitboxObject.position.z = this.yawObject.position.z;*/

            /*this.hitboxObject.rotation.y = this.pitchObject.rotation.x;
            this.hitboxObject.rotation.x = this.yawObject.rotation.y;
            this.hitboxObject.rotation.z = this.yawObject.rotation.z;*/
        }

}