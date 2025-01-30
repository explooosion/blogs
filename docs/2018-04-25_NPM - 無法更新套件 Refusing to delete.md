---
title: "NPM - 無法更新套件 Refusing to delete"
date: "2018-04-25"
tags: [npm, nvm, update, upgrate]
view: "793"
history: "0"
group: "NPM"
banner: "images/2018-04-25_NPM - 無法更新套件 Refusing to delete/banner/1524598695_45295.jpg"
---

更新 npm 是一件很不容易的事情...

這篇沒什麼內容，篇幅很短，小心！

📝 前言
-----

在 Node.js 環境中，我們常常使用 [nvm](https://github.com/creationix/nvm) 進行版本的控管，

如果你還沒有安裝過，請務必安裝。

因為用過的人都回不去。

[![1524598695_45295.jpg](images/2018-04-25_NPM - 無法更新套件 Refusing to delete/1524598695_45295.jpg)](https://dotblogsfile.blob.core.windows.net/user/incredible/500fb800-9a4a-4283-bf1f-0d8eca676660/1524598695_45295.jpg)

🔨 更新
-----

更新的方式很簡單：

    npm install npm -g

🐞 遭遇戰
------

但如果你遇到以下的狀況就不簡單了。

出現了令人惶恐的駭人訊息...

*   Refusing to delete ...
*   File exists ...

[![1524598949_31452.png](images/2018-04-25_NPM - 無法更新套件 Refusing to delete/1524598949_31452.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/500fb800-9a4a-4283-bf1f-0d8eca676660/1524598949_31452.png)

這篇文章並不想探討原因，只想解決問題。

請依照以下處治服用：

    cd %programfiles%/nodejs

*   移動到 nodejs 安裝目錄

    rm npm npm.cmd

*   移除 npm 與 npm.cmd 檔案

    mv node_modules/npm node_modules/npm2

*   把 npm 目錄改為 npm2

    node node_modules\npm2\bin\npm-cli.js i npm@latest -g

*   使用 npm2\\bin\\npm-cli.js 進行版本更新

    rm -rf npm2

*   更新完畢後會產生新的 npm，舊的 npm2 就可以刪除了

成功畫面：

[![1524599346_13545.png](images/2018-04-25_NPM - 無法更新套件 Refusing to delete/1524599346_13545.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/500fb800-9a4a-4283-bf1f-0d8eca676660/1524599346_13545.png)

試著查看版本：

    npm -v

![1524599373_82596.png](images/2018-04-25_NPM - 無法更新套件 Refusing to delete/1524599373_82596.png)

### 恭喜成功囉～

### 🌼 🌼 🌼 🌼 🌼 灑花 🌼 🌼 🌼 🌼 🌼

### 🌷 🌷 🌷 🌷 🌷 灑花 🌷 🌷 🌷 🌷 🌷 

### 🌻 🌻 🌻 🌻 🌻 灑花 🌻 🌻 🌻 🌻 🌻 

_這件事情浪費了我一小時多..._

📚 參考
-----

*   [Cannot update npm (node 8.4.0) #300](https://github.com/coreybutler/nvm-windows/issues/300) - 最有用的處理方式 [ayvarot](https://github.com/coreybutler/nvm-windows/issues/300#issuecomment-376986784)

有勘誤之處，不吝指教。ob'\_'ov