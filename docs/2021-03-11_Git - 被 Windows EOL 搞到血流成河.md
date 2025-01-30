---
title: "Git - 被 Windows EOL 搞到血流成河"
subtitle: "Git：我要看到血流成河！"
date: "2021-03-11T00:00:00.000Z"
series: "git"
tags: "crlf","end-of-line","eol","git","lf","vscode","windows"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2021-03-11_Git%20-%20%E8%A2%AB%20Windows%20EOL%20%E6%90%9E%E5%88%B0%E8%A1%80%E6%B5%81%E6%88%90%E6%B2%B3/banner/1615452125.png"
--- 

Git：我要看到血流成河！

關於 Windows 環境 EOL 的設定問題

[![1615452125.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2021-03-11_Git%20-%20%E8%A2%AB%20Windows%20EOL%20%E6%90%9E%E5%88%B0%E8%A1%80%E6%B5%81%E6%88%90%E6%B2%B3/1615452125.png)](https://dotblogsfile.blob.core.windows.net/user/robby/8aae20a4-239b-4ced-8818-fd143afca27d/1615452125.png)

前言
--

眼尖的你會發現 Banner 怎麼會是 git，沒錯，筆者就是被 git 搞到 血流成河 ！

本次經驗主要在 [vscode](https://code.visualstudio.com/) 開發上遇到了 [EOL](https://zh.wikipedia.org/wiki/%E6%8F%9B%E8%A1%8C) 的問題，

雖然這類文章滿街跑，不過筆者也仍紀錄自己也被搞的經歷

_原來大家都被搞過啊_

如果你想知道怎麼處理，請直接跳到：[處理方式](#1)

因為更換了新電腦，所有環境都要重設定，

想說把平常在 [mac](https://www.google.com/search?q=mac&oq=mac&aqs=chrome..69i57j0i433j69i65l3j69i61l3.196j0j4&sourceid=chrome&ie=UTF-8) 開發的專案拿到 [Windows](https://www.google.com/search?q=Windows&oq=Windows&aqs=chrome..69i57j69i59l2j69i65l3j69i60l2.226j0j9&sourceid=chrome&ie=UTF-8) 搭配新的螢幕寫。

_因為也換了一台 27" 2K 曲面螢幕  :D_

於是專案 clone 並開啟後，結果 [prettier](https://prettier.io/) 和 [eslint](https://eslint.org/) 噴了一堆 WARNING

：[require or disallow newline at the end of files (eol-last)](https://eslint.org/docs/rules/eol-last)

原本想說調整 [vscode](https://code.visualstudio.com/) 的 Editor: Unfold On Click After End Of Line

結果即使檔案開啟使用 [LF](https://zh.wikipedia.org/wiki/%E6%8F%9B%E8%A1%8C)，但問題仍會被 [git](https://git-scm.com/) 的 [diff algorithms](https://medium.com/@gabrielschade/how-git-diff-works-a-sample-with-f-af3e3737963) 判斷到

[![1615450639.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2021-03-11_Git%20-%20%E8%A2%AB%20Windows%20EOL%20%E6%90%9E%E5%88%B0%E8%A1%80%E6%B5%81%E6%88%90%E6%B2%B3/1615450639.png)](https://dotblogsfile.blob.core.windows.net/user/robby/8aae20a4-239b-4ced-8818-fd143afca27d/1615450639.png)

**Dear：**　

　　　你是不是在安裝 git 的時候，一鍵完成？ 

解決方式
----

筆者採取最快最乾淨最簡單的方式

FAST . EASY . CLEAN . ONCE

### 請移除 git，重新安裝

並且在 Configuring the line ending conversions 步驟！

預設是第一個，他會把你符號轉成 CRLF 

就算你提交時會幫你改回 LF...

但你在 develop 階段會被 lint 誤判啊！！！ 

所以請改為第三個：

Checkout as-is, commit as-is | 你怎麼簽出就怎麼提交

[![1615451193.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2021-03-11_Git%20-%20%E8%A2%AB%20Windows%20EOL%20%E6%90%9E%E5%88%B0%E8%A1%80%E6%B5%81%E6%88%90%E6%B2%B3/1615451193.png)](https://dotblogsfile.blob.core.windows.net/user/robby/8aae20a4-239b-4ced-8818-fd143afca27d/1615451193.png)

  
 

這樣你的 repo git 就不會亂掉了 ~

還敢不 Step By Step 啊你

[![1615451953.jpg](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2021-03-11_Git%20-%20%E8%A2%AB%20Windows%20EOL%20%E6%90%9E%E5%88%B0%E8%A1%80%E6%B5%81%E6%88%90%E6%B2%B3/1615451953.jpg)](https://dotblogsfile.blob.core.windows.net/user/robby/8aae20a4-239b-4ced-8818-fd143afca27d/1615451953.jpg)

Reference
---------

*   [Git 在 Windows 平台處理斷行字元 (CRLF) 的注意事項](https://blog.miniasp.com/post/2013/09/15/Git-for-Windows-Line-Ending-Conversion-Notes)

有勘誤之處，不吝指教。ob'\_'ov