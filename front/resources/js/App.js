import Render from './planet/view/Render.js';
import ToolControl from './planet/tool/ToolControl.js';

class App {
    constructor() {
        this.init()
    }

    async init() {
        this.container = document.querySelector('.canvas-container')
        this.render = new Render(this.container)
        this.tool = new ToolControl(this.render, this.container)

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
    }
}

window.addEventListener('load', ()=>{
    new App()
})