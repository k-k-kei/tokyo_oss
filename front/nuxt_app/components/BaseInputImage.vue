<template>
  <!-- <BaseInputImage /> -->
  <div>
    <img v-if="previewImage[0]" :src="previewImage[0]" :alt="imageFile" class="max-w-full w-full object-cover h-44 md:w-2/4 md:h-96 md:mx-auto" />
    <div v-if="imageFile == ''">
      <label
        class="
          w-full
          flex flex-col
          items-center
          px-4
          py-6
          bg-cBase
          cursor-pointer
          text-cGray
          ease-linear
          transition-all
          duration-150
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cGray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <span class="mt-2 text-base  text-cGray font-semibold leading-normal">画像を選択</span>
        <input type="file" class="hidden" @change="selectImage" />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "@nuxtjs/composition-api";
import firebase from "firebase";


//アップロードした画像をstorageとfirestoreに保存する関数
const saveStorage = (file:File) => {
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
  setup(props, context) {
    //アップロードした画像をプレビュー表示するための変数
    const previewImage:any = ref([]);
    const imageFile = ref([]);

    const sendToParent = () => {
      context.emit("saveImageFile", imageFile);
    }


    //アップロードボタンを押したら発火する関数
    const selectImage = (e:any) => {
      // inputからfileデータを取得
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // アップロードした画像をプレビューで表示するために配列にpush
      reader.onload = (e:any) => {
        previewImage.value.push(e.target.result);
      };

      imageFile.value = file.name;
      sendToParent();
      // saveStorage(file);
    };
    return {
      selectImage,
      previewImage,
      imageFile,
    };
  },
});
</script>
