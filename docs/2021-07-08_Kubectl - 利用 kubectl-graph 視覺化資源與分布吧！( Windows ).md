---
title: "Kubectl - 利用 kubectl-graph 視覺化資源與分布吧！( Windows )"
date: "2021-07-08"
tags: [cypher-shell, kubectl-graph, kubernetes, neo4j, visualize]
view: "234"
history: "0"
group: "Kubectl"
banner: ""
---

自己的星團珠寶自己拚！

將 Kubernetes 資源分布視覺化

![cypher-loki.png](images/2021-07-08_Kubectl - 利用 kubectl-graph 視覺化資源與分布吧！( Windows )/cypher-loki.png)

steveteuber/kubectl-graph

前言
--

最近工作操作 [kubernetes](https://kubernetes.io/) (K8s) 的時候，想說來視覺化一下資源分布使用情形

於是逛了 [awesome-kubectl-plugins](https://github.com/ishantanu/awesome-kubectl-plugins)，找到了 [kubectl-graph](https://github.com/steveteuber/kubectl-graph) 一個視覺化的工具。

能以星型網的圖形介面呈現資源使用的狀況與節點分布，

是一個輕量簡易的星型拓撲視覺化工具。

由於  [kubectl-graph](https://github.com/steveteuber/kubectl-graph)  教學範例以 mac 說明，

因此筆者嘗試使用 Windows 進行操作展示。

前置作業
----

在一切作業開始前，希望您有以下基礎知識或環境設置：

*   具有節點運作中的 Kubernetes 服務
*   熟悉且已安裝 kubetcl ( v1.12 or later )
*   已安裝 krew ( kubectl krew )
*   熟悉且已安裝 docker
*   具有 Java 環境，且最低版本要求 55 ( Java 11 )

安裝教學
----

以下安裝步驟與 [kubectl-graph](https://github.com/steveteuber/kubectl-graph) 相同，

也可以直接看著 repo 的 README 步驟做。

### 1\. 安裝 krew

###### 如果已經有此管理套件則可以直接跳過。

到 [Krew 官方網站](https://krew.sigs.k8s.io/) 安裝，在 [Install 頁面](https://krew.sigs.k8s.io/docs/user-guide/setup/install/) 最下方可以找到 Windows 安裝步驟 。

確認是否安裝成功：

    kubectl krew version

### 2\. 安裝 graphviz

在 kubectl-graph 有提到使用了 [graphviz](https://graphviz.org/)，能夠使用 dot 命令產出靜態圖檔，

由於我們是 Windows 環境，乖乖的去官方網站下載安裝吧！

在[下載頁面](https://graphviz.org/download/)中，選擇 Stable Windows install packages 下載就可以了：

*   2.47.3 EXE installer for Windows 10 (64-bit): [stable\_windows\_10\_cmake\_Release\_x64\_graphviz-install-2.47.3-win64.exe](https://gitlab.com/api/v4/projects/4207231/packages/generic/graphviz-releases/2.47.3/stable_windows_10_cmake_Release_x64_graphviz-install-2.47.3-win64.exe) (not all tools and libraries are included)

環境變數建議在選擇的時候直接勾選好。

[![1625673759.png](images/2021-07-08_Kubectl - 利用 kubectl-graph 視覺化資源與分布吧！( Windows )/1625673759.png)](https://dotblogsfile.blob.core.windows.net/user/robby/3c7eacc9-1ef9-42d5-8f56-9f95cb9f8d66/1625673759.png)

確認是否安裝成功 ( -V 為大寫 )：

    dot -V 

### 3\. 安裝 cypher-shell

作者在圖形資料上使用了 [Neo4j database](https://neo4j.com/)，為了與資料庫溝通，

在這裡你可以選擇安裝 [Neo4j](https://neo4j.com/try-neo4j/)，或者選擇輕量地安裝 [cypher-shell](https://neo4j.com/download-center/#cyphershell)。

筆者不建議安裝 [Neo4j](https://neo4j.com/try-neo4j/)，因為步驟繁瑣麻煩…

直接用 docker pull image 就可以了！

[cypher-shell](https://neo4j.com/download-center/#cyphershell) 頁面選擇 [cypher-shell-4.3.0.zip](https://dist.neo4j.org/cypher-shell/cypher-shell-4.3.0.zip)。

接著再將解壓縮後的 cypher-shell 資料夾路徑加入到環境變數。

###### 請注意！！！！！Java 版本務必需要為 11以上。

*   [Java SE Development Kit 11 Downloads](https://www.oracle.com/tw/java/technologies/javase-jdk11-downloads.html)

確認是否安裝成功：

    cypher -v 

### 4\. 安裝 kubectl-graph

終於可以安裝我們的主角了！

    kubectl krew install graph

確認是否安裝成功：

    kubectl graph -h 

使用教學 - SVG
----------

### 將 pods 資訊輸出給 dot 建立 SVG 圖檔

    kubectl graph pods --field-selector status.phase=Running -n kube-system | dot -T svg -o pods.svg

*   kube-system：這是 Kubernetes 系統的 namesapce，你可以改成其他 namesapce

使用教學 - Visualize
----------------

### 視覺化星狀圖

在這裡先利用 docker 安裝 [image](https://neo4j.com/developer/docker-run-neo4j/) 並啟動：

    docker run --rm -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=none neo4j

*   NEO4J\_AUTH：環境變數直接給 none 就可以了，或者你有自己的[密碼設置](https://neo4j.com/docs/operations-manual/current/docker/introduction/#docker-auth)

完成後可以開啟網址檢視畫面：[http://localhost:7474/](http://localhost:7474/)

[![1625674573.png](images/2021-07-08_Kubectl - 利用 kubectl-graph 視覺化資源與分布吧！( Windows )/1625674573.png)](https://dotblogsfile.blob.core.windows.net/user/robby/3c7eacc9-1ef9-42d5-8f56-9f95cb9f8d66/1625674573.png)

由於我們沒設置密碼因此直接 connect 即可。

[![1625676706.png](images/2021-07-08_Kubectl - 利用 kubectl-graph 視覺化資源與分布吧！( Windows )/1625676706.png)](https://dotblogsfile.blob.core.windows.net/user/robby/3c7eacc9-1ef9-42d5-8f56-9f95cb9f8d66/1625676706.png)

登入後點選左上的 Database Information，確認 neo4j。

![1625674732.png](images/2021-07-08_Kubectl - 利用 kubectl-graph 視覺化資源與分布吧！( Windows )/1625674732.png)

接著我們就可以利用指令將節點資訊匯入資料庫了：

    kubectl graph all -n kube-system -o cypher | cypher-shell

*   kube-system：你可以改成其他 namesapce

如果剛剛 neo4j 資料庫有設置帳號密碼，可以參考 [Syntax](https://neo4j.com/docs/operations-manual/current/tools/cypher-shell/)

    kubectl graph all -n loki -o cypher | cypher-shell -u neo4j -p secret

*   cypher-shell \[-u USERNAME, --username USERNAME\]

在網頁上就可以看到 Labels 有許多分類啦～～～～

![1625676891.png](images/2021-07-08_Kubectl - 利用 kubectl-graph 視覺化資源與分布吧！( Windows )/1625676891.png)

Reference
---------

*   [kubectl-graph](https://github.com/steveteuber/kubectl-graph)
*   [docker-run-neo4j](https://neo4j.com/developer/docker-run-neo4j/)
*   [cypher-shell](https://neo4j.com/docs/operations-manual/current/tools/cypher-shell/)
*   [The Client is unauthorized due to authentication failure](https://github.com/neo4j/neo4j-javascript-driver/issues/660)
*   [Java SE Development Kit 11 Downloads](https://www.oracle.com/tw/java/technologies/javase-jdk11-downloads.html)
*   [java.lang.UnsupportedClassVersionError](https://www.baeldung.com/java-lang-unsupportedclassversion)

有勘誤之處，不吝指教。ob'\_'ov