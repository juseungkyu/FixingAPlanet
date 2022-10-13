import Render from './view/Render.js';
import DrawCloud from './draw/DrawCloud.js';
import DrawContinent from './draw/DrawContinent.js';
import DrawWater from './draw/DrawWater.js';

class App {
    constructor() {
        this.init()
    }

    init() {
        this.container = document.querySelector('.container')

        this.render = new Render(this.container)

        this.drawCloud = new DrawCloud()
        this.drawContinent = new DrawContinent()
        this.DrawWater = new DrawWater()

        this.addEvent()
    }

    addEvent() {
        window.addEventListener('resize', this.render.setRendererSize)
    }
}

window.addEventListener('load', ()=>{
    new App()
})