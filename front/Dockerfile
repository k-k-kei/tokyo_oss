FROM node:16-slim
ENV HOST 0.0.0.0
# コマンド実行
RUN apt-get update && \
    apt-get install -y git && \
    npm install -g @vue/cli nuxt create-nuxt-app \