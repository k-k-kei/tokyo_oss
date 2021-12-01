<template>
  <div>
    <!-- <BaseInputImage @saveImageFile="getImageFile" /> -->
    <!-- ヘッダー下にマージンをとる -->
    <div class="h-72">
      <img
        :src="mainImage"
        alt="メインイメージ"
        class="h-full w-full object-cover"
      />
    </div>
    <!-- タイトル -->
    <div class="my-12">
      <div>
        <h1 class="my-4 text-4xl font-bold">
          {{ title }}
        </h1>
      </div>
      <!-- いいねマークと数 -->
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-cPink"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span class="text-cPink text-sm pl-1">22</span>
      </div>
      <!-- ユーザー名と日時 -->
      <div class="mt-4">
        <p class="text-sm">{{ userId }}</p>
        <p class="text-sm text-gray-300">{{ changeDate(datetime) }}</p>
      </div>
      <!-- 本文 -->
      <div v-for="text in data" :key="text.id">
        <div v-if="text.data.file != null" class="border rounded shadow">
          <img :src="text.data.file.url" alt="挿入画像">
          <p class="text-center text-sm text-cGray p-2">{{ text.data.caption }}</p>
        </div>
        <div v-else>
          <p :class="textStyle(text.type)">
            {{ text.data.text }}
          </p>
        </div>
      </div>

      <!-- 機能つけきれないので一旦コメントアウト -->
      <!-- 関連タグ -->
      <!-- <div class="flex flex-wrap text-sm">
                <span class="mr-2 p-2 border rounded-md">#車椅子でも快適</span>
                <span class="mr-2 p-2 border rounded-md">#カフェ</span>
            </div>
        </div> -->
      <!-- 記事リコメンド -->
      <!-- <div class="border-t border-b border-gray-100 py-7"> -->
      <!-- タイトル -->
      <!-- <p class="font-bold">人気記事</p> -->

      <!-- 記事① -->
      <!-- <div class="mt-4">
                <p class="font-bold text-sm">コーヒーを美味しく入れる方法</p>
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span class="text-pink-500 text-sm pl-1">22</span>
                    <p class="text-sm text-gray-300 pl-3">コーヒー侍</p>
                </div>
            </div> -->

      <!-- 記事② -->
      <!-- <div class="mt-4">
                <p class="font-bold text-sm">美味しいお菓子の見分け方</p>
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span class="text-pink-500 text-sm pl-1">22</span>
                    <p class="text-sm text-gray-300 pl-3">コーヒー侍</p>
                </div>
            </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "@nuxtjs/composition-api";
import { db } from "~/plugins/firebase";
import getParamsId from "../composable/getParams";
import changeDate from "../composable/changeDate";

export default defineComponent({
  setup() {
    //記事のドキュメントid
    const id = getParamsId();
    // ブログテキスト
    const data = ref<Array<String>>([]);
    //メインイメージ
    const mainImage = ref("");
    //ブログタイトル
    const title = ref("");
    //記事作成ユーザーid
    const userId = ref("");
    //記事作成日時
    const datetime = ref("");

    // firebaseのオブジェクトをリアルタイムに取得
    onMounted(() => {
      db.collection("memo")
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            if (doc.id === id) {
              //メインイメージを取得
              mainImage.value = doc.data().mainImage;
              //タイトルを取得
              title.value = doc.data().title;
              //ユーザーidを取得
              userId.value = doc.data().uid;
              //記事作成日時を取得
              datetime.value = doc.data().time;
              //テキストを取得
              //取得したオブジェクトの中にある配列を変数に格納
              //配列を展開して一つずつ上記で定義したdataに移す
              const dataArray = doc.data().blocks;
              dataArray.forEach((el) => data.value.push(el));
            }
          });
        });
    });

    //editer.jsで保存されたtypeによってclassをだしわけ
    const textStyle = (type:any) => {
      if (type === "header") {
        return "StyleHeader";
      } else {
        return "StyleText";
      }
    };

    return {
      data,
      mainImage,
      title,
      userId,
      datetime,
      textStyle,
      changeDate
      // getImageFile
    };
  },
});
</script>

<style lang="postcss" scoped>
/* 

テキストのスタイルだしわけ

 */

/* type === headerの場合 */
.StyleHeader {
  @apply text-2xl font-bold my-5 leading-loose;
}

/* type === paragraphの場合 */
.StyleText {
  @apply my-5 leading-loose;
}
</style>
