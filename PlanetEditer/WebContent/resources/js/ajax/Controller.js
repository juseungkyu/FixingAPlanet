// server message format
// const message = {
//     'err' : {
//         'message' : ''
//     } ,
//     'result' : {
//         'temp' : []
//     }
// }


export default class Controller {
    constructor(rootURI, serverURL) {
        this.rootURI = rootURI
        this.serverURL = serverURL

        this.init()
    }

    init() {

    }

    createURL(uri) {
        return this.serverURL + this.rootURI + '/' + uri
    }

    get = async (url) => {
        const json = await (
            await fetch(url, {
                method: 'GET'
            })
        ).json

        const result = {
            error: false,
            data: {}
        }

        if (json.err) {
            result.error = true
            result.data = json.err.message
        } else {
            result.data = json.result
        }

        return result;
    }

    post = async (url, data, contentType = 'application/json;charset=utf-8') => {
        let headers = {}

        if (contentType && contentType.length != 0) {
            headers = { 'Content-type': contentType }
        }

        if (contentType == 'file') {
            headers = {}
        }

        let json = null

        if (contentType === 'application/json;charset=utf-8') {
            json = await (
                await fetch(url, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(data),
                })
            ).json()
        } else {
            json = await (
                await fetch(url, {
                    method: 'POST',
                    headers,
                    body: data,
                })
            ).json()
        }

        const result = {
            error: false,
            data: {}
        }

        if (json.err) {
            result.error = true
            result.data = json.err.message
        } else {
            result.data = json.result
        }

        return output
    }
}