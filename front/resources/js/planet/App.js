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

        this.drawCloud = new DrawCloud()
        this.drawContinent = new DrawContinent()
        this.DrawWater = new DrawWater()

        console.log(await urlToImageDom('/resources/image/test.jpg'))
        console.log(await urlToImageDom('/resources/image/test_bump.jpg'))

        this.render.drawMap(await urlToImageDom('/resources/image/test.jpg'))
        this.render.drawBumpMap(await urlToImageDom('/resources/image/test_bump.jpg'))
        

        this.addEvent()
    }

    addEvent() {
        window.addEventListener('resize', this.render.setRendererSize)
    }
}

window.addEventListener('load', ()=>{
    new App()
})