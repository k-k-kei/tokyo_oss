<template>
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
import { ref, defineComponent, toRefs, onMounted } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    imageUrl: {
        type: String,
        required: false
    },
  },
  setup(props, context) {

    const { imageUrl } = toRefs(props)
    //アップロードした画像をプレビュー表示するための変数
    const previewImage:any = ref([]);
    const imageFile = ref([]);
        
    const sendToParent = () => {
      context.emit("saveImageFile", imageFile.value);
    }

    //アップロードボタンを押したら発火する関数
    const selectImage = (e:any) => {
      // inputからfileデータを取得
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // アップロードした画像をプレビューで表示するために配列の値を変更
      reader.onload = (e:any) => {
        previewImage.value = [e.target.result]
        console.log(previewImage.value)
      };

      imageFile.value = file;
      sendToParent();
    };

    onMounted(() => {
      setTimeout(() =>
        previewImage.value = [imageUrl.value]
      , 1000)
    })

    return {
      selectImage,
      previewImage,
      imageFile
    };
  },
});
</script>
