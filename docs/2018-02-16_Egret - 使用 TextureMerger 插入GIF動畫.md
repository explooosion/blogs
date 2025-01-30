---
title: "Egret - 使用 TextureMerger 插入GIF動畫"
subtitle: "少年欸袂用 GIF 桑幾勒某..."
date: "2018-02-16T00:00:00.000Z"
series: "egret"
tags: "egret","gif","animation","TextureMerger","MovieClip","MovieClipDataFactory"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/banner/56b1715518628.png"
--- 

少年欸袂用 GIF 桑幾勒某...

新年快樂！
-----

過年期間，不知道要做什麼

只好繼續玩玩 [Egret](https://www.egret.com/index) 白爛鳥

一、前言
----

要在 Egret 中插入動畫 GIF、SWF 等之類，

如果直接使用 Bitmap，雖然可以正常插入，

但 ... 可是會沒有動畫效果的。

Egret 對於動畫的處理，會將所有影格合併成一張 PNG 圖檔，

並且會產生 JSON 檔案，來描述動畫以及[幀率](https://zh.wikipedia.org/wiki/%E5%B8%A7%E7%8E%87)等。

合併的工具就是「[Texture Merger](http://edn.egret.com/cn/article/index/id/238)」，它是 Egret 的開發工具之一，

主要將動畫圖檔打散，重新整併成一張圖，支援了 .gif、.swf，

當然也可以將配置好的文件存檔（.tmc）。

![56b1715518628.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/56b1715518628.png)

更多的操作方式可參考官方 [TextureMerge简介](http://developer.egret.com/cn/github/egret-docs/tools/TextureMerger/manual/index.html)

本實作範例 SourceCode：

Github：EgretTutorial - [EgretAnimate](https://github.com/explooosion/EgretTutorial/tree/master/Example/EgretAnimate)

二、Texture Merger
----------------

### 資源讀取

打開 [Egret Launcher](https://www.egret.com/products/engine.html)，可以在正中間（下圖紅框處）看到，

本範例版本為 v1.7.0，應該是沒有特別差異。

[![1518786024_8602.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518786024_8602.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518786024_8602.png)

開啟後我們選擇 Egret MovieClip。

![1518786349_38478.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518786349_38478.png)

使用的方式我們拆分為幾種：

*   [使用現有 GIF](#1)
*   [使用 PNG 拼貼](#2)
*   [使用現有GIF並加入多個動作](#3)

### ☑ 使用現有 GIF：

下圖為本範例素材（From [Google Search](https://giphy.com/stickers/y7Wiq1yMLpA3XEEEhA)）。

### [![1518786914_46061.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518786914_46061.gif)](https://media.giphy.com/media/y7Wiq1yMLpA3XEEEhA/giphy.gif)

首先將圖片拖曳至表單內。

[![1518787309_72684.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518787309_72684.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518787309_72684.png)

「項目名稱」命名 girl，程式碼需要辨識名稱（可自訂）。

![1518787364_04645.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518787364_04645.png)

載入後可以看到已經自動為我們切好 png 位置了！

圖片位置並不影響動畫順序。

[![1518787481_21054.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518787481_21054.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518787481_21054.png)

### 資源編輯

左邊樹展開，第一個「no action」，就是預設動作，

當然也可以 右鍵 / 編輯，去修改我們定義的動作名稱。

![1518787526_58966.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518787526_58966.png)

建議使用英文命名，且有意義的動作名稱，

動作可以設定多組，且能夠從程式中去控制（後續會提到）。

![1518787644_20795.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518787644_20795.png)

在群組的右邊有個按鈕，可以提供動畫預覽。

![1518788205_09211.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518788205_09211.png)

如果發現幀率過高，可以到最上層 右鍵 / 編輯，

![1518788320_35137.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518788320_35137.png)

輸入低一點的幀率，也許就會正常些囉！

![1518788338_13409.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518788338_13409.png)

### 資源導出

接著於功能表列，選擇將檔案「導出」。

[![1518788506_73051.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518788506_73051.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518788506_73051.png)

成功後就可以看到產出兩個檔案（.png、.json）。

![1518788556_32331.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518788556_32331.png)

### ☑ 使用 PNG 拼貼：

如果我們已經製作好連續的動作 png，

那麼其實只要建立好項目名稱後，右鍵選擇「添加動作」即可。

![1518793561_69814.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518793561_69814.png)

### ☑ 使用現有GIF並加入多個動作：

下圖為本範例素材（From [Google Search](https://giphy.com/stickers/BLT8DkclFeVRdgoJFv)），圖片包含兩個動作 ( 待命、吃東西 )。

[![1518793748_85194.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518793748_85194.gif)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518793748_85194.gif)

拖曳新增，「項目名稱」命名 metal，辨識名稱（可自訂）。

然後調整一下幀率。

![1518794962_4337.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518794962_4337.png)

我們可以從樹狀以及實際圖片對照，拆出兩個動作的轉捩點，

可以很明顯看到：

「F7A5AB7」為待命的最後一張

![1518794072_26093.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518794072_26093.png)

「9226184D」為吃東西的第一張

![1518794086_78957.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518794086_78957.png)

因此我們將目前的群組改名設定為「stand」，然後建立新的動作「eat」。

![1518794376_08817.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518794376_08817.png)

一般步驟來說，待命的圖片直接右鍵「添加幀」，

由於我們是直接從 GIF 中抽離，

因此直接把「9226184D」以及後面全部圖檔拖曳至 「eat」。

目前無法直接在空集合裡面拖曳新增圖檔，請先透過右鍵「添加幀」隨意選圖片進來，待拖曳完後刪除。

分離後如下：

![1518794928_95991.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518794928_95991.png)

建議預覽看看結果。

![1518795177_09417.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518795177_09417.png)

最後導出，

如果使用這個方式，可直接看 [四、MovieClip - 動作指定](#actions)。

![1518795258_47886.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518795258_47886.png)

三、MovieClip - 無動作
-----------------

### 專案建立

接著就是在程式碼中宣告了，

建立一個空的專案，需要包含的函式庫有：

*   egret 核心庫
*   game 遊戲庫
*   res 資源加載入

[![1518788814_58043.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518788814_58043.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518788814_58043.png)

在開發風格上，自己習慣另外建立遊戲的資料夾，以及常用的方法資料夾。

*   風格來源 - [NeoGuo](https://github.com/NeoGuo/html5-documents/blob/master/egret/README.md) 

![1518792397_27707.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518792397_27707.png)

\[ Game / GameContainer.ts \]

```typescript
module Game {
    export class GameContainer extends egret.DisplayObjectContainer {

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        }

        private createGameScene(): void {

        }
    }
}
```

\[ Game / Player.ts \]

```typescript
module Game {
    export class Player extends egret.DisplayObjectContainer {
        public constructor() {
            super();
        }
    }
}
```

### 資源載入

接著將剛剛導出的 PNG、JSON 放進 /resource 內，

![1518790345_45273.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518790345_45273.png)

系統提示則直接點選「Save」。

[![1518790278_76937.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518790278_76937.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518790278_76937.png)

正常來說應該就可以在 default.res.json 看到項目清單：

[![1518790448_99626.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518790448_99626.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518790448_99626.png)

### 程式建構 - 人物

最後我們建立一個玩家人物，而且人物圖片是剛剛導出的。

首先建構一個工廠。

\[ Game / Player.ts \]

```typescript
private playerFactorty: egret.MovieClipDataFactory;
private player: egret.MovieClip;
```

*   [MovieClipDataFactory](http://developer.egret.com/cn/apidoc/index/name/egret.MovieClipDataFactory)：提供動畫影片的工廠。
*   [MovieClip](http://developer.egret.com/cn/apidoc/index/name/egret.MovieClip)：動畫影片的剪輯，本身擁有一個時間軸。

建構影片工廠需要兩個參數，資料集描述以及檔案來源，就是剛剛產生的 .png、.json，

[![1518791386_77005.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518791386_77005.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518791386_77005.png)

程式碼如下：

\[ Game / Player.ts \]

```typescript
public constructor(texture_json: egret.Texture, texture_png: egret.Texture) {
    super();
    this.playerFactorty = new egret.MovieClipDataFactory(texture_json, texture_png);
    this.player = new egret.MovieClip(this.playerFactorty.generateMovieClipData('girl'));
    this.addChild(this.player);
    this.player.play(-1);
}
```

*   generateMovieClipData：為開始建立時的「[項目名稱](#item_name)」
*   play：默認數字為０播放一次；<0 則不斷地播放；\>0 則為設定播放次數

### 程式建構 - 遊戲容器

人物建立好後，接著到遊戲容器 createGameScene 建構。

\[ Game / GameContainer.ts \]

```typescript
private createGameScene(): void {
    this.player = new Game.Player(RES.getRes('girl_json'), RES.getRes('girl_png'));
    this.addChild(this.player);
}
```

RES.getRes：裡面的字串請依 default.res.json 的 Name 設定

[![1518792518_9157.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518792518_9157.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518792518_9157.png)

### 程式建構 - 主程式

首先將程式建立 resource 資源載入的方法，

這些方法建立專案的時候，選擇「Egret 遊戲項目」，就會有初始範例。

[![1518792724_05765.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518792724_05765.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518792724_05765.png)

\[ src / Main.ts \]

```typescript
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

}
```

接著在資源載入完畢 ( onResourceLoadComplete ) 的時候，建構我們定義好的遊戲容器。

\[ src / Main.ts \]

```typescript
/**
 * preload资源组加载完成
 * Preload resource group is loaded
 */
private onResourceLoadComplete(event: RES.ResourceEvent) {
    if (event.groupName == "preload") {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        // 遊戲建構
        var gameContainer: Game.GameContainer = new Game.GameContainer();
        this.addChild(gameContainer);
    }
}
```

### 編譯結果

編譯後執行就可以看到[西莉卡](https://zh.moegirl.org/zh-tw/%E7%BB%AB%E9%87%8E%E7%8F%AA%E5%AD%90)不斷地舉手惹！

[![1518792966_50839.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518792966_50839.gif)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518792966_50839.gif)

四、MovieClip - 動作指定
------------------

### 程式建構 - 人物

基本步驟與 [三、MovieClip - 無指定](#no-actions) 相同。

如果直接執行，會發現它會把所有動作全部跑過，

MovieClip 提供 gotoAndPlay，可指定到動作幀進行播放。

\[ Game / Player.ts \]

```typescript
public constructor(texture_json: egret.Texture, texture_png: egret.Texture) {
    super();
    this.playerFactorty = new egret.MovieClipDataFactory(texture_json, texture_png);
    this.player = new egret.MovieClip(this.playerFactorty.generateMovieClipData('metal'));
    this.addChild(this.player);
    this.player.gotoAndPlay('stand', -1);
}
```

*   將原本的 play 改成 gotoAndPlay
*   gotoAndPlay：參數為（幀名稱 , 播放模式）

### 編譯結果

進入待命狀態了。

[![1518795955_83729.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518795955_83729.gif)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518795955_83729.gif)

### 事件切換幀動作

接著設計點擊人物的時候，可以進行吃東西的動作，

使用到 touchEnabled 屬性，讓圖片是可以被點擊的。

\[ Game / Player.ts \]

```typescript
public constructor(texture_json: egret.Texture, texture_png: egret.Texture) {
    super();
    this.playerFactorty = new egret.MovieClipDataFactory(texture_json, texture_png);
    this.player = new egret.MovieClip(this.playerFactorty.generateMovieClipData('metal'));

    this.player.touchEnabled = true;
    this.player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    this.player.addEventListener(egret.MovieClipEvent.COMPLETE, this.loopComplete, this);

    this.addChild(this.player);
    this.player.gotoAndPlay('stand', -1);
}

private touchHandler(event: egret.TouchEvent) {
    this.player.gotoAndPlay('eat', 1);
    this.player.touchEnabled = false;
}

private loopComplete(event: egret.MovieClipEvent) {
    this.player.gotoAndPlay('stand', -1);
    this.player.touchEnabled = true;
}
```

*   [egret.TouchEvent.TOUCH\_TAP](http://developer.egret.com/cn/apidoc/index/name/egret.TouchEvent)：監聽圖片點擊接觸的事件
*   [egret.MovieClipEvent.COMPLETE](http://edn.egret.com/cn/article/index/id/596)：監聽圖片播放完畢的事件，由於播放 eat 的時候，我們設定次數為1，播放結束後就會觸發該事件
*   [touchEnable](http://edn.egret.com/cn/article/index/id/117)：用來避免重複觸發 touchHandler 導致 eat 重繪執行

### 編譯結果

透過點擊可以進行吃東西的動作。

[![1518796901_78157.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-16_Egret%20-%20%E4%BD%BF%E7%94%A8%20TextureMerger%20%E6%8F%92%E5%85%A5GIF%E5%8B%95%E7%95%AB/1518796901_78157.gif)](https://dotblogsfile.blob.core.windows.net/user/incredible/abfab766-7033-45ad-9eb5-523105ef799f/1518796901_78157.gif)

五、參考資料
------

*   [TextureMerge简介](http://developer.egret.com/cn/github/egret-docs/tools/TextureMerger/manual/index.html)
*   [【咸鱼教程】TextureMerger1.6.6 一：Egret MovieClip的制作和使用](http://bbs.egret.com/thread-31830-1-1.html)
    

有勘誤之處，不吝指教。ob'\_'ov