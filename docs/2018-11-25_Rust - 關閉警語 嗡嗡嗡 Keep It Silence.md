---
title: "Rust - 關閉警語 嗡嗡嗡 Keep It Silence"
date: "2018-11-25"
tags: [rust, lint, warning, builtin]
view: "231"
history: "0"
group: "Rust"
banner: "images/2018-11-25_Rust - 關閉警語 嗡嗡嗡 Keep It Silence/banner/1543131514_31819.png"
---

如果你也被 rust 的警語感到不耐煩 ...

如果你在撰寫 Rust 的時候，遇到了嗡嗡嗡 ...

[![1543131514_31819.png](images/2018-11-25_Rust - 關閉警語 嗡嗡嗡 Keep It Silence/1543131514_31819.png)](https://dotblogsfile.blob.core.windows.net/user/incredible/a22b1a90-dfde-4438-9ee2-23d5abd7596f/1543131514_31819.png)

本篇不超過一百字，只為了解決一個問題。

### — 警語 Warning。

一、作法
----

有時候我們只是為了 debug 或其他用途而聲明 **use** ，

但總是卻被警語 warning warning warning ...

本筆記提供兩個常用的關閉方法。

#### 針對匯入 import 的警語 ：

    #[allow(unused_imports)]

#### 針對變數 variable 的警語：

    #[allow(unused_variables)]

更多方法可參考：

*   [Module rustc\_lint::lint::builtin](https://doc.rust-lang.org/1.1.0/rustc_lint/lint/builtin/index.html)
*   [doc.rust-lang.org](https://doc.rust-lang.org)
*   [Option to suppress unused variable warnings on unimplemented!() functions.](https://github.com/rust-lang/rfcs/issues/1710)

#### 如果你想一次把「**所有」**警語 warning 關閉，你可以嘗試這招：

    #![allow(warnings)]

我想應該就會很安靜了 ...

如果久了，你怕安靜了 ...

：「我想我真的怕安靜　少了你吵我不開心」

**噓**
-----

建議不爽過後，還是要把警語開啟哦～

×. 結語
-----

嗡嗡嗡。

[![1543133147_43545.jpg](images/2018-11-25_Rust - 關閉警語 嗡嗡嗡 Keep It Silence/1543133147_43545.jpg)](https://dotblogsfile.blob.core.windows.net/user/incredible/cc6102ac-4231-43e1-857e-94d5ab0fa44e/1543133147_43545.jpg)

有勘誤之處，不吝指教。ob'\_'ov