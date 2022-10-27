function urlToImageDom(url) {
    const img = document.createElement('img')
    return new Promise((res, rej) => {
        img.src = url
        img.onload = () => {
            res(img)
        }
        img.onerror = () => {
            rej(false)
        }
    })
}

/**
 * '도'를 라디안으로 변환
 * @param {Number} degrees 
 * @returns 
 */
function getRadian(degrees) {
    return degrees * Math.PI / 180;
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

/**
 * 서로 다른 두 좌표 사이의 각도
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 */
function getTwoPointAngle(x1, y1, x2, y2) {
    const angle = Math.atan2(y2 - y1, x2 - x1);

    return (angle * 180) / Math.PI
}

/**
 * 서로 다른 두 좌표 사이의 각도를 라디안으로 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 */
function getTwoPointRadian(x1, y1, x2, y2) {
    const angle = Math.atan2(y2 - y1, x2 - x1);

    return angle
}

/**
 * 포인트 사이 거리 구하기
 * @param {Vector2} point1 
 * @param {Vector2} point2 
 */
function getLength(point1, point2) {
    const xLength = Math.pow(point2.x - point1.x, 2)
    const yLength = Math.pow(point2.y - point1.y, 2)

    return Math.sqrt(xLength + yLength)
}