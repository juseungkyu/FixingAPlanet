import Draw from './Draw.js';

export default class DrawContinent extends Draw {
    /**
     * onMouseDown 이벤트
     * @param {Render} render
     */
    constructor(render) {
        super(render)
        this.ctx = this.render.getMapCtx()
        this.bumpCtx = this.render.getBumpMapCtx()
        this.beforePoint = new THREE.Vector2(0,0)
        this.afterPoint = new THREE.Vector2(0,0)
    }

    init() {

    }

    downProcess(event) {
        const drawPoint =  this.getDrawPoint(event)
        if(drawPoint === -1) {
            return 
        }

        this.beforePoint = drawPoint
    }

    moveProcess(event) {
        const drawPoint =  this.getDrawPoint(event)
        if(drawPoint === -1) {
            return 
        }

        this.afterPoint = drawPoint
        this.drawLine(this.beforePoint, this.afterPoint)
        this.beforePoint = this.afterPoint
    }

    upProcess(event) {

    }

    leaveProcess(event) {

    }

    getDrawPoint(event) {
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2(event.clientX/this.render.WIDTH * 2 - 1, event.clientY/this.render.HEIGHT * -2 + 1)
        raycaster.setFromCamera(mouse, this.render.camera)
        
        const intersects = raycaster.intersectObjects(this.render.scene.children, true);

        if(intersects.length == 0){
            return -1
        }

        const uvPoint = intersects[0].uv
        return this.uvToDrawPoint(uvPoint)
    }

    drawLine(drawPoint1, drawPoint2) {
        this.ctx.strokeStyle = 'rgba(255,255,255)'
        this.bumpCtx.strokeStyle = 'rgba(255,255,255,0.01)'

        this.ctx.beginPath()
        this.ctx.moveTo(drawPoint1.x, drawPoint1.y)
        this.ctx.lineTo(drawPoint2.x, drawPoint2.y)
        this.ctx.stroke()

        this.bumpCtx.beginPath()
        this.bumpCtx.moveTo(drawPoint1.x, drawPoint1.y)
        this.bumpCtx.lineTo(drawPoint2.x, drawPoint2.y)
        this.bumpCtx.stroke()

        this.render.setMapNeedUpdateTrue()
        this.render.setBumpMapNeedUpdateTrue()
    }

    drawDot (drawPoint) {
        const {x,y} = drawPoint
        this.ctx.fillRect(x,y,2,2)
    }
}