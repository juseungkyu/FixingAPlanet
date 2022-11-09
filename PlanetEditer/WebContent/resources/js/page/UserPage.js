import UserController from '../ajax/UserController.js';

/**
 * 로그인, 회원가입 등 세션을 제어하는 페이지
 * @param {App} app 이 페이지를 생성할 App
 */
export default class UserPage {
    constructor(app) {
        console.log('UserPage start')
        this.app = app
        this.init()
    }

    init() {
        this.container = document.querySelector('.user-container')
        this.controller = new UserController()

        this.tab = {
            login : this.container.querySelector('.login'),
            join : this.container.querySelector('.join')
        }

        this.addEvent()
    }

    addEvent() {

    }

    changeTab(type) {
        const keys = Object.keys(this.tab)
        keys.forEach(x=> {
            this.tab[x].classList.remove('active')
        })
        this.tab[type].classList.add('active')
    }

    /**
     * 호출 되었을 때 실행
     * @param {String} type 'login' or 'join'
     */
    onCall(type) {
        this.changeTab(type)
    }
}