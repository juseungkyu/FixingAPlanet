import Render from './view/Render.js';
import DrawCloud from './draw/DrawCloud.js';
import DrawContinent from './draw/DrawContinent.js';
import DrawWater from './draw/DrawWater.js';

class App {
    constructor() {
        this.init()
    }

    async init() {
        this.container = document.querySelector('.container')

        this.render = new Render(this.container)

        this.drawCloud = new DrawCloud(this.render)
        this.drawContinent = new DrawContinent(this.render)
        this.drawWater = new DrawWater(this.render)

        // test
        // console.log(await urlToImageDom('/resources/image/test.jpg'))
        // console.log(await urlToImageDom('/resources/image/test_bump.jpg'))
        // this.render.drawMap(await urlToImageDom('/resources/image/test.jpg'))
        this.render.drawBumpMap(await urlToImageDom('/resources/image/test_bump.jpg'))

        this.addEvent()
    }

    addEvent() {
        window.addEventListener('resize', this.render.setRendererSize)
        this.container.addEventListener('mousedown', this.mouseDown)
        this.container.addEventListener('mouseup', this.mouseUp)
        this.container.addEventListener('mouseleave', this.mouseLeave)
    }

    mouseDown = (e)=>{
        this.drawContinent.onMouseDown(e)
    }
    mouseUp = ()=>{
        
    }
    mouseLeave = ()=>{
        
    }
}

window.addEventListener('load', ()=>{
    new App()
})