import PlanetController from '../ajax/PlanetController.js';
import Render from '../planet/view/Render.js';
import ToolControl from '../planet/tool/ToolControl.js';
import CanvasControl from '../planet/canvasControl/CanvasControl.js';

/**
 * canvas(행성 뷰어)를 제어하는 페이지
 * @param {App} app 이 페이지를 생성할 App
 */
export default class CanvasPage {
    constructor(app) {
        console.log('CanvasPage start')
        this.app = app
        this.container = document.querySelector('.canvas-container')

        this.init()
        this.addEvent()
    }

    init() {
        this.controller = new PlanetController()
        this.canvasControl = new CanvasControl()
        this.container = document.querySelector('.canvas-container')
        this.render = new Render(this.container, this)
        this.tool = new ToolControl(this.canvasControl, this.render, this.container)

        this.currentPlanetInfo = null

        this.saveAndExitBtn = this.container.querySelector('.save-btn')
        this.exitBtn = this.container.querySelector('.exit-btn')

        this.render.stopAnimate()
    }

    addEvent() {
        this.saveAndExitBtn.addEventListener('click', this.saveAndExit)
        this.exitBtn.addEventListener('click', this.exit)
        window.addEventListener('resize', this.render.setRendererSize)
    }

    saveAndExit = async ()=>{
        if(this.isProcessing) {
            return
        }

        this.isProcessing = true
        this.app.setWaitMode()

        const data = await this.controller.savePlanet(this.currentPlanetInfo.planetId, {
            "bumpMap" : this.canvasControl.bumpMapCanvas, 
            "cloudMap" : this.canvasControl.cloudMapCanvas, 
            "colorMap" : this.canvasControl.colorMapCanvas, 
            "continentMap" : this.canvasControl.continentBumpMapCanvas, 
            "map" : this.canvasControl.mapCanvas
        })

        if(data.error){
            alert(data.data)
            this.app.unsetWaitMode()
            this.isProcessing = false
            return
        }

        alert(data.data.message)
        this.exit()

        this.app.unsetWaitMode()
        this.isProcessing = false
    }

    exit = ()=>{

    }

    async onCall(planetId) {
        if(this.isProcessing){
            return
        }
        this.isProcessing = true

        this.app.setWaitMode()
        const data = await this.controller.getPlanet(planetId)

        if(data.error) {
            alert(data.data)
            this.app.setMainPage()
            this.app.unsetWaitMode()
            this.isProcessing = false
            return
        }

        this.currentPlanetInfo = data.data

        this.render.animate()
        this.app.unsetWaitMode()
        this.isProcessing = false
    }
}

// this.currentPlanetInfo = {
//     "error": false,
//     "data": {
//         "planetTitle": "ddd",
//         "canvas": {
//             "canvasId": 22,
//             "canvasBumpMapAddr": "/default.png",
//             "canvasContinentMapAddr": "/default.png",
//             "canvasCloudMapAddr": "/default.png",
//             "canvasMapAddr": "/default.png"
//         },
//         "planetContent": "ddd",
//         "planetId": 22,
//         "playerId": "1234"
//     }
// }