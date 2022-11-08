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
     * Object를 FormData로 만들어 반환합니다.
     * @param {Object} obj
     * @return FormData
     */
    objectToFormData(obj) {
        const formData = new FormData()
        const keyList = Object.keys(obj)

        keyList.forEach(x => {
            formData.set(x, obj[x]) 
        })

        return formData
    }

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
     * @returns {
     *      "error" : Boolean,
     *      "data" : Object
     * }
     */
    async post (url, data) {
        const formData = this.objectToFormData(data)
        console.log(JSON.stringify(data))
        
        const json = await (
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                body: 'json='+JSON.stringify(data),
            })
        ).json()

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

    /**
     * put 방식의 fetch를 보냄
     * @param {String} url 
     * @param {Object} data
     * @returns {
     *      "error" : Boolean,
     *      "data" : Object
     * }
     */
    async put (url, data) {
        const json = await (
            await fetch(url, {
                method: 'POST',
                body: this.objectToFormData(data),
            })
        ).json()

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