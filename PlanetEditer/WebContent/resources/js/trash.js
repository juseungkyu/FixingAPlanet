// 버리는 코드 모음

// bfs인데 생각해보니까 걍 띄엄띄엄 검색하다가 바다 발견하면 실행하는거라
// 정확하게 하려면 그냥 하나씩 해야할듯
bfsFind (x,y) {
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

dfsFind (x,y) {
    if(this.rangeCheck(x,y) && this.getPixel(x,y) < this.seaLevel){
        this.pointList.push([x,y])

        this.pixelList[((y*1000) + x)*4] = 255

        this.find.bind(this)(x+1, y)
        this.find.bind(this)(x-1, y)
        this.find.bind(this)(x, y+1)
        this.find.bind(this)(x, y-1)

        return this.pointList
    }
}


/**
 * 두 공간 벡터의 외적 계산
 * @param {Array} a 
 * @param {Array} b 
 * @returns 
 */
 function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

/**
 * 두 공간 벡터의 차
 * @param {Array} a 
 * @param {Array} b 
 * @returns 
 */
function vectorSubtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

/**
 * 정규화 (단위 백터로 변환)
 * @param {Array} v 
 * @returns 
 */
function normalize(v) {
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return length > 0.001 ? [v[0] / length, v[1] / length, v[2] / length] : [0,0,0]
}