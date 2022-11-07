import Controller from "./Controller.js";

export default class PlanetController extends Controller {
    constructor() {
        super()
    }

    /**
     * 행성 리스트를 반환
     * @returns  {
     *    'error' = false
     *    'data' : []
     *  }
     */
    getPlanetListAll = async () => await this.get('/planet/all')

    /**
     * 행성 하나의 정보를 가져옴
     * @param {String} planetId 행성 아이디
     * @returns {
     *    'error' = false,
     *    'data' : {
     *         'planetTitle' : string,
     *         'canvas' : {
     *              'canvasBumpMapAddr' : url,
     *              'canvasContinentMapAddr' : url,
     *              'canvasCloudMapAddr' : url,
     *              'canvasMapAddr' : url,
     *         },
     *         'planetContent' : string,
     *         'planetId' : number,
     *         'playerId' : string,
     *     },
     *  }
     */
    getPlanet = async (planetId) => await this.get(`/planet?planetId=${planetId}`)

    /**
     * 행성 하나를 생성함
     * @param {String} title 
     * @param {String} content 
     * @returns {
     *    'error' = false,
     *    'data' : {
     *         'planetTitle' : string,
     *         'canvas' : {
     *              'canvasBumpMapAddr' : url,
     *              'canvasContinentMapAddr' : url,
     *              'canvasCloudMapAddr' : url,
     *              'canvasMapAddr' : url,
     *         },
     *         'planetContent' : string,
     *         'planetId' : number,
     *         'playerId' : string,
     *     },
     *  }
     */
    createPlanet = async (title, content) => await this.post(`/planet`, {title, content})
}