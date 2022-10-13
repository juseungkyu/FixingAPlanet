function urlToImageDom(url) {
    const img = document.createElement('img')
    return new Promise((res, rej)=> {
        img.src = url
        img.onload = ()=>{
            res(img)
        }   
        img.onerror = ()=>{
            rej(false)
        }
    })
}