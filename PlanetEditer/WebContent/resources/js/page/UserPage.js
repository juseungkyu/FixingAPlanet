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

        this.logTabChangeBtn = this.container.querySelector('.login-btn')
        this.joinTabChangeBtn = this.container.querySelector('.join-btn')

        this.loginSubmit = this.container.querySelector('.user-login-btn')
        this.joinSubmit = this.container.querySelector('.create-user-btn')

        this.loginForms = {
            id : this.container.querySelector('.user-login-id'),
            pw : this.container.querySelector('.user-login-pw'),
        }

        this.joinForms = {
            id : this.container.querySelector('.user-join-id'),
            pw : this.container.querySelector('.user-join-pw'),
            name : this.container.querySelector('.user-join-name'),
        }

        this.addEvent()
    }

    addEvent() {
        // TAB 변경
        this.logTabChangeBtn.addEventListener('click', ()=>{
            this.changeTab('login')   
        })
        this.joinTabChangeBtn.addEventListener('click', ()=>{
            this.changeTab('join')   
        })

        this.loginSubmit.addEventListener('click', this.login)
        this.joinSubmit.addEventListener('click', this.join)
    }

    login(){

    }

    join(){

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