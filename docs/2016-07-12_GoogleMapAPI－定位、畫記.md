---
title: "GoogleMapAPI－定位、畫記"
subtitle: "google map api 新手教學，請安心服用。"
date: "2016-07-12T00:00:00.000Z"
series: "googlemapapi"
tags: "marker","Polyline","Polygon","Circle","InfoWindow"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2016-07-12_GoogleMapAPI%EF%BC%8D%E5%AE%9A%E4%BD%8D%E3%80%81%E7%95%AB%E8%A8%98/banner/1468333503_63881.png"
--- 

google map api 新手教學，請安心服用。

本篇系列紀錄為 [w3cgoogleapi](http://www.w3schools.com/googleapi/default.asp) 上的學習心得記錄，

google map 很好用，真的要學起來～

若您對 googlemap 基本應用還不熟，

建議可以先看本系列第一篇 [GoogleMapAPI - Basic](https://dotblogs.com.tw/explooosion/2016/04/14/121527)

延續上篇（[Basic](http://dotblogs.com.tw/explooosion/2016/04/14/121527)）地圖載入後，我們可以利用 setMap 將設定好的點、線、面

劃記載入至地圖中。

以下為實作：定位點、路徑、多邊形、實心圓、訊息等標記劃記。

Marker（定位標記）
------------

定義一個點位置

```javascript
var myCenter = new google.maps.LatLng(24.1504536, 120.6830641);
```

建立 Maker 

```javascript
var marker = new google.maps.Marker({
        position: myCenter,
        //animation: google.maps.Animation.DROP,
        animation: google.maps.Animation.BOUNCE,
        icon: 'images/point.png',
    });
```

*   position：擺放欲標記的點位。
*   animation：標記時的動畫，有 BOUNCE、DROP。
*   icon：自訂標記圖示（若無則預設）。

將 Marker 加入至地圖

```javascript
marker.setMap(map);
```

結果如下圖  
[![1468333503_63881.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2016-07-12_GoogleMapAPI%EF%BC%8D%E5%AE%9A%E4%BD%8D%E3%80%81%E7%95%AB%E8%A8%98/1468333503_63881.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d94acdaf-7ad6-4254-a8f4-a905ae513529/1468333503_63881.png)

Polyline（線段路徑）
--------------

定義任意三點作為移動路徑，並以陣列方式儲存。

```javascript
var p1 = new google.maps.LatLng(24.1504536, 120.6830641);
var p2 = new google.maps.LatLng(24.1505063, 120.6834567);
var p3 = new google.maps.LatLng(24.1510675, 120.6832118);

var p = [p1, p2, p3];
```

建立 Polyline

```javascript
var path = new google.maps.Polyline({
        path: p,
        strokeColor: '#0000ff',
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
```

*   path：路徑陣列
*   strokeColor：框線顏色
*   strokeOpacity：框線透明度
*   strokeWeight：框線粗細

將 Polyline 加入至地圖中 

```javascript
path.setMap(map);
```

結果如下圖

[![1468334060_12625.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2016-07-12_GoogleMapAPI%EF%BC%8D%E5%AE%9A%E4%BD%8D%E3%80%81%E7%95%AB%E8%A8%98/1468334060_12625.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d94acdaf-7ad6-4254-a8f4-a905ae513529/1468334060_12625.png)

Polygon（多邊形）
------------

定義多邊形點

```javascript
var po1 = new google.maps.LatLng(24.150473, 120.6818724);
var po2 = new google.maps.LatLng(24.1506442, 120.6824873);
var po3 = new google.maps.LatLng(24.1502305, 120.6825238);
var po4 = new google.maps.LatLng(24.1501782, 120.6816066);

var po = [po1, po2, po3, po4];
```

建立多邊形

```javascript
var polygon = new google.maps.Polygon({
        path: po,
        strokeColor: '#00ff00',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#00ff00',
        fillOpacity: 0.4
    });
```

*   path：路徑陣列
*   strokeColor：框線顏色
*   strokeOpacity：框線透明度
*   strokeWeight：框線粗細
*   fillColor：內容顏色
*   fillOpacity：內容透明度

將 Polygon 加入至地圖中

```javascript
polygon.setMap(map);
```

結果如下圖

[![1468334582_01452.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2016-07-12_GoogleMapAPI%EF%BC%8D%E5%AE%9A%E4%BD%8D%E3%80%81%E7%95%AB%E8%A8%98/1468334582_01452.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d94acdaf-7ad6-4254-a8f4-a905ae513529/1468334582_01452.png)

Circle 實心圓
----------

定義圓心點

```javascript
var cir = new google.maps.LatLng(24.1492271, 120.6833525);
```

建立一個圓心圖物件

```javascript
var cicrcle = new google.maps.Circle({
        center: cir,
        radius: 500,
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ff0000',
        fillOpacity: 0.4
    });
```

*   center：圓心點
*   radius：半徑
*   strokeColor：框線顏色
*   strokeOpacity：框線透明度
*   strokeWeight：框線粗細
*   fillColor：內容顏色
*   fillOpacity：內容透明度

將圓心圖加入至地圖中

```javascript
cicrcle.setMap(map);
```

結果如下圖

[![1468334818_25925.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2016-07-12_GoogleMapAPI%EF%BC%8D%E5%AE%9A%E4%BD%8D%E3%80%81%E7%95%AB%E8%A8%98/1468334818_25925.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d94acdaf-7ad6-4254-a8f4-a905ae513529/1468334818_25925.png)

InfoWindow（訊息視窗）
----------------

建立訊息視窗內容

```javascript
var infowindow = new google.maps.InfoWindow({
        content: 'Hello World!'
    });
```

*   contentr：訊息

將訊息視窗加入至指定點，我們加入剛剛的 marker

PS. 記得要先劃記好 marker

```javascript
infowindow.open(map,marker)
```

結果如下圖

[![1468334982_04192.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2016-07-12_GoogleMapAPI%EF%BC%8D%E5%AE%9A%E4%BD%8D%E3%80%81%E7%95%AB%E8%A8%98/1468334982_04192.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/d94acdaf-7ad6-4254-a8f4-a905ae513529/1468334982_04192.png)

以上為基本的地圖劃記功能～

有勘誤之處，不吝指教。ob'\_'ov