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
        if(new Date() - this.lastUpdate < 30) {
            return
        }

        this.bumpMapCtx.drawImage(this.continentBumpMapCanvas,0,0)
        this.mapCtx.drawImage(this.colorMapCanvas,0,0)

        this.pixelList = this.bumpMapCtx.getImageData(0,0,1000,500).data

        for(let y = 0; y < 500; y+=20){
            for(let x = 0; x < 1000; x+=20){
                if(this.getPixel(x,y) < this.seaLevel){
                    const pointList = this.find(x,y)
                    this.setSea(pointList)
                }
            }
        }
        this.render.setMapNeedUpdateTrue()
        this.render.setBumpMapNeedUpdateTrue()
        this.lastUpdate = new Date()
    }

    find (x,y) {
        const findNodes = []
        const nextVisitList = []

        nextVisitList.push([x,y])

        while(nextVisitList.length !== 0) {
            const node = nextVisitList.shift()
            const [x,y] = node
            if (this.rangeCheck(x,y) && this.getPixel(x,y) < this.seaLevel) {
                this.pixelList[((y*1000) + x)*4] = 255
                findNodes.push(node)

                nextVisitList.unshift([x+1, y])
                nextVisitList.unshift([x-1, y])
                nextVisitList.unshift([x, y+1])
                nextVisitList.unshift([x, y-1])
            }
        }

        return findNodes
    }

    // dfs인데 콜 스택 터져서 임시저장 중
    // find (x,y) {
    //     if(this.rangeCheck(x,y) && this.getPixel(x,y) < this.seaLevel){
    //         this.pointList.push([x,y])

    //         this.pixelList[((y*1000) + x)*4] = 255

    //         this.find.bind(this)(x+1, y)
    //         this.find.bind(this)(x-1, y)
    //         this.find.bind(this)(x, y+1)
    //         this.find.bind(this)(x, y-1)

    //         return this.pointList
    //     }
    // }
    
    rangeCheck(x,y) {
        if(x >= 0 && x < 1000 && y >= 0 && y < 500){
            return true
        }

        return false
    }

    getPixel(x,y) {
        return this.pixelList[((y*1000) + x)*4]
    }

    setSea(pointList) {
        this.bumpMapCtx.fillStyle = 'rgb(' + this.seaLevel + ',' + this.seaLevel + ',' + this.seaLevel + ')'
        this.bumpMapCtx.beginPath();
        this.mapCtx.fillStyle = 'rgb(0,0,255)'
        this.mapCtx.beginPath();

        for(let i = 0; i < pointList.length; i++){
            const [x,y] = pointList[i]
            this.bumpMapCtx.rect(x, y, 1, 1);
            this.mapCtx.rect(x, y, 1, 1);
        }

        this.bumpMapCtx.fill();
        this.bumpMapCtx.closePath();
        this.mapCtx.fill();
        this.mapCtx.closePath();
    }
}