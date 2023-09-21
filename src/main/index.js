const { ipcRenderer } = require('electron')
const fs = require('fs')
const xml2js = require('xml2js')
const soap = require('soap')


/**
 * 1.打开新窗口
 */
function handleOpenWindow() {
    const data =  {
        imgUrl: 'files/99501MB01202106240002.jpg',
        isImgType: false,
        picno: '99501MB01202106240002'
    }
    ipcRenderer.send('openWindow', data)
}


/**
 * 2.解析XML文件
 */
function handleParseXml() {
    const filepath = './assets/xml/demoxml.xml'
    const xml = fs.readFileSync(filepath, 'utf-8')
    const builder = new xml2js.Builder()

    try {
        const parser = new xml2js.Parser();
        parser.parseString(xml, function (err, result) {
            const xmlString = builder.buildObject(result)
            alert(xmlString)
        });
    } catch (err) {
        console.log(err)
    }
}


/**
 * 3.解析JSON文件
 */
function handleParseJson(){
    const filepath = './assets/json/demojson.json'
    try {
        const json = fs.readFileSync(filepath, 'utf8')
        const jsonData = JSON.parse(json)
        const jsonString = JSON.stringify(jsonData, null, 2)
        alert(jsonString)
    } catch (err) {
        console.log(err)
    }
}

/**
 * 4.调用Webservice
 */
function handleUseWebservice() {
    const url = 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl'
    soap.createClient(url, function (err, client) {
        if (err) {
            console.error(err)
            return
        }
        client.getWeatherbyCityName({ theCityName: '58367' }, function (err, result) {
            if (err) {
                console.log(err)
                return
            }
            const jsonString = JSON.stringify(result, null, 2)
            alert(jsonString)
        })
    })
}