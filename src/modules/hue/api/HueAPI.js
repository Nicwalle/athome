class HueAPI {

    baseAddress;

    constructor(baseAddress, username=null) {
        this.baseAddress = baseAddress;
        this.username = username;
    }

    createUser = (applicationName, deviceName) => {
        const deviceType = `${applicationName}#${deviceName}`;
        return this._makeUnauthenticatedPOSTRequest('', {'devicetype': deviceType})
            .then(response => {
                if ("error" in response[0] && response[0].error.type === 101) {
                    throw new Error()
                }
                this.username = response[0].success.username;
                return this.username
            });

    };

    isBridgeAndUserValid = async () => {
        let controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        return this._makeGETRequest('', { signal: controller.signal })
            .then(result => {
                clearTimeout(timeoutId);
                return !(Array.isArray(result) && "error" in result[0])
            })
            .catch(_ => false);
    };

    _makeGETRequest = (uri = '', body= {}) => {
        if (uri !== '' && uri[0] !== '/') uri = `/${uri}`;
        console.log("Reaching uri", `${this.baseAddress}/${this.username}${uri}`)
        return fetch(`${this.baseAddress}/${this.username}${uri}`, body)
            .then(response => response.json())
    };

    _makeUnauthenticatedPOSTRequest = (uri = '', body={}) => {
        if (uri !== '' && uri[0] !== '/') uri = `/${uri}`;
        return fetch(this.baseAddress + uri, {
            method: 'POST',
            headers: {Accept: 'application/json'},
            body: JSON.stringify(body)
        }).then(response => response.json())
    };

    _makePOSTRequest = (uri = '', body={}) => {
        if (uri !== '' && uri[0] !== '/') uri = `/${uri}`;
        return this._makePOSTRequest(`/${this.username}${uri}`, body);
    };

    getBulbs = () => this._makeGETRequest('/lights')
        .then((lightsDictionary) => {
            const lights = [];
            for (let id in lightsDictionary) {
                lights.push({...lightsDictionary[id], id:id})
            }
            return lights;
        });

    getGroups = () => this._makeGETRequest('/groups')
        .then((lightsDictionary) => {
            const lights = [];
            for (let id in lightsDictionary) {
                lights.push({...lightsDictionary[id], id:id})
            }
            return lights;
        });

}

const discoverBridge = async () => {
    return fetch('https://discovery.meethue.com', {
        headers: {accept: 'application/json'}
    }).then(response => response.json())
};

module.exports = {
    discoverBridge,
    HueAPI
};
