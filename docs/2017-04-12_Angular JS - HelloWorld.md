---
title: "Angular JS - HelloWorld"
subtitle: "對於 angular JS 的初步認識。"
date: "2017-04-12T00:00:00.000Z"
series: "angular1"
tags: "Angular","Angular1"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2017-04-12_Angular%20JS%20-%20HelloWorld/banner/1491982694_47649.png"
--- 

**對於 angular JS 的初步認識。**

前言
--

因為新環境的關係，要接觸到 Angular1（即 Angular JS），在這部分要提前自行研習，

剛好最近有在接觸 Angular2，感覺起來還真的能體會為何 Angular1 有些被唾棄 哈哈

※. 更何況今年進展到 Angular4 了呢！

本篇介紹如何從零開始進入 HelloWorld，如果你是初次接觸的朋友，不仿參考看看。

本篇使用【Angular JS】

環境建置
----

首先建立好 html5基本版面，並引用 angular1，本篇從 cdn 上引用 min 版本。

[![1491982694_47649.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2017-04-12_Angular%20JS%20-%20HelloWorld/1491982694_47649.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/b8508a5a-8850-44f8-8370-60c055339b6a/1491982694_47649.png)

Angular 載入
----------

在 html 標籤處，加上 ng-app，在我們DOM載入時，angular 會尋找文件切入點，即為 ng-app。

![1491982793_91653.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2017-04-12_Angular%20JS%20-%20HelloWorld/1491982793_91653.png)

新增內文
----

```html
<h1>Angular1 - Hello World</h1>
<p>AngularJS say hello to {{yourname || 'everyone'}}!</p>
<label>Input your name，Angular will say hello to you</label>
<input type="text" ng-model="yourname">
```

1.  在 p 標籤當中我們可以看到由中括弧包住的文字，yourname為自訂變數，|| 為「否則」，意思就是說當變數沒設定時，將以字串　’everyone’ 顯示。
2.  在文字方塊當中，我們使用到 ng-model，如果有接觸過 angular2 的朋友一定會很熟悉，即為資料綁定，
3.  ng-model 通常綁定一些具有 value 屬性的標籤，這邊的 ng-model 為綁定 p 標籤中的 yourname 變數。

完成
--

開啟網頁，即可看到好像很厲害的 angular1 hello world，

當文字方塊修改時，即可發現變數 yourname隨之更改。

[![1491983248_54175.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2017-04-12_Angular%20JS%20-%20HelloWorld/1491983248_54175.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/b8508a5a-8850-44f8-8370-60c055339b6a/1491983248_54175.png)

結語
--

這只是初步開始呢！

讓我們好好更加認識 angular2 的前身吧 ob'\_'ov

資料參考
----

[iT邦邦忙 - 邊學AngularJS邊做Todo List (1) － Hello World](http://ithelp.ithome.com.tw/articles/10095041)

有勘誤之處，不吝指教。ob'\_'ov