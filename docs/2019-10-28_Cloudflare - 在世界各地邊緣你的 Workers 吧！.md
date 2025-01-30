---
title: "Cloudflare - 在世界各地邊緣你的 Workers 吧！"
date: "2019-10-28"
tags: [cloudflare, workers, serverless, isomorphic, edge]
view: "2610"
history: "0"
group: "Cloudflare"
banner: "images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/banner/1572227963_93755.png"
---

邊緣人在世界各地邊緣程式碼。

cloudflare 推出 Workers ，每葛人都該來體驗邊緣運算的快感！

[![1572227963_93755.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572227963_93755.png)](https://blog.cloudflare.com/cloudflare-workers-unleashed/)

*   ref：[Everyone can now run JavaScript on Cloudflare with Workers](https://blog.cloudflare.com/cloudflare-workers-unleashed/)

* * *

前言
--

最近因為 [SideProject](https://github.com/explooosion/browndust-share) 而買了新網址，又來到 [Cloudflare](https://www.cloudflare.com/zh-tw/) 設定 DNS 了。

在 google 強大的推薦演算法之下，看到了 [Cloudflare Workers](https://www.cloudflare.com/zh-tw/products/cloudflare-workers/) 的產品廣告，

才發現原來服務已經推出一年多了～還不趕快「[跟著大哥走](https://gnn.gamer.com.tw/detail.php?sn=160363)！」

* * *

目錄
--

1.  [介紹喇賽](#1)
2.  [實作說明](#2)
3.  [以 Dashboard 方式建立](#3)
4.  [以 CLI 方式建立](#4)

一、介紹喇賽
------

Cloudflare Workers 在去年 2018 年初推出 beta ，於 3 月正式 release 推出 🎉！

Workers 以邊緣運算  ( [Edge computing](https://zh.wikipedia.org/wiki/%E9%82%8A%E7%B7%A3%E9%81%8B%E7%AE%97) ) 運作，目前在世界各地有很多節點 ( node )。

根據官方指出，目前服務已經擴展到 90 個國家，194 個城市。

[![1572229745_14051.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572229745_14051.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572229745_14051.png)

*   ref：[Cloudflare Global Network Expands to 193 Cities](https://blog.cloudflare.com/scaling-the-cloudflare-global/)
*   ref：[The Cloudflare Global Anycast Network](https://www.cloudflare.com/network/) ( updated to 194 )

你知道嗎？　臺灣也有站點哦！目前設置在台北，是第 77 個 data center！

*   [台北：CloudFlare的第七十七個數據中心已經上線喔！](https://blog.cloudflare.com/taipei/)
*   [Cloudflare System Status](https://www.cloudflarestatus.com)

[​](https://www.cloudflarestatus.com)Cloudflare Workers 也可以叫做 Web Workers，

是基於 W3C 標準規範的 [Service Worker](https://w3c.github.io/ServiceWorker/) 所開發而來，因此主要以 JavsScript 進行撰寫。

對於要開始火紅的 wasm ( [Webassembly](https://webassembly.org/)) 更不能放過，

Cloudflare 在去年 10 月開始支援 Webassembly，

開發者可以將 C/C++、Rust、Go 等語言 Compile 成 wasm，再進行提交。

*   [WebAssembly on Cloudflare Workers](https://blog.cloudflare.com/webassembly-on-cloudflare-workers/)

Workers 可以做些什麼事情？

大概就是跟 [AWS Lambda](https://aws.amazon.com/tw/lambda/) 87% 相似。

Workers 這葛 [serverless](https://en.wikipedia.org/wiki/Serverless_computing) 服務，除了主要提供 cache ，

還可以建置各種的 function、rewrite、redirect、A/B testing ...，

當然也可以渲染 json 或是 html。

如果你想將網頁佈署在 Worker 上，那就建議使用 [Workers Sites](https://workers.cloudflare.com/sites)。

由於要將部署的網站上傳到 [storage](https://www.cloudflare.com/products/workers-kv/) 需要付費，因此要自行斟酌看看費用惹。

[![1572239290_13745.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572239290_13745.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572239290_13745.png)

如果不想付費...

那你就得想辦法把網站程式碼全部塞進 JS 裡面：

    async function handleRequest(request) {
      const init = {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      }
      return new Response(someHTML, init)
    }
    addEventListener('fetch', event => {
      return event.respondWith(handleRequest(event.request))
    })
    const someHTML =  `<!DOCTYPE html>
    <html>
      <body>
      <h1>Hello World</h1>
      <p>This is all generated using a Worker</p>
      <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
      ></iframe>
      </body>
    </html>
    `

上述的作法，其實就是 SSR、isomorphic 的概念，

有興趣可以參考專案：**[isomorphic-worker-webpack](https://github.com/explooosion/isomorphic-worker-webpack)**

二、實作說明
------

本文實作範例，其實跟官網步驟一樣，可以看看 [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)。

目前文件提供不少 [Templates](https://developers.cloudflare.com/workers/templates/) 範例，可以試著在裡面發散構想。

搞不好你還可以因此發 PR 給 [Cloudflare](https://github.com/cloudflare)！

Worker 的建立，可以選擇到 Dashboard 頁面建立或是使用  CLI 建置：

#### \[ Dashboard \]

Cloudflare 提供了後台管理系統，讓你可以直接在網頁上撰寫程式碼並測試，

但是無法提供程式碼的預處理（例如：webpack, babel, bundle, minify）。

#### \[ CLI \]

利用套件管理系統 nodejs ( npm ) 安裝腳本指令套件，或使用 rust ( cargo )，

在 local 寫好專案後，利用 build，將 ES6 編譯壓縮，再進行 publish。

兩者各有好處，以下分別簡單步驟說明：

在開始之前，請務必到 [Cloudflare](https://dash.cloudflare.com/sign-up) 註冊帳號。

三、以 Dashboard 方式建立
------------------

在登入後，請至首頁右側，[點選](https://dash.cloudflare.com) Workers。

![1572263239_80575.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572263239_80575.png)

在初次進入後台時，

系統會要求你設定 subdomain 名稱，作為 Workers 部署之後的雲端網址，

設定之後將無法更改！... 筆者手殘 ... 好想更改啊！！！！

[![1572263596_44201.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572263596_44201.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572263596_44201.png)

*   圖源：[An Introduction to Cloudflare Workers](https://www.sitepoint.com/cloudflare-workers/)

進入 Workers Dashboard 後，捲到最下方會有 Account ID，

請複製或留意取得方式，如果是使用 CLI 建立，則會需要提供該 ID。

別擔心，隨時都可以到後台取得 Account ID。

[![1572264547_79724.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572264547_79724.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572264547_79724.png)

接著開始建立新的 Worker，很明顯可以看到一顆按鈕 Create a Worker，點下去。

![1572264698_52554.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572264698_52554.png)

進入編輯頁面後，左上角圖片紅框處可以看到系統隨機給予的 Worker Name，當然，是可以更改的！

![1572264812_61768.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572264812_61768.png)

程式碼編輯區塊可以看到已經有 Sample Code，右半邊則是 Preview。

大多 Worker 都是建立 fetch 的事件監聽，當 user 進行頁面 Request 的時候，就會觸發。

在範例中，Response 會直接渲染文字以及 http-status 回去。

此外也可以看到 Wasm 的頁籤按鈕，你可以直接上傳編譯好的 wasm 檔案上去。

[![1572265049_79675.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572265049_79675.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572265049_79675.png)

接著在下方可以看見，系統預設已經幫我們啟用：

Will be deployed to your workers.dev subdomain

如果不使用，則不會發佈到帶有 .dev 的網址。

除非你要指定到自己的網域，否則就要啟用他送你的 workers.dev subdomain。

![1572265329_13015.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572265329_13015.png)

再點選 Save and Deploy 之後，系統會提示部署後的網址。

[![1572265551_99108.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572265551_99108.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572265551_99108.png)

接著你可以點選頁面左上角 Cloudflare Logo 下方的左箭頭〈，返回列表。

![1572265769_01402.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572265769_01402.png)

回到 Workers Dashboard，就會看到新的 Worker 已經在列表中。

[![1572265651_79275.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572265651_79275.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572265651_79275.png)

如果你點開瀏覽，應該會發現目前無法以 SSL 方式連入，請改用 http:// 即可！

[![1572266238_38023.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572266238_38023.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572266238_38023.png)

最後就可以成功看到頁面出現：

hello world

如果想要使用 SSL 方式連入，請先準備好你的 Domain。

### ※ 自訂 Worker Domain

以下 Cloudflare 是筆者自己的網域範例。

先切換到自己註冊的 DNS 管理後台，

接著點選 Workers，下方新增路由，Add route。

[![1572267150_73665.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572267150_73665.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572267150_73665.png)

在表單中，Route 是你 DNS 的路徑規則，

robby.tw 是我的域名，前面的 test 就是你指定的 route。

\* 星號....就不用解釋惹吧，還不知道就該打屁股惹。

[![1572269227_179.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572269227_179.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572269227_179.png)

接著到 DNS 新增 [CNAME](https://zh.wikipedia.org/zh-tw/CNAME%E8%AE%B0%E5%BD%95)：

*   Type：CNAME
*   Name：就看你想取蛇摸
*   Target：steep-dawn-7db4.your\_subdomain.workers.dev ( 範例 )

steep-dawn-7db4 只是我的 Worker Name。

你可以複製剛剛的 Worker dev 網址，貼上並修改，去除 http 等格式。

  
[![1572269927_60483.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572269927_60483.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572269927_60483.png)

於是頁面就出來惹～[https://test.robby570.tw](https://test.robby570.tw)

![1572270031_24985.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572270031_24985.png)

四、以 CLI 方式建立
------------

本範例使用 nodejs 的 npm 作為 CLI 後端環境執行。

根據官方非常簡單的[說明文件](https://developers.cloudflare.com/workers/quickstart/)，步驟如下：

### 4.1 下載套件

    npm install -g @cloudflare/wrangler

注意：不支援 32 位元... 原本想在工作的時候測試 CLI... QQ

### 4.2 初次要在 local 設定金鑰

    wrangler config

只有第一次要設定哦！

依序會要你填入四個項目：

1.  [Account ID](#4-1)
2.  [Zone ID](#4-2)
3.  [Global API Key](#4-3)
4.  [Email address](#4-4)

Account ID

在你的 Cloudflare Dashboard 就有囉！

Zone ID

欄位內容不是必須，

除非你要像前面步驟一樣，想要指派給自訂的 CNAME，

如果想使用原本的網址，就不需要設定。

Global API Key

如果你會看英文就看文件說明：

[![1572270630_04918.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572270630_04918.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572270630_04918.png)

如果你比較笨，看看下面的步驟....

\-----------------------------------------------------------------------

到你的 Workers 首頁右邊，點選 Get your API token。

![1572270768_41695.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572270768_41695.png)

找到最下方的 API Keys，點選 Global API Key 的 View

[![1572271543_40837.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572271543_40837.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572271543_40837.png)

輸入帳號密碼，然後勾選一葛 通過率很低 的 reCAPTCHA。 

筆者也不知道為什麼... 總是驗證失敗。

[![1572271644_43675.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572271644_43675.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572271644_43675.png)

最後得到的 Key 就把他複製起來，

貼到剛剛指令 wrangler config 所要求提供的 Global API Key。

Email address

最後的 email 各位讀者們就自行發揮ㄅ～

\-----------------------------------------------------------------------

### 4.3 初始專案

接著開始初始 Worker 專案

    wrangler generate my-worker

你也可以使用現成 Github 的專案

    wrangler generate my-router-app https://github.com/cloudflare/worker-template-router

進入目錄

    cd my-worker

用 VScode 打開，或任何你喜歡的編輯器。

    code .

\[ wrangler.toml \]

    account_id = ""
    name = "my-worker"
    type = "webpack"
    route = ""
    workers_dev = true
    zone_id = ""
    

*   account\_id：在 cloudflare dashboard 下方可以找到，上文也有提到，用於辨別帳號的
*   name：發佈後的 Worker 名稱
*   type：wrangler 跟 react-create-app 一樣，最後會經由 webapck bundle
*   route：如同剛剛前面從網頁上新增的 route 一樣，例如 https://test.my\_domain.tw/\*
*   workers\_dev：是否部署在 dev 上
*   zone\_id：如果你要在指定的網域上使用，可以在 cloudflare 所要使用的網域上找到 

如果你想要使用一些自訂的 webpack lib，可以在 wrangler.toml，新增一行：

\[ wrangler.toml \]

    webpack_config = "webpack.config.js"

*   webpack\_config：指定你的檔案路徑與檔名

內容就看你想怎麼設定，例如：

\[ webpack.config.js \]

    const Dotenv = require('dotenv-webpack');
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {
        mode: 'production',
        entry: 'index.js',
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    use: 'raw-loader',
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
            ],
        },
        plugins: [
            new Dotenv(),
            new HtmlWebpackPlugin(),
        ],
    };

\[ index.js \]

這葛，就不解釋惹，官網文件看看，有很多範例應用，建議讀者要具備 [HTTP headers](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers) 的知識。

    addEventListener('fetch', event => {
      event.respondWith(handleRequest(event.request))
    })
    /**
     * Respond with hello worker text
     * @param {Request} request
     */
    async function handleRequest(request) {
      return new Response('Hello worker!', {
        headers: { 'content-type': 'text/plain' },
      })
    }
    

### 4.4 預覽專案

接著可以預覽畫面。

    wrangler preview --watch

[![1572305324_1316.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572305324_1316.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572305324_1316.png)

如果啟動的時候出現下列訊息，代表你 wrangler.toml 的 account\_id 忘了設定囉！

[![1572305307_06625.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572305307_06625.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572305307_06625.png)

### 4.5 建置專案

調適好之後，就可以建置專案。

    wrangler build

[![1572305786_5931.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572305786_5931.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572305786_5931.png)

### 4.6 佈署專案

最後再將你的 Worker 發佈到 Cloudflare 上即可。

    wrangler publish

[![1572305887_65647.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572305887_65647.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572305887_65647.png)

這時候回到 [Cloudflare Workers Dashboard](https://dash.cloudflare.com/) ，就可以看到剛剛建置的 Worker 了。

[![1572306082_68797.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572306082_68797.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572306082_68797.png)

如果你有設定 zone\_id，那就可以在 [Cloudflare](https://dash.cloudflare.com) 上的網域 Workers 列表中找到！

[![1572318735_90901.png](images/2019-10-28_Cloudflare - 在世界各地邊緣你的 Workers 吧！/1572318735_90901.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/3beca2b9-0a7c-4a6d-9a70-20cd6b7c199e/1572318735_90901.png)

### 4.7 佈署專案 dev 與 prodiction

如果 Worker 在 push 的時候，

想分成 dev 與 production，可以將 wrangler.toml 新增 \[ env.\* \] ，

例如：\[ env.production \]

\[ wrangler.toml \]

    account_id = ""
    name = "my-worker"
    type = "webpack"
    webpack_config = "webpack.config.js"
    workers_dev = true
    entry-point = "workers-site"
    
    [env.production]
    zone_id = ""
    route = "https://your-website/*"
    
    

當使用 publish 指令，則 \[ env.production \] 的 zone\_id, route 會被忽略。

    wrangler publish

當使用 publish --env production 指令，則 \[ env.production \] 的 zone\_id, route 會被帶入。

    wrangler publish --env production

#### _以上小小心得，各位邊緣仔也快去邊緣化吧！_

有勘誤之處，不吝指教。ob'\_'ov