class CanvasControl {
    constructor() {
        this.init()
    }

    init() {
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
        this.colorMapCtx.fillStyle = "rgb(127,127,127)"
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

        return canvas
    }
    
    

    

}