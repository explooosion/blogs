---
title: "Phaser - Tilemaps create and collision - [ 1 ]"
subtitle: "世界地圖！我的主場！ ~ 地圖建立篇"
date: "2018-02-24T00:00:00.000Z"
series: "phaser"
tags: "phaser","tile","ttilemap","collision"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/banner/1519459832_36077.png"
--- 

世界地圖！我的主場！ ~ 地圖建立篇

這是一個放棄 Egret 後的故事...

今天的主場是 [Phaser](https://phaser.io/)

![1519459832_36077.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519459832_36077.png)

在 Phaser 中如果要使用地圖，可以搭配 [Tiled Map Editor](http://www.mapeditor.org/)，

它是免費的地圖編輯器，十分好上手，

輸出的格式可為 xml、json 等等。

![1519459804_65374.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519459804_65374.png)

本系列實作檔案放置於 Github 上：

*   ### **[phaser-tilemaps](https://github.com/explooosion/PhaserTutorial/tree/master/example/phaser-tilemaps)**
    

目錄引導

#### 本篇

*   一、前置作業
*   二、建立新地圖

#### [下篇](https://dotblogs.com.tw/explooosion/2018/02/24/212512)

*   三、專案建立
*   四、玩家與地圖碰撞

一、前置作業
------

### 軟體安裝

選擇好自己的版本後並下載安裝，

目前最近的 [Release](https://thorbjorn.itch.io/tiled/devlog/22665/tiled-112-released) 版本是 1.1.2。

[![1519459750_83076.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519459750_83076.png)](https://thorbjorn.itch.io/tiled)

### 範例檔案

接著打開它範例的地圖 desert.tmx 試試看，

預設位置在安裝目錄底下的 examples 資料夾。

例如：C:\\Program Files\\Tiled\\examples\\desert.tmx

[![1519461083_65364.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519461083_65364.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/70d4e27e-766b-41b8-9656-066a7f9bc552/1519461083_65364.png)

### 結構說明

一個完整的地圖通常有三個檔案組成：

*   tmx－地圖主檔案
*   tsx－地形結構
*   png－圖塊集合

二、建立新地圖
-------

我們使用在 example 底下的沙漠圖當作圖塊集 tmw\_desert\_spacing.png，

或是使用以下圖片：

![1519461801_28758.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519461801_28758.png)

### 建立新檔案

檔案 > New > New Map

將檔案存成 desert.tmx。

![1519463041_6322.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519463041_6322.png)

*   地圖方向：預設即可
*   圖層格式：提供了三種，但是 phaser 不支援 Base64(zlib)，請不要選擇已壓縮
*   繪製順序：預設右下，不要更動，會影響 phaser 中的讀取順序
*   地圖大小：範例上繪製小張一點的 20x20
*   圖塊大小：我們使用的沙漠圖，每個區塊為 32 pixel 

### 建立素材

檔案 > New > 新圖塊集

或是點選右下角的 New Tileset。

名稱 在 phaser 地圖實作中會用到。

![1519462613_04776.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519462613_04776.png)

*   名稱：tileset，謹慎命名，phaser 中會用到
*   類型：選擇「基於圖塊集合像」
*   Embed in map：務必勾選，phaser 不支援用掛載的方式，即 tsx 檔案
*   圖塊：由於沙漠圖可以看到黑線，其實就邊距、邊界，請設定 1 pixcel

### 屬性客製化

點選右下的 Edit Tileset，可以檢視或新增圖塊屬性。

![1519463318_85991.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519463318_85991.png)

每個圖塊都有自己的 ID，在 phaser 中將作為圖塊集索引。

ID 在 phaser 碰撞偵測（collision）實作中會用到。

[![1519463403_97664.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519463403_97664.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/70d4e27e-766b-41b8-9656-066a7f9bc552/1519463403_97664.png)

選擇圖塊後，可以在客製屬性中新增。

可以用拖曳的方式一次選取快速新增。

[![1519464303_66779.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464303_66779.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/70d4e27e-766b-41b8-9656-066a7f9bc552/1519464303_66779.png)

試著新增 name 屬性，看它是什麼就給什麼名稱囉！

![1519464562_55341.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464562_55341.png)![1519464467_27104.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464467_27104.png)

![1519464578_48935.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464578_48935.png)![1519464524_84674.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464524_84674.png)

![1519464608_14394.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464608_14394.png)![1519464546_41895.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464546_41895.png)

其餘都命名為「陸地」，完成後存檔即可。

### 地圖繪製

可以善用上方的工具去繪製。

![1519464758_22684.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464758_22684.png)

繪製的同時，右側可以看到屬性內容。

[![1519464983_94774.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519464983_94774.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/70d4e27e-766b-41b8-9656-066a7f9bc552/1519464983_94774.png)

### 圖層命名

繪製完後我們將圖層重新命名（預設為中文名稱），

建議使用英文名稱，本範例命名為 Layer。

名稱 在 phaser 地圖實作中會用到。

![1519466758_50369.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519466758_50369.png)![1519466785_73469.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-02-24_Phaser%20-%20Tilemaps%20create%20and%20collision%20-%20%5B%201%20%5D/1519466785_73469.png)

### 檔案匯出

檔案 > Export As > Json map files

將檔案命名為 desert.json。

這篇就到這惹 ...

### [敲碗！下一篇！](https://dotblogs.com.tw/explooosion/2018/02/24/212512)

有勘誤之處，不吝指教。ob'\_'ov