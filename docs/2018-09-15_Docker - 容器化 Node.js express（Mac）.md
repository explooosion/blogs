---
title: "Docker - 容器化 Node.js express（Mac）"
date: "2018-09-15"
tags: [docker, node.js, docker-compose, express, container, vm]
view: "7088"
history: "0"
group: "Docker"
banner: "images/2018-09-15_Docker - 容器化 Node.js express（Mac）/banner/1537008226_92291.jpg"
---

技術導向的 docker 新手教學。

一日 docker 初體驗。

[![1537008226_92291.jpg](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537008226_92291.jpg)](https://dotblogsfile.blob.core.windows.net/user/incredible/129efefd-3a58-462a-aa6f-e1bc2d597517/1537008226_92291.jpg)



隨著 [DevOps](https://zh.wikipedia.org/wiki/DevOps) 的技術迭代，

目前將環境容器化的部署方式，越來越盛行。

本篇環境作業系統為 Mac，

利用最簡單的實務操作，

並且使用 [node.js](https://nodejs.org/en/) [express](https://github.com/expressjs/express) 框架作為基本範例，

讓大家體驗 docker 的操作。

如果你希望先了解運作，背景歷史以及理念等等，

建議可以閱讀此篇文章「[什麼是Docker · 《Docker —— 從入門到實踐》正體中文版](https://philipzheng.gitbooks.io/docker_practice/content/introduction/what.html)」。

為什麼不用 Windows？因為十分不友善。當然，您也可以選擇使用 Linux。

本篇完整程式碼放置於 Github：[docker-express-demo](https://github.com/explooosion/docker-express-demo)

本篇建議您需要具備以下基本知識：

1.  [Git](https://git-scm.com/)：基本操作
2.  [Node.js](https://nodejs.org/zh-cn/)：環境配置
3.  [Express](https://expressjs.com/zh-tw/)：知道是什麼
4.  [NPM](https://www.npmjs.com/)：會使用 npm 安裝模組
5.  [Terminal](https://zh.wikipedia.org/wiki/%E7%B5%82%E7%AB%AF)：終端機指令使用
6.  [Http](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)：基本概念
7.  [Nginx](https://zh.wikipedia.org/wiki/Nginx)：知道是什麼

目錄：
---

1.  [安裝 Docker](#1)
2.  [建立 Express 專案](#2)
3.  [撰寫 Dockerfile](#3)
4.  [執行 Docker](#4)
5.  [執行 Docker Compose](#5)



一、安裝 Docker
-----------

在 Mac 中，我們使用 [brew](https://brew.sh/index_zh-tw) 安裝，它是用於管理 Mac 套件的一項工具。

如果你沒有安裝它，請先參考該網站進行安裝。

或是直接打開 Terminal 輸入：

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"



接著開始安裝 Docker。

    brew update

    brew cask install docker

安裝完畢後開啟應用程式，就可以看到 Docker.app。

[![1537009030_10876.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537009030_10876.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/129efefd-3a58-462a-aa6f-e1bc2d597517/1537009030_10876.png)

試著使用指令，驗證看看安裝成功與否。

    docker -v

    docker-compose -v

畫面結果。

[![1537009573_56835.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537009573_56835.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/129efefd-3a58-462a-aa6f-e1bc2d597517/1537009573_56835.png)

二、建立 Express 專案 
----------------

框架的部分就不再贅述。

首先安裝 generator。

    npm install -g express-generator@4

建立專案，例如「docker-express-demo」。

    express docker-express-demo

接著進入目錄。

    cd docker-express-demo

安裝套件並啟動。

    npm install

    npm start

如果順利，應該可於 [http://localhost:3000/](http://localhost:3000/) 看到網站。

![1537009941_16968.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537009941_16968.png)

這是基本的專案啟動，

但他執行環境是依賴於本地，而非使用 docker 容器。

如果要使用 docker，則必須撰寫腳本，

告知 docker 應該如何運作。

三、撰寫 Dockerfile
---------------

 首先在專案底下建立檔案 Dockerfile。

檔案務必要大寫開頭哦！

建立好後，如果您使用 [vscode](https://code.visualstudio.com/)，可能會自動顯示檔案的 icon 唷～

![1537010691_29149.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537010691_29149.png)

接著輸入以下內容到該檔案。

\[ Dockerfile \]

    FROM node:8-alpine
    
    COPY . /workspace
    WORKDIR /workspace
    RUN npm install
    
    EXPOSE 3000
    
    CMD npm start

*   FROM：這裡的 node:8-alpine，來自 [Docker Hub](https://hub.docker.com/) 的 [node](https://hub.docker.com/_/node/)。你想用到的容器，都可以在這邊找到，這個映像檔包含了 nodejs。
*   COPY：複製當前目錄到容器中的 /workspace。用意是將程式碼，複製到容器中執行。
*   WORKDIR：這邊是指容器的工作目錄，就像 cd workspace 意思一樣，因為我們把檔案複製於該目錄，所以一同切換目錄。
*   RUN：執行某個腳本命令，在這邊等同於我們先前所下的 npm install（用於部署階段的指令）。
*   EXPOSE：將容器的 3000 port 對外公開。
*   CMD：也是執行腳本命令（用於部署完畢的指令）。

建議將剛剛 npm install 所產生的 node\_module 移除。

否則會連同該目錄一併複製到容器。

為何不需要留下 node\_module？因為在容器中，會執行我們寫好的腳本運作 npm install。

四、執行 Docker
-----------

docker 的運作流程首先要建立映像檔 image，

完成後我們接著再去指定映像檔於容器中。

### 1\. 建立映像檔

    docker build -t demo/myapp .

利用 docker build 就可以建立出指定容器，

我們利用 \-t 建立 tag 為 demo/myapp，

而最後面的一點「 . 」就是指目錄來源喔！

完成後的指令畫面：

[![1537011937_99096.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537011937_99096.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/129efefd-3a58-462a-aa6f-e1bc2d597517/1537011937_99096.png)

### 2\. 查看映像檔

我們可以利用 docker images 來查看現有容器映像。

    docker images

這時候應該可以看到剛剛建立好的 demo/myapp，

[![1537012291_7553.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537012291_7553.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/129efefd-3a58-462a-aa6f-e1bc2d597517/1537012291_7553.png)

由於筆者先前已經建立很多，所以才會出現這麼多。

### 3\. 建立容器

接著就可以啟動容器了。

    docker run -p 8080:3000 --name myapp -d demo/myapp

*   docker run：執行某個容器使用 run。
*   \-p 8080:3000：是指將內部的 3000 port 映射到本地的 8080 port，因為 express 預設 3000 port。
*   \--name myapp：我們將此容器命名為 myapp。
*   \-d demo/myapp：掛載映像檔名為 demo/myapp。



如果沒有使用 \--name myapp，那麼等等操作容器，就得使用一長串的 id 了。

建立完畢會自動執行。

### 4\. 查看容器

我們可以查看當前運作的容器狀況。

    docker ps -a

查詢結果如下：

[![1537012899_96748.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537012899_96748.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/129efefd-3a58-462a-aa6f-e1bc2d597517/1537012899_96748.png)

*   STATUS：如果狀態看到 Up xxxx，那就是正常運作囉～

這時候打開 [http://localhost:8080/](http://localhost:8080/)，就可以看到畫面了！

這是由安裝 node.js 容器所執行的 express 專案。

![1537013029_04772.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537013029_04772.png)

### 5\. 停止/啟動 容器

只要使用 start 以及 stop，就能夠操作了。

停止容器。

    docker stop myapp

啟動容器。

    docker start myapp

### 6\. 移除容器

如果希望重新建立容器，

則我們可以使用 rm 進行移除。

    docker rm myapp

或是移除所有容器。

    docker rm $(docker ps -a -q)

由於 docker ps -a -q 會顯示所有容器的 ID，因此可以如此搭配使用。

### 7\. 查看日誌

如果你想查看一些運作日誌，你可以使用以下指令。

    docker logs myapp

通常啟動失敗了話，建議翻閱日誌紀錄進行除錯。

五、執行 Docker Compose
-------------------

在 docker 中，一次只能命令一個容器，

如果今天前端後端都是容器化，那麼是不是要總共操作兩次 docker 了！？

因此 [docker-compose](https://docs.docker.com/compose/) 就是處理多個容器的工具。

接下來我們實作，

將專案改成由 nginx 所運行的 http server。

並且啟動 nginx 時，不再是常見的這個畫面：

[![1537014569_79972.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537014569_79972.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/129efefd-3a58-462a-aa6f-e1bc2d597517/1537014569_79972.png)

而是將 nginx 預設的 80，轉到我們 node express 的容器上。

首先改造一下我們專案的擺放，

### 1\. 移動專案放入 server 資料夾

我們建立一個資料夾 server，並將剛剛專案移入。

### 2\. 建立 nginx 目錄與檔案

這邊的用意是要把該目錄掛載到容器中的 nginx。

將原有 nginx 的 default.conf，給取代掉，因為我們要設定轉給 node express。

在根目錄建立資料夾 nginx，裡面新增檔案 default.conf

\[ default.conf \]

    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_tokens off;
        client_max_body_size 15M;
    
        if ($http_x_forwarded_proto = "http") {
            return 301 https://$host$request_uri;
        }
    
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
    
            proxy_pass http://node:3000;
            proxy_redirect off;
        }
    }
    
    

內容幾乎沒變，我們新增了 proxy\_pass。

如果來源請求是 / 目錄的（http://xxx/），

就會轉給 http://node:3000。

這裡的 3000 port 就不再贅述，因為 express。

而這邊的 node 其實是別名，

主要是來自 docker-compose 的設定，因此我們接著來設定吧！

### 3\. 設定 docker-compose

在根目錄中建立檔案 docker-compose.yml。

\[ docker-compose.yml \]

    version: "3"
    services:
      nginx:
        image: nginx:alpine
        volumes:
          - ./nginx:/etc/nginx/conf.d
        links:
          - node
        ports:
          - 80:80
      node:
        build:
          context: ./server
    

*   nginx：這個名字與 node 一樣，是可以自由取的。
*   node：在剛剛 default.confg 中的 node 就是指此，綁定它在 nginx 容器中所分配到的 ip。
*   image：我們這邊其實是又建立另一個容器為 nginx。
*   volumes：掛載檔案的腳本語言法，我們將外部的 nginx: (所有) 掛載到 /etc/nginx/conf.d/ 底下所有
*   links：我們將 node 容器與 nginx 關聯起來。
*   port：內部的 80 port 映射到外部的 80port
*   build：部署的檔案則會尋找 ./server 目錄中的 Dockerfile

整體的目錄架構如下圖：

![1537016822_51827.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537016822_51827.png)

### 4\. 啟動 docker-compose

執行以下指令，就可以同時啟動 nginx server 以及 node express 兩個容器了。

    docker-compose up -d

*   \-d：用意是讓指令背景執行，否則你的終端機會一直顯示 log

完成後就會顯示 done。

[![1537015812_97327.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537015812_97327.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/129efefd-3a58-462a-aa6f-e1bc2d597517/1537015812_97327.png)

這時候開啟網頁，應該就可以順利看到。[http://localhost/](http://localhost/)

![1537016274_24667.png](images/2018-09-15_Docker - 容器化 Node.js express（Mac）/1537016274_24667.png)

### 5\. 停止運作

我們可以利用 down 將容器停止運作。

    docker-compose down

### 6\. 重新部署容器

這樣的動作會重新執行 Dockerfile 的指令。

    docker-compose up -d --build

以上恭喜你順利完成 docker 以及 docker-compose 的初體驗了。

剩下的就多官方複雜的文件或其他的部落格吧（Ｘ

本篇程式碼放置於 Github - [docker-express-demo](https://github.com/explooosion/docker-express-demo)

有勘誤之處，不吝指教。ob'\_'ov