---
title: "React Native - Could not install the app on the device"
subtitle: "你編譯的苦我們都知道..."
date: "2018-08-28T00:00:00.000Z"
series: "reactnative"
tags: "android","environment","react","reactnative","chmod"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-28_React%20Native%20-%20Could%20not%20install%20the%20app%20on%20the%20device/banner/1535440186_05007.png"
--- 

你編譯的苦我們都知道...

本篇為極簡的紀錄

一、踢到鐵板
------

當你在使用  React Native

正要運行專案時：

```bash
react-native run-android
```

結果不幸的噴出以下訊息：

[![1535440186_05007.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-28_React%20Native%20-%20Could%20not%20install%20the%20app%20on%20the%20device/1535440186_05007.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/b04536e1-9466-4198-847a-9c1add044236/1535440186_05007.png)

沒錯親愛的！

就跟本文標題一樣：Could not install the app on the device

不要懷疑，99% 都是存取權限問題

仔細看看錯誤可以發現它執行了一行指令：

```bash
cd android && ./gradlew installDebug
```

剩下的 1% 是你忘了連接設備，或啟動模擬器。

二、詔令文書
------

沒錯親愛的！

我們要設定 gradlew 的存取權限，請照著以下聖旨：

進入 android 目錄。

```bash
cd android
```

### 如果你是 Windows

請到 [Cmder.net](http://cmder.net/) 下載 [Cmder](https://github.com/cmderdev/cmder/releases/download/v1.3.6/cmder.zip)，執行並輸入：

```bash
chmod +x gradlew
```

更多關於 Cmder 介紹請查看 - [介紹好用工具：Cmder ( 具有 Linux 溫度的 Windows 命令提示字元工具 )](https://blog.miniasp.com/post/2015/09/27/Useful-tool-Cmder.aspx)

這篇不是在傳教 Cmder。

### 如果你是 Mac

直接在終端機上輸入：

```bash
chmod +x gradlew
```

三、快樂的出帆
-------

再次啟動專案。

```bash
react-native run-android
```

沒意外等個一分鐘：

[![1535441377_88178.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-28_React%20Native%20-%20Could%20not%20install%20the%20app%20on%20the%20device/1535441377_88178.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/b04536e1-9466-4198-847a-9c1add044236/1535441377_88178.png)

看到 **BUILD SUCCESSFUL** 就成功囉～

有勘誤之處，不吝指教。ob'\_'ov