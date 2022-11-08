import PlanetController from '../ajax/PlanetController.js';

/**
 * canvas(행성 뷰어)를 제어하는 페이지
 * @param {App} app 이 페이지를 생성할 App
 */
export default class CanvasPage {
    constructor(app) {
        console.log('CanvasPage start')
        this.app = app
        this.container = document.querySelector('.canvas-container')
        this.controller = new PlanetController()

        this.init()
    }


}