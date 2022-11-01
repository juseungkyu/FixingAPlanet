import PlanetController from '../ajax/PlanetController.js';

export default class PlanetListPage {
    constructor(app) {
        console.log('PlanetListPage start')
        this.app = app
        this.container = document.querySelector('.list-container')
        this.controller = new PlanetController()

        this.scrollPosition = 0

        this.init()
    }

    init() {
        this.table = this.container.querySelector('.planet-table')
        this.scroll = this.container.querySelector('.scroll-bar')
        this.scrollBar = this.scroll.querySelector('i')

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
        if(!test && this.table.clientHeight == this.table.scrollHeight){
            alert('요소가 충분하지 않아 스크롤 할 수 없습니다.')
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

        this.cardAddEvent()

        return card
    }

    cardAddEvent() {

    }

    on = () => {

    }
}