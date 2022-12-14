import MainPage from './page/MainPage.js';
import PlanetListPage from './page/PlanetListPage.js';
import CreatePage from './page/CreatePage.js';
import UserPage from './page/UserPage.js';
import CanvasPage from './page/CanvasPage.js';

class App {
    constructor() {
        window.app = this
        this.init()
    }

    init() {
        this.lodingScreen = document.querySelector('.wait')

        this.pageList = document.querySelectorAll('.fix-full')

        this.sessionTab = document.querySelectorAll('.session-btns')
        
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
        this.canvasPageControl = new CanvasPage(this)

        // test
        // this.test()

        this.tutorial()

        this.getInitData()
        this.addEvent()
        this.unsetWaitMode()
    }

    /**
     * tutorial
     */
    tutorial() {
        if(window.localStorage.getItem('isNotFirst')) {
            console.log('tutorial skip')
            return
        }

        const tutorialWindow = document.querySelector('.tutorial')
        tutorialWindow.classList.add('active')

        window.localStorage.setItem('isNotFirst', 'yes')

        const tutorialYesBtn = tutorialWindow.querySelector('.tutorial-yes-btn')
        const tutorialNoBtn = tutorialWindow.querySelector('.tutorial-no-btn')

        tutorialYesBtn.addEventListener('click', ()=> {
            window.location.href = '/tutorial.html'
        })
        tutorialNoBtn.addEventListener('click', ()=> {
            tutorialWindow.classList.remove('active')
        })
    }

    /**
     * ???????????? ????????? ?????? ????????? ????????????
     */
    getInitData() {
        const data = document.querySelector('#init-data').innerHTML
        this.session = JSON.parse(data)

        if(this.session) {
            this.setLogoutBtn()
        }
    }

    /**
     * ?????????
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
     * ????????? ??????
     */
    setWaitMode() {
        this.lodingScreen.classList.add('active')
    }

    /**
     * ????????? ??????
     */
    unsetWaitMode() {
        this.lodingScreen.classList.remove('active')
    }

    /**
     * ????????? ?????? ????????????
     */
    unsetPageAll() {
        this.pageList.forEach(x=>x.classList.remove('active'))
    }

    /**
     * ?????? ????????? ?????????
     */
    setMainPage = () => {
        this.unsetPageAll()
        this.mainPage.classList.add('active')
    }

    /**
     * ????????? ????????? ?????????
     */
    setCanvas = (planetId) => {
        this.unsetPageAll()
        this.canvasPage.classList.add('active')
        this.canvasPageControl.onCall(planetId)
    }

    /**
     * ????????? ????????? ?????????
     * @param {String} type all or my
     */
    setListPage = (type) => {
        this.unsetPageAll()
        this.listPage.classList.add('active')
        this.planetListPageControl.onCall(type)
    }

    /**
     * ?????? ????????? ?????????
     * @param {String} type login or join
     */
    setUserPage = (type) => {
        this.unsetPageAll()
        this.userPage.classList.add('active')
        this.userPageControl.onCall(type)
    }

    /**
     * ???????????? ????????? ?????????
     */
    setInformationPage = () => {
        this.unsetPageAll()
        this.informationPage.classList.add('active')
    }

    /**
     * ???????????? ????????? ?????????
     */
    setCreatePage = () => {
        this.unsetPageAll()
        this.createPageControl.onCall()
        this.createPlanetPage.classList.add('active')
    }


    /**
     * ????????? ?????? ui ?????? 
     */
    setLogoutBtn() {
        this.sessionTab[0].classList.remove('active')
        this.sessionTab[1].classList.add('active')
    }
    unsetLogoutBtn() {
        this.sessionTab[1].classList.remove('active')
        this.sessionTab[0].classList.add('active')
    }

    /**
     * ????????? ??????
     */
    addEvent() {
        // this.container.addEventListener('mousedown', this.mouseDown)
        // this.container.addEventListener('mousemove', this.mouseMove)
        // this.container.addEventListener('mouseup', this.mouseUp)
        // this.container.addEventListener('mouseleave', this.mouseLeave)
    }
}

window.addEventListener('load', ()=>{
    new App()
})