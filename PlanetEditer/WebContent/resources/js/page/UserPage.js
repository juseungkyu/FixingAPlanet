import UserController from '../ajax/UserController.js';

/**
 * 로그인, 회원가입 등 세션을 제어하는 페이지
 * @param {App} app 이 페이지를 생성할 App
 */
export default class UserPage {
    constructor(app) {
        console.log('CanvasPage start')
        this.app = app
        this.container = document.querySelector('.list-container')
        this.controller = new PlanetController()

        this.init()
    }

    init() {

        this.addEvent()
    }

    addEvent() {
        this.mouseDown = false

        this.scrollBar.addEventListener('mousedown', ()=>{
            this.mouseDown = true
        })
        window.addEventListener('mousemove', (e)=>{
            if(!this.mouseDown) {
                return
            }
            e.preventDefault()
            this.onScroll(e)
        })
        window.addEventListener('mouseup', (e)=>{
            if(!this.mouseDown) {
                return
            }
            this.mouseDown = false
            this.onScroll(e)
        })
        window.addEventListener('mouseleave', ()=>{
            this.mouseDown = false
        })

        window.addEventListener('resize', (e)=> {
            this.onScroll({movementY : 0}, true)
        })
    }

    onScroll(e, test = false) {
        if(this.table.clientHeight == this.table.scrollHeight){
            if(!test){
                alert('요소가 충분하지 않아 스크롤 할 수 없습니다.')
            }
            
            this.mouseDown = false
            return
        }
        this.scrollPosition -= e.movementY

        if(this.scrollPosition > 0){
            this.scrollPosition = 0
        } else if(this.scrollPosition < -this.scroll.clientHeight) {
            this.scrollPosition = -this.scroll.clientHeight
        }

        this.scrollBar.style.transform = `rotateZ(270deg) translateX(${this.scrollPosition}px)`
        const ratio = (this.table.scrollHeight - this.table.clientHeight) / this.scroll.clientHeight
        const scrollValue = ratio * (-this.scrollPosition)

        this.table.scrollTo(0, scrollValue)
    }

    async onCall(planetId) {
        if(planetId == null){
            return false
        }

        const returnData = await this.controller.getPlanet(planetId)
        if(returnData.error){
            alert('행성을 불러오는 중 오류가 발생했습니다.')
        }
        console.log(returnData)
    }

    setList(list) {
        this.table.innerHTML = ''
        
        list.forEach(cardData => {
            this.table.appendChild(this.createCard(cardData))
        })
    }

    createCard(cardData) {
        const card = document.createElement('div')
        card.classList.add('card')
        card.classList.add('d-flex')

        const {canvas, planetContent, planetId, planetTitle, playerId} = cardData
        const {canvasBumpMapAddr, canvasCloudMapAddr, canvasContinentMapAddr, canvasId, canvasMapAddr} = canvas

        card.innerHTML = `
            <img src="./resources/image/canvas/map/${canvasMapAddr}" alt="지도">
            <div class="text">
                <h3>${planetTitle}</h3>
                <p>${planetContent}</p>
                <p class="creater">제작자 : ${playerId}</p>
            </div>
        `

        this.cardAddEvent(card, planetId)

        return card
    }

    cardAddEvent(card, planetId) {
        
    }

    on = () => {

    }
}