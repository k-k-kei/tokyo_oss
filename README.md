
# 環境のつくりかた

1. 適当な場所に `git clone`する
2. `cd oss`する
4. `docker-compose build` する
5. `docker-compose run --rm front npx create-nuxt-app`する
6. `docker-compose up -d`する

コンテナに入る時
docker-compose exec front bash

# Nuxtのオプションの意味
