export default class Draw {
    constructor(render) {
        this.render = render
        this.mouseDown = false
        this.init()
    }

    init = () => {
        
    }

    /**
     * onMouseDown 이벤트
     * @param {PointerEvent} event
     */
    onMouseDown = (event) => {
        this.mouseDown = true
        this.downProcess(event)
    }

    /**
     * onMouseMove 이벤트
     * @param {PointerEvent} event
     */
    onMouseMove = (event) => {
        if(!this.mouseDown) return

        console.log('move')
        this.moveProcess(event)
    }

    /**
     * onMouseUp 이벤트
     * @param {PointerEvent} event
     */
    onMouseUp = (event) => {
        this.mouseDown = false
        this.upProcess(event)
    }

    /**
     * onMouseLeave 이벤트
     * @param {PointerEvent} event
     */
    onMouseLeave = (event) => {
        this.mouseDown = false
        this.leaveProcess(event)
    }

    downProcess(event) {

    }

    moveProcess(event) {

    }

    upProcess(event) {

    }

    leaveProcess(event) {

    }

    /**
     * UV좌표를 지도좌표로 변환
     * @param {Vector2} uvPoint
     * @param {Vector2} point
     */
    uvToDrawPoint(uvPoint) {
        const point = uvPoint
        point.x *= this.render.mapCanvas.width
        point.y = 1- point.y
        point.y *= this.render.mapCanvas.height

        return point
    }
}