import Tool from "/resources/js/planet/tool/Tool.js"

export default class MoveTool extends Tool {
    constructor(render) {
        super(render)
        this.beforePoint = new THREE.Vector2(0,0)
        this.afterPoint = new THREE.Vector2(0,0)
    }

    uvToDrawPoint(uvPoint) {
        const point = uvPoint
        point.x *= this.render.mapCanvas.width
        point.y = 1- point.y
        point.y *= this.render.mapCanvas.height

        return point
    }

    downProcess(event) {
        const drawPoint =  this.getDrawPoint(event)
        if(drawPoint === -1) {
            return 
        }

        this.beforePoint = drawPoint
    }

    moveProcess(event) {
        this.afterPoint = drawPoint
        this.drawLine(this.beforePoint, this.afterPoint)
        this.beforePoint = this.afterPoint
    }

    upProcess(event) {

    }

    leaveProcess(event) {

    }
}