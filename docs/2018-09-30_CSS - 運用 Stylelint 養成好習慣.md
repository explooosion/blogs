---
title: "CSS - 運用 Stylelint 養成好習慣"
date: "2018-09-30"
tags: [scss, css, stylelint, style, guide]
view: "4705"
history: "0"
group: "CSS"
banner: "images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/banner/1538286972_7387.jpg"
---

盤點那些樣式不好好寫的人，請他好好面對。

參與多人專案開發的時後，最討厭樣式不好好寫的人了。

[![1538286972_7387.jpg](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538286972_7387.jpg)](https://www.youtube.com/watch?v=XbMxA70ZA6o)

*   圖源：[Stylelint Tutorial - CSS Linter for VSCode](https://www.youtube.com/watch?v=XbMxA70ZA6o)

本篇主要介紹 [Stylelint](https://stylelint.io/) 在 [Visual Studeio Code](https://code.visualstudio.com/) 搭配 [Order](https://github.com/hudochenkov/stylelint-order) 的應用，

語法部分則是使用 [SCSS](https://sass-lang.com/) ，請讀者們留意。

目錄：
---

1.  [前言](#1)
2.  [專案建立](#2)
3.  [安裝套件](#3)
4.  [設定規則](#4)
5.  [新增指令](#5)
6.  [撰寫樣式](#6)

* * *

ㄧ、前言
----

在開發專案的時候，我們經常會使用各種語法檢測工具，

像是 [ESLint](https://eslint.org/)、[TSLint](https://palantir.github.io/tslint/) 等等，來協助我們提升程式碼品質。

而在撰寫 CSS 的時候，良好的習慣是很重要的，

通常我們會遵循一些大公司所寫的規範，例如：

*   [Google - styleguide - CSS\_Style\_Rules](https://google.github.io/styleguide/htmlcssguide.html#CSS_Style_Rules)
*   [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)
    

更多的樣式規範收入於 [CSS-Tricks](https://css-tricks.com/css-style-guides/)。

遵循這些的好處，可以提升可讀性、維護性等，

讓專案的樣式管理更具結構化。

而前端框架越來越熱門，在開發上的 Deploy 工具越來越多，

為了希望讀者們對於接下來要介紹的工具能容易上手與理解，

以下技術建議能有基本認識：

*   [Node.js](https://nodejs.org/en/)
*   [NPM](https://www.npmjs.com/)
*   [Terminal](https://zh.wikipedia.org/wiki/%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E5%AD%97%E5%85%83)
*   [JSON](https://zh.wikipedia.org/wiki/JSON)
*   [SCSS](http://sass.bootcss.com/docs/scss-for-sass-users/)

### 接下來本篇要介紹這套工具： [Stylelint](https://github.com/stylelint/stylelint)

二、環境建立
------

我們起始一個新專案試試。

建立 myapp 資料夾，然後進入該目錄。

    mkdir myapp && cd myapp

接著初始 npm 設定。 

    npm init -y

本環境須於 Node.js 環境下運行。

接著用 vscode 打開專案。

[![1538289265_0042.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538289265_0042.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/768eeac2-5183-4869-b725-a06acca5d1b1/1538289265_0042.png)

接著在 vscode 中安裝以下兩個擴充功能：

*   [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
*   [vscode-stylefmt](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-stylefmt)

[![1576493649_32166.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1576493649_32166.png)](https://marketplace.visualstudio.com/items?itemName=stuartzhang.stylelint-stzhang)[![1538289428_79332.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538289428_79332.png)](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-stylefmt)

安裝完畢後，就會出現在清單列表中。

![1538289602_9444.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538289602_9444.png)

三、安裝套件
------

接著安裝主要的套件，以下命令可以擇一，看您使用 npm 或是 yarn。

而下方又細分「依序安裝」以及「一鍵安裝」，

這葛只是方便大家條列閱讀，安裝了哪些套件。

#### [NPM](https://www.npmjs.com/)

依序安裝。

    npm install -D stylelint 
    npm install -D stylelint-config-prettier
    npm install -D stylelint-config-sass-guidelines
    npm install -D stylelint-config-standard
    npm install -D stylelint-order
    npm install -D stylelint-scss
    npm install -D pre-commit

一鍵安裝。

    npm install -D stylelint stylelint-config-prettier stylelint-config-sass-guidelines stylelint-config-standard stylelint-order stylelint-scss pre-commit

#### [Yarn](https://yarnpkg.com/zh-Hans/)

依序安裝。

    yarn add -D stylelint
    yarn add -D stylelint-config-prettier
    yarn add -D stylelint-config-sass-guidelines
    yarn add -D stylelint-config-standard
    yarn add -D stylelint-order
    yarn add -D stylelint-scss
    yarn add -D pre-commit

一鍵安裝。

    yarn add -D stylelint stylelint-config-prettier stylelint-config-sass-guidelines stylelint-config-standard stylelint-order stylelint-scss pre-commit

你知道嗎？ pre-commit 主要是應用於 git commit 的前處理。

四、設定規則
------

接下來在專案中建立檔案名為「.stylelintrc.json」。

![1538290362_80365.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538290362_80365.png)

內容可參考筆者所寫好的設定檔「[**.stylelintrc.json**](https://github.com/explooosion/stylelint-scss-config/blob/master/.stylelintrc.json)」，直接複製貼上，

或是直接輸入以下參數設定。

\[ .stylelintrc.json \]

    {
        "extends": [
            "stylelint-config-standard",
            "stylelint-config-prettier",
            "stylelint-config-sass-guidelines"
        ],
        "plugins": [
            "stylelint-scss",
            "stylelint-order"
        ],
        "rules": {
            "max-nesting-depth": null,
            "no-empty-source": null,
            "no-descending-specificity": null,
            "order/properties-alphabetical-order": null,
            "order/properties-order": [
                "position",
                "top",
                "bottom",
                "right",
                "left",
                "display",
                "align-items",
                "justify-content",
                "float",
                "clear",
                "overflow",
                "overflow-x",
                "overflow-y",
                "margin",
                "margin-top",
                "margin-right",
                "margin-bogttom",
                "margin-left",
                "padding",
                "padding-top",
                "padding-right",
                "padding-bottom",
                "padding-left",
                "width",
                "min-width",
                "max-width",
                "height",
                "min-height",
                "max-height",
                "font-size",
                "font-family",
                "font-weight",
                "text-align",
                "text-justify",
                "text-indent",
                "text-overflow",
                "text-decoration",
                "white-space",
                "color",
                "background",
                "background-position",
                "background-repeat",
                "background-size",
                "background-color",
                "background-clip",
                "border",
                "border-style",
                "border-width",
                "border-color",
                "border-top-style",
                "border-top-width",
                "border-top-color",
                "border-right-style",
                "border-right-width",
                "border-right-color",
                "border-bottom-style",
                "border-bottom-width",
                "border-bottom-color",
                "border-left-style",
                "border-left-width",
                "border-left-color",
                "border-radius",
                "opacity",
                "filter",
                "list-style",
                "outline",
                "visibility",
                "z-index",
                "box-shadow",
                "text-shadow",
                "resize",
                "transition"
            ],
            "property-no-vendor-prefix": null,
            "selector-max-compound-selectors": null,
            "scss/at-import-partial-extension-blacklist": null,
            "value-no-vendor-prefix": null
        }
    }
    

眼尖的您也許會發現 order/properties-order 的參數如此多，

其實這些是關於樣式的優先排列。

詳細可到 [stylelint-order](https://github.com/hudochenkov/stylelint-order/tree/master/rules/order) 查看。

而這些項目您可以修改其順序或是增減，來客製化自己或團隊的規則。

並且良好的樣式風格應該盡量依序為：

1.  間距位置容器設定
2.  背景顏色字體設定
3.  邊框圓角陰影設定
4.  動畫變形設定

完成設定檔後，建議重開您的 vscode。

五、新增指令
------

接著打開 package.json，要新增一些腳本指令。

\[ package.json \]

    {
     "scripts": {
        "lint": "stylelint app/scss/**/*.scss --syntax scss",
        "lint:fix": "stylelint app/scss/**/*.scss --syntax scss --fix"
      },
      "pre-commit": [
        "lint"
      ],
    }

*   lint：語法為 stylelint \[目錄\] --syntax \[語法種類\]，也可以直接省略 --syntax 不寫，自動偵測檔案。
*   目錄其實可以根據您的環境進行修改，由於避免目錄很多層而漏掉，因此用了許多 /\*\*/。
*   lint:fix：這個指令與上一個沒有多大差別，但最重要的是多了 \--fix，顧名思義就是可以自動修正錯誤（謹慎使用）。
*   pre-commit：當我們進行 git commit 的時候，會先執行 lint 檢測，如果沒有通過，則會被阻擋下來拒絕提交。😈 😈 😈 

六、撰寫樣式
------

完成好設定後，我們就可以開始來寫樣式了！！！

由於我們剛剛路徑設定 app/scss，

因此我們把樣式都集中於此，

並直接建立 index.scss 試試（或隨意檔案名稱）。

試著建立出你覺得很可怕的樣式風格。

\[ index.scss \]

    .myapp {
      transition: all .2s ease-in-out;
      display: block;
      text-align: center;
      background: #f00;
      color: #0ff;
      font-weight: bold;
      width: 5rem;
      padding: 2rem 0;
      height: 2rem;
      font-size: 1rem;
      margin: 0 2rem;
    
      &:hover{
        color: #f0f;
      }
    }
    

這時候你應該會發現**滿江紅**。

![1538292026_62463.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538292026_62463.png)

這時候你依然不理會他，並執行語法檢測。

    yarn lint # 或是 npm run lint

然後你就會被各種不符合規定的訊息噴滿臉。

[![1538292414_78228.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538292414_78228.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/768eeac2-5183-4869-b725-a06acca5d1b1/1538292414_78228.png)

對於這樣的錯誤訊息格式相當清楚，

每一個錯誤都會告訴你檔案名稱、行號、錯誤原因、規則依據等等。

其實應該是建議手動修改，

如果您已經是老練的設計師，則可以試著使用自動修正的指令處理。

    yarn lint:fix # 或是 npm run lint:fix

如果你是老練的設計師，就更不該犯這些錯喇！🤮

最後僅僅花了 1.04 秒的時間，修正這些腦殘的風格。

[![1538292375_43886.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538292375_43886.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/768eeac2-5183-4869-b725-a06acca5d1b1/1538292375_43886.png)

然後我們接著看看剛剛的 index.scss 樣式檔案。

![1538292610_53263.png](images/2018-09-30_CSS - 運用 Stylelint 養成好習慣/1538292610_53263.png)

##### _所有的紅底線警告都消失了～_

#### _而且連樣式的順序都幫我們排整齊了！！_

### _對於強迫症的朋友們是不是一大福音呢！！！！_

本文相關設定檔放置於 github 專案上 - [stylelint-scss-config](https://github.com/explooosion/stylelint-scss-config)。

大家也來糾正那些撰寫骯髒樣式的隊員吧！！

有勘誤之處，不吝指教。ob'\_'ov