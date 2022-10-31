export default class MainPage {
    constructor(app) {
        this.app = app
        this.container = document.querySelector('.main-container')

        this.init()
    }

    init(){
        this.loginBtn = this.container.querySelector('.login-btn')
        this.joinBtn = this.container.querySelector('.join-btn')
        this.planetListBtn = this.container.querySelector('.planet-list-btn')
        this.informationBtn = this.container.querySelector('.information-btn')

        this.addEvent()
    }

    addEvent() {
        this.loginBtn.addEventListener('click', this.onLogin)
        this.joinBtn.addEventListener('click', this.onJoin)
        this.planetListBtn.addEventListener('click', this.onPlanetList)
        this.informationBtn.addEventListener('click', this.onInformation)
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
}