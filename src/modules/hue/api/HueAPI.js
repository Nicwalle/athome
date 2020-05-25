class HueAPI {



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
