const { ipcRenderer } = require('electron')
const fs = require('fs')
const xml2js = require('xml2js')
const soap = require('soap')
const ffi = require('ffi-napi')
const path = require('path')
let { arch } = process // x64
console.log(arch)


/**
 * 1.打开新窗口
 */
function handleOpenWindow() {
    const data = {
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
function handleParseJson() {
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

/**
 * 5.调用C++ DLL
 */
function handleUseC() {
    const dllFilePath = path.resolve(__dirname, 'assets/dll/MYDLLDEMO.dll');
    // 'ADD' 是c++定义的函数名，数组第一个参数是返回值类型，第二个参数是入参类型
    var libm = ffi.Library(dllFilePath, {
        'add': [ 'int', [ 'int', 'int' ]]
    });
    // 加载 DLL文件,无需写扩展名,将DLL中的函数映射成JS方法
    // 导出为JS方法 
    let addResult = libm.add(1, 2);
    alert(addResult)
}