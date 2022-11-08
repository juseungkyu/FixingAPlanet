// server message format
// const message = {
//     'err' : {
//         'message' : ''
//     } ,
//     'result' : {
//         'temp' : []
//     }
// }

// client message format
// const data = {
//     'error' = false
//     'data' : {
//         'tempList' : []
//     }
// }


export default class Controller {
    constructor() {}

    /**
     * get 방식의 fetch를 보냄
     * @param {String} url 
     * @returns {
     *      "error" : Boolean,
     *      "data" : Object
     * }
     */
    async get (url) {
        const result = {
            error: false,
            data: {}
        }
        
        const response = await fetch(url, {
            method: 'GET'
        })

        const json = await (response).json()

        if (json.err) {
            result.error = true
            result.data = json.err.message
        } else {
            result.data = json.result
        }

        return result;
    }

    /**
     * delete 방식의 fetch를 보냄
     * @param {String} url 
     * @returns {
     *      "error" : Boolean,
     *      "data" : Object
     * }
     */
    async delete (url) {
        const result = {
            error: false,
            data: {}
        }
        
        const response = await fetch(url, {
            method: 'DELETE'
        })

        const json = await (response).json()

        if (json.err) {
            result.error = true
            result.data = json.err.message
        } else {
            result.data = json.result
        }

        return result;
    }

    /**
     * post 방식의 fetch를 보냄
     * @param {String} url 
     * @param {Object} data
     * @param {String} contentType 'application/json;charset=utf-8'
     * @returns {
     *      "error" : Boolean,
     *      "data" : Object
     * }
     */
    async post (url, data, contentType = 'application/json;charset=utf-8') {
        let headers = {}

        if (contentType && contentType.length != 0) {
            headers = { 'Content-type': contentType }
        }

        if (contentType == 'file') {
            headers = {}
        }

        let json = null

        console.log(JSON.stringify(data))

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

        console.log(result)

        return result
    }

    /**
     * put 방식의 fetch를 보냄
     * @param {String} url 
     * @param {Object} data
     * @param {String} contentType 'application/json;charset=utf-8'
     * @returns {
     *      "error" : Boolean,
     *      "data" : Object
     * }
     */
    async put (url, data, contentType = 'application/json;charset=utf-8') {
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
                    method: 'PUT',
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

        return result
    }
}