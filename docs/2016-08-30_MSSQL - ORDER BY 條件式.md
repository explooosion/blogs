---
title: "MSSQL - ORDER BY 條件式"
date: "2016-08-30"
tags: [MSSQL, ORDER BY, CASE WHEN]
view: "4863"
history: "0"
group: "MSSQL"
banner: ""
---

MSSQL 針對 ORDER BY 指定條件之筆記。

在 MSSQL 中 ORDER BY 是很常用到的，

但常常因為奇怪的需求（疑），需要特別將某項目指定排序。

以下為 ORDER BY 搭配 Case When 之應用：

預設查詢
----

    SELECT * FROM Item

id

ItemName

1

血管攝影

2

支氣管鏡

3

心藏導管及造影

4

小兒型葉克膜

5

電腦斷層掃描

6

多人高壓氧艙

7

血液透析

8

核磁共振

9

一般型葉克膜

（i）指定查詢
-------

條件狀況 - 讓 id = 5 （電腦斷層掃描） 排序為最後一筆，其餘依 id 遞增

*      1 -> Last
*      0 -> First

    SELECT * FROM Item ORDER BY Case WHEN id = 5 THEN 1 END ASC

id

ItemName

1

血管攝影

2

支氣管鏡

3

心藏導管及造影

4

小兒型葉克膜

6

多人高壓氧艙

7

血液透析

8

核磁共振

9

一般型葉克膜

5

電腦斷層掃描

（ii）指定查詢
--------

條件狀況 - 讓 id = 5 （電腦斷層掃描） 排序為第一筆，其餘依 id 遞增

1.  這裡要分兩段式，先強制讓 id = 5 為最後一筆並遞減排序
2.  再將調整後之 id 遞增排序（倒回來）

    SELECT * FROM Item ORDER BY Case WHEN id = 5 THEN 1 END DESC ,id ASC

id

ItemName

5

電腦斷層掃描

1

血管攝影

2

支氣管鏡

3

心藏導管及造影

4

小兒型葉克膜

6

多人高壓氧艙

7

血液透析

8

核磁共振

9

一般型葉克膜

（iii）指定查詢
---------

條件狀況 - 讓 id = 5 （電腦斷層掃描） 排序為最後一筆，其餘依 id 遞減

1.  這裡一樣分兩段式，先強制讓 id = 5 為第一筆並遞增
2.  再將調整後之 id 遞減回來排序

    SELECT * FROM Item ORDER BY Case WHEN id = 5 THEN 0 END ASC ,id DESC

id

ItemName

9

一般型葉克膜

8

核磁共振

7

血液透析

6

多人高壓氧艙

4

小兒型葉克膜

3

心藏導管及造影

2

支氣管鏡

1

血管攝影

5

電腦斷層掃描

（iv）指定查詢
--------

條件狀況 - 讓 id = 5 （電腦斷層掃描） 排序為第一筆，其餘依 id 遞減

1.  這裡一樣分兩段式，先強制讓 id = 5 為最後一筆
2.  再將調整後之 id 遞減回來排序

    SELECT * FROM Item ORDER BY Case WHEN id = 5 THEN 1 END DESC ,id DESC

id

ItemName

5

電腦斷層掃描

9

一般型葉克膜

8

核磁共振

7

血液透析

6

多人高壓氧艙

4

小兒型葉克膜

3

心藏導管及造影

2

支氣管鏡

1

血管攝影

以上為 ORDER BY 搭配 CASE WHEN 之應用

參考資料：[Use SQL to query in order except the first record](http://stackoverflow.com/questions/8523255/use-sql-to-query-in-order-except-the-first-record)

有勘誤之處，不吝指教。ob'\_'ov