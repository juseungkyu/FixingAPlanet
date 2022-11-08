
/**
 * 메인 화면을 제어하는 페이지
 * @param {App} app 이 페이지를 생성할 App
 */
export default class MainPage {
    constructor(app) {
        this.app = app
        this.container = document.querySelector('.main-container')

        this.init()
    }

    /**
     * 초기설정
     */
    init(){
        this.loginBtn = this.container.querySelector('.login-btn')
        this.joinBtn = this.container.querySelector('.join-btn')
        this.planetListBtn = this.container.querySelector('.planet-list-btn')
        this.informationBtn = this.container.querySelector('.information-btn')
        this.createBtn = this.container.querySelector('.planet-create-btn')

        this.mainBtn = document.querySelectorAll('.main-btn')

        this.addEvent()
    }

    /**
     * 이벤트 설정
     */
    addEvent() {
        this.loginBtn.addEventListener('click', this.onLogin)
        this.joinBtn.addEventListener('click', this.onJoin)
        this.planetListBtn.addEventListener('click', this.onPlanetList)
        this.informationBtn.addEventListener('click', this.onInformation)
        this.createBtn.addEventListener('click', this.onCreatePlanet)


        this.mainBtn.forEach(x=>x.addEventListener('click', this.onMainBtn))
    }

    onMainBtn = ()=> {
        this.app.setMainPage()
    }

    onLogin = () => {
        
    }
    onJoin = () => {
        
    }
    onPlanetList = () => {
        this.app.setListPage()
    }
    onInformation = () => {
        this.app.setInformationPage()
    }
    onCreatePlanet = () => {
        this.app.setCreatePage()
    }
}