---
title: "GCP - 使用 Github Actions 部署 React 到 Cloud Run"
subtitle: "丟給 github actions 跑就對啦！"
date: "2020-10-09T00:00:00.000Z"
series: "gcp"
tags: "cicd","cloud","cloud-run","deploy","docker","github","github-actions","google","react"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/banner/1602243230.png"
--- 

丟給 github actions 跑就對啦！

利用 Github Actions 部署你的專案到 GCP Cloud Run 上吧！

[![1602243230.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602243230.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602243230.png)

*   [How to deploy your Cloud Run service using GitHub Actions](https://medium.com/google-cloud/how-to-deploy-your-cloud-run-service-using-github-actions-e5b6a6f597a3)
    

前言
--

在 [GCP](https://console.cloud.google.com/?hl=zh-TW) 環境部署中，提供了網頁上 GUI 的操作、[Cloud SDK](https://cloud.google.com/sdk)，

此外你也可以使用 [Github Actions](https://github.com/features/actions) 將你的專案部署到 [Cloud Run](https://cloud.google.com/run?hl=zh-tw)。

本文將介紹如何使用 [GoogleCloudPlatform](https://github.com/GoogleCloudPlatform) 開源的 [github actions](https://github.com/GoogleCloudPlatform/github-actions)，將專案部署到 [Cloud Run](https://cloud.google.com/run?hl=zh-tw)。  
 

專案部分使用 [CRA](http://zh-hant.reactjs.org/docs/create-a-new-react-app.html) ( create-react-app ) 作為範例，並將 build 好的專案，搭配 nginx 伺服器。

最後，本篇電腦作業系統環境使用 macOS，

對於 Windows 的朋友抱歉了，但設定與操作大同小異！

本篇文章專案範例放置於：

[https://github.com/explooosion/react-gcp-deploy-example](https://github.com/explooosion/react-gcp-deploy-example)

若有時間，再針對 [GKE](https://cloud.google.com/kubernetes-engine?hl=zh-tw) ( Google Kubernetes Engine ) 部署方式撰寫文章。

本篇可能需要具備的微薄知識：

1.  Google Cloud Platform
2.  Github Actions
3.  Cloud Run
4.  React
5.  Nginx
6.  Docker
7.  Terminal
8.  Git
9.  YAML

由於本篇屬於入門教學，因此設定上大多為預設值。

由於本篇屬於入門教學，內文會有些圖文並茂。

由於本篇屬於入門教學，上述知識略懂聽過即可。

* * *

流程說明
----

大致上工作流程 Workflow 如下：

1.  透過設定好的 github actions，會將專案建置成 docker image
2.  將 image 發佈到 [Container Registry](https://cloud.google.com/container-registry) 存放
3.  使用 [Container Registry](https://cloud.google.com/container-registry) 存放的 image 建立 Cloud Run 服務

* * *

目錄
--

1.  安裝 gCloud CLI ( [Installing Google Cloud SDK](https://cloud.google.com/sdk/docs/install) )
2.  建立 GCP 專案 ( [Creating Your Project](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project) )
3.  建立服務帳戶 ( [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) )
4.  建立 CRA 專案 ( [Create React App](https://zh-hant.reactjs.org/docs/create-a-new-react-app.html#create-react-app) )
5.  建立 Github Actions ( [Workflow syntax for GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions) )
6.  新增 Github Secrets ( [Encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) )
7.  Push 專案 ＆ 檢視 Actions
8.  啟用 API 服務 ( [API Library](http://console.developers.google.com/apis/library) )
9.  新增 Docker & 修改 yml
10.  查看 Container Register & Cloud Run

* * *

1\. 安裝 gCloud CLI ( [Installing Google Cloud SDK](https://cloud.google.com/sdk/docs/install) )
----------------------------------------------------------------------------------------------

雖然本文操作建立大多使用友善的瀏覽器，

但安裝 CLI 有時也能幫助到我們進行操作，因此建議安裝。

請先安裝好 python，不再特別說明此步驟。

下載好 [google-cloud-sdk-313.0.1-darwin-x86\_64.tar.gz](https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-313.0.1-darwin-x86_64.tar.gz) 並解壓縮後，以指令安裝。

```bash
./google-cloud-sdk/install.sh
```
```bash
./google-cloud-sdk/bin/gcloud init
```

接著可能會跳出網頁要你登入、並且選擇你的專案。

或者下指令登入，再重新 gcloud init 取得專案資料，

可參考 [Initializing Cloud SDK](https://cloud.google.com/sdk/docs/initializing)。

```bash
gcloud auth login
```

你可以嘗試確認現在電腦已授權登入的 google 帳戶

```bash
gcloud auth list
```

你可以嘗試確認電腦 gCloud 環境狀態

```bash
gcloud info
```

後續會我們會讓 Github Actions 嘗試呼叫 gcloud info

2\. 建立 GCP 專案 ( [Creating Your Project](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project) )
--------------------------------------------------------------------------------------------------------------------------------

到 GCP 上，[建立](https://console.cloud.google.com/projectcreate?)你的專案，例如 my-project ( 筆者隨便決定的 )。

[![1602227410.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602227410.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602227410.png)

完成後到[首頁](https://console.cloud.google.com/home/dashboard)，可以看到你的專案資訊。

專案名稱、專案 ID、專案編號 後續會使用到，請務必留意。

[![1602227331.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602227331.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602227331.png)

3\. 建立服務帳戶 ( [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) )
-------------------------------------------------------------------------------------------------------------------------------------

由於我們使用 Github Actions 存取 GCP，自然也要有身份驗證。

到 IAM 與管理頁面 - 服務帳戶，點選 ＋建立服務帳戶

[![1602227810.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602227810.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602227810.png)

下方資料，看各位想怎麼填都可。

[![1602228715.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602228715.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602228715.png)

根據 [cloud build github-actions](https://github.com/GoogleCloudPlatform/github-actions/tree/master/example-workflows/cloud-build)，我們會用到的角色如下：

*   `Cloud Run Admin` - allows for the creation of new services
    
*   `Cloud Build Editor` - allows for deploying cloud builds
    
*   `Cloud Build Service Account` - allows for deploying cloud builds
    
*   `Viewer` - allows for viewing the project
    
*   `Service Account User` - required to deploy services to Cloud Build
    

因此請選擇以下的角色名稱：

此圖是後來筆者重新到 IAM 建立角色，故有些畫面不同。

[![1602241712.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602241712.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602241712.png)

如果你覺得很麻煩，權限設定部分可先給最大的擁有者。

[![1602228379.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602228379.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602228379.png)

完成後在右邊選擇建立金鑰。

![1602228383.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602228383.png)

由於私密金鑰只能下載一次，務必保存好。

[![1602228354.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602228354.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602228354.png)

內容格式應該類似下方：

這份金鑰我們會用在 Github Actions 的 [Secrets](https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#secrets) 中

```json
{
  "type": "service_account",
  "project_id": "project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nprivate-key\n-----END PRIVATE KEY-----\n",
  "client_email": "service-account-email",
  "client_id": "client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/service-account-email"
}
```

4.  建立 CRA 專案 ( [Create React App](https://zh-hant.reactjs.org/docs/create-a-new-react-app.html#create-react-app) )
-------------------------------------------------------------------------------------------------------------------

接著可以建立專案了：

```bash
npx create-react-app my-app
```

如果你會使用 Docker 部署環境，那麼你可以替換成你想部署的專案。

5\. 建立 Github Actions ( [Workflow syntax for GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions) )
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

建立 workflow，專案參考 [setup-gcloud](https://github.com/GoogleCloudPlatform/github-actions/tree/master/setup-gcloud)。

\[ .github / workflows / main.yml \]

```
name: Build and Deploy to Cloud Run

on:
  push:
    branches:
    - master

jobs:
  setup-build-deploy:
    name: Setup, Build, and Deploy
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    # Setup gcloud CLI
    - uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
      with:
        version: '286.0.0'
        service_account_email: ${{ secrets.GCP_SA_EMAIL }}
        service_account_key: ${{ secrets.GCP_SA_KEY }}
        project_id: ${{ secrets.GCP_PROJECT_ID }}
        export_default_credentials: true
        
    # Print gcloud info
    - name: Info
      run: gcloud info
```

*   根據說明，checkout@v2 務必使用 v2 
*   secrets.GCP\_SA\_EMAIL：到時候要到 github 建立 secrets
*   secrets.GCP\_SA\_KEY：到時候要到 github 建立 secrets
*   secrets.GCP\_PROJECT\_ID：到時候要到 github 建立 secrets
*   run: gcloud info：執行命令 gcloud info

6\. 新增 Github Secrets ( [Encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) )
----------------------------------------------------------------------------------------------------------------------------------

在 github 建立你的 repo，之後到 Settings 選擇 Secrets。

[![1602232722.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602232722.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602232722.png)

點選 New secret，根據前一步驟的 yml，我們會需要用到以下三個 secrets：

1.  GCP\_PROJECT\_ID：一開始建立專案時給予的 id，你也可以從剛剛 金鑰 json 找到 
2.  GCP\_SA\_KEY：打開 金鑰 json ，將所有內容複製貼上
3.  GCP\_SA\_EMAIL：打開 金鑰 json ，可以從 client\_email 找到，或者回到 IAM 的 [服務帳戶](https://console.cloud.google.com/iam-admin/serviceaccounts) 找到

命名方式自由選擇，記得 yml 要一樣就好。

你也可以把 金鑰.json 轉 base64 貼到 GCP\_SA\_KEY 儲存，指令： base64 -i key.json

完成如下：

[![1602235704.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602235704.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602235704.png)

7\. Push 專案 ＆ 檢視 Actions
------------------------

把你的專案 push 到 github，接著就可以看到 Actions 在執行囉！

[![1602240224.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602240224.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602240224.png)

展開 Run gcloud info，就可以看到指令的結果了！

[![1602240266.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602240266.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602240266.png)

8\. 啟用 API 服務 ( [API Library](http://console.developers.google.com/apis/library) )
----------------------------------------------------------------------------------

在這一步，我們將要把專案用 docker 建立成 image，並發佈到 [Container Registry](https://console.cloud.google.com/gcr/images)。

接著使用 [Container Registry](https://console.cloud.google.com/gcr/images) 的映像檔，為我們建立 [Cloud Run](https://cloud.google.com/run)。

以下 yml 利用 [gcloud builds submit](https://cloud.google.com/sdk/gcloud/reference/builds/submit)、[gcloud run deploy](https://cloud.google.com/sdk/gcloud/reference/run/deploy) 等指令操作。

由於我們尚未開通使用  [Container Registry](https://console.cloud.google.com/gcr/images) 服務，

請先到該頁面選擇啟用 Container Registry API。

[![1602235136.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602235136.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602235136.png)

以下為必啟用的 API，可到  [API 程式庫](https://console.developers.google.com/apis/library) 尋找並安裝：

由於我們要使用 gcloud build, gcloud run deploy 等指令，協助我們部署到 Cloud Run，

因此需要啟用 [Cloud Build API](https://console.developers.google.com/apis/library/cloudbuild.googleapis.com?q=Cloud%20Buil&id=9472915e-c82c-4bef-8a6a-34c81e5aebcc&project=compelling-art-292007&authuser=1) 和 [Cloud Run API](https://console.developers.google.com/apis/library/run.googleapis.com) 。

[![1602240934.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602240934.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602240934.png)

[![1602241963.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602241963.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602241963.png)

以上有任何缺少的服務啟用，很可能會在 Github Actions 階段噴錯，

例如 Cloud Build API 沒啟用的錯誤：

[![1602240995.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602240995.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602240995.png)

9\. 新增 Docker & 修改 yml
----------------------

接著開始撰寫 Dockerfile 吧！

\[ **Dockerfile** \]

可根據自己的專案撰寫，此專案筆者將專案 build 後放置於 nginx html。

```
FROM node:10 AS Builder

ENV NPM_CONFIG_LOGLEVEL info

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

ARG GENERATE_SOURCEMAP=false

RUN yarn install && yarn build

FROM nginx:1.13.3-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=Builder /usr/src/app/build /usr/share/nginx/html
```

\[ [.dockerignore](https://github.com/explooosion/react-gcp-deploy-example/blob/master/.dockerignore) \]

加入一點忽略規則。

```
Dockerfile
README.md
node_modules
npm-debug.log
```

\[ .github / workflows / main.yml \]

```
name: Build and Deploy to Cloud Run

on:
  push:
    branches:
    - master

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  SERVICE_NAME: create-react-app
  RUN_REGION: us-central1

jobs:
  setup-build-deploy:
    name: Setup, Build, and Deploy
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    # Setup gcloud CLI
    - uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
      with:
        version: '286.0.0'
        service_account_email: ${{ secrets.GCP_SA_EMAIL }}
        service_account_key: ${{ secrets.GCP_SA_KEY }}
        project_id: ${{ secrets.GCP_PROJECT_ID }}
        export_default_credentials: true
        
    # Print gcloud info
    - name: Info
      run: gcloud info

    # Build and push image to Google Container Registry
    - name: Build
      run: |-
        gcloud builds submit \
          --quiet \
          --tag "gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA"
    # Deploy image to Cloud Run
    - name: Deploy
      run: |-
        gcloud run deploy "$SERVICE_NAME" \
          --quiet \
          --region "$RUN_REGION" \
          --image "gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA" \
          --platform "managed" \
          --port 80 \
          --allow-unauthenticated
```

*   env 的參數是要給後面 gcloud 指令使用
*   PROJECT\_ID：是你原專案名稱，使用 secret 的 ${{ secrets.GCP\_PROJECT\_ID }} 即可
*   SERVICE\_NAME：是你 image 在 container register 的名稱
*   gcr.io 是 container register 的網址，我們發佈的映像檔網域

接著就可以 git push，看看跑完的結果吧～ 

10.  查看 Container Register & Cloud Run
--------------------------------------

當 github action 順利建置好並發佈 image 後，

就能看到 image 在列表中了，並且是以私人的方式發佈！

[![1602242218.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602242218.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602242218.png)

當 github actions 完全跑完後，就可以查看服務。

[![1602242291.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602242291.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602242291.png)

點進去查看，可以看到網址，那就是你的服務公開網址囉！

[![1602242352.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602242352.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602242352.png)

看！他在動！

[![1602242737.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-09_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20Cloud%20Run/1602242737.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602242737.png)

本篇文章專案範例放置於：

[https://github.com/explooosion/react-gcp-deploy-example](https://github.com/explooosion/react-gcp-deploy-example)

REF
---

*   [Google Cloud Doc](https://cloud.google.com/docs)
*   [GoogleCloudPlatform/github-actions](https://github.com/GoogleCloudPlatform/github-actions)

有勘誤之處，不吝指教。ob'\_'ov