---
title: "Angular - Invalid Host Header 安全性處理"
subtitle: "煩死人的詭異錯誤。"
date: "2018-02-09T00:00:00.000Z"
series: "angular"
tags: "angular","Webpack","invalid","host"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Angular%20-%20Invalid%20Host%20Header%20%E5%AE%89%E5%85%A8%E6%80%A7%E8%99%95%E7%90%86/banner/34676503-61854b14-f463-11e7-8c0b-37399e9cdb5b.jpg"
--- 

煩死人的詭異錯誤。

前言
--

近期調整 Angular 專案，

將原本 [build](https://github.com/angular/angular-cli/wiki/build) 成靜態網頁的方式，

改由直接透過 [ng serve](https://github.com/angular/angular-cli/wiki/serve) 去 handler，

結果蹦出一些奇怪問題。

馬的發顆
----

當執行完部屬後：

    ng serve

從外網看畫面出現了類似如下圖（圖為網路來源）：

*   **Invalid Host Header**
    

[![34676503-61854b14-f463-11e7-8c0b-37399e9cdb5b.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Angular%20-%20Invalid%20Host%20Header%20%E5%AE%89%E5%85%A8%E6%80%A7%E8%99%95%E7%90%86/34676503-61854b14-f463-11e7-8c0b-37399e9cdb5b.jpg)](https://user-images.githubusercontent.com/15818783/34676503-61854b14-f463-11e7-8c0b-37399e9cdb5b.jpg)

但明明在本機 local 看很正常啊啊啊！！！

爬了文之後...

主要是因為 [Angular CLI](https://github.com/angular/angular-cli) 依賴的 [webpack-devserver](https://github.com/webpack/webpack-dev-server) 做了更新。

[![webpack-dev-server.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Angular%20-%20Invalid%20Host%20Header%20%E5%AE%89%E5%85%A8%E6%80%A7%E8%99%95%E7%90%86/webpack-dev-server.jpg)](https://www.wisdomgeek.com/wp-content/uploads/2017/07/webpack-dev-server.jpg)

在版本 [1.16.4](https://github.com/webpack/webpack-dev-server/releases?after=v2.4.3) 和 [2.4.3](https://github.com/webpack/webpack-dev-server/releases/tag/v2.4.4) 中提到了`disableHostCheck` 這個功能：

*   The response will contain a note when using an incorrect `Host` header.
*   For usage behind a Proxy or similar setups we also added a `disableHostCheck` option to disable this check.

這個版本在安全性上，將會對 Host Header 做檢查，

避免用戶端透過一些惡意 Proxy 等方式，訪問到 webpack 主機。

由於 AngularCLI 在版本 [1.0.1](https://github.com/angular/angular-cli/releases/tag/v1.0.1) 之後受到這類問題影響，

已經於 [1.0.0-beta.1](https://github.com/angular/angular-cli/releases/tag/v1.0.0-beta.1) 以及之後提供了解決方案：

    ng serve --disable-host-check

摁..看了一下自己的版本：

    ng -v

[![1518117100_56284.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-09_Angular%20-%20Invalid%20Host%20Header%20%E5%AE%89%E5%85%A8%E6%80%A7%E8%99%95%E7%90%86/1518117100_56284.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/8edecf87-f737-48a7-9c24-c8cb7d9fe8ba/1518117100_56284.png)

嘿嘿～ 終於處理好這個問題。

參考資料
----

這次主要解救來源是找到這篇：

*   [解决 Webpack "Invalid Host Header"](https://tonghuashuo.github.io/blog/webpack-dev-server-invalid-host-header.html)

而在 AngularCLI 的討論區可以找到：

*   [Invalid Host header after updating to 1.0.1](https://github.com/angular/angular-cli/issues/6070)
*   [feat(@angular/cli): add host check flags to ng serve](https://github.com/angular/angular-cli/issues/6173)

有勘誤之處，不吝指教。ob'\_'ov