---
title: "GCP - Verify Google SSL certificates"
subtitle: "紀錄 Google 自行管理 SSL 憑證時的驗證方式"
date: "2021-09-08T00:00:00.000Z"
series: "gcp"
tags: "certificates","gcp","https","ssl"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2021-09-08_GCP%20-%20Verify%20Google%20SSL%20certificates/banner/1631111893.png"
--- 

紀錄 Google 自行管理 SSL 憑證時的驗證方式

在架設 GCP HTTPS 時遇到的小坑

[![1631111893.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2021-09-08_GCP%20-%20Verify%20Google%20SSL%20certificates/1631111893.png)](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs?authuser=1#console)

先看看你現在有哪些憑證，如果沒有就先手動建立好吧～

    gcloud compute target-https-proxies list

找到 Name 之後進行驗證

    gcloud compute target-https-proxies describe TARGET_HTTPS_PROXY_NAME --global --format="get(sslCertificates)"

過一陣子查詢一下憑證就會亮綠燈囉

[![1631112266.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2021-09-08_GCP%20-%20Verify%20Google%20SSL%20certificates/1631112266.png)](https://dotblogsfile.blob.core.windows.net/user/robby/8a70c8f8-cce8-4e9d-bf58-99f3c61863aa/1631112266.png)

### REF

[https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs)

有勘誤之處，不吝指教。ob'\_'ov