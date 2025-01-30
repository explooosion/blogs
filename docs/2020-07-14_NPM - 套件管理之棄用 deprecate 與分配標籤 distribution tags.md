---
title: "NPM - 套件管理之棄用 deprecate 與分配標籤 distribution tags"
date: "2020-07-14"
tags: [deprecated, latest, npm-deprecate, npm-dist-tag, package, publish, tags]
view: "336"
history: "0"
group: "NPM"
banner: "images/2020-07-14_NPM - 套件管理之棄用 deprecate 與分配標籤 distribution tags/banner/1594727263.png"
---

啊啊啊！！！發佈一個垃圾怎摸辦！

npm 套件管理中的棄用與分配標籤應用。

[![1594727263.png](images/2020-07-14_NPM - 套件管理之棄用 deprecate 與分配標籤 distribution tags/1594727263.png)](https://dotblogsfile.blob.core.windows.net/user/robby/c901b341-0c8d-4d3a-988c-f9b514f26816/1594727263.png)

前言
--

很久沒有發表文章了，本篇很簡短的分享遭遇與解法。

如果有使用過 npm 且有發佈過套件的朋友，

對 npm publish 應該再熟悉不過。

筆者日前誤發佈了一個有 bug 的套件，

而且相當嚴重... **吐血**，專案直接 crash 那種，

果然沒多久就收來了 issue 表示 latest 版本出問題。

啊啊啊啊啊好慌！

#### **怎麼會！？ 怎麼會！？ 就變成了一灘爛泥...**

作法
--

在 npm 上，找到了沒有特別用過的指令：

*   [npm-deprecate](https://docs.npmjs.com/cli/deprecate)：將指定的版本標註為棄用
    
*   [npm-dist-tag](https://docs.npmjs.com/cli/dist-tag)：修改指定版本的標籤
    

於是便開始了 Developing in Production

因為沒使用過，某種程度來說就是直接上！

以下筆者使用本次修復的套件作為指令範例

將 0.8.1 改為 0.8.0

### 1\. Release

首先到 Github Release 中改成 Pre-release，

防止相關貼紙及 Github、npm 頁面資訊顯示有錯誤的版本：

![1594725206.png](images/2020-07-14_NPM - 套件管理之棄用 deprecate 與分配標籤 distribution tags/1594725206.png)

![1594725242.png](images/2020-07-14_NPM - 套件管理之棄用 deprecate 與分配標籤 distribution tags/1594725242.png)

### 2\. Deprecate

利用指令 [npm-deprecate](https://docs.npmjs.com/cli/deprecate) 將 0.8.1 進行棄用聲明：

    npm deprecate agm-direction@0.8.1 "critical bug fixed in v0.8.1"

完成後可以在 [npm 頁面](https://www.npmjs.com/package/agm-direction/v/0.8.1)上看到有 deprecated 警語：

[![1594725328.png](images/2020-07-14_NPM - 套件管理之棄用 deprecate 與分配標籤 distribution tags/1594725328.png)](https://dotblogsfile.blob.core.windows.net/user/robby/c901b341-0c8d-4d3a-988c-f9b514f26816/1594725328.png)

並且在 Versions 頁籤中可以看到棄用的版本被隱藏了起來。

[![1594725939.png](images/2020-07-14_NPM - 套件管理之棄用 deprecate 與分配標籤 distribution tags/1594725939.png)](https://dotblogsfile.blob.core.windows.net/user/robby/c901b341-0c8d-4d3a-988c-f9b514f26816/1594725939.png)

### 3\. Tags

利用指令 [npm-dist-tag](https://docs.npmjs.com/cli/dist-tag) 將 0.8.0 設置為 latest 版本：

    npm dist-tag add agm-direction@0.8.0

由於最後的參數 \[<tag>\] 我們並沒有使用，

因此預設會是以 latest 進行標記。　

[![1594726029.png](images/2020-07-14_NPM - 套件管理之棄用 deprecate 與分配標籤 distribution tags/1594726029.png)](https://dotblogsfile.blob.core.windows.net/user/robby/c901b341-0c8d-4d3a-988c-f9b514f26816/1594726029.png)

以上完成後，在 npm install 時 latest ，

也就會對應到 0.8.0 版本囉！

最後也順利完成這次的突發事件。

有勘誤之處，不吝指教。ob'\_'ov