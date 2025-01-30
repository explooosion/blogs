---
title: "Egret - Add third party lib 第三方套件使用方法 (以 paho-mqtt 為例)"
subtitle: "一個踢鐵板後十分 森77 的教學。"
date: "2018-02-09T00:00:00.000Z"
series: "egret"
tags: "egret","third-party","paho-mqtt","typescript","mqttws31.js"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/banner/greategretusfwstevehillebrand.jpg"
--- 

一個踢鐵板後十分 森77 的教學。

前方高能
----

先說一下，不是指這個 egret ...

[![greategretusfwstevehillebrand.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/greategretusfwstevehillebrand.jpg)](https://en.wikipedia.org/wiki/Egret)

*   [白鷺](https://en.wikipedia.org/wiki/Egret)

是這個 egret：

[![engine.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/engine.png)](https://www.egret.com/)

*   [Egret Engine](https://www.egret.com/)

什麼？ 沒聽過？

去下載就懂了。

[![1518119960_02773.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/1518119960_02773.png)](https://www.egret.com/products/)

_估計未來應該會很多這系列有關坑的文章..._

前言
--

由於這個框架使用 [TypeScript](https://www.typescriptlang.org/) ，

想當然爾，一定跟 [Angular](https://angular.io/) 一樣難搞...

怎樣難搞？

**不要問你會怕。**

我們都知道，要讓 TypeScript 能夠讀懂 JavaScript，

必須要定義好之間的[接口（Interfaces）](https://www.tslang.cn/docs/handbook/interfaces.html)，其實就是常見的 [.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html) 檔案

如果你使用的第三方套件有許多使用者，

大可不用擔心要怎麼寫 Interfaces。

因為大家都幫你好了！

*   如果你一直找不到，可以在 **[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)** 找看看。

由於原本是想在 egret 中使用 [Paho](https://www.eclipse.org/paho/)，但是一直狂踢鐵板，

最後成功後，當然要拿這個當範例囉～

本範例教學引用的第三方為 [Paho](https://www.eclipse.org/paho/) 中，提供 JavaScript 使用的套件：

*   [paho-mqtt](https://eclipse.org/paho/clients/js/)

補充一下 CDN 使用方式：

    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>

進入主題：第三方套件使用
------------

### 1\. 前置準備 - 建立專案

首先建立好專案，本範例以空的 Egret 專案做 demo。

強烈建議先用空專案做練習。

### 2\. 套件來源建立

在專案的上一層下指令：

    egret create_lib libsrc

*   資料夾務必在外面，不可將資料夾放在遊戲專案內

資料夾結構大致上如下：

![1518120877_79114.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/1518120877_79114.png)

*   EgretThirdLib：本範例專案 ( 此僅為遊戲專案，怕名稱誤導大家 )
*   libsrc：剛剛透過指令建立好的資料夾

在 libsrc 資料夾中，可以看到剛剛指令幫我們建立了兩個檔案：

*   package.json
*   tsconfig.json

### 3\. 準備第三方套件

然後準備好你的第三方套件，

本範例 [paho-mqtt](https://eclipse.org/paho/clients/js/) 可以在他的 [CDN](https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js) 下載。

*   paho-mqtt.js

如果你要自己寫接口，請在 libsrc 資料夾中，建立三個子資料夾 bin、src、libs。

如果你已經有現成的接口，僅需要建立 bin。

*   bin：編譯完成好的檔案
*   src：等待編譯完成的來源檔
*   libs：如果套件有額外引用其他套件，請放於此_（套件的套件，俗稱套套）_

由於本範例 [paho-mqtt](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/paho-mqtt) 已經有現成接口，

直接將[檔案下載](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/paho-mqtt)下來即可。包含了：

*   index.d.ts
*   module.d.ts

### 4\. 檔案放置

然後將以上三個檔案放入 libsrc / bin 資料夾中。

如果需要自行編譯的套件，則請放置於  libsrc / src 資料夾中。

### 5\. 修改設定檔

修改 package.json

    {
    	"name": "paho-mqtt",
    	"version": "5.0.2"
    }

*   name：你的套件名稱
*   version：egret 使用引擎版本（依個人環境選擇）

修改 tsconfig.json

    {
    	"compilerOptions": {
    		"target": "es5",
    		"noImplicitAny": false,
    		"sourceMap": false,
    		"declaration": true,
    		"outFile": "bin/paho-mqtt.js"
    	},
    	"include": [
    		"src"
    	]
    }

*   outFile：輸出的資料夾檔案名稱，本範例就是指 CDN 下載來的檔案。
*   src： 等待編譯的檔案，由於本範例使用的已經編譯好，其實不需要。

### 6\. 編譯檔案

由於本範例的檔案原先已經編譯好，**此步驟跳過**。

如果你用的套件還沒編譯，請於 libsrc 資料夾中，下指令編譯：

    egret build

*   編譯成功後可以在 bin 中看到檔案。

指令預期結果如下：

![1518124017_35888.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/1518124017_35888.png)

### 7\. 載入檔案

在遊戲專案內找到檔案 egretProperties.json，於 modules 引入第三方模組。

修改 egretProperties.json

        {
          "name": "paho-mqtt",
          "path": "../libsrc"
        }

*   name：請與 libsrc / bin 的 js 檔案同名。
*   path：路徑為上一層 ../。

千萬別將 libsrc 放到遊戲專案內，然後去改路徑 "path": "./libsrc" ，會出問題！！！

接著使用引入模組的指令，請於遊戲專案資料夾內下指令：

    egret build -e

*   \-e：透過此參數，會在遊戲專案內的 libs / modules 自動產生套件，

自動生成套件：

![1518124381_91686.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/1518124381_91686.png)

指令預期結果如下：

![1518124118_76813.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/1518124118_76813.png)

如果指令成功， manifest.json 檔案內也會自動追加一行：

    {
    	"initial": [
    		...
    		"libs/modules/paho-mqtt/paho-mqtt.js"
    	],
    	"game": [
    		...
    	]
    }

### 8\. 測試結果

本範例實作使用 paho-mqtt 連線 mqtt server。

編輯 Main.ts

    class Main extends egret.DisplayObjectContainer {
    
        private mqttClient: Paho.MQTT.Client;
        private serverAddress: string = 'your_mqtt_server';
        private serverPort: number = your_port;
        private clientId: string = 'your_client_id';
    
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
    
        private onAddToStage(event: egret.Event) {
    
            this.mqttClient = new Paho.MQTT.Client(this.serverAddress, this.serverPort, this.clientId);
            const connectionOptions = {
                keepAliveInterval: 30,
                onSuccess: (): void => { console.log('onSuccess', 'connecting success.'); },
                onFailure(message) { console.log('connection failed: ' + message.errorMessage); }
            }
            this.mqttClient.connect(connectionOptions);
        }
    }

執行結果：

在偵錯主控台可以看到輸出，連線成功！：

[![1518124577_06069.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/1518124577_06069.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/9a99c20c-c9f5-4e7b-8f35-c82a71f0ec60/1518124577_06069.png)

或是F5編譯後，打開 debug mode F6，就可以看到連線成功訊息。

![1518124543_29695.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Egret%20-%20Add%20third%20party%20lib%20%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95%20(%E4%BB%A5%20paho-mqtt%20%E7%82%BA%E4%BE%8B)/1518124543_29695.png)

結語
--

馬的發顆，有夠猥瑣．．．欸不，是繁瑣！

### 參考資料

相信我，你會看得很累又很心酸的。

*   [Egret Developer - 库项目配置](http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/libraryProject/index.html)
*   [模块化配置和第三方库的使用方法](http://www.bijishequ.com/detail/539208?p=)
    
*   [wiki - Egret](https://en.wikipedia.org/wiki/Egret)（馬的看到白鷺就會牙起來）
    

有勘誤之處，不吝指教。ob'\_'ov