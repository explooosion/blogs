---
title: "React Native - 2018 Android 環境安裝（Windows ）"
subtitle: "現在放棄的話，專案就結束了哦"
date: "2018-08-12T00:00:00.000Z"
series: "reactnative"
tags: "install","reactnative","windows","android","environment","react"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/banner/1534016090_40382.png"
--- 

現在放棄的話，專案就結束了哦

[![1534016090_40382.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534016090_40382.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534016090_40382.png)

沒想到過了兩年又回來寫 RN

回顧一下自己兩年前寫的文章

*   [React Native - Android 環境安裝](https://dotblogs.com.tw/explooosion/2016/07/27/003610)

不禁感慨...

QAQ 時間過好快！！！

由於時間緊迫，這篇就作為快速筆記。

一、前言
----

很久沒寫 RN，因為一些因素所以要回來寫

電腦兩年也當然經歷了重灌，所有環境都早已重置。

這篇的系統是在 Windows 的 Android 環境建置，

如果您使用視窗的[捧油](https://en.wiktionary.org/wiki/%E6%8D%A7%E6%B2%B9)，歡迎往下閱讀～

二、安裝
----

為了快速筆記，說明就不詳細解釋了，

等非常時期結束再補充。

安裝流程為官方 [getting-started](https://facebook.github.io/react-native/docs/getting-started)。

但專案啟動後會有些問題，建議參考本篇流程。

### 2.1 安裝 Chocolatey 

請先到[官網](https://chocolatey.org/)認識一下。

接著使用系統管理員開啟終端機輸入：

```bash
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

上述指令可於官網直接複製。

確認安裝是否成功：

```bash
choco -v
```

![1534006571_85758.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534006571_85758.png)

更新 chocolatey。

```bash
choco upgrade chocolatey
```

安裝成功後最好重開終端機，以確保吃到設定。

### 2.2 安裝 Node, Python2, JDK

安裝 nodejs﹑python2、jdk：

```bash
choco install -y nodejs.install python2 jdk8
```

請依據個人電腦所缺少的套件進行安裝，

由於筆者環境已經有 node.js，因此指令為：

```bash
choco install -y python2 jdk8
```

用 choco 安裝好處就是可以省掉很多環境設定的步驟！！！

### 2.3 安裝 React Native CLI

我們先從官網的範例開始著手，確保基本運作。

由於會寫 RN 的人，想必都是 node.js 高手，因此 npm 就不贅述惹，

接著安裝 CLI：

```bash
npm install -g react-native-cli
```

確認是否安裝成功：

```bash
react-native -v
```

[![1534006526_46709.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534006526_46709.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534006526_46709.png)

### 2.4 安裝 Android Studio

原本筆者也想說偷懶，看能不能少裝就少裝些什麼，

...最後還是乖乖安裝整套。  
 

請到 [Android Studio 官網](https://developer.android.com/studio/) 下載，

點選 Download Android Studio 並同意授權。

[![1534006837_68263.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534006837_68263.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534006837_68263.png)

下一步到底！　然後安裝完成！

![1534007024_72951.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534007024_72951.png)

接著啟動 Android Studio。

![1534007435_85566.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534007435_85566.png)

展開 Configure，選擇 SDK Manager。

[![1534007085_26819.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534007085_26819.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534007085_26819.png)

由於筆者環境已經設定過，這時候應該會跳出視窗，

提示使用者選擇 Android SDK Location 的所在目錄，

看大家想放哪都可，務必記住，環境設定會用到！

筆者是放在：

```bash
C:\Android\sdk
```

我知道官方這麼寫著：

勾選要安裝的項目：

*   `Android SDK`
*   `Android SDK Platform`
*   `Performance (Intel ® HAXM)`
*   `Android Virtual Device`

不用擔心，請繼續往下看。（真的很機掰模糊難懂）

在畫面中可以看到有三個頁籤(Tab)：

[![1534007703_328.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534007703_328.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534007703_328.png)

原則上我們只會動到 SDK Platforms，其他的頁籤項目都已經幫我們預設打勾。

這邊請依據你的開發平台（即你的手機或模擬器的版本）進行勾選，

由於筆者預期會開發 Android 6、Android 7、Android 8，因此勾選這三個。

如果你也擔心其他頁籤會不會有意外漏掉，

親，別擔心，一併會貼給您看看的！！

#### ［SDK Platforms］

[![1534007873_28629.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534007873_28629.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534007873_28629.png)

#### ［SDK Tools］

[![1534007983_39082.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534007983_39082.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534007983_39082.png)

#### ［SDK Update Sites］

[![1534008038_95143.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534008038_95143.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534008038_95143.png)

接著就開始漫長的安裝之旅吧～～～

安裝完畢就可以關閉囉！

#等待 #思考人生 #漫長 #期待 #落空

### 2.5 環境設定 ANDROID\_HOME

新增環境變數，變數值請根據 sdk 所在目錄。

```bash
#變數名稱
ANDROID_HOME
```
```bash
#變數值
C:\Android\sdk
```

如果你沒更改過 sdk 目錄，預設應該會是在：

```bash
c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
```

給文組的圖解步驟如下：

[![1534008632_56543.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534008632_56543.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534008632_56543.png)

### 2.6 安裝模擬器

這邊推薦 [Genymotion](https://www.genymotion.com)，請下載安裝～

由於筆者電腦也沒安裝 VirtualBox，因此下載類型選擇 with VirtualBox。

![1534009227_46989.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534009227_46989.png)

請記得註冊帳號。

安裝過程下一步到底，完成後開啟模擬器。

選擇 Settings－ADB，接著選擇你的 sdk 所在目錄。

[![1534009394_82503.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534009394_82503.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534009394_82503.png)

這邊會要求登入，記得勾選 personal 方案

接著建立一個模擬器，乳下方結果：

[![1534009498_16671.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534009498_16671.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534009498_16671.png)

完成建立後就啟動它吧～

[![1534009609_66908.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534009609_66908.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534009609_66908.png)

### 2.7 建立新的 APP 專案

開始前，建議先安裝 [Yarn](https://yarnpkg.com/zh-Hans/)！非宗教問題！

有了模擬器後，就可建立一個範例專案，隨意取名為「AwesomeProject」。

```bash
react-native init AwesomeProject
```

進入目錄。 

```bash
cd AwesomeProject
```

啟動 APP 專案，並以 Android 環境啟動。

```bash
react-native run-android
```

記得要啟動手機模擬器

哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！

[![1534011190_17842.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534011190_17842.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534011190_17842.png)

先學會怎麼摔，再學會怎麼站起。

如果你沒問題且很順利....

哼！你可以滾了。

建議繼續往下看...

三、啟動失敗的種種情況
-----------

以下的狀況通常會是依序發生的唷～

### \> [Could not install the app on the device, read the error above for details.](https://github.com/facebook/react-native/issues/8868)

發生了上述問題，根據巨量資料分析結果，解法如下：

1.  確認有沒有啟動模擬器
2.  移除模擬器上你後來部署進去的 APP
3.  參照下方作法

新增環境變數於 path，

platform-tools 位於你的 sdk 所在位置。

```bash
C:\Android\sdk\platform-tools
```

![1534012255_71578.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534012255_71578.png)

執行以下指令：

```bash
adb reverse tcp:8081 tcp:8081
```

接著再去執行一次看看：

```bash
react-native run-android
```

等待.....

如果又失敗，則改執行以下指令，並請於專案當前目錄執行：

```bash
chmod 755 android/gradlew
```

或是：

```bash
chmod 755 .
```

如果你不能使用 chmod，請下載 [cmder](http://cmder.net/)。

或是參考保哥的文章：

*   [介紹好用工具：Cmder ( 具有 Linux 溫度的 Windows 命令提示字元工具 )](https://blog.miniasp.com/post/2015/09/27/Useful-tool-Cmder.aspx)

哦哦哦終於 build 成功惹！！！

快去看看模擬器～

[![1534012848_17183.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534012848_17183.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534012848_17183.png)

哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！

[![1534012800_28451.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534012800_28451.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534012800_28451.png)

先學會怎麼摔，再學會怎麼站起。

如果你沒問題且很順利....

哼！你可以滾了。

### \> [The development server returned response error code: 500](https://github.com/react-community/create-react-native-app/issues/401)

如果你遇到這葛問題，不要驚慌，

目前最新版本會遇到這葛問題，請手動降級版本。

修改 package.json

*   將 react-native 版本改為：0.55.2
*   將 babel-preset-react-native 版本改為：4

完整範例如下（主要改那兩個版本即可）：

```json
{
  "name": "AwesomeProject",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest"
  },
  "dependencies": {
    "react": "16.4.1",
    "react-native": "0.55.2"
  },
  "devDependencies": {
    "babel-jest": "23.4.2",
    "babel-preset-react-native": "4",
    "jest": "23.5.0",
    "react-test-renderer": "16.4.1"
  },
  "jest": {
    "preset": "react-native"
  }
}
```

接著重新安裝：

```bash
yarn install
```

[![1534014038_61958.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534014038_61958.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534014038_61958.png)

如果使用 npm install，請乖乖移除整個 node\_modules，再下指令重新安裝。

哈哈哈！就叫你先安裝 Yarn 了吧！

降級後，讓我們重新啟動吧～

```bash
react-native run-android
```

哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！

[![1534014104_58904.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534014104_58904.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534014104_58904.png)

教練說過：

[![1534014179_8163.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534014179_8163.jpg)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534014179_8163.jpg)

### \> [Unable to load script from assets index.android.bundle on windows](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows)

這邊的解法，我們不參考[來源的](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows)最佳解，

我們參考下方 [](https://stackoverflow.com/users/8592246/nidhi-shah)[Nidhi Shah](https://stackoverflow.com/users/8592246/nidhi-shah) 所寫的解決方法。

你應該會很熟悉，就是剛剛的指令：

```bash
adb reverse tcp:8081 tcp:8081
```

接著我們再重新啟動：

```bash
react-native run-android
```

太港動喇～～～～～

#### 灑花🌼🌼　灑花🌼🌼　灑花🌼🌼

[![1534014403_5091.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534014403_5091.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534014403_5091.png)

四、**[react-native-starter-kit](https://github.com/mcnamee/react-native-starter-kit) 範例**
----------------------------------------------------------------------------------------

這裡使用 [react-native-starter-kit](https://github.com/mcnamee/react-native-starter-kit) 作為其他範例，

這葛專案集合了 React Native + React (web) & Firebase (optional) ，

在開發上可以快速整合三平台並內建搭載 firebase。

將專案 clone 下來。

```bash
git clone https://github.com/mcnamee/react-native-starter-kit.git
```

進入專案。

```bash
cd react-native-starter-kit
```

安裝依賴，或使用 npm install（宗教問題）。

```bash
yarn install
```

啟動專案。

```bash
yarn start
```

出現提示畫面時，我們按下 a

[![1534015124_31909.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534015124_31909.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534015124_31909.png)

如果有畫面，初次使用請依照指示設定。

順利就可以看到初始畫面囉～

[![1534015256_87828.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534015256_87828.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/64374127-8f6f-4297-bef0-8c3421f3edd6/1534015256_87828.png)

如果有發生 port 的一些占用問題，

請重新啟動 模擬器或是再次輸入 npm start 即可。

再次讓肝偉大吧！ 趕快起身上廁所...

[![1534015659_84212.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-12_React%20Native%20-%202018%20Android%20%E7%92%B0%E5%A2%83%E5%AE%89%E8%A3%9D%EF%BC%88Windows%20%EF%BC%89/1534015659_84212.jpg)](https://www.facebook.com/kaobei.engineer/?ref=br_rs)

哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！

笑三＊！

※. 參考資料
-------

*   [react-native/docs/getting-started](https://facebook.github.io/react-native/docs/getting-started)
*   [Could not install the app on the device, read the error above for details. #8868](https://github.com/facebook/react-native/issues/8868)
    
*   [The development server returned response error code: 500#401](https://github.com/react-community/create-react-native-app/issues/401)
    
*   [Unable to load script from assets index.android.bundle on windows](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows)
    
*   [react-native-starter-kit](https://github.com/mcnamee/react-native-starter-kit)
    

有勘誤之處，不吝指教。ob'\_'ov