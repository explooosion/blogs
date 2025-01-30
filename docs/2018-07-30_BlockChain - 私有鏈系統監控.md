---
title: "BlockChain - 私有鏈系統監控"
date: "2018-07-30"
tags: [blockchain, Node.js, eth-netstats, eth-net-intelligence-api, dashboard]
view: "1658"
history: "0"
group: "Blockchain"
banner: "images/2018-07-30_BlockChain - 私有鏈系統監控/banner/1532954411_07255.png"
---

使用 Node.js 來監控鏈的狀態 ...

本系列為「[徹底瞭解區塊鏈 從私有鏈出發 @夢森林](https://taichung-frontend.kktix.cc/events/180728-blockchain)」的會後心得。

*   [台中前端社群](https://www.facebook.com/groups/taichung.f2e/?ref=bookmarks)

章節分為三大部分：

1.  [BlockChain - 私有鏈建立 ( Geth & Node.js )](https://dotblogs.com.tw/explooosion/2018/07/29/172031)
2.  [BlockChain - 私有鏈系統監控](https://dotblogs.com.tw/explooosion/2018/07/30/200754)［本篇］
3.  BlockChain - 私有鏈的智能合約（Solidity & Node.js）- 未完工

[![1532954411_07255.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532954411_07255.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1532954411_07255.png)

為了方便了解鏈的狀態，除了使用終端機命令去查詢，

本篇介紹了一組工具 [eth-netstats](https://github.com/cubedro/eth-netstats)，此外它有一個依賴組件 [eth-net-intelligence-api](https://github.com/cubedro/eth-net-intelligence-api)，兩者需要一併安裝佈署。

本工具使用 Node.js 作為伺服器環境，因此務必先行安裝。

以下將分別介紹：

*   [eth-netstats](https://github.com/cubedro/eth-netstats)
*   [eth-net-intelligence-api](https://github.com/cubedro/eth-net-intelligence-api)

專案目錄該怎麼放置分配呢？

如果你擔憂這些專案不知放何處，大可不必擔心，

你可以想像他們是獨立運作的伺服器，因此個別放置即可。

如下目錄結構：

![1532951882_1607.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532951882_1607.png)

一、eth-netstats
--------------

### 1. 安裝

首先將專案 clone 下來：

    git clone https://github.com/cubedro/eth-netstats.git

進入專案。

    cd eth-netstats

安裝依賴模組。

    npm install

由於專案會使用到 [grunt](https://gruntjs.com/)，因此我們先全域安裝。

    npm install -g grunt-cli

執行腳本佈署。

    grunt

![1532951023_10744.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532951023_10744.png)

接著在專案根目錄底下建立檔案 ws\_secret.json，

由於該專案使用到 [Websockets](https://github.com/websockets/ws) 進行即時通訊，

因此我們必須先建立一份用於 socket 的密鑰。

［ws\_secret.json］

    {
        "WS_SECRET": "update"
    }

![1532951077_15995.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532951077_15995.png)

### 2\. 啟動

    npm start

[![1532950999_74486.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532950999_74486.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1532950999_74486.png)

順利啟動後，就可以開啟網站 [http://localhost:3000](http://localhost:3000)

如果出現以下警告，則代表可能是 ws\_secret.json 設定失敗哦！

[![1532950977_95022.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532950977_95022.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1532950977_95022.png)

網站開起來後，可以看到漂亮的儀表板，

而數據部分則會透過 [eth-net-intelligence-api](https://github.com/cubedro/eth-net-intelligence-api) 進行介接，因此接著繼續下一段佈署。

[![1532951401_88841.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532951401_88841.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1532951401_88841.png)

二、eth-net-intelligence-api
--------------------------

### 1\. 安裝

將專案 clone 下來。

    git clone https://github.com/cubedro/eth-net-intelligence-api.git

進入目錄：

    cd eth-net-intelligence-api

安裝模組依賴。

    npm install

在這邊使用到 [pm2](https://github.com/Unitech/pm2)，它是用於管理 node.js 環境的一個程序管理器。

![1532952163_05271.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532952163_05271.png)

首先安裝該套件：

    npm install -g pm2

利用查看版本來確認是否安裝成功：

    pm2 -v

![1532957622_62071.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1532957622_62071.png)

### 2\. 設定參數

接著在專案根目錄中，修改 app.json：

［app.json］

    [
      {
        "name"              : "node-app",
        "script"            : "app.js",
        "log_date_format"   : "YYYY-MM-DD HH:mm Z",
        "merge_logs"        : false,
        "watch"             : false,
        "max_restarts"      : 10,
        "exec_interpreter"  : "node",
        "exec_mode"         : "fork_mode",
        "env":
        {
          "NODE_ENV"        : "production",
          "RPC_HOST"        : "localhost",
          "RPC_PORT"        : "8545",
          "LISTENING_PORT"  : "30303",
          "INSTANCE_NAME"   : "marginchain",
          "CONTACT_DETAILS" : "",
          "WS_SERVER"       : "http://localhost:3000",
          "WS_SECRET"       : "update",
          "VERBOSITY"       : 3
        }
      }
    ]
    

*   RPC\_PORT：區塊鏈通訊協定 RPC 使用 8545 port，因此這邊與之相同。
*   LISTENING\_PORT：區塊鏈所使用的 PORT 為 30303。
*   WS\_SERVER：這邊要通訊的主機就是剛剛的 [eth-netstats](https://github.com/cubedro/eth-netstats)。
*   WS\_SECRET：同 [eth-netstats](https://github.com/cubedro/eth-netstats) 專案中 ws\_secret.json 的密鑰。
*   VERBOSITY：設定 pm2 的日誌儲存等級（3 = 全部記錄）
*   詳細配置內容請查詢 - [Configuration](https://github.com/cubedro/eth-net-intelligence-api#configuration)

### 3\. 修改程式

由於程式有些問題，詳細可查看 ［[Ensure \`results\` is always an array #242](https://github.com/cubedro/eth-net-intelligence-api/pull/242)］，

根據［[PR #242](https://github.com/cubedro/eth-net-intelligence-api/pull/242/commits/d4e2fd3999566a77019373c7556a4b282310e1fa)］我們修正一些程式碼：

找到檔案並修改 lib / node.js。

［lib / node.js］－約 590 行處

    // var interv = {};
    var interv = [];

［lib / node.js］－約 610 行處

    // results = false;
    results = [];

[![1532959223_64437.jpg](images/2018-07-30_BlockChain - 私有鏈系統監控/1532959223_64437.jpg)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1532959223_64437.jpg)

### 4\. 啟動程式

接著我們透過 pm2 掛載剛剛所寫的參數檔案 app.json 去啟動。

    pm2 start app.json

務必區塊鏈以及 eth-netstats 都要保持啟動。

如果出現以下訊息，請務必確認是否有完成［修改程式］：

[![37942414_10209561771240087_1018541267929268224_o.jpg](images/2018-07-30_BlockChain - 私有鏈系統監控/37942414_10209561771240087_1018541267929268224_o.jpg)](https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/37942414_10209561771240087_1018541267929268224_o.jpg?_nc_cat=0&oh=80151723a120ddb8d91dc41740bd09e0&oe=5C0F0B52)

啟動後看看網頁，就可以看儀表板獲取所有資訊了！

[![1533017816_49794.gif](images/2018-07-30_BlockChain - 私有鏈系統監控/1533017816_49794.gif)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533017816_49794.gif)

### 5\. 查看程序狀態

使用 pm2 list 查看運作狀態。

    pm2 list

[![1533019136_78726.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533019136_78726.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533019136_78726.png)

### 查看程序日誌

使用 pm2 log 查看運作的日誌。

    pm2 log

[![1533019285_35834.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533019285_35834.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533019285_35834.png)

[![1533019281_44816.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533019281_44816.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533019281_44816.png)

輸入 Ctrl \+ C 就可以停止監控。

![1533019339_57261.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533019339_57261.png)

### 6\. 重啟服務

使用 pm2 restart \[Name\]，就可以重新啟動服務。

    pm2 restart node-app

或是使用 pm2 restart \[ID\]，這裡的 ID，其實就是 pm2 list 中，項目索引值：

    pm2 restart 0

[![1533019748_75896.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533019748_75896.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533019748_75896.png)

你知道嗎？筆者輸入的 node-app 其實是由 app.json 所設定的哦！

### 7\. 停止服務

使用 pm2 stop \[Name\]，就可以停止服務，同樣也可使用 ID。

    pm2 stop node-app

[![1533019704_95665.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533019704_95665.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533019704_95665.png)

這裡的停止服務，並非將服務移除，他是可以隨時被啟用的！

要再次啟用只要輸入 pm2 start \[Name\]：

    pm2 start node-app

[![1533019947_49901.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533019947_49901.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533019947_49901.png)

### 8\. 刪除服務

使用 pm2 delete \[Name\]，就可以刪除。

    pm2 delete node-app

[![1533020281_16587.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533020281_16587.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533020281_16587.png)

或是使用 pm2 kill，將所有 pm2 的程序通通刪除！

[![1533020398_6155.png](images/2018-07-30_BlockChain - 私有鏈系統監控/1533020398_6155.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/4fc2376b-a8d1-4ebe-9de2-4204d6e22999/1533020398_6155.png)

※、結語
----

本篇使用此兩組工具進行監控，

雖然有良好的視覺呈現，不過由於該專案已經很久沒有 maintain，

可能會出現一些異狀，也歡迎推薦一些較新的監控工具。

下一篇，將會教學如何使用 [Solidity](https://zh.wikipedia.org/zh-tw/Solidity) 撰寫智慧合約。

有勘誤之處，不吝指教。ob'\_'ov