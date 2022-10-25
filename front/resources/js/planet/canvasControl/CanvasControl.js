export default class CanvasControl {
    constructor() {
        this.render = null
        this.init()
    }

    init() {
        this.seaLevel = 100

        this.mapCanvas = this.createCanvas()
        this.mapCtx = this.mapCanvas.getContext('2d')
        this.mapCtx.fillStyle = "rgb(255,255,255)"
        this.mapCtx.fillRect(0, 0, 1000, 500)

        this.bumpMapCanvas = this.createCanvas()
        this.bumpMapCtx = this.bumpMapCanvas.getContext('2d')
        this.bumpMapCtx.fillStyle = "rgb(127,127,127)"
        this.bumpMapCtx.fillRect(0, 0, 1000, 500)

        this.colorMapCanvas = this.createCanvas()
        this.colorMapCtx = this.colorMapCanvas.getContext('2d')
        this.colorMapCtx.fillStyle = "rgb(255,255,255)"
        this.colorMapCtx.fillRect(0, 0, 1000, 500)

        this.continentBumpMapCanvas = this.createCanvas()
        this.continentBumpMapCtx = this.continentBumpMapCanvas.getContext('2d')
        this.continentBumpMapCtx.fillStyle = "rgb(127,127,127)"
        this.continentBumpMapCtx.fillRect(0, 0, 1000, 500)
    }

    createCanvas() {
        const canvas = document.createElement('canvas')
        canvas.width = 1000
        canvas.height = 500
        canvas.getContext('2d').lineCap = 'round';

        return canvas
    }
    
    updateBumpMap() {
        if(new Date() - this.lastUpdate < 60) {
            return
        }

        this.bumpMapCtx.drawImage(this.continentBumpMapCanvas,0,0)

        const pixelList = this.bumpMapCtx.getImageData(0,0,1000,500).data
        // console.log(end - start)

        for(let y = 0; y < 500; y+=1){
            for(let x = 0; x < 1000; x+=1){
                const pixel = pixelList[((y*1000) + x)*4]
                if(pixel < this.seaLevel){
                    this.setSea(x, y)
                }
            }
        }

        this.render.setMapNeedUpdateTrue()
        this.render.setBumpMapNeedUpdateTrue()
        this.lastUpdate = new Date()
    }

    setSea(x,y) {
        this.bumpMapCtx.fillStyle = `rgb(${this.seaLevel}, ${this.seaLevel}, ${this.seaLevel})`
        this.bumpMapCtx.fillRect(x,y,1,1)
        this.mapCtx.fillStyle = 'rgb(0,0,255)'
        this.mapCtx.fillRect(x,y,1,1)
    }
}