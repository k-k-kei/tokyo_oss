
# 環境のつくりかた

1. 適当な場所に `git clone`する
2. `cd tokyo_oss`する
4. `docker-compose build`
5. `docker-compose run --rm front yarn install`
6. `docker-compose up -d` でコンテナを立ち上げ

- コンテナを立ち上げると、自動で`yarn dev`されるのでbuildのために敢えてコンテナに入る必要はありません

- それでもコンテナに入りたい時
`docker-compose exec front bash`

## 追加で入れたパッケージ
- tailwind
- @nuxtjs/composition-api
- @nuxt/typescript-runtime
- nuxt-property-decoratorは入れてません。入れたい人が入れましょう。
-
