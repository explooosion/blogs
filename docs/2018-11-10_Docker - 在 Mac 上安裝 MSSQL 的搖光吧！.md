---
title: "Docker - 在 Mac 上安裝 MSSQL 的搖光吧！"
subtitle: "這是一篇將 mssql 容器化的教學文。"
date: "2018-11-10T00:00:00.000Z"
series: "docker"
tags: "docker","mssql","dbeaver","mssql-server-linux","images","fluctlight"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/banner/1541917014_27525.png"
--- 

這是一篇將 mssql 容器化的教學文。

在 Mac 上使用 MSSQL ，您可以有另一種選擇。

[![1541917014_27525.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541917014_27525.png)](https://dotblogs.com.tw/explooosion)

摁？搖光？

是[瑤光](https://zh.wikipedia.org/wiki/%E7%91%A4%E5%85%89)？

不是，親愛的。

這裡的搖光是指 [Fluctlight](https://zh.wikipedia.org/wiki/%E5%88%80%E5%8A%8D%E7%A5%9E%E5%9F%9F%E4%B8%96%E7%95%8C%E8%A7%80%E8%88%87%E8%A8%AD%E5%AE%9A#Underworld)。

謹慎開啟。

* * *

本篇較為精簡，以下是本篇的小建議：

1.  聽過 Mac
2.  聽過 Terminal
3.  聽過 Docker
4.  聽過 DataBase
5.  聽過 SAO

* * *

目錄
--

1.  [安裝 Docker](#1)
2.  [安裝 MSSQL](#2)
3.  [安裝 sql-cli](#3)
4.  [介紹 GUI](#4)

* * *

前言
--

寫這篇的動機是因為先前[文章](https://dotblogs.com.tw/explooosion/2017/05/28/012745#comment-4182704140)，有人發問關於 MSSQL 的問題，

由於筆者的環境目前是 Mac，因此踏上了安裝的旅程惹 ORZ。

* * *

一、安裝 Docker
-----------

安裝方法有兩種，個人建議用 [brew](https://brew.sh/index_zh-tw) 最快。

### 1.1 安裝

#### 1.1.1 從官方網站安裝

下載網址：[Docker Community Edition for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac) 

[![1541855714_94078.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541855714_94078.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/c618f813-8e98-4651-94ba-f9030a5b9da9/1541855714_94078.png)

#### 1.1.2 從 Homebrew 安裝

    brew cask install docker

什麼是 [Homebrew](https://brew.sh/index_zh-tw) ?

### 1.2 記憶體配置

SQL Server 最低需求配置為 **3.25 GB**，

因此我們需要增加容器配置的記憶體。

選擇 Preferences...

![1541908711_42496.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541908711_42496.png)

切換到 Advanced，將 Memory 增加至 4GB。

![1541908711_01531.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541908711_01531.png)

更詳細的安裝步驟請參考：[macOS 安装 Docker](https://yeasy.gitbooks.io/docker_practice/install/mac.html) ^Q^

二、安裝 MSSQL
----------

這邊我們不需要到微軟官方下載 MSSQL，

我們改到 [docker store](https://docs.docker.com) 上，可以找到 [Microsoft SQL Server](https://store.docker.com/images/mssql-server-linux)，

只要將 image 下載來使用即可。

你知道嗎！將整個安裝步驟與等待時間省略掉，是多麼棒的事！

### 2.1 下載 Image

利用 docker pull 就可將該映像檔下載，namespace 為 microsoft/mssql-server-linux 。

你知道嗎！namespace 與網址有關。「[https://store.docker.com/images/mssql-server-linux](https://store.docker.com/images/mssql-server-linux)」

下載映像檔。 

    docker pull microsoft/mssql-server-linux

你知道嗎！不需要擔憂存放 Images 的路徑而切換目錄，因為會以 global 方式存取。

  
 

### 2.2 查看 Image

下載完畢後，利用 docker images 可以查看本地擁有的映像檔。

    docker images

[![1541855887_69839.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541855887_69839.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/c618f813-8e98-4651-94ba-f9030a5b9da9/1541855887_69839.png)

所以檔案在哪？我真的很擔心怎麼辦？

    docker inspect [IMAGE ID | REPOSITORY]

    # docker inspect 4095d6d460cd
    # docker inspect microsoft/mssql-server-linux
    

參考連結：[Where are images stored on Mac OS X?](https://forums.docker.com/t/where-are-images-stored-on-mac-os-x/17165)

### 2.3 運行 Image

接著我們將利用剛剛的映像檔建立一個虛擬容器，並且在背景中運行。

    docker run -d --name sql_server_demo -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=reallyStrongPwd123' -p 1433:1433 microsoft/mssql-server-linux
    
    # 我是閱讀好幫手

*   **\-d**：表示該指令將於背景中運行，如果沒使用，你的終端機會整個卡住。
*   **\--name**：sql\_server\_demo 為自訂的別名，當要指某個容器時，除了ID、也可以使用這個別名。
*   **\-e 'ACCEPT\_EULA=Y'**：授權條款同意書 ( Y )，詳細可至「[MICROSOFT 軟體授權條款](https://docs.microsoft.com/zh-tw/sql/ssms/sql-server-management-studio-license-terms?view=sql-server-2017)」查看。
*   **\-e 'SA\_PASSWORD=reallyStrongPwd123'**：指派預設帳號 sa 的密碼，務必注意規範「[密碼原則](https://docs.microsoft.com/zh-tw/sql/relational-databases/security/password-policy?view=sql-server-2017)」。
*   **\-p 1433:1433**：-p \[本地\] \[容器\]，本地 ( Mac ) 的 1433 對應到容器中 1433 的 port。 ( MSSQL 預設 1433 )
*   **microsoft/mssql-server-linux**：要使用的映像檔名稱。

### 2.4 查看已建立的容器

利用 docker ps 查看執行中的容器。

    docker ps -a

*   **\-a**：將所有容器顯示，包含未啟動的。

運行成功的話，STATUS 應該會顯示建立時間點。

[![1541911919_69676.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541911919_69676.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/c618f813-8e98-4651-94ba-f9030a5b9da9/1541911919_69676.png)

如果失敗，應該會是密碼不夠嚴謹的問題，或是 1433 port 你的本地已經佔用。

### 2.5 如何停止容器運作

如果您要停止服務，即停止容器運作，利用 docker stop 即可。

    docker stop sql_server_demo

*   **sql\_server\_demo**：這是容器的別名 NAME，你也可以使用 CONTAINER ID。

### 2.6 如何啟動容器

參照 2.5 的步驟，如果停止了，只要使用 docker start 就可以啟動。

    docker start sql_server_demo

*   **sql\_server\_demo**：這是容器的別名 NAME，你也可以使用 CONTAINER ID。

### 2.7 如何刪除容器

如果想要刪除容器，請記得先停止容器！

利用 docker rm 指令，就可以刪除。

    docker rm sql_server_demo

*   **sql\_server\_demo**：這是容器的別名 NAME，你也可以使用 CONTAINER ID。

### 2.8 如何刪除映像檔

剛剛下載的映像檔，使用 docker rmi 指令就可以刪除它。

    docker rmi microsoft/mssql-server-linux

由於筆者要留著... 就不真的執行刪除惹！

三、安裝 sql-cli 
-------------

本範例將使用 [node.js](https://nodejs.org/en/) 的 [sql-cli](https://github.com/hasankhan/sql-cli) 進行操作示意。

請務必確認容器是否啟動中！

安裝 [sql-cli](https://www.npmjs.com/package/sql-cli) 套件。

    npm install -g sql-cli

接著試著連線看看。

    mssql -u sa -p reallyStrongPwd123

*   **\-u**：使用者名稱。
*   **\-p**：密碼。

如果出現該畫面，就表示成功囉！

[![1541913341_95828.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541913341_95828.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/c618f813-8e98-4651-94ba-f9030a5b9da9/1541913341_95828.png)

試試軟體版本查詢。

    select @@version

[![1541913526_22207.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541913526_22207.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/c618f813-8e98-4651-94ba-f9030a5b9da9/1541913526_22207.png)

試著建立資料庫。

    CREATE DATABASE test

![1541913932_26426.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541913932_26426.png)

試著查詢現有資料庫。

    .databases

![1541913967_04991.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541913967_04991.png)

四、介紹 GUI
--------

在這邊，原諒筆者偷懶了 ...

有很多工具都很好用，端看看讀者們喜歡哪一種，

以下分享好用的圖形化介面工具。

[DBeaver Community](https://dbeaver.io/) ( 免費 )

[![1541914550_56774.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541914550_56774.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/c618f813-8e98-4651-94ba-f9030a5b9da9/1541914550_56774.png)

[SQL Operations Studio](https://docs.microsoft.com/zh-tw/sql/azure-data-studio/download?view=sql-server-2017) ( 免費 )

[![1541915345_27177.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541915345_27177.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/c618f813-8e98-4651-94ba-f9030a5b9da9/1541915345_27177.png)

安裝與操作方法 ...

### 抽牌！

[![1541916304_44454.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541916304_44454.png)](zh.wikipedia.org/zh-tw/%E8%A7%80%E8%90%BD%E9%99%B0)

搖出來了嗎？

[![1541917723_76398.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-11-10_Docker%20-%20%E5%9C%A8%20Mac%20%E4%B8%8A%E5%AE%89%E8%A3%9D%20MSSQL%20%E7%9A%84%E6%90%96%E5%85%89%E5%90%A7%EF%BC%81/1541917723_76398.jpg)](https://zh.wikipedia.org/zh-tw/%E5%88%80%E5%8A%8D%E7%A5%9E%E5%9F%9F)

* * *

×. 參考資料
-------

*   [How to Install SQL Server on a Mac](https://database.guide/how-to-install-sql-server-on-a-mac/)
*   [DBeaver Community](https://dbeaver.io/)
*   [SQL Operations Studio](https://docs.microsoft.com/zh-tw/sql/azure-data-studio/download?view=sql-server-2017)
*   [macOS 安装 Docker](https://yeasy.gitbooks.io/docker_practice/install/mac.html)
*   [Where are images stored on Mac OS X?](https://forums.docker.com/t/where-are-images-stored-on-mac-os-x/17165)
*   [Docker Community Edition for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac) 
*   [What is SQL Operations Studio (SQLOPS)?](https://database.guide/what-is-sql-operations-studio-sqlops/)

有勘誤之處，不吝指教。ob'\_'ov