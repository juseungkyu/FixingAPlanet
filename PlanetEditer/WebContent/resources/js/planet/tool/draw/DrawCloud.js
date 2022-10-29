import Draw from './Draw.js';

export default class DrawCloud extends Draw {
    /**
     * onMouseDown 이벤트
     * @param {Render} render
     */
    constructor(render, canvasControl) {
        super(render, canvasControl)

        this.ctx = this.canvasControl.cloudMapCtx
        this.lineWidth = 2
        this.color = 255
        this.alpha = 0.01
        this.brashType = 'dot'
        this.init()
    }

    init() {
        this.upTool = document.querySelector('.cloud-up')
        this.downTool = document.querySelector('.cloud-down')

        this.menuList = document.querySelectorAll('.cloud-tool-menu')
        
        this.cloudSize = document.querySelector('.cloud-size')
        this.cloudColor = document.querySelector('.cloud-color')

        this.lineWidth = parseInt(this.cloudSize.value)
        this.alpha = parseFloat(this.cloudColor.value)

        this.brashTypeSelect = document.querySelector('.cloud-brash-type')
        
        this.addEvent()
        this.setUpTool()
    }

    addEvent() {
        this.upTool.addEventListener('click', this.setUpTool)
        this.downTool.addEventListener('click', this.setDownTool)

        this.cloudSize.addEventListener('change', ()=>{
            this.lineWidth = parseInt(this.cloudSize.value)
        })
        this.cloudColor.addEventListener('change', ()=>{
            this.alpha = parseFloat(this.cloudColor.value)
            this.strokeStyle = this.getColor()
        })
        this.brashTypeSelect.addEventListener('change', ()=>{
            this.brashType = this.brashTypeSelect.querySelectorAll('option')[this.brashTypeSelect.selectedIndex].value
        })
    }
    
    setAble() {
        this.menuList.forEach(x=>{
            x.style.display = 'flex'
        })
    }

    setDisable() {
        this.menuList.forEach(x=>{
            x.style.display = 'none'
        })
    }

    getColor() {
        return `rgba(${this.color},${this.color},${this.color},${this.alpha})`
    }

    setUpTool = ()=> {
        console.log('upTool')
        this.color = 255
        this.strokeStyle = this.getColor()
        this.upTool.classList.add('active')
        this.downTool.classList.remove('active')
    }

    setDownTool = ()=> {
        console.log('downTool')
        this.color = 0
        this.strokeStyle = this.getColor()
        this.downTool.classList.add('active')
        this.upTool.classList.remove('active')
    }

    downProcess(event) {
        const drawPoint = this.getDrawPoint(event)
        if(drawPoint === -1) {
            return 
        }

        this.beforePoint = drawPoint
        this.drawLine(this.beforePoint, this.beforePoint)
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
        
        const intersects = raycaster.intersectObjects(this.render.scene.children, true)

        if(intersects.length < 3){
            return -1
        }

        const uvPoint = intersects[0].uv
        return this.uvToDrawPoint(uvPoint)
    }

    drawLine(drawPoint1, drawPoint2) {
        drawPoint1.x = Math.ceil(drawPoint1.x)
        drawPoint1.y = Math.ceil(drawPoint1.y)
        drawPoint2.x = Math.ceil(drawPoint2.x)
        drawPoint2.y = Math.ceil(drawPoint2.y)
        
        const reverseLine = Math.abs(drawPoint1.x - drawPoint2.x) > this.render.mapCanvas.width / 2

        if(reverseLine){
            this.reverseDrawLine(drawPoint1, drawPoint2)
            return
        }

        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = this.strokeStyle

        if(this.brashType == 'dot'){
            this.justDrawDotLine(this.ctx, drawPoint1, drawPoint2, 1000, this.strokeStyle)
        } else {
            this.justDrawLine(this.ctx, drawPoint1, drawPoint2)
        }

        this.canvasControl.updateCloudCanvas()
    }

    reverseDrawLine(drawPoint1, drawPoint2) {
        if(drawPoint1.x < drawPoint2.x) {
            let temp = drawPoint1
            drawPoint1 = drawPoint2
            drawPoint2 = temp
        }

        let centerY = (drawPoint1.y + drawPoint2.y) / 2

        if(this.brashType = 'dot'){
            this.justDrawDotLine(this.ctx, drawPoint1, {x : this.ctx.canvas.width, y : centerY}, 1000, this.color)
            this.justDrawDotLine(this.ctx, drawPoint2, {x : 0, y : centerY}, 1000, this.color)
        } else {
            this.justDrawLine(this.ctx, drawPoint1, {x : this.ctx.canvas.width, y : centerY})
            this.justDrawLine(this.ctx, drawPoint2, {x : 0, y : centerY})
        }
        this.canvasControl.updateCloudCanvas()
    }

    drawDot (drawPoint) {
        const {x,y} = drawPoint
        this.ctx.fillRect(x,y,2,2)
    }
}