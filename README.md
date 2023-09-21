This repo is a simple demos of Electron.


![electron demo](/images/demo.png)


## How to use
---

First, clone the repo.

```
git clone https://github.com/lorilu-coder/electron-simple-demo.git
```

Install the dependencies.

```
npm install
```

Then, run the demo
```
npm run start
```


## Electron 集成 C++ Dll
---

Install the dependencies.

```
npm install --global windows-build-tools 

npm install -g node-gyp

```

write the code
```
const dllFilePath = path.resolve(__dirname, 'assets/dll/MYDLLDEMO.dll');
// 'ADD' 是c++定义的函数名，数组第一个参数是返回值类型，第二个参数是入参类型
var libm = ffi.Library(dllFilePath, {
    'add': [ 'int', [ 'int', 'int' ]]
});
// 加载 DLL文件,无需写扩展名,将DLL中的函数映射成JS方法,导出为JS方法 
let addResult = libm.add(1, 2);

```

问题及解决方案：

Q1： 安装windows-build-tools时，等待半天没反应

> 提前安装好python27 和 vs c++ 模块

Q2：node-ffi-napi引入报错 "Error in native callback"

> 卸载其他版本electron，使用electron20.3.8版本

Q3：Uncaught Error: Dynamic Symbol Retrieval Error: Win32 error 127

> https://blog.csdn.net/qq_36406831/article/details/121271656




