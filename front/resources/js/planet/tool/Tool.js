export default class Tool {
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
        this.downProcess(event)
    }

    /**
     * onMouseMove 이벤트
     * @param {PointerEvent} event
     */
    onMouseMove = (event) => {
        console.log('move')
        this.moveProcess(event)
    }

    /**
     * onMouseUp 이벤트
     * @param {PointerEvent} event
     */
    onMouseUp = (event) => {
        this.upProcess(event)
    }

    /**
     * onMouseLeave 이벤트
     * @param {PointerEvent} event
     */
    onMouseLeave = (event) => {
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
}