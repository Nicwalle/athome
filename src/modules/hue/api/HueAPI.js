class HueAPI {

    baseAddress;

    constructor(apiAddress) {
        this.baseAddress = apiAddress;
        console.log(this.baseAddress)
    }

    createUser = (applicationName, deviceName) => {
        const deviceType = `${applicationName}#${deviceName}`
    };

    _makePOSTRequest = (uri = '', body={}) => {
        if (uri !== '' && uri[0] !== '/') uri = `/${uri}`;
        fetch(this.baseAddress + uri, {})
    }

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
