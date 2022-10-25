import Draw from './Draw.js';

export default class DrawWater extends Draw {
    /**
     * onMouseDown 이벤트
     * @param {Render} render
     */
    constructor(render, canvasControl) {
        super(render, canvasControl)

        this.lineWidth = 2
        this.seaLevel = 0
        this.init()
    }

    init() {
        this.waterLevel = document.querySelector('.water-level')

        // this.addEvent()
    }

    addEvent() {
        this.waterLevel.addEventListener('mousemove', ()=>{
            const nextSeaLevel = parseFloat(this.waterLevel.value)

            if(nextSeaLevel === this.seaLevel) {
                this.seaLevel = nextSeaLevel
                this.changeSeaLevel()
            }            
        })
    }
    
    changeSeaLevel() {
        this.canvasControl.updateBumpMap()
    }

    checkColor(dot) {
        return dot.color[0] > this.seaLevel
    }

    changeBumpMap(i, j) {
        this.bumpctx.fillStyle = `rgb(${this.seaLevel}, ${this.seaLevel}, ${this.seaLevel})`
        this.bumpctx.fillRect(i,j,1,1)        
    }


}