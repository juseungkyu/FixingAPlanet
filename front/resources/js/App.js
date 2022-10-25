import Render from './planet/view/Render.js';
import ToolControl from './planet/tool/ToolControl.js';
import CanvasControl from './planet/canvasControl/CanvasControl.js';

class App {
    constructor() {
        window.app = this
        this.init()
    }

    async init() {
        this.canvasControl = new CanvasControl()
        this.container = document.querySelector('.canvas-container')
        this.render = new Render(this.container)
        this.tool = new ToolControl(this.canvasControl, this.render, this.container)

        document.querySelector('.map').appendChild(this.render.bumpMapCanvas)

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
    }
}

window.addEventListener('load', ()=>{
    new App()
})