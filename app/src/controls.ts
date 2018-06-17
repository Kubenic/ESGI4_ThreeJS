export class Controls {
    private scene: any;
    private camera: any;
    private THREE: any;
    private renderer: any;
    private mouseEvent: any;
    private fpsObject: any;
    private pitchObject: any;
    private yawObject: any;
    private isPointerLocked: boolean = false;
    private moveState: any = {
        left: false,
        right: false,
        up: false,
        down: false,
    };
    constructor(scene: any, camera: any, THREE: any, renderer: any){
        this.scene = scene;
        this.camera = camera;
        this.THREE = THREE;
        this.renderer = renderer;
        this.fpsObject = new THREE.Object3D();
        this.scene.add(this.fpsObject);
        this.pitchObject = new THREE.Object3D();

        this.pitchObject.add(this.camera);
        this.yawObject = new THREE.Object3D();

        this.yawObject.position.y = 10;
        this.yawObject.add(this.pitchObject);
        this.fpsObject.add(this.yawObject);

        window.addEventListener('click',this.enablePointerLock.bind(this), false);
        window.addEventListener('keydown', this.enableMoveState.bind(this), false);
        window.addEventListener('keyup', this.disableMoveState.bind(this), false);

    }

    listeningPointerLock(e){
        this.isPointerLocked = !this.isPointerLocked;

    }
    mouseTracker(e){
        if(this.isPointerLocked){

            const movementX = e.movementX;
            const movementY = e.movementY;

            this.yawObject.rotation.y -= movementX * 0.002;
            this.pitchObject.rotation.x -= movementY * 0.002;

            this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));
        }
    }
    enablePointerLock(){

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
            const speed = 1000;

            this.yawObject.translateX(dir.x * delta * speed);
            this.yawObject.translateZ(dir.z * delta * speed);

        }

}