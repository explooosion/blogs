---
title: "Git - 更新 fork 出來的 repository"
subtitle: "參與開源專案會碰到的問題 ..."
date: "2018-08-09T00:00:00.000Z"
series: "git"
tags: "git","github","fork","sync","remote","repository"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/banner/1533753772_76441.png"
--- 

參與開源專案會碰到的問題 ...

身為萌新的開發人員，

參與開源專案是一件令人興奮的事情。

[![1533753772_76441.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/1533753772_76441.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/415de9a6-e73c-4666-bf42-4d54099f7538/1533753772_76441.png)

本文為在 [github](https://github.com/) 上的操作，

並參考相關網站，將此問題作為手札記錄下來。

一、前言
----

當 fork 來源的 repository 更新時，我們必須要手動更新自己這邊的 repository，

接下來的步驟如果覺得過於困難，

也可以將整個專案移除，然後重新 fork，大概就是砍掉重練（Ｘ

[砍掉重練| PTT鄉民百科| FANDOM powered by Wikia](http://zh.pttpedia.wikia.com/wiki/%E7%A0%8D%E6%8E%89%E9%87%8D%E7%B7%B4)

二、取得遠端版本控制
----------

範例的專案 [mindmapp](https://github.com/Mindmapp/mindmapp) 為筆者參與時所遇到的問題，

因此以此專案作為範例。

首先在你 fork 出來的專案中，查詢遠端版本的來源：

    git remote -v

[![1533750937_50136.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/1533750937_50136.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/415de9a6-e73c-4666-bf42-4d54099f7538/1533750937_50136.png)

*   origin：來自你個人帳號的版本控制，「origin」為預設名稱。

目前遠端版控預設也只有自己帳號的，

為了取得來源的資訊，我們加入原始來源的版本控制。

    git remote add upstream https://github.com/Mindmapp/mindmapp.git

*   add：新增遠端控制。
*   upstream：新增遠端控制的別名，可自行命名。

接著再次查看目前專案的遠端控制來源：

    git remote -v

[![1533751207_84599.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/1533751207_84599.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/415de9a6-e73c-4666-bf42-4d54099f7538/1533751207_84599.png)

應該可以看到 upstream 也加入了！

三、更新專案
------

接下來假設我要更新主線 master 的專案，就切換到主線上：

    git checkout master

*   checkout：切換分支或主線

如果在 [vscode](https://code.visualstudio.com/) 環境中，也可以利用左下選單選取：

[![1533751601_18201.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/1533751601_18201.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/415de9a6-e73c-4666-bf42-4d54099f7538/1533751601_18201.png)

接著透過 pull 指令，指定名為 upstream 上的主線 master：

    git pull upstream master

[![1533751726_55079.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/1533751726_55079.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/415de9a6-e73c-4666-bf42-4d54099f7538/1533751726_55079.png)

*   由於筆者的主線專案已最新，所以不會有更動紀錄。

下方為有更動紀錄的截圖，當時是更新 dev 分支。

[![1533751874_42568.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/1533751874_42568.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/415de9a6-e73c-4666-bf42-4d54099f7538/1533751874_42568.png)

如果你的主線上有個人的 commit 狀態，使用 rebase，就不會產生 merge：

    git pull --rebase upstream master

在 [vscode](https://code.visualstudio.com/) 中，若有更新檔案，下方可以看到貼心地提醒更新個數：

![1533752452_95278.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/1533752452_95278.png)

拉好最新檔案後，我們就可以將這些檔案重新 push 到我們自己的版控上：

    git push origin master

![1533752534_25063.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2018-08-09_Git%20-%20%E6%9B%B4%E6%96%B0%20fork%20%E5%87%BA%E4%BE%86%E7%9A%84%20repository/1533752534_25063.png)

如此一來就可以完成同步了～～～

大家也來一起收服 [Open Source](https://gist.github.com/audreyt/2400315) 吧！

※、參考資訊
------

*   [Github Help - Syncing a fork](https://help.github.com/articles/syncing-a-fork/)
*   [更新從 GitHub 上 fork 出來的 repository (或是同步兩個不同 server 端的 repository)](https://www.peterdavehello.org/2014/02/update_forked_repository/)
    
*   [audrey](https://gist.github.com/audreyt) [- 開源之道](https://gist.github.com/audreyt/2400315)
    

有勘誤之處，不吝指教。ob'\_'ov