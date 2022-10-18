import Draw from './Draw.js';

export default class DrawContinent extends Draw {
    /**
     * onMouseDown 이벤트
     * @param {Render} render
     */
    constructor(render) {
        super(render)
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

        const reverseLine = Math.abs(drawPoint1.x - drawPoint2.x) > this.render.WIDTH / 2

        if(reverseLine){
            this.reverseDrawLine(drawPoint1, drawPoint2)
            return
        }

        this.ctx.strokeStyle = 'rgb(0,0,0)'
        this.bumpCtx.strokeStyle = 'rgba(255,255,255,0.1)'

        this.justDrawLine(this.ctx, drawPoint1, drawPoint2)
        this.justDrawLine(this.bumpCtx, drawPoint1, drawPoint2)

        this.render.setMapNeedUpdateTrue()
        this.render.setBumpMapNeedUpdateTrue()
    }

    reverseDrawLine(drawPoint1, drawPoint2) {
        if(drawPoint1.x < drawPoint2.x) {
            let temp = drawPoint1
            drawPoint1 = drawPoint2
            drawPoint2 = temp
        }

        let centerY = (drawPoint1.y + drawPoint2.y) / 2

        this.justDrawLine(this.ctx, drawPoint1, {x : this.ctx.canvas.width, y : centerY})
        this.justDrawLine(this.ctx, drawPoint2, {x : 0, y : centerY})
        this.justDrawLine(this.bumpCtx, drawPoint1, {x : this.ctx.canvas.width, y : centerY})
        this.justDrawLine(this.bumpCtx, drawPoint2, {x : 0, y : centerY})

        this.render.setMapNeedUpdateTrue()
        this.render.setBumpMapNeedUpdateTrue()
    }

    drawDot (drawPoint) {
        const {x,y} = drawPoint
        this.ctx.fillRect(x,y,2,2)
    }
}