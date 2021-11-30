<template>
  <div>
    {{imageFile}}
    <img :src="previewImage[0]" alt="" />
    <input type="file" @change="selectImage" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "@nuxtjs/composition-api";
import firebase from "firebase";


//アップロードした画像をstorageとfirestoreに保存する関数
const saveStorage = (file) => {
  //乱数を生成して保存する画像名の重複を防ぐ
  const randomNum = Math.floor(Math.random() * (1000 - 100));
  //storageに画像を保存
  const storageRef = firebase.storage().ref(`images/${randomNum}_${file.name}`);
  console.log(storageRef);

  //保存した画像のstorageパスを取得して任意のfirestoreドキュメントに保存
  const uploadTask = storageRef.put(file);
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    null,
    (error) => {
      console.log(error);
    },
    () => {
      storageRef.getDownloadURL().then((url) => {
        console.log(url);
        //※ここでstorage画像パス保存先ドキュメントを指定
      });
    }
  );
};


export default defineComponent({
  setup() {
    //アップロードした画像をプレビュー表示するための変数
    const previewImage = ref([]);
    const imageFile = ref([]);


    //アップロードボタンを押したら発火する関数
    const selectImage = (e) => {
      // inputからfileデータを取得
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // アップロードした画像をプレビューで表示するために配列にpush
      reader.onload = (e) => {
        previewImage.value.push(e.target.result);
      };

      imageFile.value = file.name;
      console.log(imageFile.value);
      // saveStorage(file);
    };
    return {
      selectImage,
      previewImage,
      imageFile
    };
  },
});
</script>
