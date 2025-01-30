---
title: "BlockChain - 私有鏈建立 ( Geth & Node.js )"
date: "2018-07-29"
tags: [Node.js, geth, blockchain]
view: "6301"
history: "0"
group: "Blockchain"
banner: "images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/banner/1532910469_56127.png"
---

這篇適合給對於區塊鏈有基本認識的朋友閱讀 ...

本系列為「[徹底瞭解區塊鏈 從私有鏈出發 @夢森林](https://taichung-frontend.kktix.cc/events/180728-blockchain)」的會後心得。

*   [台中前端社群](https://www.facebook.com/groups/taichung.f2e/?ref=bookmarks)

章節分為三大部分：

1.  [BlockChain - 私有鏈建立 ( Geth & Node.js )](https://dotblogs.com.tw/explooosion/2018/07/29/172031) ［本篇］
2.  [BlockChain - 私有鏈系統監控](https://dotblogs.com.tw/explooosion/2018/07/30/200754)
3.  BlockChain - 私有鏈的智能合約（Solidity & Node.js）- 未完工

[![1532910469_56127.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532910469_56127.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532910469_56127.png)

本篇不再贅述於知識部分，主要講解建立的技術，

因此對於下列相關知識，建議讀者有初步的了解：

*   [Blockchain](https://zh.wikipedia.org/zh-tw/%E5%8C%BA%E5%9D%97%E9%93%BE)
*   [Bitcoin](https://zh.wikipedia.org/wiki/%E6%AF%94%E7%89%B9%E5%B8%81)
*   [Node.js](https://zh.wikipedia.org/wiki/Node.js)
*   [npm](https://zh.wikipedia.org/wiki/Npm)

目錄：
---

1.  [環境安裝](#1)
2.  [創世區塊](#2)
3.  [私鏈管理](#3)
4.  [交易與驗證](#4)

一、環境安裝
------

在鏈的部分，我們使用 [Geth](https://geth.ethereum.org)，由 [Go](https://zh.wikipedia.org/zh-tw/Go) 語言所開發而成，

不過不用擔心，我們不會碰到 [Go](https://zh.wikipedia.org/zh-tw/Go)。

支援多數平台，到[下載頁面](https://geth.ethereum.org/downloads/)點選 「[適用於Windows的Geth 1.8.12](https://gethstore.blob.core.windows.net/builds/geth-windows-amd64-1.8.12-37685930.exe)」。

[![1532875556_99995.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532875556_99995.png)](https://gethstore.blob.core.windows.net/builds/geth-windows-amd64-1.8.12-37685930.exe)

本文系統環境皆以 Windows10 64bit 為主，絕對不是因為買不起 macOS！ ... QAQ

親，記住，下一步到底。

![1532875136_67385.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532875136_67385.png)

強迫同意授權。

![1532875191_59483.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532875191_59483.png)

預設安裝。

![1532875216_52047.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532875216_52047.png)

預設路徑。

![1532875227_75088.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532875227_75088.png)

平安喜樂，安裝完成。

![1532875382_15921.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532875382_15921.png)

輸入[指令幫助](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options)，測試是否安裝成功。

    geth -h

[![1532883254_73769.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883254_73769.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532883254_73769.png)

二、創世區塊
------

### 建立鏈

首先我們隨意命名建立一個資料夾「blockchain」，並進入該資料夾，作為本次區塊鏈的所屬專案，

建立創世區塊 (Genesis Block) 需要一些設定參數，我們將參數寫成 JSON 格式的檔案。

什麼是創世區塊？其實就是區塊鏈中第一個區塊，跟創世神什麼的無關。

建立參數用檔案 genesis.json，也可從筆者[範例專案](https://github.com/explooosion/private-blockchain/blob/master/genesis.json)所下載：

［genesis.json］

    {
        "config": {
            "chainId": 123456,
            "homesteadBlock": 0,
            "eip155Block": 0,
            "eip158Block": 0
        },
        "nonce": "0x0000000000000042",
        "difficulty": "0x020",
        "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "coinbase": "0x0000000000000000000000000000000000000000",
        "timestamp": "0x00",
        "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "gasLimit": "0xffffff",
        "alloc": {}
    }

*   chaindId：區塊鏈的識別 ID。
*   difiiculty：難度參數。
*   coinbase：預設將會是你第一個建立帳號的礦工。
*   gasLimit：交易所使用到的 gas 限制，建議先預設（歸零），避免後續於測試交易發生資金不足。
*   alloc：初始帳號與金額。
*   更多參數的說明請參考 [go-ethereum](https://github.com/ethereum/go-ethereum)，或是了解原理 [Genesis block](https://en.bitcoin.it/wiki/Genesis_block)。

如果要初始帳號與金額，可參考以下範例：

    "alloc": {
      "0x0000000000000000000000000000000000000001": {"balance": "111111111"},
      "0x0000000000000000000000000000000000000002": {"balance": "222222222"}
    }

接著我們輸入指令，建立我們偉大的創始區塊：

    geth --datadir data init genesis.json

*   \--datadir：區塊會儲存在 data 資料夾中。
*   init：初始參數所使用的配置檔案 genesis.json

[![1532877653_5274.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532877653_5274.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532877653_5274.png)

目錄結構如下：

![1532910351_63547.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532910351_63547.png)

### 啟動鏈

完成初始後，接著啟動私有鏈。

    geth --datadir data --networkid 123456 --rpc --rpccorsdomain "*" --nodiscover --rpcapi="db,eth,net,web3,personal" console

*   \--networkid：設定鏈的 ID。
*   \--rpc：啟動 rpc 通訊協定功能，如果要佈署「智慧合約」，請務必加入。
*   \--rpccorsdomain：允許跨網域的存取調用，「"\*"」 代表來自任何網段。
*   \--nodiscover：不搜尋其他網段上的節點。
*   \--rpcapi：在 rpc 通訊中，提供合約 API 的服務項目。
*   console：將會啟動命令模式，以便後續下達命令。
*   更多參數說明請翻閱 [Management-APIs](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)

[![1532880514_1152.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532880514_1152.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532880514_1152.png)

三、私鏈管理
------

成功啟動後會進入 console 模式，我們可以輸入一些指令來管理我們的鏈，

在 [go-ethereum](https://github.com/ethereum/go-ethereum) 的 [Wiki](https://github.com/ethereum/go-ethereum/wiki) 中可以查詢到一些相關指令說明。

指令很多記不起來沒關係，其實可以使用 tab，快速按兩下，就會跳出所有相關指令。

例如想使用 admin 的指令：

[![1532883137_51538.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883137_51538.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532883137_51538.png)

實際 Demo。

[![1532881887_54905.gif](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532881887_54905.gif)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532881887_54905.gif)

### 3.1 查看節點資訊

更多說明可查看 [Management-APIs#list-of-management-apis](https://github.com/ethereum/go-ethereum/wiki/Management-APIs#list-of-management-apis)

    admin.nodeInfo

[![1532881391_84028.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532881391_84028.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532881391_84028.png)

### 3.2 建立新帳號

在 personal 指令中，使用 newAccount 可以建立使用者，

完整的指令說明可到 [Managing-your-accounts#creating-accounts](https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts#creating-accounts) 查看。

    personal.newAccount()

然後接著輸入密碼，以及確認密碼，完成建置後會顯示帳號位址。

![1532883317_16672.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883317_16672.png)

你也可以在建立時直接預設密碼：

    personal.newAccount("654321")

![1532883342_69688.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883342_69688.png)

### 3.3 查詢所有帳號

    eth.accounts

[![1532883101_16537.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883101_16537.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532883101_16537.png)

由於 accounts 是個陣列集合，其實也可以查詢第 N 個索引用戶：

    eth.accounts[0]

![1532883076_80988.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883076_80988.png)

### 3.4 查詢帳號錢包

    eth.getBalance(eth.accounts[0])

![1532883063_19279.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883063_19279.png)

 getBalance() 是個 function，裡面填入帳號地址，

當然地址取得方式可以直接使用 eth.account 獲取。

![1532883047_45991.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883047_45991.png)

你也可以使用 web3 的 CLI 命令，去查詢帳號地址的錢：

    web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")

### 3.5 查詢與設定當前礦工帳號

系統預設礦工帳號會是第一個帳號。

    eth.coinbase

[![1532883644_35553.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883644_35553.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532883644_35553.png)

你也可以修改預設礦工帳號，讓你在挖礦時，錢直接轉到對應帳號。

[![1532883772_70083.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532883772_70083.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532883772_70083.png)

### 3.6 解鎖帳號

在每一次交易的時候，例如匯款等，都需要解鎖帳號。

    personal.unlockAccount(eth.accounts[0])

unlockAccount() 也是個 function，裡面放入帳號地址。

解除時會要求輸入用戶密碼。

[![1532884148_54557.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532884148_54557.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532884148_54557.png)

### 3.7 查詢區塊資訊

查詢區塊數量：

    eth.blockNumber

利用索引值，查詢指定的區塊資訊：

    eth.getBlock(0)

[![1532884509_63282.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532884509_63282.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532884509_63282.png)

利用交易地址查詢區塊（本範例為假地址）：

    eth.getTransaction("0x0c59f431068937cbe9e230483bc79f59bd7146edc8ff5ec37fea6710adcab825")

### 3.8 轉帳交易

由於目前帳號皆無金額，後續步驟有挖礦範例，待有收入後我們再進行實際展示。

這部分算是很重要的指令，我們使用 sendTranscation 指令進行交易：

    eth.sendTransaction({from:eth.accounts[0],to:"0x1222ca94a9064039ac2e892d2ee7ecf955019c0b",value:web3.toWei(3,"ether")})

*   from：來源帳號地址，你可以使用 eth.accounts 指令查詢，或是直接帶入帳號地址。
*   to：交易對象，即為你的目的地址。
*   value：交易內容，其中 3 為交易金額，[ether](https://zh.wikipedia.org/wiki/%E4%BB%A5%E5%A4%AA%E5%9D%8A) 為貨幣單位。

以下範例為全使用 eth.accounts 的帳號方式進行交易：

    eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:web3.toWei(3,"ether")})

當發送交易後，可以使用 txpool 查看所有交易狀況：

    txpool.status

![1532886571_08902.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532886571_08902.png)

上圖為後來有很多錢的時候補貼圖片。

### 3.9 挖礦

這是最重要的環節了，本挖礦為使用 CPU。

#### 3.9.1 開始挖礦

輸入以下指令即可開始挖礦人生：

    miner.start(1)

*   參數為 CPU 使用數

[![1532885407_13664.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532885407_13664.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532885407_13664.png)

#### 3.9.2 停止挖礦

    miner.stop()

[![1532885447_10375.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532885447_10375.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532885447_10375.png)

也許你會疑惑，終端機不斷地刷新內容，要如何暫停？

...... 別管這麼多，直接輸入 miner.stop() 就好。

面對這些訊息干擾，閉上眼睛深呼吸，想想妹妹就打出來囉。 

 大不了直接把終端機關掉。

當挖了不少後，重新查詢區塊，數量也會確實增加！

    eth.blockNumber

![1532885748_99924.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532885748_99924.png)

四、交易與驗證
-------

終於讀到第四章，爬到這層了，卻遇到了一個**大魔王**......

[![1532891760_44813.JPG](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532891760_44813.JPG)](https://dotblogsfile.blob.core.windows.net/user/incredible/0571a664-ac38-421c-90e5-6f07b0346e10/1532891760_44813.JPG)

因為帳號沒錢，無法完成轉帳的實作啊啊啊啊啊啊！！！！！

因此從現在開始，放置 Play 三分鐘，開始挖礦，以便後續能練習實際交易。

    miner.start(4)

做到這邊，建議您起個身子，泡杯咖啡，上個廁所，鏟鏟貓屎。

[![maxresdefault.jpg](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/maxresdefault.jpg)](https://www.youtube.com/watch?v=3WX7N8GRlm8)

*   不久之後。

### 4.1 查看錢包

看一下錢包，錢錢多多。

![1532888106_98173.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532888106_98173.png)

由於剛剛筆者將預設礦工設定為 帳號1，因此挖到的錢都在這個帳號上。

### 4.2 轉帳交易

我們將轉帳 3 ether，從「帳號1」到「帳號0」

    eth.sendTransaction({from:eth.accounts[1],to:eth.accounts[0],value:web3.toWei(3,"ether")})

你也許應該是從「帳號0」到「帳號1」，如果你沒動到預設礦工帳號。

### 4.3 開始挖礦

完成轉帳後，當然就是要由礦工去計算驗證，

因此繼續我們的挖礦之旅。

    miner.start(4)

### 4.4 驗證交易

很快的，我們暫停一下挖礦來查看交易是否成功。

    miner.stop()

    txpool.status

所有的準備工作與佇列都為 0，代表完成工作了～

![1532888581_47907.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532888581_47907.png)

接著查看「帳號0」的錢包：

    eth.getBalance(eth.accounts[0])

![1532888804_90652.png](images/2018-07-29_BlockChain - 私有鏈建立 ( Geth & Node.js )/1532888804_90652.png)

哦哦哦！是錢錢！

會這麼多錢，因為後來筆者又把預設礦工帳號改為「帳號0」亂挖一陣子。

※、結語
----

本篇到目前為止，分享了從建立、挖礦，以及交易的整個流程，

相信大家都熟悉了！

本篇相關指令以及綱要皆放置於 [Github](https://github.com/explooosion/private-blockchain) 上：

*   [private-blockchain](https://github.com/explooosion/private-blockchain)

而以上流程都是在終端機下完成，實在是沒什麼感覺，

下一篇將會簡單分享一下使用工具去呈現 GUI 私鏈的整個運作狀況。

有勘誤之處，不吝指教。ob'\_'ov