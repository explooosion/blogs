---
title: "Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS"
date: "2020-01-20"
tags: [flutter, connect, multiple, devices, debug, vscode, hotreload]
view: "1693"
history: "0"
group: "Flutter"
banner: "images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/banner/1579488535_77802.jpeg"
---

如果你使用果粉信仰的 MacPro 進行 APP 開發，那你一定要試試！

[![1579488535_77802.jpeg](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579488535_77802.jpeg)](https://dotblogsfile.blob.core.windows.net/user/incredible/d4e40a03-8ebb-46c0-8be3-5adc0808f6e6/1579488535_77802.jpeg)

*   ref：[Kody Technolab.](https://medium.com/@kodyTechnolab?source=post_page-----c07429ca5115----------------------)

* * *

目錄
--

1.  [前言](#1)
2.  [事情是這樣的](#2)
3.  [開始設定](#3)
4.  [參考資料](#4)

* * *

I. 前言
-----

最近接到某個小小案子，專案平台需支援 Android，

一開始怕 deadline 的關係，所以簡單先用 webpack + PWA 建置，

最後再用 [Cordova](https://cordova.apache.org/) 封裝成 apk 提供安裝。

由於提早將專案完工...

乾脆來趁著機會學學 [Flutter](https://flutter.dev/)。

本篇記錄如何在 vscode 中，使用內建的 debug，

ㄧ次啟動 Android 與 iOS 兩個裝置，並且支援各種神器功能。

II. 事情是這樣的
----------

你電腦不錯，想要同時執行 Android 與 iOS，

方便在開發時，可以確保雙平台的畫面與邏輯結果。

在多重裝置的啟用上，你可以直接開啟 terminal ，使用官方指令啟動所有裝置：

    flutter run -d all

但卻無法在存檔 (Save) 程式碼時，自動更新 (Auto Update)，

通常我們使用指令啟動專案後，都會得到一段訊息：

[![1579514200_17817.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579514200_17817.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d4e40a03-8ebb-46c0-8be3-5adc0808f6e6/1579514200_17817.png)

雖然按下r可以進行 Hot Reload，但此一功能需要每次手動按，實在很麻煩...

> 人生而懶，懶覺除了使人恢復體力，更是科技進步的來源。

懶覺：指人貪睡，不愛起床。 多指早晨晚起。 如：他就愛**睡懶覺**，叫了幾次都不起床。

*   ref: [漢語網](http://www.chinesewords.org/dict/212609-300.html)

而本篇最主要的需求是要同時啟動雙平台裝置，即 Android 與 iOS。

並且透過 vscode ，來協助我們進行 debugger、auto hot reload。

慶幸的是，官方在 2019 年 12 初，釋出[實驗版](https://github.com/flutter/flutter/wiki/Multi-device-debugging-in-VS-Code/3896748c458888cbfeaa10bec429523359247765)，

而同年底也正式支援此功能。其實距離現在也才短短不到 1 個月 XD。

原本筆者還不知道，於是查到早期文章的奇淫技巧...，

嚐盡各種苦頭，踩盡各種深坑。

（汗...

總而言之，趕緊來試試這新的功能吧！

III. 開始設定
---------

### 1\. 環境檢查

在設定前，請確保 Flutter 環境是 ok 的：

    flutter doctor

[![1579515783_90024.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579515783_90024.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d4e40a03-8ebb-46c0-8be3-5adc0808f6e6/1579515783_90024.png)

● No issues found !

設定流程很簡單，基本上照著官方流程做就可以了：

*   [Multi device debugging in VS Code](https://github.com/flutter/flutter/wiki/Multi-device-debugging-in-VS-Code)

### 2\. 設定 launch.json

以專案為工作目錄，開啟 VSCODE ，

到左邊第4個蟲蟲，選擇 \[ 建立 launch.json 檔案。 \]。

[![1579516636_77472.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579516636_77472.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d4e40a03-8ebb-46c0-8be3-5adc0808f6e6/1579516636_77472.png)

請選擇 \[ Dart & Flutter \]，就會得到一個範本設定檔了。

![1579516794_60855.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579516794_60855.png)

接著到官方文件：

*   [Multi device debugging in VS Code](https://github.com/flutter/flutter/wiki/Multi-device-debugging-in-VS-Code)

將 Setup 內的設定複製起來，全部覆蓋貼上。

    {
    	"version": "0.2.0",
    	"configurations": [
    		{
    			"name": "Current Device",
    			"request": "launch",
    			"type": "dart"
    		},
    		{
    			"name": "Android",
    			"request": "launch",
    			"type": "dart",
    			"deviceId": "android"
    		},
    		{
    			"name": "iPhone",
    			"request": "launch",
    			"type": "dart",
    			"deviceId": "iphone"
    		},
    	],
    	"compounds": [
    		{
    			"name": "All Devices",
    			"configurations": ["Android", "iPhone"],
    		}
    	]
    }

存！好！就這樣！

設定過後，你的專案也會多一個 .vscode / launch.json 檔案。

![1579519006_89296.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579519006_89296.png)

### 3\. 啟動模擬器

接下來讓我們來執行看看，

請確保你的模擬器是否都有在執行。

如果 VSCODE 右下顯示，\[ No Device \]，請記得點選，然後開啟。

![1579517149_96616.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579517149_96616.png)

例如筆者的 Android 已經啟動，但 iOS 還沒啟動，

廢話不多說，啟動就對了！

![1579517361_66476.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579517361_66476.png)

你知道嗎？尚未開啟的模擬器會有前綴 Start 的字眼。

### 4\. 進行偵錯

再剛剛的 debug 頁籤中，選擇 \[ All Devices \]。

如果你要連接的裝置，是目前作用中的一台裝置，那就選 \[ Current Device \]。

然後點選 綠綠的按鈕 執行！

![1579517714_58432.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579517714_58432.png)

同時你也一定很興奮著看著畫面在跑：

[![1579517967_24801.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579517967_24801.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d4e40a03-8ebb-46c0-8be3-5adc0808f6e6/1579517967_24801.png)

確認模擬器都開始執行你的專案。

[![PqavL7b.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/PqavL7b.png)](https://i.imgur.com/PqavL7b.png)

除了模擬器，也會自動打開網頁，提供 [Dart DevTools](https://flutter.dev/docs/development/tools/devtools/overview)！

[![1579517960_39866.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579517960_39866.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d4e40a03-8ebb-46c0-8be3-5adc0808f6e6/1579517960_39866.png)

### 5\. Auto Hot Reload

接著你會開始瘋狂的修改與存檔，

並且可以看到偵錯主控台多次的 Reloaded 紀錄。

[![1579518521_64291.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579518521_64291.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d4e40a03-8ebb-46c0-8be3-5adc0808f6e6/1579518521_64291.png)

### 6\. 快速偵錯

當你執行過一次後，VSCODE 底部會顯示快速偵錯的按鈕選單。

![1579518820_56704.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579518820_56704.png)

括弧內是你的專案名稱喇！

點選後，上頭會出現選單，

你就可以快快樂樂選擇你要的偵錯環境囉！

![1579518886_79955.png](images/2020-01-20_Flutter - 在 macOS 中使用 VSCODE 同時偵錯 Android 和 iOS/1579518886_79955.png)

IV. 參考資料
--------

*   [Quickly Switching Between Flutter Devices](https://dartcode.org/docs/quickly-switching-between-flutter-devices/)
*   [Multi device debugging in VS Code](https://github.com/flutter/flutter/wiki/Multi-device-debugging-in-VS-Code)
    
*   [VSCode and flutter, how to connect multiple devices?](https://stackoverflow.com/questions/50877842/vscode-and-flutter-how-to-connect-multiple-devices)
    
*   [Support running on all connected devices](https://github.com/flutter/flutter-intellij/issues/956)
    

有勘誤之處，不吝指教。ob'\_'ov