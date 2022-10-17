import Render from './planet/view/Render.js';
import DrawCloud from './planet/tool/draw/DrawCloud.js';
import DrawContinent from './planet/tool/draw/DrawContinent.js';
import DrawWater from './planet/tool/draw/DrawWater.js';
import MoveTool from './planet/tool/move/MoveTool.js';

class App {
    constructor() {
        this.init()
    }

    async init() {
        this.container = document.querySelector('.canvas-container')

        this.render = new Render(this.container)

        this.drawCloud = new DrawCloud(this.render)
        this.drawContinent = new DrawContinent(this.render)
        this.drawWater = new DrawWater(this.render)
        
        this.moveTool = new MoveTool(this.render)

        this.tool = this.moveTool

        document.querySelector('.map').appendChild(this.render.mapCanvas)

        // test
        // console.log(await urlToImageDom('/resources/image/test.jpg'))
        // console.log(await urlToImageDom('/resources/image/test_bump.jpg'))
        // this.render.drawMap(await urlToImageDom('/resources/image/test.jpg'))
        // this.render.drawBumpMap(await urlToImageDom('/resources/image/test_bump.jpg'))

        this.addEvent()
    }

    addEvent() {
        window.addEventListener('resize', this.render.setRendererSize)
        this.container.addEventListener('mousedown', this.mouseDown)
        this.container.addEventListener('mousemove', this.mouseMove)
        this.container.addEventListener('mouseup', this.mouseUp)
        this.container.addEventListener('mouseleave', this.mouseLeave)

        this.toolBtnSet()
    }

    toolBtnSet() {
        
    }

    mouseDown = (e)=>{
        this.tool.onMouseDown(e)
    }
    mouseMove = (e)=>{
        this.tool.onMouseMove(e)
    }
    mouseUp = (e)=>{
        this.tool.onMouseUp(e)
    }
    mouseLeave = (e)=>{
        this.tool.onMouseLeave(e)
    }
}

window.addEventListener('load', ()=>{
    new App()
})