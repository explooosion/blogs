---
title: "JavaScript - 我獨自升級 substr "
subtitle: "只要有 substring 和 slice，就沒什麼好怕的。"
date: "2025-01-31T00:00:00.000Z"
series: "javascript"
tags: "javascript","string substr","substring","slice"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2025-01-31_JavaScript%20-%20%E6%88%91%E7%8D%A8%E8%87%AA%E5%8D%87%E7%B4%9A%20substr/banner/javascript_substr.png"
--- 

在加入了陳年專案維護中獲得了新知識。

[![javascript_substr.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2025-01-31_JavaScript%20-%20%E6%88%91%E7%8D%A8%E8%87%AA%E5%8D%87%E7%B4%9A%20substr/banner/javascript_substr.png)](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2025-01-31_JavaScript%20-%20%E6%88%91%E7%8D%A8%E8%87%AA%E5%8D%87%E7%B4%9A%20substr/banner/javascript_substr.png)

<br /><br />

# 前言

最近工作派發了一些 Legacy Code 專案翻修，難免會遇到一些 `deprecated` 的方法。

面對這些陳年代碼，最大的敵人往往都是疏忽了商業邏輯以及代碼可讀性。

<br />
  
本篇重點不在於介紹 `substr`, `substring`, `slice` ，想必大家都略懂這方法。

> 如果使用冷門特性，你一輩子都會記得寫註解對吧！？

<br />

這一篇的角度在於筆者對 Legacy Code 進行 `String.substr()` 重構的思路。

從「*維護性*」與「*效能*」的之間找到合適的平衡。

這份筆記也是為了日後仍遇到時，可以快速拿自己的文章參考。

希望能對大家有所幫助。

<br /><br /><br />

# 一、字串切割介紹

簡單說明一下他們「**主要**」的用法。

最大的區別在於第二個參數「**索引 Index**」的意義。


**String.prototype.substr()** - [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)

```javascript
substr(start)
substr(start, length)
```

**String.prototype.substring()** - [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)

```javascript
substring(indexStart)
substring(indexStart, indexEnd)
```

**String.prototype.slice()** - [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)

```javascript
slice(indexStart)
slice(indexStart, indexEnd)
```

<br />

這些方法中，最大的差異在於：

* 參數使用幾個？
    
* 傳入的參數值是否為 ≥ 0？
    
* 傳入的參數值是否為 負數？
    
<br />

這篇就不特別寫出他們的特性了，筆者自己整理了一張表格…

這個表格也許很蠢，但這在快速做出一個決策時，挺好用的…

![](https://dotblogsfile.blob.core.windows.net/user/robby/55632cb1-c1cb-4932-8a8b-556c44b035c1/1721046883.png.png align="center")

<br />

> 筆者暫時將第一個參數設為 x，第二個參數設為 y。

<br /><br /><br />

# 二、評估抽換方式

這篇是解決 Legacy Code 的場景，因此可以思考你面對的 `substr()` ，是為了解決什麼問題？

接著來探索這些可能的條件，找出最適的解決方案！

> 極端的例子我相信是鮮少的，不太需要執著於極端案例。
> 
> 難以長期傳承商業邏輯的代碼，最需要的是直觀的可讀性。

<br /><br />

以下提供 7 種的例子，作為重構的選擇：

1. 基本使用 `substr(start, length)`)
    
2. 起始索引為負數 `substr(-start, length)` → 使用 `slice()`
    
3. 長度超過字串長度 `substr(start, length)` → 使用 `substring()`
    
4. 起始索引超過字串長度 `substr(start, length)` → 使用 `slice()`
    
5. 單參數 `substr(start)` → 使用 `substring()`
    
6. 起始索引為負數且超過字串長度 `substr(-start, length)` → 使用 `slice()`
    
7. 無法使用 `substring(start, end)` 替代 `substr()` 的情境 → 使用 `slice()`

<br /><br />    

### 1 . 基本使用 `substr(start, length)`

適用於簡單的範圍擷取，用於單純的商業邏輯。

```javascript
const str = "JavaScript";
console.log(str.substring(4, 10)); // "Script"
```

使用 `substring()` 替換。

```javascript
console.log(str.substring(4, 10)); // "Script"
```

✅ `substring(start, start + length)` 直觀表達了「從 start 位置擷取 length 個字元」，可讀性極高。

