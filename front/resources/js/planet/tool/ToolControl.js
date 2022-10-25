import DrawCloud from '/resources/js/planet/tool/draw/DrawCloud.js';
import DrawContinent from '/resources/js/planet/tool/draw/DrawContinent.js';
import DrawWater from '/resources/js/planet/tool/draw/DrawWater.js';

import MoveTool from '/resources/js/planet/tool/move/MoveTool.js';

export default class ToolControl {
    constructor(canvasControl, render, container) {
        this.canvasControl = canvasControl
        this.render = render
        this.canvas = container.querySelector('canvas')
        this.mouseDown = false
        this.init()
    }

    init = () => {
        this.drawCloudTool = new DrawCloud(this.render, this.canvasControl)
        this.drawContinentTool = new DrawContinent(this.render, this.canvasControl)
        this.drawWaterTool = new DrawWater(this.render, this.canvasControl)
        
        this.moveTool = new MoveTool(this.render)

        this.btns = {
            move : document.querySelector('.move-tool'),
            drawCloud : document.querySelector('.draw-cloud-tool'),
            drawContinent : document.querySelector('.draw-continent-tool'),
            drawWater : document.querySelector('.draw-water-tool')
        }

        this.btns.move.addEventListener('click', this.moveToolSet)
        this.btns.drawCloud.addEventListener('click', this.drawCloudToolSet)
        this.btns.drawContinent.addEventListener('click', this.drawContinentToolSet)
        this.btns.drawWater.addEventListener('click', this.drawWaterToolSet)

        this.canvas.addEventListener('mousedown', this.onMouseDown)
        this.canvas.addEventListener('mousemove', this.onMouseMove)
        this.canvas.addEventListener('mouseup', this.onMouseUp)
        this.canvas.addEventListener('mouseleave', this.onMouseLeave)

        this.rightBottom = document.querySelector('.right-bottom')

        this.moveToolSet()
    }

    /**
     * 모든 툴 선택 취소
     */
    unsetAllTool() {
        this.moveToolUnSet()
        this.continentToolUnSet()
    }

    /**
     * 이동툴 취소
     */
    moveToolUnSet(){
        this.moveTool.setDisable()
    }

    /**
     * 이동툴 취소
     */
    continentToolUnSet(){
        this.drawContinentTool.setDisable()
    }

    /**
     * 이동툴 설정
     */
    moveToolSet = ()=>{
        this.unsetAllTool()

        console.log('moveTool')
        this.moveTool.setAble()
        this.currentTool = this.moveTool
        this.rightBottom.appendChild(this.btns.move)
    }

    /**
     * 구름 그리기 툴 설정
     */
    drawCloudToolSet = ()=>{
        this.unsetAllTool()

        console.log('CloudTool')
        this.currentTool = this.drawCloudTool
        this.rightBottom.appendChild(this.btns.drawCloud)
    }

    /**
     * 지형 그리기 툴 설정
     */
    drawContinentToolSet = ()=>{
        this.unsetAllTool()

        console.log('ContinentTool')
        this.drawContinentTool.setAble()
        this.currentTool = this.drawContinentTool
        this.rightBottom.appendChild(this.btns.drawContinent)
    }

    /**
     * 물 그리기 툴 설정
     */
    drawWaterToolSet = ()=>{
        this.unsetAllTool()
        
        console.log('WaterTool')
        this.currentTool = this.drawWaterTool
        this.rightBottom.appendChild(this.btns.drawWater)
    }


    /**
     * onMouseDown 이벤트
     * @param {PointerEvent} event
     */
    onMouseDown = (event) => {
        this.mouseDown = true
        this.currentTool.downProcess(event)
    }

    /**
     * onMouseMove 이벤트
     * @param {PointerEvent} event
     */
    onMouseMove = (event) => {
        if(!this.mouseDown) return

        this.currentTool.moveProcess(event)
    }

    /**
     * onMouseUp 이벤트
     * @param {PointerEvent} event
     */
    onMouseUp = (event) => {
        if(!this.mouseDown) {
            return
        }

        this.mouseDown = false
        this.currentTool.upProcess(event)
    }

    /**
     * onMouseLeave 이벤트
     * @param {PointerEvent} event
     */
    onMouseLeave = (event) => {
        if(!this.mouseDown) {
            return
        }
        
        this.mouseDown = false
        this.currentTool.leaveProcess(event)
    }
}