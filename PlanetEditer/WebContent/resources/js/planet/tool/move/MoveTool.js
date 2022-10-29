import Tool from "/resources/js/planet/tool/Tool.js"

export default class MoveTool extends Tool {
    constructor(render) {
        super(render)
        
        this.setController()
    }

    setController() {
        this.controls = new THREE.OrbitControls(this.render.camera, this.render.renderer.domElement);

        this.controls.rotateSpeed = 0.5
        this.controls.zoomSpeed = 1
        this.controls.panSpeed = 0.8
        this.controls.minDistance = 900
        this.controls.maxDistance = 3000
    }

    setAble() {
        this.controls.enabled = true;
    }

    setDisable() {
        this.controls.enabled = false;
    }

    // getUVPoint(event) {
    //     const raycaster = new THREE.Raycaster()
    //     const mouse = new THREE.Vector2(event.clientX/this.render.WIDTH * 2 - 1, event.clientY/this.render.HEIGHT * -2 + 1)
    //     raycaster.setFromCamera(mouse, this.render.camera)
        
    //     const intersects = raycaster.intersectObjects(this.render.scene.children, true);

    //     if(intersects.length == 0){
    //         return -1
    //     }

    //     return intersects[0].uv
    // }

    // downProcess(event) {
    //     const uvPoint =  this.getUVPoint(event)
    //     if(uvPoint === -1) {
    //         return 
    //     }

    //     this.beforePoint = [event.clientX/this.render.WIDTH, event.clientY/this.render.HEIGHT]
    // }

    // moveProcess(event) {
    //     this.rotate(event)
    // }

    // upProcess(event) {
    //     this.rotate(event)
    // }

    // leaveProcess(event) {
    //     this.rotate(event)
    // }

    // rotate(event) {
    //     this.afterPoint = [event.clientX/this.render.WIDTH, event.clientY/this.render.HEIGHT]
    //     this.render.rotatePlanet(this.afterPoint[0] - this.beforePoint[0], this.afterPoint[1] - this.beforePoint[1])
    //     this.beforePoint = this.afterPoint
    // }
}