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
      <div class="flex" @click="addLike">
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
        <span class="text-cPink text-sm pl-1">{{ like }}</span>
      </div>
      <!-- ユーザー名と日時 -->
      <div class="mt-4">
        <p class="text-sm">{{ userName }}</p>
        <p class="text-sm text-gray-300">{{ changeDate(datetime) }}</p>
      </div>
      <!-- 本文 -->
      <div v-for="text in data" :key="text.id">
        <div v-if="text.data.file != null" class="border rounded shadow">
          <img :src="text.data.file.url" alt="挿入画像">
          <p class="text-center text-sm text-cGray p-2">{{ text.data.caption }}</p>
        </div>
        <div v-else>
          <div :class="textStyle(text.type)">
            <div v-if="text.data.text.includes('http')">
              <a :href="text.data.text" class="text-blue-700">{{ text.data.text }}</a>
            </div>
            <div v-else>
              <div>{{ text.data.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "@nuxtjs/composition-api";
import { db } from "../plugins/firebase";
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
    //いいね数
    const like = ref<number>();
    //記事作成日時
    const datetime = ref("");
    
    //firestoreのusersコレクションに登録されているユーザー一覧
    const userName = ref("");

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
              // いいね数を取得
              like.value = doc.data().like;
              //記事作成日時を取得
              datetime.value = doc.data().time;
              //テキストを取得
              //取得したオブジェクトの中にある配列を変数に格納
              //配列を展開して一つずつ上記で定義したdataに移す
              const dataArray = doc.data().blocks;
              dataArray.forEach((el:any) => data.value.push(el));
            }
          });
        });

      db.collection("users")
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            if (doc.data().uid === userId.value) {
              userName.value = doc.data().name;
            }
          });
        });
    });

    const addLike = () => {
      like.value = like.value + 1
      db.collection('memo').doc(id).update({
        like:like.value
      })
      .then(() => console.log("update いいね -> ",like.value))
    }

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
      like,
      datetime,
      userName,
      textStyle,
      changeDate,
      addLike,
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
