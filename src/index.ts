

const { parse } = require("./plantuml")
const plantumlEncoder = require('plantuml-encoder')

const runBuml = () => {
    const encodedData = new URLSearchParams(window.location.search).get("code")
    if (encodedData === null) {
        return
    }
    const decodedData = plantumlEncoder.decode(encodedData)
    alert(decodedData)
}

module.exports.runBuml = runBuml