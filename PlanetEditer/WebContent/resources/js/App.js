import Render from './planet/view/Render.js';
import ToolControl from './planet/tool/ToolControl.js';
import CanvasControl from './planet/canvasControl/CanvasControl.js';
import MainPage from './page/MainPage.js';
import PlanetListPage from './page/PlanetListPage.js';
import CreatePage from './page/CreatePage.js';
import UserPage from './page/UserPage.js';

class App {
    constructor() {
        window.app = this
        this.init()
    }

    init() {
        this.lodingScreen = document.querySelector('.wait')

        // this.canvasControl = new CanvasControl()
        // this.container = document.querySelector('.canvas-container')
        // this.render = new Render(this.container)
        // this.tool = new ToolControl(this.canvasControl, this.render, this.container)

        this.pageList = document.querySelectorAll('.fix-full')

        
        this.canvasPage = document.querySelector('.canvas-container')
        this.mainPage = document.querySelector('.main-container')
        this.listPage = document.querySelector('.list-container')
        this.informationPage = document.querySelector('.information-container')
        this.createPlanetPage = document.querySelector('.planet-create-container')
        this.userPage = document.querySelector('.user-container')

        this.userPageControl = new UserPage(this)
        this.mainPageControl = new MainPage(this)
        this.planetListPageControl = new PlanetListPage(this)
        this.createPageControl = new CreatePage(this)

        // document.querySelector('.map').appendChild(this.render.bumpMapCanvas)

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
     * 페이지 전부 비활성화
     */
    unsetPageAll() {
        this.pageList.forEach(x=>x.classList.remove('active'))
    }

    /**
     * 메인 페이지 활성화
     */
    setMainPage = () => {
        this.unsetPageAll()
        this.mainPage.classList.add('active')
    }

    /**
     * 캔버스 페이지 활성화
     */
    setCanvas = () => {
        this.unsetPageAll()
        this.render.classList.add('active')
    }

    /**
     * 리스트 페이지 활성화
     */
    setListPage = () => {
        this.unsetPageAll()
        this.listPage.classList.add('active')
        this.planetListPageControl.onCall()
    }

    /**
     * 유저 페이지 활성화
     */
    setUserPage = (type) => {
        this.unsetPageAll()
        this.userPage.classList.add('active')
        this.userPageControl.onCall(type)
    }

    /**
     * 상세정보 페이지 활성화
     */
    setInformationPage = () => {
        this.unsetPageAll()
        this.informationPage.classList.add('active')
    }

    /**
     * 상세정보 페이지 활성화
     */
    setCreatePage = () => {
        this.unsetPageAll()
        this.createPlanetPage.classList.add('active')
    }

    /**
     * 이벤트 제어
     */
    addEvent() {

        // window.addEventListener('resize', this.render.setRendererSize)
        // this.container.addEventListener('mousedown', this.mouseDown)
        // this.container.addEventListener('mousemove', this.mouseMove)
        // this.container.addEventListener('mouseup', this.mouseUp)
        // this.container.addEventListener('mouseleave', this.mouseLeave)
    }
}

window.addEventListener('load', ()=>{
    new App()
})