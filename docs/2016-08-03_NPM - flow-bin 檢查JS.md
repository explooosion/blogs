---
title: "NPM - flow-bin 檢查JS"
subtitle: "flow-bin 快速檢查你的 JavaScript，之除蟲大師。"
date: "2016-08-03T00:00:00.000Z"
series: "npm"
tags: "NPM","flow-bin","flow"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2016-08-03_NPM%20-%20flow-bin%20%E6%AA%A2%E6%9F%A5JS/banner/1470239212_53923.png"
--- 

flow-bin 快速檢查你的 JavaScript，之除蟲大師。

當你在寫 JavaScript  時候，最怕出現 error，

當噩夢出現時，卻又不知錯在那，

也許你可以參考看看來自 [flowtype](https://www.flowtype.org/) 的 js 檢核套件 [flow-bin](https://www.npmjs.com/package/flow-bin)。

範例下載
----

可直接下載範例，詳細手動安裝建立可跳至下方步驟。

使用說明： [GitHub - flow](https://github.com/explooosion/flow)

    git clone https://github.com/explooosion/flow.git

套件安裝
----

    npm install --save-dev flow-bin

或全域安裝

    npm install --global flow-bin

建立參數
----

進入 node\_modules/.bin 目錄。

    cd node_modules/.bin

建立設定檔案，輸入後會產生 .flowconfig 檔案，將他移動到專案目錄底下。

    flow init

編輯設定檔案
------

編輯 .flowconfig，使其忽略 node\_modules 裡面的資料夾。

    [ignore]
    <PROJECT_ROOT>/node_modules/.*
    [include]
    
    [libs]
    
    [options]
    

編輯指令
----

編輯 package.json ，加入 flow\_check。

如果直接輸入 flow check || exit 0 .... 會跳出視窗，故我們建立 script

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "flow_check": "flow check || exit 0"
      },

建立測試檔案
------

我們任意建立 js 檔案（index.js），在檔案第一列加入，表示將透過 flow-bin 進行檢核。

    /* @flow */

任意編輯錯誤的內容： 

    /* @flow */
    const a = 1;
    a = a + 1;
    

*   const 為 es6 之常數宣告，當然不可以改變囉！

進行檢核
----

    npm run flow_check

Found 1 error，成功找到一個錯誤，

並告訴你 const cannot be reassigned。  
![1470239212_53923.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2016-08-03_NPM%20-%20flow-bin%20%E6%AA%A2%E6%9F%A5JS/1470239212_53923.png)

本套件可於官方查閱詳細說明 - [Getting started with Flow](https://www.flowtype.org/docs/getting-started.html)

另外也於 2016/08/01 支援 Windows 提供 .exe ，

相關使用說明 - [Flow | Windows-Support.html](https://www.flowtype.org/blog/2016/08/01/Windows-Support.html)

有勘誤之處，不吝指教。ob'\_'ov