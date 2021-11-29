<template>
    <div>
        <img :src="previewImage[0]" alt="">
        <input type="file" @change="selectImage">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
    //アップロードした画像をプレビュー表示するための変数
    const previewImage = ref([]);


    //アップロードボタンを押したら発火する関数
    const selectImage = (e) => {
      // inputからfileデータを取得
      const file = e.target.files[0];
      const reader = new FileReader();

      const maxWidth = 720;
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        // 取得したイメージのサイズを判定する。
        // 指定した最大サイズ以上であればサイズを比率を保ったまま縮小。
        let img = new Image();

        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          // canvasを作成して指定したサイズでアップロード画像を当てはめる
          let canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // canvasの画像をfileに変換、保存先に送付するために変数に格納する
          ctx.canvas.toBlob((blob) => {
            console.log(blob)
              const imageFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                const mainImage = imageFile;
                console.log(mainImage)
            }, file.type, 1);

        };

        // アップロードした画像をプレビューで表示するために配列にpush
        previewImage.value.push(e.target.result);
      };
    }

    return{
        selectImage,
        previewImage
    }
    },
})
</script>
