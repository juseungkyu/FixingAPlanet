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
    getPlanetListAll = async () => await this.get('/planet/all?type=all')

    /**
     * 행성 리스트를 반환
     * @returns  {
     *    'error' = false
     *    'data' : []
     *  }
     */
    getMyPlanetList = async () => await this.get('/planet/all?type=my')

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

    /**
     * 행성 하나를 생성함
     * @param {Number} planetId
     * @param {
     *      "bumpMap" : Canvas,
     *      "cloudMap" : Canvas,
     *      "colorMap" : Canvas,
     *      "continentMap" : Canvas, 
     *      "map" : Canvas,
     * } planetMaps
     * @returns {
     *    'error' = false,
     *    'data' : {
     *          "message" : "저장되었습니다."
     *     },
     *  }
     * @returns {
     *    'error' = true,
     *    'data' : {
     *          "message" : "저장을 실패했습니다."
     *     },
     *  } 
     */
    async savePlanet(planetId, planetMaps)  {
        const planetKeys = Object.keys(planetMaps)
        const planetFiles = {}
        planetKeys.forEach(x=>{
            planetFiles[x] = convertCanvasToFile(planetMaps[x], x+'.png')
        })

        console.log(planetFiles)
        return await this.postWithImageFile('/planet/save', {planetId}, planetFiles)
    }

}