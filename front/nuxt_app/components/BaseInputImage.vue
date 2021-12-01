<template>
  <!-- <BaseInputImage /> -->
  <div>
    {{ imageFile }}
    <img :src="previewImage[0]" alt="" />
    <input type="file" @change="selectImage" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    imageUrl: {
        type: String,
        required: false
    },
  },
  setup(props, context) {
    //アップロードした画像をプレビュー表示するための変数
    const previewImage = ref([]);
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
      };

      imageFile.value = file;
      sendToParent();
    };
    return {
      selectImage,
      previewImage,
      imageFile,
    };
  },
});
</script>
