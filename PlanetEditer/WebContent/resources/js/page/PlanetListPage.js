import PlanetController from '../ajax/PlanetController.js';

export default class PlanetListPage {
    constructor(app) {
        console.log('PlanetListPage start')
        this.app = app
        this.container = document.querySelector('.list-container')
        this.controller = new PlanetController()

        this.init()
    }

    init() {
        this.table = this.container.querySelector('.planet-table')
        this.addEvent()
    }

    async onCall() {
        this.app.setWaitMode()

        // const a = await this.controller.getPlanetListAll()
        // if(a.error){
        //     alert('행성 리스트를 불러오는 중 오류가 발생했습니다.')
        // }
        // console.log(a)

        const testData = {
            "error" : false,
            "data": [
                {
                    "planetTitle": "지구",
                    "canvas": {
                        "canvasId": 2,
                        "canvasBumpMapAddr": "/asdf.png",
                        "canvasContinentMapAddr": "/asdf.png",
                        "canvasMapAddr": "/asdf.png",
                        "canvasCloudMapAddr": "/asdf.png"
                    },
                    "planetContent": "가장 아름다운 행성 - 지구는 내가 먼저 만듦 ㅅㄱ",
                    "planetId": 1,
                    "playerId": "admin"
                },
                {
                    "planetTitle": "지구",
                    "canvas": { "canvasId": 1, 
                        "canvasBumpMapAddr": "/asdf.png",
                        "canvasContinentMapAddr": "/asdf.png",
                        "canvasMapAddr": "/asdf.png",
                        "canvasCloudMapAddr": "/asdf.png" 
                    }, 
                    "planetContent": "가장 아름다운 행성 - 지구는 내가 먼저 만듦 ㅅㄱ", 
                    "planetId": 2,
                    "playerId": "admin"
                }
            ]
        }

        this.setList(testData.data)

        this.app.unsetWaitMode()
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

        return card
    }

    addEvent() {

    }

    on = () => {

    }
}