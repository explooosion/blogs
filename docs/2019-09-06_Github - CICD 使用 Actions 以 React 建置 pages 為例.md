---
title: "Github - CICD 使用 Actions 以 React 建置 pages 為例"
subtitle: "Actions 推出啦～～趕快來體驗看看！"
date: "2019-09-06T00:00:00.000Z"
series: "github"
tags: "github","react","actions","cicd","pages"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/banner/1567739924_33717.png"
--- 

Actions 推出啦～～趕快來體驗看看！

讓網站運作通通自己動起來！

[![1567739924_33717.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567739924_33717.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567739924_33717.png)

*   圖源：[https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/](https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/)

前言
--

好久沒發文了，距離上次文章已經有十個月左右，

接下來即將入伍，本篇之後大概又要隔一年了...

前陣子 Github 推出了 [CI](https://zh.wikipedia.org/wiki/持續整合)/[CD](https://zh.wikipedia.org/wiki/持續交付)，大概是換了富爸爸的關係吧（Ｘ

這次記錄一下，並以 [create-react-app](https://github.com/facebook/create-react-app) 作為範例，

當 local 端 push 之後，自動將專案編譯建置 (yarn build)，

並透過 [Github Pages](https://pages.github.com/)，建立並持續更新靜態網站。

後續的延伸，可以用在 Personal Website、Blog、SideProject 等等。

目錄
--

1.  [事前準備](#1)
2.  [建立Repo](#2)
3.  [新增專案](#3)
4.  [YML設定檔](#4)
5.  [建立令牌](#5)
6.  [設定版本控制](#6)
7.  [驗證結果](#7)
8.  [參考文章](#8)

事前準備
----

請記得至 [Github Actions](https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/)，申請 beta 服務使用。

申請印象沒有立即生效，可能需要等數天。

如果申請成功，應該可以發現你任何一個 repo，都會多一個 Actions 的選項：

[![1567742053_26249.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567742053_26249.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567742053_26249.png)

建立 Repo
-------

在 Github 上建立新的 [repository](https://github.com/new)，本文以 my-app 為例。

[![1567743262_30611.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567743262_30611.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567743262_30611.png)

新增專案
----

打開你的 IDE 使用[官方指令](https://github.com/facebook/create-react-app)建置：

```bash
npx create-react-app my-app
```

由於本文 React 不是重點，因此安裝過程不再贅述說明。

由於發佈的靜態網頁網址是在：http://{你的帳號}.github.io/my-app

所有 link, script 的檔案相對路經，必須要去設定 react 環境變數 %PUBLIC\_URL% ，

讓路徑都在 /my-app 之下。

可參考：[create-react-app - Building for Relative Paths](https://create-react-app.dev/docs/deployment#building-for-relative-paths)

因此請編輯 package.json，新增 homepage，並請依照個人的 github 帳號網址而定，

或是綁定的 cname ，例如：http://robby570.tw/my-app。

\[ package.json \]

```json
{
 "homepage": "http://explooosion.github.io/my-app",
}
```

[![1567746547_21315.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567746547_21315.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567746547_21315.png)

YML 設定檔
-------

[yml](https://zh.wikipedia.org/wiki/YAML) 是一種描述資料的一種格式結構，

如果你是網頁開發人員，且具有 CICD、k8s 經驗者，應該不陌生。

請在專案根目錄，建立資料夾 .github，子層再建立資料夾 workflows，

該子層資料夾中，建立檔案：main.yml，如下圖範例。

![1567747543_62604.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567747543_62604.png)

接著補上描述內容：

\[ main.yml \]

```makefile
name: Build and Deploy
on:
  push:
    branches:
      - master
jobs:

  install-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x]
    steps:
    - uses: actions/checkout@master
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@master
      with:
        node-version: ${{ matrix.node-version }}
    - name: Install and Test
      run: |
        yarn
        yarn test
      env:
        CI: true

  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BRANCH: gh-pages
        FOLDER: build
        BUILD_SCRIPT: cp .env.example .env.local && yarn && yarn build
```

以下簡述一下設定說明。

詳細請查看：[github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action) 或是 [Configuring a workflow](https://help.github.com/en/articles/configuring-a-workflow) 

name: Build and Deploy 

代表本次整體任務的名稱，會顯示於下方紅框處中：

[![1567747953_85882.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567747953_85882.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567747953_85882.png)

on:

代表處發任務的時機，本次設定為當 master 進行 push 的時候便會觸發。

jobs:

所要進行的工作，本次設定有兩個工作，可任意命名，分別為：install-and-test、build-and-deploy。

install-and-test：該工作主要進行安裝與測試。

build-and-deploy：該工作則是將專案進行建置，並且程式碼 push 至指定的 branch 上。

![1567748330_73247.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567748330_73247.png)

uses: JamesIves/github-pages-deploy-action@master

由於部署的動作要進行一連串的 git 指令處理，因此偷懶學習一下，

使用人家寫好的腳本 [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)。

ACCESS\_TOKEN: ${{ secrets.ACCESS\_TOKEN }}

由於使用第三方的腳本指令，需要提供存取權限，因此必須提供令牌。

後面會接著說明如何設定。

BRANCH: gh-pages

github 除了 master 可以作為靜態網站外，另一個選擇就是另開分支，命名為 gh-pages 。

可參考：[Configuring a publishing source for GitHub Pages](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages)

FOLDER: build

根據 [github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action#configuration-) 設定說明，編譯建置的輸出資料夾位於 build 裡面。

如果你使用 angular 作為開發，那就是 FOLDER: dist 囉！

BUILD\_SCRIPT: cp .env.example .env.local && yarn && yarn build

除了 yarn 安裝以及 yarn build 之外，如果你有使用 [dotenv](https://github.com/motdotla/dotenv)，

該指令可以複製 .env.example 成 .env.local，並設定 env 參數。

如果要使用，請記得先在前幾行設定好變數值，例如 REACT\_APP\_TITLE：

\[ main.yml \]

```makefile
env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BRANCH: gh-pages
        FOLDER: build
        REACT_APP_TITLE: MY APP
        BUILD_SCRIPT: cp .env.example .env.local && yarn && yarn build
```

\[ .env.example \]

```makefile
REACT_APP_TITLE=
```

\[ public / index.html \]

```html
<html lang="en">
  <head>
    ...
    <title>%REACT_APP_TITLE%</title>
    ...
  </head>

  ...

</html>
```

如果沒使用，則可以直接把指令設定成：

BUILD\_SCRIPT: yarn && yarn build

建立令牌
----

首先到個人 github 上的 [Settings](https://github.com/settings/profile)。

![1567750317_91042.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567750317_91042.png)

點選 [Developer settings](https://github.com/settings/apps)。

![1567750391_28159.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567750391_28159.png)

然後選擇 [Personal access tokens](https://github.com/settings/tokens)。

![1567750451_37442.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567750451_37442.png)

接著點選 [Generate new token](https://github.com/settings/tokens/new) 建立私人令牌。

[![1567750566_24903.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567750566_24903.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567750566_24903.png)

在欄位中，Note 是輸入可以識別的名稱，日後可以改，

權限則勾選最上面區塊 repo 就好，會自動勾取其子項目，最後確定產生。

[![1567750843_39012.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567750843_39012.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567750843_39012.png)![1567750843_41935.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567750843_41935.png)

產生後，請確保成功複製 token，因為之後無法再進行複製的動作，必須要重新產生。

[![1567751127_34335.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567751127_34335.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567751127_34335.png)

接著到你 github 的專案 Settings。

[![1567751263_57526.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567751263_57526.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567751263_57526.png)

選擇 Secrets。

![1567751402_9566.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567751402_9566.png)

點選 Add a new secret。

Name 請輸入：ACCESS\_TOKEN

Value 請貼上剛剛複製的 token。

[![1567751403_0206.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567751403_0206.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567751403_0206.png)

如果成功，應該會看到 綠色 鎖頭。

![1567751627_40074.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567751627_40074.png)

484 OS： 耖尼瑪的版主顏色亂搞我！嘿嘿！

設定版本控制
------

接著終於可以將你的專案 push 上去了！請根據你的專案設定哦～

```bash
git remote add origin https://github.com/explooosion/my-app.git
```
```bash
git add -A
```
```bash
git commit -m "Initial commit"
```

你可以直接使用 vscode 內建的 git gui 操作。

驗證結果
----

推送完畢後，你可以到 github 專案 Actions 中查看，是不是順利通過。

[![1567753280_99129.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567753280_99129.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567753280_99129.png)

如果失敗，預設會發送電子郵件給你。

試著切換分支，可以發現多了 gh-pages。

[![1567753331_312.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567753331_312.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567753331_312.png)

在 Settings 中，也可以發現 Github Pages，自動選擇 gh-pages 分支，

並且可以看到提示訊息的網址。

[![1567753449_47213.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567753449_47213.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/ec9f149d-a499-4399-9640-01ddb7401ba9/1567753449_47213.png)

因為筆者有設定過 [Custom domain](https://help.github.com/en/articles/quick-start-setting-up-a-custom-domain)，所以網址會不太一樣！

點開網址，就可以看到所發佈的網站囉！

並且如果有設定環境變數，title 也順利被套用上去。

![1567753737_38252.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2019-09-06_Github%20-%20CICD%20%E4%BD%BF%E7%94%A8%20Actions%20%E4%BB%A5%20React%20%E5%BB%BA%E7%BD%AE%20pages%20%E7%82%BA%E4%BE%8B/1567753737_38252.png)

恭喜！

參考文章
----

*   [Deploy your projects to Github Pages with GitHub Actions](https://dev.to/pierresaid/deploy-node-projects-to-github-pages-with-github-actions-4jco)
*   [Deploy to GitHub Pages](https://github.com/marketplace/actions/deploy-to-github-pages)
*   [GitHub Actions now supports CI/CD, free for public repositories](https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/)

有勘誤之處，不吝指教。ob'\_'ov