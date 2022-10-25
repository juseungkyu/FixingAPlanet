class FindArea {
    constructor(grid, seaLevel){
        this.grid = []
        this.pointList = []
        for(let i = 0; i < grid.length; i++){
            const col = []

            for(let j = 0; j < grid[0].length; j++){
                if(grid[i][j].includes(key)){
                    col.push(1)
                } else {
                    col.push(0)
                }
            }

            this.grid.push(col)
        }
    }

    getAreaPointList (){
        const result = []

        this.grid.forEach((col, i) => {
            col.forEach((cell, j) => {
                if(cell === 1){
                    this.pointList = []
                    this.find.bind(this)(i, j)

                    result.push({
                        pointList : this.pointList,
                        avgPoint : this.getAvgPoint(this.pointList)
                    })
                }
            })
        });

        return result
    }

    find (i,j) {
        if(this.rangeCheck(i,j) && this.grid[i][j] === 1){
            this.pointList.push({
                x : i,
                y : j
            })
            this.grid[i][j] = 0

            this.find.bind(this)(i+1, j)
            this.find.bind(this)(i-1, j)
            this.find.bind(this)(i, j+1)
            this.find.bind(this)(i, j-1)
        }

        return this.pointList
    }

    // 그리드 밖으로 나가는지 확인
    rangeCheck(i,j) {
        if(i >= 0 && i < this.grid.length && j >= 0 && j < this.grid[0].length){
            return true
        }

        return false
    }
}