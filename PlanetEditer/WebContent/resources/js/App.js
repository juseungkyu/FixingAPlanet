import Render from './planet/view/Render.js';
import ToolControl from './planet/tool/ToolControl.js';
import CanvasControl from './planet/canvasControl/CanvasControl.js';

class App {
    constructor() {
        window.app = this
        this.init()
    }

    async init() {
        this.lodingScreen = document.querySelector('.wait')

        this.canvasControl = new CanvasControl()
        this.container = document.querySelector('.canvas-container')
        this.render = new Render(this.container)
        this.tool = new ToolControl(this.canvasControl, this.render, this.container)

        document.querySelector('.map').appendChild(this.render.bumpMapCanvas)

        // test
        this.test()

        this.addEvent()

        this.unsetWaitMode()
    }

    /**
     * 테스트
     */
    test() {
        // console.log(await urlToImageDom('/resources/image/test.jpg'))
        // console.log(await urlToImageDom('/resources/image/test_bump.jpg'))
        // this.render.drawMap(await urlToImageDom('/resources/image/test.jpg'))
        // this.canvasControl.continentBumpMapCtx.drawImage(await urlToImageDom('/resources/image/test_bump.jpg'),0,0)
        // this.canvasControl.updateCanvas()
        // this.canvasControl.cloudMapCtx.drawImage(await urlToImageDom('/resources/image/cloudMap.jpg'),0,0, 1000, 500)
        // this.render.cloudMat.alphaMap.needsUpdate = true
    }

    /**
     * 로딩창 생성
     */
    setWaitMode() {
        this.lodingScreen.classList.add('active')
    }

    /**
     * 로딩창 제거
     */
    unsetWaitMode() {
        this.lodingScreen.classList.remove('active')
    }

    /**
     * 이벤트 제어
     */
    addEvent() {
        window.addEventListener('resize', this.render.setRendererSize)
        // this.container.addEventListener('mousedown', this.mouseDown)
        // this.container.addEventListener('mousemove', this.mouseMove)
        // this.container.addEventListener('mouseup', this.mouseUp)
        // this.container.addEventListener('mouseleave', this.mouseLeave)
    }
}

window.addEventListener('load', ()=>{
    new App()
})