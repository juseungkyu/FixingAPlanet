import Tool from "/resources/js/planet/tool/Tool.js"

export default class MoveTool extends Tool {
    constructor(render) {
        super(render)
        this.beforePoint = new THREE.Vector2(0,0)
        this.afterPoint = new THREE.Vector2(0,0)
    }

    getUVPoint(event) {
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2(event.clientX/this.render.WIDTH * 2 - 1, event.clientY/this.render.HEIGHT * -2 + 1)
        raycaster.setFromCamera(mouse, this.render.camera)
        
        const intersects = raycaster.intersectObjects(this.render.scene.children, true);

        if(intersects.length == 0){
            return -1
        }

        return intersects[0].uv
    }

    downProcess(event) {
        const uvPoint =  this.getUVPoint(event)
        if(uvPoint === -1) {
            return 
        }

        this.beforePoint = uvPoint
        
    }

    moveProcess(event) {
        const uvPoint =  this.getUVPoint(event)
        if(uvPoint === -1) {
            return 
        }

        this.afterPoint = this.getUVPoint(event)
        this.drawLine(this.beforePoint, this.afterPoint)
        this.beforePoint = this.afterPoint
    }

    upProcess(event) {

    }

    leaveProcess(event) {

    }
}