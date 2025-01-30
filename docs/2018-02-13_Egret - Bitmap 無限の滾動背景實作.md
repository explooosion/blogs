---
title: "Egret - Bitmap 無限の滾動背景實作"
subtitle: "無限月月月月月月月月 👁👁 場景製作..."
date: "2018-02-13T00:00:00.000Z"
series: "egret"
tags: "egret","scroll","background","scene","bitmap"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/banner/0.png"
--- 

無限月月月月月月月月 👁👁 場景製作...

前言
--

無限月讀の.... 

![0](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/0)

\-

在 2D 遊戲中，常常可以看到移動中的場景（背景），

這些背景圖片，主要是由同一張圖片繪製組合而成 [Bitmap](https://zh.wikipedia.org/zh-tw/BMP) 的。

示意圖如下 [Flappy Bird](http://flappybird.io/)：

![09-parallax-scrolling.gif](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/09-parallax-scrolling.gif)

本範例實作結果放置於 Github 上，可直接 clone 下來。

*   **[Egret-ScrollScene](https://github.com/explooosion/Egret-ScrollScene)**

概念設計
----

### 張數計算

合成背景的張數主要依據容器的尺寸進行計算：

    // 張數 = Math.ceil( 容器寬度 / 圖片寬度 ) +1
    this.rowCount = Math.ceil(this.stageW / this.textureWidth) + 1;

*   [Math.ceil](http://www.w3school.com.cn/jsref/jsref_ceil.asp)：取得大於或等於的整數（處理小數問題）。
*   +1：要確保最少張數 > 2，避免偵測的時候，沒有遞補的圖片。

如果最少張數為 1 的時候，為了偵測當前圖片（填滿），會使得右側留白，

因此需要額外一張圖（框線），去補足空白地方。

![1518522715_23657.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518522715_23657.png)

### 背景圖拼貼成一個陣列

計算出最少張數後，使用迴圈將每張圖組合起來：

    // 組合好的圖其實就是利用陣列拼貼起來
    private bmpArr: egret.Bitmap[];

    // 初始化清空陣列
    this.bmpArr = [];
    
    for (var i: number = 0; i < this.rowCount; i++) {
    
        var bgBmp: egret.Bitmap = 背景圖;
    
        // 當前座標依圖片寬度去乘以張數
        bgBmp.x = this.textureWidth * i;
        ...
    }

假設最少張為三張圖，而素材圖片寬度為 30，

x軸座標利用 i，即索引（index），去乘背景圖寬度：

*   第一張 x座標 0：30 \* 0
*   第二張 x座標 30： 30 \* 1
*   第三張 x座標 60： 30 \* 2

![1518524600_35941.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518524600_35941.jpg)

### 陣列值新增移除操作

超出邊界的判定方式為圖片整個超出於主容器外，

因此公式判定為：

    // 當前陣列元素.X軸 <= -1 * 圖片寬度
    this.bmpArr[index].x <= -1 * this.textureWidth

畫面移動的過程中，當 x軸 超出容器邊界時，就將該元素移除於陣列外。

    this.bmpArr.shift();

*   利用 [shift](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) 從陣列中移除**第一個**元素。

![1518542900_88941.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518542900_88941.png)

因為總張數少了一張（元素），所以要在陣列末端新增一個圖片。

當然要讓圖片黏在一起接續下去，因此 x軸為：

    // 首先 clone 一個元素
    var bgBmp: egret.Bitmap = this.bmpArr[index]
    
    // 新元素x軸 = 陣列中最後一個元素.x軸 + 圖片寬度 
    bgBmp.x = this.bmpArr[this.rowCount - 1].x + this.textureWidth;
    
    // 利用 push 方式推進陣列中
    this.bmpArr.push(bgBmp);

*    利用 [push](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 添加該元素至陣列的末端。

![1518544560_38357.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518544560_38357.png)

以上動作完成後，又回到最原本的陣列：

![1518545408_23555.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518545408_23555.png)

實作滾動
----

### 建立專案

場景所使用到的 lib 只有 egret 核心庫、res 資源加載庫。

[![1518547083_52315.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518547083_52315.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/7aaaf1f5-032e-4c8f-b26d-e0ec2425457b/1518547083_52315.png)

在遊戲開發上，本範例使用的系統架構，

會另外建立資料夾 mygame、utils 以及遊戲的 namespace，檔案架構如下：

![1518552347_17185.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518552347_17185.png)

*   GameContainer.ts：遊戲主畫面容器
*   BgMap.ts：場景
*   GameUtil.ts：常用方法

mygame / GameContainer.ts

    module mygame {
        export class GameContainer extends egret.DisplayObjectContainer {
    
        }
    }

mygame / BgMap.ts

    module mygame {
        export class BgMap extends egret.DisplayObjectContainer {
    
        }
    }

utils / GameUtil.ts

    module mygame {
    
        /**
         * 根據name關鍵字建立一個Bitmap對象。name屬性請參考resources/default.res.json配置文件的內容。
         */
        export function createBitmapByName(name: string): egret.Bitmap {
            var result: egret.Bitmap = new egret.Bitmap();
            var texture: egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }
    }

### 圖片資源新增

將背景圖片資源放入 resource，可以使用本範例 ↓ ↓ ↓ 或是另行準備。

[![1518557915_88889.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518557915_88889.jpg)](https://dotblogsfile.blob.core.windows.net/user/incredible/7aaaf1f5-032e-4c8f-b26d-e0ec2425457b/1518557915_88889.jpg)

如果 IDE ( Egret Wing ) 出現提示，請選擇 Save。

[![1518554406_68757.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518554406_68757.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/7aaaf1f5-032e-4c8f-b26d-e0ec2425457b/1518554406_68757.png)

這時候查看 resource / default.res.json。

![1518554365_85531.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518554365_85531.png)

切換至 Design 檢視模式，應該可以看到剛剛新增的資源項目：

[![1518554579_64116.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518554579_64116.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/7aaaf1f5-032e-4c8f-b26d-e0ec2425457b/1518554579_64116.png)

*   Name：如果要調用該圖片資源，不再需要輸入整個路徑 url，僅需要輸入賦予的 Name

如果沒有，就請直接拖曳到 Drop Here 吧～

![1518554302_90328.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518554302_90328.png)

### 滾動背景設計

接著新增一些背景圖會用到的基本屬性：

mygame / BgMap.ts

    // 存放由圖片合併而成的大圖(底片
    private bmpArr: egret.Bitmap[];
    
    // 圖片數量
    private rowCount: number;
    
    // 容器寬
    private stageW: number;
    
    // 容器高
    private stageH: number;
    
    // 圖片來源寬
    private textureWidth: number;
    
    // 場景移動速度
    private speed: number = 10;

於舞台（STAGE）建立階段讀取資源，

計算所需圖片張數，並儲存背景圖集合於陣列中。

mygame / BgMap.ts

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event: egret.Event) {
    
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        var texture: egret.Texture = RES.getRes("bg_jpg");
    
        this.textureWidth = texture.textureWidth;
    
       　// 計算當前容器(或螢幕), 需要多少張圖片才能填滿
        this.rowCount = Math.ceil(this.stageW / this.textureWidth) + 1;
        this.bmpArr = [];
        
        // 將圖片並列在一起
        for (var i: number = 0; i < this.rowCount; i++) {
            var bgBmp: egret.Bitmap = mygame.createBitmapByName("bg_jpg");
            bgBmp.x = this.textureWidth * i;
            console.log(bgBmp.x);
            this.bmpArr.push(bgBmp);
            this.addChild(bgBmp);
        }
    }
    

建立基於幀數的開始與停止事件，當開始時，會執行 enterFrameHandler 。

mygame / BgMap.ts

    /**
     * 開始滾動
     */
    public start(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }
    
    /**
     * 滾動 - ENTER_FRAME
     */
    private enterFrameHandler(event: egret.Event) {
    
    }
    
    /**
     * 暫停滾動
     */
    public pause(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

在滾動的事件中，利用迴圈，將所有圖片不斷地向左移動，

當前圖片如果超過邊界，就將該元素移除，並推入新元素於末端。

mygame / BgMap.ts

    /**
     * 滾動 - ENTER_FRAME
     */
    private enterFrameHandler(event: egret.Event) {
    
        for (var i: number = 0; i < this.rowCount; i++) {
    
            if (this.bmpArr[i].x <= -1 * this.textureWidth) {
    
                var bgBmp: egret.Bitmap = this.bmpArr[i];
                bgBmp.x = this.bmpArr[this.rowCount - 1].x + this.textureWidth;
    
                this.bmpArr.shift();
                this.bmpArr.push(bgBmp);
    
                // 處理位置跳格問題
                this.bmpArr.forEach(bmp => {
                    bmp.x += this.speed;
                });
    
            }
            this.bmpArr[i].x -= this.speed;
        }
    }

### 將滾動背景加入於遊戲容器中

宣告一個背景圖，且是基於我們剛剛建立好的 BgMap。

mygame / GameContainer.ts

    private bg: mygame.BgMap;

於遊戲容器的舞台（STAGE）建構階段，將背景加入，

並且立即開始滾動。

mygame / GameContainer.ts

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    }
    
    private createGameScene(): void {
        this.bg = new mygame.BgMap();
        this.addChild(this.bg);
    
        // 背景開始滾動
        this.bg.start();
    }

### 將該遊戲容器加入於主體容器

由於我們是建立空的專案，對於資源的掛載方式尚未設定，

因此我們要將設定檔 default.res.json 載入。

建立遊戲專案時，選擇 game 遊戲庫，可以看到這些方法！

Main.ts

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

在 onResourceLoadComplete 中，當載入完畢的群組等於 preload，

我們就可以建構遊戲容器了！

Main.ts

    if (event.groupName == "preload") {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    
        //游戏的主类开始实例化
        var gameContainer: mygame.GameContainer = new mygame.GameContainer();
        this.addChild(gameContainer);
    }

為什麼是 preload？

在 resource / default.res.json 中，切換至 Source 檢視模式，

可以看到系統預設建立名為 preload 的群組（groups）：

    {
     "groups": [
      {
       "name": "preload",
       "keys": "bg_jpg"
      }
     ],
     "resources": [
      {
       "name": "bg_jpg",
       "type": "image",
       "url": "bg.jpg"
      }
     ]
    }

### 編譯執行結果

Shift \+ Ctrl \+ B快捷鍵編譯吧！

如果出現一些 template 找不到 debug 錯誤，

請在該底下自行手動建立資料夾，

然後將 template / web / index.html 複製於此底下，如下圖結果：

![1518558120_74798.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-13_Egret%20-%20Bitmap%20%E7%84%A1%E9%99%90%E3%81%AE%E6%BB%BE%E5%8B%95%E8%83%8C%E6%99%AF%E5%AF%A6%E4%BD%9C/1518558120_74798.png)

參考資料
----

*   [Egret 实战 - 飞行射击类游戏 - 使用Egret创建一个打飞机的游戏](http://edn.egret.com/cn/index.php/portal/article/index/id/712)
*   [NeoGuo](https://github.com/NeoGuo)[/](https://github.com/NeoGuo/html5-documents/blob/master/egret/sample-1.md)[html5-documents](https://github.com/NeoGuo/html5-documents/blob/master/egret/sample-1.md)
    
*   [Array.prototype.pop() - JavaScript - MDN - Mozilla](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
    
*   [Array.prototype.push() - JavaScript - MDN - Mozilla](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
    

有勘誤之處，不吝指教。ob'\_'ov