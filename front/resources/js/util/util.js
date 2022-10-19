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

