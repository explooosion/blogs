---
title: "mapshaper - Shp to topojson"
subtitle: "利用 mapshaper 進行圖資的格式轉換"
date: "2017-06-04T00:00:00.000Z"
series: "geo"
tags: "GEO","mapshaper","shapefile","topojson","geojson"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2017-06-04_mapshaper%20-%20Shp%20to%20topojson/banner/1496509567_93099.png"
--- 

利用 mapshaper 進行圖資的格式轉換

最近在處理來自 [OpenData](http://data.gov.tw/node/7442) 的圖資，由於這些圖資摻雜了中文 Big5，

如果透過一些工具網站進行線上處理成 json 時，

會發現中文部分會變成亂碼，甚至中文部分相關資料遺失。

**一、坑啊**
--------

一開始爬了些文章找到 [topojson](https://github.com/topojson/topojson)，但不知道為什麼參照官方的方式...

安裝

```
npm install -g topojson
```

命令

```
c:\> topojson -o export.json -p --shapefile-encoding big5 input.shp
```

總會出現找不到此命令。

[![1496509567_93099.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2017-06-04_mapshaper%20-%20Shp%20to%20topojson/1496509567_93099.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/086f16a8-72de-4955-837b-7c7543659927/1496509567_93099.png)

至於原因個人還是無法釐清 QQ，

目前是確定網站相關文章成功的文章最近一期是在去年，

而今年的 topojson 已經改版到 [3.0.0](https://github.com/topojson/topojson/releases) 了，說不定也可能是改版原因.... (就不花時間找了)  
 

**二、Mapshaper**
---------------

最後找到了 [mapshaper](https://github.com/mbloch/mapshaper)！

其實是從這篇 [shp to geojson](https://bl.ocks.org/chilijung/f85dcf428596eabaabee)，找到 mapshaper 的。

以下小廢話！生人請迴避！

對 geo 有研究的朋友，可能會聯想到 [](http://www.gdal.org)[ogr2ogr](http://www.gdal.org/index.html)[（GDAL）](http://www.gdal.org)，簡單說就是整合再一起。

如果你是在 Mac 或 Linux 的朋友，就可以直接使用，

但如果你[窗戶使用者](https://www.microsoft.com/zh-tw/)，則需透過 [OSGeo4W](https://trac.osgeo.org/osgeo4w/) 來操作，

詳細的使用方式可參考：[GDAL/OGR: 地理空间数据格式转换神器](http://gmt-china.org/blog/gdal-ogr/)。

不過環境設定有些麻煩，本人太懶了，如果有興趣可以去試試看。

而直接使用 mapshaper，用意純為快速，因為沒有特別需求（比如過濾某些資料），

如果單純只是想轉換含有中文的 shp，不妨參考 mapshaper。

**三、安裝**
--------

這個工具十分方便，接下來就簡單說明如何使用。

直接從 npm 進行全域安裝。

```
npm install -g mapshaper
```

**四、命令**
--------

**本篇只講格式轉換，詳細功能就不提了～**

**更多說明可查看[官網-Introduction-to-the-Command-Line-Tool](https://github.com/mbloch/mapshaper/wiki/Command-Reference#-encodings)**

**轉換格式**

```
mapshaper [Input] -o [Output]
```

*   **\-o 表示格式轉換**

實際範例：

```bash
mapshaper COUNTY.shp -o COUNTY.json
```

成功畫面：

![1496512765_74873.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2017-06-04_mapshaper%20-%20Shp%20to%20topojson/1496512765_74873.png)

*   顯示 Wrote xxx.json 表示成功

JSON 格式

而 json 部分，我們可以指定輸出類型：[geojson](http://geojson.org/)、[topojson](https://github.com/topojson/topojson) 兩種。

```
mapshaper COUNTY.shp -o format=geojson  COUNTY.json
```
```
mapshaper COUNTY.shp -o format=topojson COUNTY.json
```

*   format=\[格式\]

編碼

```
mapshaper COUNTY.shp encoding=big5 -o COUNTY.json
```

*   編碼可轉換許多種，如果含有中文，則可使用 big5

指定 JSON 格式且轉換編碼

```
mapshaper COUNTY.shp -o encoding=big5 format=topojson COUNTY.json
```

**四、結語**
--------

mapshaper 的使用方式十分簡單又快速，

在打這篇的同時，其實也邊下載 OSGeo4W 試試中，

不過下載好久....

如果你單純想要轉換格式，mapshaper 是個好選擇！

－

親愛的台灣終於出來惹..

![1496512985_91868.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2017-06-04_mapshaper%20-%20Shp%20to%20topojson/1496512985_91868.png)

有勘誤之處，不吝指教。ob'\_'ov