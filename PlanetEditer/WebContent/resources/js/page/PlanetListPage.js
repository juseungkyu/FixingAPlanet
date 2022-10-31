import PlanetController from '../ajax/PlanetController.js';

export default class PlanetListPage {
    constructor(app) {
        console.log('PlanetListPage start')
        this.app = app
        this.container = document.querySelector('.planet-container')
        this.controller = new PlanetController()

        this.init()
    }

    init(){

        this.addEvent()
    }

    async onCall() {
        this.app.setWaitMode()

        const a = await this.controller.getPlanetListAll()
        console.log(a)

        this.app.unsetWaitMode()
    }

    addEvent() {

    }

    on = () => {
        
    }
}