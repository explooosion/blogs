---
title: "GCP - 使用 Github Actions 部署 React 到 GKE"
subtitle: "丟給 github actions 跑就對啦！"
date: "2020-10-10T00:00:00.000Z"
series: "gcp"
tags: "cicd","deploy","docker","github","github-actions","gke","google","k8s","kubernetes","react"
image: "https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/banner/1602267554.png"
--- 

丟給 github actions 跑就對啦！

利用 Github Actions 部署你的專案到 GKE Cluster 上吧！

[![1602267554.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602267554.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602267554.png)

*   [GitHub Actions self-hosted runners on Google Cloud](https://github.blog/2020-08-04-github-actions-self-hosted-runners-on-google-cloud/)
    

前言
--

有關 GCP 與 Github Actons 的設定，大多於前一篇文章，說明詳細。

*    [GCP - 使用 Github Actions 部署 React 到 Cloud Run](https://dotblogs.com.tw/explooosion/2020/10/09/143330)

因此本篇略過大多設定，以重點設定的方式說明。

在 Github Actions 的部分，

參考使用 [Google Kubernetes Engine - GitHub Actions](https://github.com/GoogleCloudPlatform/github-actions/tree/master/example-workflows/gke) 的範例建置。

本篇文章專案範例放置於：

[https://github.com/explooosion/react-gke-deploy-example](https://github.com/explooosion/react-gke-deploy-example)

1\. 新增服務帳戶 Service Account
--------------------------

根據 [Google Kubernetes Engine - GitHub Actions](https://github.com/GoogleCloudPlatform/github-actions/tree/master/example-workflows/gke) 的建議，

新增服務帳戶，並提供兩個權限：

*   `Kubernetes Engine Developer` - allows deploying to GKE
    
*   `Storage Admin` - allows publishing to Container Registry
    

[![1602268882.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602268882.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602268882.png)

接著取出 Service Account Key，將 JSON file 下載保存。

內容結構如下：

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

你也可以選擇使用 gcloud 命令方式取得金鑰：

    gcloud iam service-accounts keys create ./key.json --iam-account  --iam-account <sa-name>@<project-id>.iam.gserviceaccount.com

2.  建立 Kubernetes 叢集
--------------------

到 Kubernetes Engine 建立新的叢集 cluster。

[![1602269060.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602269060.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602269060.png)

在位置區域的配置，筆者選擇 asia-east1-a。

[![1602269082.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602269082.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602269082.png)

[![1602269105.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602269105.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602269105.png)

3.  建立 CRA 專案 ( [Create React App](https://zh-hant.reactjs.org/docs/create-a-new-react-app.html#create-react-app) )
-------------------------------------------------------------------------------------------------------------------

接著可以建立專案：

    npx create-react-app my-app

如果你會使用 Docker 部署環境，那麼你可以替換成你想部署的專案。

4\. 建立 Github Actions ( [Workflow syntax for GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions) )
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

\[ **Dockerfile** \]

可根據自己的專案撰寫，此專案筆者將專案 build 後放置於 nginx html。

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

\[ [.dockerignore](https://github.com/explooosion/react-gcp-deploy-example/blob/master/.dockerignore) \]

加入一點忽略規則。

    Dockerfile
    README.md
    node_modules
    npm-debug.log

\[ .github / workflows / main.yml \]

建立 workflows，內容參考 [gke](https://github.com/GoogleCloudPlatform/github-actions/tree/master/example-workflows/gke)。

    name: Build and Deploy to GKE
    
    on:
      push:
        branches:
        - master
    
    env:
      PROJECT_ID: ${{ secrets.GKE_PROJECT }}
      GKE_CLUSTER: cluster-1    # TODO: update to cluster name
      GKE_ZONE: asia-east1-a   # TODO: update to cluster zone
      DEPLOYMENT_NAME: gke-app # TODO: update to deployment name
      IMAGE: my-image
    
    jobs:
      setup-build-publish-deploy:
        name: Setup, Build, Publish, and Deploy
        runs-on: ubuntu-latest
    
        steps:
        - name: Checkout
          uses: actions/checkout@v2
    
        # Setup gcloud CLI
        - uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
          with:
            version: '290.0.1'
            service_account_key: ${{ secrets.GKE_SA_KEY }}
            project_id: ${{ secrets.GKE_PROJECT }}
    
        # Configure Docker to use the gcloud command-line tool as a credential
        # helper for authentication
        - run: |-
            gcloud --quiet auth configure-docker
        # Get the GKE credentials so we can deploy to the cluster
        - run: |-
            gcloud container clusters get-credentials "$GKE_CLUSTER" --zone "$GKE_ZONE"
        # Build the Docker image
        - name: Build
          run: |-
            docker build \
              --tag "gcr.io/$PROJECT_ID/$IMAGE:$GITHUB_SHA" \
              --build-arg GITHUB_SHA="$GITHUB_SHA" \
              --build-arg GITHUB_REF="$GITHUB_REF" \
              .
        # Push the Docker image to Google Container Registry
        - name: Publish
          run: |-
            docker push "gcr.io/$PROJECT_ID/$IMAGE:$GITHUB_SHA"
        # Set up kustomize
        - name: Set up Kustomize
          run: |-
            curl -sfLo kustomize https://github.com/kubernetes-sigs/kustomize/releases/download/v3.1.0/kustomize_3.1.0_linux_amd64
            chmod u+x ./kustomize
        # Deploy the Docker image to the GKE cluster
        - name: Deploy
          run: |-
            ./kustomize edit set image gcr.io/PROJECT_ID/IMAGE:TAG=gcr.io/$PROJECT_ID/$IMAGE:$GITHUB_SHA
            ./kustomize build . | kubectl apply -f -
            kubectl rollout status deployment/$DEPLOYMENT_NAME
            kubectl get services -o wide

在 yml 中，使用了幾個需要在 github 建立 secret 的參數：

*   GKE\_PROJECT：專案 id
*   GKE\_SA\_KEY：專案金鑰，建立 secret 時，務必整個 JSON 內容貼上

[![1602272016.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602272016.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602272016.png)

而 yml 自身也使用了幾個 env 參數：

*   PROJECT\_ID: ${{ secrets.GKE\_PROJECT }}  # 自動會帶入來自 secret 設定
*   GKE\_CLUSTER: cluster-1 # 輸入你所建立的叢集名稱
*   GKE\_ZONE: asia-east1-a # 輸入你的叢集主要地區 zone
*   DEPLOYMENT\_NAME: gke-app # 部署名稱, 此名在其他 yml 需要一致
*   IMAGE: my-image # docker 映像名稱

關於 zone，可以回到 GCP 後台叢集查找，

或者使用指令查看：

    gcloud container clusters list

\[ kustomization.yml \]

在專案根目錄建立 kustomization 設定檔。

    apiVersion: kustomize.config.k8s.io/v1beta1
    kind: Kustomization
    resources:
    - deployment.yml
    - service.yml

\[ deployment.yml \]

建立 [工作負載](https://console.cloud.google.com/kubernetes/workload) 部署設定檔。

這邊有些與官方不太一樣，appVersion 請使用 apps/v1

並且加上 spec.selector.matchLabels.app: gke-app

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: gke-app
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: gke-app
      strategy:
        rollingUpdate:
          maxSurge: 1
          maxUnavailable: 1
      minReadySeconds: 5
      template:
        metadata:
          labels:
            app: gke-app
        spec:
          containers:
          - name: gke-app
            image: gcr.io/PROJECT_ID/IMAGE:TAG
            ports:
            - containerPort: 80
            resources:
              requests:
                cpu: 100m
              limits:
                cpu: 100m
    

*   containerPort：是指容器內部要映射的 port

\[ service.yml \]

建立 [Service 與 Ingress](https://console.cloud.google.com/kubernetes/discovery) 部署設定檔。

    apiVersion: v1
    kind: Service
    metadata:
      name: gke-app-service
    spec:
      type: LoadBalancer
      ports:
        - port: 80
          targetPort: 80
      selector:
        app: gke-react-app

接著就可以 git push，看看跑完的結果吧～ 

5.  查看 Container Register & Kubernetes Engine
---------------------------------------------

可以看到順利建置好 image。

[![1602272712.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602272712.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602272712.png)

工作負載也順利部署成功。

[![1602332234.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602332234.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602332234.png)

Service 與 Ingress 也順利建立，在端點欄位可以看到公開網址。

[![1602332277.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602332277.png)](https://dotblogsfile.blob.core.windows.net/user/robby/201d891d-f853-4e13-8cf5-829845b41e4f/1602332277.png)

看！他在動！

[![1602242737.png](https://raw.githubusercontent.com/explooosion/blogs/refs/heads/main/docs/images/2020-10-10_GCP%20-%20%E4%BD%BF%E7%94%A8%20Github%20Actions%20%E9%83%A8%E7%BD%B2%20React%20%E5%88%B0%20GKE/1602242737.png)](https://dotblogsfile.blob.core.windows.net/user/robby/be9c89cd-fdf5-4f93-a363-601ab3b16219/1602242737.png)

本篇文章專案範例放置於：

[https://github.com/explooosion/react-gke-deploy-example](https://github.com/explooosion/react-gke-deploy-example)

有勘誤之處，不吝指教。ob'\_'ov