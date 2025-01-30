---
title: "PixiJS - 修正 sprite 為透明背景時的 hitArea"
subtitle: "將你的 sprite hitArea 套上完美的 polygons 吧！"
date: "2020-03-07T00:00:00.000Z"
series: "pixijs"
tags: "Polygon","pixijs","hitArea","physicseditor","shape","transparent","explorter"
image: ""
--- 

將你的 sprite hitArea 套上完美的 polygons 吧！

PixiJS 很好玩，你一定要試試！

[![1*x1LOZj2hMIGNJjxOAsMR7w.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/1*x1LOZj2hMIGNJjxOAsMR7w.png)](https://miro.medium.com/max/640/1*x1LOZj2hMIGNJjxOAsMR7w.png)

*   ref：[Introduction to PixiJS: An HTML5 2D rendering engine](https://itnext.io/introduction-to-pixijs-an-html5-2d-rendering-engine-64173df9a14e)

1\. 前言
------

PixiJS  是個很龐大的 2D 渲染引擎，使用後，你會發現更多美麗的事物。

2\. 動機
------

最近使用 PixiJS 時，在 sprite 的滑鼠事件上遇到了點問題。

#### 情境說明：

 我們隨意找一張圖，下圖為 PixiJS 範例圖。

[![1583511339.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/1583511339.png)](https://pixijs.io/examples/examples/assets/flowerTop.png)

該圖大小為 119x181 且為透明背景的可愛河童。

注意！請不要跟我爭辯他到底是河童、西洋梨還是青蛙。

如果你為它寫一個 pointertap 觸碰事件，會發生什麼事？

```javascript
const app = new PIXI.Application({
  width: 200,
  height: 200,
});
document.body.appendChild(app.view);

const sprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/flowerTop.png');
sprite.buttonMode = true;
sprite.interactive = true;

sprite.addListener('pointertap', () => {
  alert('Hola');
});

app.stage.addChild(sprite);
```

*   buttonMode：為了方便辨識，在此設定讓滑鼠移入可觸發範圍時的指標為 pointer 樣式

點選了河童，看起來沒問題！

[![P14ul0V.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/P14ul0V.gif)](https://i.imgur.com/P14ul0V.gif)

但接下來，你試著將滑鼠移動到右下角的 「黑色區域」 ...！？

居然能夠觸發觸碰事件，而且滑鼠指標也呈現 pointer 樣式。

[![Qofu6Ms.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/Qofu6Ms.gif)](https://i.imgur.com/Qofu6Ms.gif)

為什麼會這樣？

因為 sprite 預設 hitArea 為圖片本身的大小，包含了那些透明區域。

在理想上，當然會希望僅在 「看得見」的地方 trigger！

因此，如何鎖定在看得見的圖片是個問題！

接下來開始撰寫解決的辦法！

2\. 工具
------

目前找到的工具是 [PhysicsEditor](https://www.codeandweb.com/physicseditor)，不過他只有七天的試用期。

如果有長期需求，當然建議可以給他買下去，約台幣 $800/year 不到～

[![1583513084.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/1583513084.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d59d2bde-48ea-485e-8fa6-41cd863f372e/1583513084.png)

安裝完畢後啟動，試著加入圖片吧！

\[ Add sprites \]

[![76091487-9edc7e80-5ff8-11ea-8578-e5a45a193c75.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/76091487-9edc7e80-5ff8-11ea-8578-e5a45a193c75.png)](https://user-images.githubusercontent.com/13682994/76091487-9edc7e80-5ff8-11ea-8578-e5a45a193c75.png)

接著使用如同魔術棒的輪廓偵測工具，捕捉圖形邊框。

\[ Shape tracer \]

![76091676-ff6bbb80-5ff8-11ea-8f40-14f111042477.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/76091676-ff6bbb80-5ff8-11ea-8f40-14f111042477.png)

由於我們使用 PixiJS，在右側 Exporter 中，請選擇 Phaser (P2)。

\[ Exporter \]

![76091884-60938f00-5ff9-11ea-8ee9-679058daea09.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/76091884-60938f00-5ff9-11ea-8ee9-679058daea09.png)

你知道嗎？Phaser 是一套完整性高的 2D 網頁遊戲引擎。

最後將多邊形匯出成 JSON 格式。

\[ Publish \]

![76091960-8a4cb600-5ff9-11ea-92fe-3b03a58e7986.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/76091960-8a4cb600-5ff9-11ea-92fe-3b03a58e7986.png)

仔細看看它的 JSON 結構：

它是由數個多邊形組合而成的喲！

```json
{ 
    
    "flowerTop": [
        {
            "shape": [ 27.5,145, 32.5,138, 30.5,152, 27.5,149 ]
        },
        {
            "shape": [ 41.5,176, 32.5,138, 89.5,141, 92.5,150, 90.5,152, 61.5,176, 54,180.5, 44,180.5 ]
        },
    ]
}
```

*   flowerTop：根據你的圖片而命名。
*   shape：該集合為其中一個多邊形的座標點。

3\. 套件
------

接下來可使用套件 [hitarea-shapes](https://github.com/explooosion/hitarea-shapes) 將該輪廓套至 sprite 中。

### 3.1 安裝

```bash
npm install --save pixi.js hitarea-shapes

# 或者

yarn add pixi.js hitarea-shapes
```

當然，你也可以在 html 中使用 CDN：

```html
<script src="https://unpkg.com/hitarea-shapes"></script>
```

如果你不想使用該套件，你可以參考 [pixi-poly](https://github.com/eXponenta/pixi-poly) 是如何實踐出輪廓問題的。

因為 [hitarea-shapes](https://github.com/explooosion/hitarea-shapes) 是筆者參考並調整一些程式碼後發佈出來的～

### 3.2 載入模組與多邊形

如果你是以模組化架構開發，那就直接 import 或 require 進來～

```javascript
import HitAreaShapes from 'hitarea-shapes';
import data from 'flowerTop.json';
```

如果你的環境選擇使用 cdn，也沒有 babel ，

那你可以參考 [hiarea-shapes example](https://github.com/explooosion/hitarea-shapes/blob/master/docs/index.html)，先用 fetch 將多邊形 JSON 檔案載入。

然後再實例一個 HitAreaShapes。

### 3.3 實例與套用

直接把 sprite.hitArea 設為剛剛建立好的實例即可！

```javascript
// Your sprite
// ...

const hitAreaShapes = new HitAreaShapes(data);

sprite.hitArea = hitAreaShapes;
```

### 3.4 結果

再次看看網頁結果！

當滑鼠在黑色區域進行觸碰 (click/tap) ，並不會 trigger 囉～

同時指標也不會呈現 pointer ～

![vfb9Ucp.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-03-07_PixiJS%20-%20%E4%BF%AE%E6%AD%A3%20sprite%20%E7%82%BA%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%99%82%E7%9A%84%20hitArea/vfb9Ucp.gif)

4\. 後記
------

大家也來學學 PixiJS 吧～

本篇方法也許不是最好，誤打誤撞學習道路上有你有我。

也歡迎提出更棒的做法！！

有勘誤之處，不吝指教。ob'\_'ov