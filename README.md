
# 環境のつくりかた

1. 適当な場所に `git clone`する
2. `cd oss`する
4. `docker-compose build`
5. `docker-compose run --rm frontend yarn install`
6. `docker-compose up -d` でコンテナを立ち上げ

- コンテナを立ち上げると、自動で`yarn dev`されるのでbuildのために敢えてコンテナに入る必要はありません

- それでもコンテナに入りたい時
`docker-compose exec front bash`
