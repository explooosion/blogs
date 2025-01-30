---
title: "Rust - 在 Windows 上安裝 OpenSSL"
subtitle: "撐住啊別放棄在 Windows 上操作 rust ...."
date: "2018-07-26T00:00:00.000Z"
series: "rust"
tags: "cargo","rust","openssl","actix-web","actix","alpn"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/banner/0003533582_B.JPG"
--- 

撐住啊別放棄在 Windows 上操作 rust ....

這些苦 ...

我知道～

我都知道～

![0003533582_B.JPG](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/0003533582_B.JPG)

一、前言
----

兄弟撐著點，別放棄！！！

本篇為記錄在 Windows 上安裝基於 Rust 的 [OpenSSL](https://www.openssl.org/)。

*   ### **[rust-openssl](https://github.com/sfackler/rust-openssl)**
    

筆者主要於 Windows 上運行 **[actix-web](https://github.com/actix/actix-web) 而發生的問題，**

**在** [package-feature](https://docs.rs/actix-web/0.6.11/actix_web/#package-feature) 可以看到一些功能如下：

[![1532544636_59104.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532544636_59104.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532544636_59104.png)

*   **alpn**：使用到了 opsnssl，因此如果要使用這個模組，就得要安裝！！

二、安裝
----

Windows 平台的安裝過程較為繁瑣，本篇主要為 Windows 64bit 的環境教學。

首先到 [rust-openssl](https://github.com/sfackler/rust-openssl)，可以看到詳細又有點混亂的說明，接下來將依序說明：

### 1\. 安裝 Win32OpenSSL

#### 1.1 下載

首先點選 [Win32OpenSSL](http://slproweb.com/products/Win32OpenSSL.html) 進入頁面，卷到下方後選擇 [](http://slproweb.com/download/Win64OpenSSL-1_1_0h.exe)[Win64 OpenSSL v1.1.0h](http://slproweb.com/download/Win64OpenSSL-1_1_0h.exe) （64-bit）下載。

請依據個人電腦位元決定下載哪個。

[![1532545019_35701.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532545019_35701.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532545019_35701.png)

安裝過程皆為下一步，請安心上路。

![1532545194_02246.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532545194_02246.png)

#### 1.2 環境變數

安裝完畢後請新增環境變數，我們要分別新增「PATH」﹑「OPENSSL\_DIR」的變數。

為了方便大家了解如何設定環境變數，筆者**用盡苦心**整合了一張「完全環境變數指南」，如下：

首先右鍵「我的電腦」－「內容」。

![1532545700_27192.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532545700_27192.png)

依序點選「進階系統設定」－選擇「進階」頁籤的「環境變數」，

在視窗中，上半部就是使用者所有的環境變數。

[![1532545604_61547.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532545604_61547.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532545604_61547.png)

###### **PATH**

我們先新增 PATH 的環境變數，滾動卷軸找到「Path」後雙擊（_或是點下方的編輯_），

接著「新增」－瀏覽我們剛剛安裝 OpenSSL 目錄中的 bin 資料夾並確定，就完成啦。

    C:\OpenSSL-Win64\bin

[![1532546173_78822.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532546173_78822.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532546173_78822.png)

###### **OPENSSL\_DIR**

接下來要新增的是具有變數名稱的值，

點選「新增」－輸入「變數名稱」－「OPENSSL\_DIR」－接著「瀏覽目錄」，選擇後確定即可。

    # 變數名稱
    OPENSSL_DIR
    
    # 變數值
    C:\OpenSSL-Win64

[![1532546541_18586.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532546541_18586.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532546541_18586.png)

筆者希望能讓沒有這類知識的讀者也能輕鬆上手，所以精心策畫以上圖解<3。

### 2\. 安裝憑證 Certificates

#### 2.1 下載

點選網站 [CA certificates extracted from Mozilla](https://curl.haxx.se/docs/caextract.html)，然後下載 [cacert.pem](https://curl.haxx.se/ca/cacert.pem)，

也可點選網站如下紅框處：

[![1532546867_81318.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532546867_81318.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532546867_81318.png)

然後存到剛剛 OpenSSL 目錄底下的 certs 資料夾，

別問原因，別問我家鄉，官方建議，Just Do It。

    C:\OpenSSL-Win64\certs

檔案名稱應該預設如下：

    cacert.pem

#### 2.2 環境變數

###### **SSL\_CERT\_FILE**

接著同前面步驟，設定環境變數「SSL\_CERT\_FILE」，

    # 變數名稱
    SSL_CERT_FILE
    
    # 變數值
    C:\OpenSSL-Win64\certs\cacert.pem

[![1532547306_56676.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532547306_56676.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532547306_56676.png)

### 恭喜～以上就完成在 Rust 環境中 OpenSSL 的安裝了！！！

### 恭喜～以上就完成在 Rust 環境中 OpenSSL 的安裝了！！！

以下的步驟三可跳過，如果最後測試失敗，請再操作此程序。

### 3\. 安裝 MSYS2 installer

#### 3.1 下載

首先到 [MSYS2 installer](http://www.msys2.org/)，依照電腦位元下載：

*   x86 - [下載](http://repo.msys2.org/distrib/i686/msys2-i686-20180531.exe)
*   x64 - [下載](http://repo.msys2.org/distrib/x86_64/msys2-x86_64-20180531.exe)

[![1532547611_55121.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532547611_55121.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532547611_55121.png)

#### 3.1 安裝

接著就參考該網站的教學步驟，其實就是下一步到底。

安裝完畢後，如同官方教學指示，

執行軟體更新（她應該會詢問是否安裝，屆時輸入 -y 就好）：

    pacman -Syu

    pacman -Su

更新完畢後安裝 openssl：

    # 32-bit
    pacman -S mingw-w64-i686-openssl
    
    # 64-bit
    pacman -S mingw-w64-x86_64-openssl

三、專案測試
------

筆者在自己 [github](https://github.com/explooosion/rust-actix-web-sample) 上建立了來自官方範例的專案，可以使用此進行測試。

### 下載專案

    git clone https://github.com/explooosion/rust-actix-web-sample.git

### 進入專案

    cd rust-actix-web-sample

### 編譯專案

這邊順利通過其實就可以了。（初次編譯可能約 3 分鐘）

    cargo build

[![1532549021_65273.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532549021_65273.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532549021_65273.png)

如果發現電腦有點當機，可以改使用：

    cargo build　-j 2

*   \-j：調用的 cpu 執行續數量
    

#### ![1532548620_52416.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532548620_52416.png)

### 執行專案

由於此專案是網站，可以藉此測試網站是否順利運行。

    cargo run

[![1532548353_19116.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532548353_19116.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532548353_19116.png)

*   可以打開網頁看看有沒有畫面，[http://localhost:8080/](http://localhost:8080/)。

[![1532549135_68179.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/1532549135_68179.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/37d0d35d-c3e7-4bea-91a0-b0c2de02858c/1532549135_68179.png)

*   其實有畫面就行了XD

※、結論
----

你放棄 Windows 了嗎？

[![slam_dunk01.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-07-26_Rust%20-%20%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20OpenSSL/slam_dunk01.jpg)](https://www.mplus.com.tw/images/article/75/slam_dunk01.jpg)

有勘誤之處，不吝指教。ob'\_'ov