<br /><br />

### 2\. 起始索引為負數 `substr(-start, length)` → 使用 `slice()`

`substring()` 不支援負數索引，因此需要 `slice()` 來替代。

```javascript
const str = "Hello World";
console.log(str.slice(-5)); // "World"
```

使用 `slice()` 替換。

```javascript
console.log(str.slice(-5)); // "World"
```

✅ `slice(-start)` 直接從倒數第 start 個字元開始擷取，行為與 `substr()` 相同。

<br /><br />

### 3\. 長度超過字串長度 `substr(start, length)` → 使用 `substring()`

在一些未知長度的條件下，如果允許 length 超出範圍，`substr()` 會自動調整，`substring()` 也有類似行為。

```javascript
const str = "abcdef";
console.log(str.substring(2)); // "cdef"
```

使用 `substring()` 替換相對直觀，`slice()` 你喜歡也可以使用。

```javascript
console.log(str.substring(2, str.length)); // "cdef"
```

✅ `substring(start, end)` 自動處理 end 超過範圍的情況。

<br /><br />

### 4\. 起始索引超過字串長度 `substr(start, length)` → 使用 `slice()`

如果場景具有未知的起始索引，`substring()` 會自動交換 start 和 end，而有**不同**結果，這種條件建議使用 `slice()`。

```javascript
const str = "Hello";
console.log(str.slice(10, 13)); // "" (空字串)
```

使用 slice() 替換。

```javascript
console.log(str.slice(10, 13)); // "" (空字串)
```

✅ `slice(start, end)` 行為與 `substr()` 一致，會返回空字串。

<br /><br />

### 5\. 單參數 `substr(start)` → 使用 `substring()`

當 length 省略時，`substr(start)` 會提取到字串結尾，這與 `substring(start)` 行為相同。這應該是最簡單的場境，單純且單一參數。

```javascript
const str = "Hello JavaScript";
console.log(str.substring(6)); // "JavaScript"
```

使用 `substring()` 替換。

```javascript
console.log(str.substring(6)); // "JavaScript"
```

✅ `substring(start)` 直覺地表示「從 start 開始到字串結尾」，可讀性高。

<br /><br />

### 6\. 起始索引為負數且超過字串長度 `substr(-start, length)` → 使用 `slice()`

通常在於更多的演算方法。`substring()` 不支援負數索引，應該使用 `slice()`。

```javascript
const str = "Hello";
console.log(str.slice(-10, -7)); // "Hel"
```

使用 `slice()` 替換。

```javascript
console.log(str.slice(-10, -7)); // "Hel"
```

✅ `slice(start, end)` 在負索引時表現一致，適用於此場景。

<br /><br />

### 7\. 無法使用 `substring(start, end)` 替代 `substr()` 的情境 → 使用 `slice()`

`substring()` 無法處理負數索引，也無法擷取固定長度，因此 `slice()` 是更好的選擇。

```javascript
const str = "Hello World";
console.log(str.slice(-5, -2)); // "Wor"
```

錯誤的 `substring()` 替換。

```javascript
console.log(str.substring(0, 3)); // "" (錯誤，因為 `substring()` 會將負數視為 0)
```

正確的做法應該用 `slice()`。

```javascript
console.log(str.slice(-5, -2)); // "Wor"
```

✅ `slice()` 是唯一能夠完全取代 `substr()` 在負索引情境下的選擇。

<br /><br /><br />

# 三、結論

整體而言，應該根據重構的**目的**，以及代碼的**職責**來決定適合哪一種。

* 基於可讀性優先：如果今天你在業務邏輯單純，且索引範圍固定時，`substring()` 可讀性更高。
    
* 基於效率且容錯率高的場景：如果面對特定的演算或者複雜的計算，甚至索引可能是負數等等不穩定的條件，這時候使用 `slice()` 相對安全。
    
<br /><br />

**適合** `substring()` **的場景：**

* start 與 end 你能肯定商業邏輯為正數。
    
* 需要擷取 固定範圍，不考慮負索引。
    
* 可讀性佳，適用於基本的字串擷取。
    

**適合** `slice()` **的場景：**

* 需要支援負數索引 `substr(-start, length)`。
    
* 起始索引超出字串長度時，應返回空字串。
    
* 避免 start &gt; end 情境時自動交換。