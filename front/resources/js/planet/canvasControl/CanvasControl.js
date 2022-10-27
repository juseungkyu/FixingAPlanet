export default class CanvasControl {
    constructor() {
        this.render = null
        this.init()
    }

    init() {
        this.seaLevel = 0

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

        this.randomDotCanvas = document.createElement('canvas')
        this.randomDotCanvas.width = 200
        this.randomDotCanvas.height = 50
        this.randomDotCtx = this.randomDotCanvas.getContext('2d')
    }

    /**
     * 랜덤하게 점이 찍혀있는 캔버스를 반환해줌
     * @param {String} color 
     * @param {Number} density 
     * @param {Number} angle
     * @returns 
     */
    getRandomDotCanvas(color, density) {
        this.randomDotCtx.clearRect(0,0,200,50)
        this.randomDotCtx.beginPath()
        this.randomDotCtx.fillStyle = color

        let randX = 0
        let randY = 0
        for(let i = 0; i < density; i++){
            randX = Math.random() * this.randomDotCanvas.width
            randY = Math.random() * this.randomDotCanvas.height
            this.randomDotCtx.rect(randX, randY, 2, 2)
        }

        this.randomDotCtx.fill();
        this.randomDotCtx.closePath();

        return this.randomDotCanvas
    }

    createCanvas() {
        const canvas = document.createElement('canvas')
        canvas.width = 1000
        canvas.height = 500
        canvas.getContext('2d').lineCap = 'round';

        return canvas
    }
    
    updateCanvas(ignoreTime = false) { 
        if(new Date() - this.lastUpdate < 40 && !ignoreTime) {
            return
        }
        this.bumpMapCtx.drawImage(this.continentBumpMapCanvas,0,0)
        this.mapCtx.drawImage(this.colorMapCanvas,0,0)

        this.pixelList = this.bumpMapCtx.getImageData(0,0,1000,500).data

        this.setSea(this.getPointList())
        
        this.lastUpdate = new Date()

        this.render.setMapNeedUpdateTrue()
        this.render.setBumpMapNeedUpdateTrue()
    }

    getPointList() {
        const pointList = []
        let node = []
        let isPrevNodeTrue = false
        // 모든 픽셀 검사
        for(let y = 0; y < 500; y+=1){
            for(let x = 0; x < 1000; x+=1){
                if(this.getPixel(x,y) < this.seaLevel){
                    // 저번 픽셀과 이어진다면
                    if(isPrevNodeTrue) {
                        // 색칠 길이 즐가
                        node[2]++
                    } else { // 아니라면
                        // 노드 생성, 추가
                        node = [x,y,1]
                        pointList.push(node)
                    }
                    isPrevNodeTrue = true
                } else {
                    isPrevNodeTrue = false
                }
            }
            // 초기화
            isPrevNodeTrue = false
        }
        return pointList
    }
    
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
            const [x,y,length] = pointList[i]
            this.bumpMapCtx.rect(x, y, length, 1);
            this.mapCtx.rect(x, y, length, 1);
        }

        this.bumpMapCtx.fill();
        this.bumpMapCtx.closePath();
        this.mapCtx.fill();
        this.mapCtx.closePath();
    }
}


// 예전 코드 혹시 몰라서 저장

// bfs인데 생각해보니까 걍 띄엄띄엄 검색하다가 바다 발견하면 실행하는거라
// 정확하게 하려면 그냥 하나씩 해야할듯
// find (x,y) {
//     const findNodes = []
//     const nextVisitList = []

//     nextVisitList.push([x,y])

//     while(nextVisitList.length !== 0) {
//         const node = nextVisitList.shift()
//         const [x,y] = node
//         if (this.rangeCheck(x,y) && this.getPixel(x,y) < this.seaLevel) {
//             this.pixelList[((y*1000) + x)*4] = 255
//             findNodes.push(node)

//             nextVisitList.unshift([x+1, y])
//             nextVisitList.unshift([x-1, y])
//             nextVisitList.unshift([x, y+1])
//             nextVisitList.unshift([x, y-1])
//         }
//     }

//     return findNodes
// }

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