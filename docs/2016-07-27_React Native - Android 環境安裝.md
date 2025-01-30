---
title: "React Native - Android 環境安裝"
date: "2016-07-27"
tags: [android, install, react, reactnative, windows]
view: "3358"
history: "0"
group: "ReactNative"
banner: "images/2016-07-27_React Native - Android 環境安裝/banner/1469550384_80777.png"
---

react native for android，windows 環境入門起手。

大約在去年 2015 九月時，Android 部分終於釋出了，

最近看到有些使用 React Native 的作品，相當不錯，為之動容啊～

在環境部屬的部分，經過各種 error 的摧殘，才搞定一番。

本篇為教學如何於 **Windows** 系統上，

使用 React Native，進行 Android 的開發。

React Native 套件安裝
-----------------

本篇為假設你已經安裝好 [node.js](https://nodejs.org/en/)，

讓我們先安裝 react native （-g 全域安裝）套件吧~

    npm install -g react-native-cli

如還沒安裝，可參考此篇教學　[Node.js - Install（nvm）](https://dotblogs.com.tw/explooosion/2016/06/12/112558)

Android Studio 下載
-----------------

至 [Android 官網](https://developer.android.com/studio/index.html) 下載，並安裝好。

Tools：

*   Android SDK Tools
*   Android SDK Platform-Tools
*   Android SDK Build-tools （務必將 Rev. 23 的裝好）

[![1469550384_80777.png](images/2016-07-27_React Native - Android 環境安裝/1469550384_80777.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/af563a5d-5efa-4900-8cbb-16882971d96e/1469550384_80777.png)

Android API：

*   SDK Platform
*   Image

如果使用此提供的模擬器（AVD Manager），務必將相關套件裝齊。

或使用 [Genymotion](https://www.genymotion.com/) 模擬器

Extras 部分：

*   Android Support Repository

[![1469550072_81143.png](images/2016-07-27_React Native - Android 環境安裝/1469550072_81143.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/af563a5d-5efa-4900-8cbb-16882971d96e/1469550072_81143.png)  
 

Java SE Development Kit 8 下載
----------------------------

到 [Oracle](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 下載安裝，如果已經安裝了，請跳過。

Windows 環境設定
------------

至電腦－系統內容，選擇環境變數。

![1469549089_61808.png](images/2016-07-27_React Native - Android 環境安裝/1469549089_61808.png)

新增一個系統變數：

    ANDROID_HOME

「變數值」請指定安裝時候 sdk 的位置，為了方便，我把 sdk另外安裝在 D:\\

[![1469549141_26667.png](images/2016-07-27_React Native - Android 環境安裝/1469549141_26667.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/af563a5d-5efa-4900-8cbb-16882971d96e/1469549141_26667.png)

編輯 Path 系統變數，增加以下內容

    ;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools

[![1469549309_5982.png](images/2016-07-27_React Native - Android 環境安裝/1469549309_5982.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/af563a5d-5efa-4900-8cbb-16882971d96e/1469549309_5982.png)

在編輯 Path，請小心修改，或是先備份好原有「變數值」。

建立專案 Create Project
-------------------

建立一份專案，命為 myapp，建立約數分鐘，**耐心等候**。

    react-native init myapp

完成後進入目錄

    cd myapp

裡面可看見已經幫我們部屬好 android、ios 的環境了，

index.android.js 則為 app 開啟時的主畫面內容（Main）

[![1469549579_75511.png](images/2016-07-27_React Native - Android 環境安裝/1469549579_75511.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/af563a5d-5efa-4900-8cbb-16882971d96e/1469549579_75511.png)

環境執行、安裝

    react-native run-android

或是 debug 模式

    react-native run-android -debug

此時你可透過模擬器或是實體外接手機進行執行安裝

使用「模擬器」若執行失敗，極大可能是你的版本問題沒安裝好，

務必將 sdk 的 Packages 安裝完整。

成功時，則可看見預設專案的內容如下（本範例使用實體手機）：

Welcome to React Native！

[![1469549888_98836.png](images/2016-07-27_React Native - Android 環境安裝/1469549888_98836.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/af563a5d-5efa-4900-8cbb-16882971d96e/1469549888_98836.png)

以上為簡易環境部屬，詳細步驟可於官方文件查看

[React-Native](https://facebook.github.io/react-native/docs/getting-started.html)

有勘誤之處，不吝指教。ob'\_'ov