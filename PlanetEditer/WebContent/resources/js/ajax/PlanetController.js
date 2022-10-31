import Controller from "./Controller.js";

export default class PlanetController extends Controller{
    constructor() {
        super()
    }

    getPlanetListAll = async () => await this.get('/planet/all')

    getPlanetList = async (start = 0, end = 10) => await this.get('/planet/all')
    
}