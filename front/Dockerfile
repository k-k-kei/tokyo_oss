FROM node:16
ENV HOST 0.0.0.0
# コマンド実行
RUN apt-get update && \
    apt-get install git && \
    npm install -g @vue/cli nuxt create-nuxt-app \