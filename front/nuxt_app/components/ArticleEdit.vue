<template>
  <div class="min-h-screen flex flex-col">
    <BaseInputImage @saveImageFile="getImageFile" />
    <div class="text-center mx-8 my-8">
      <input type="text" class="w-full text-center text-2xl font-bold focus:outline-none" placeholder="記事タイトル" v-model="mainTitle">
    </div>
    <div id="editorjs" class="mx-8 mt-4 tracking-wider"></div>
    <div class="text-center">
      <base-button :title="buttonTitle" :link="buttonLink" @buttonEvent="save" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from '@nuxtjs/composition-api'
import firebase from '../plugins/firebase'
import { db, storage, auth } from "../plugins/firebase";

import EditorJS from "@editorjs/editorjs";

// importするとtypescriptの型エラーが出るからやむなくrequire 普通はimportするべき
const Header    = require("@editorjs/header");
const Table     = require('@editorjs/table');  // tableはnested arrayなのでfirestoreがエラー起こす！
const List      = require("@editorjs/list");
const ImageTool = require("@editorjs/image");

// ボタンのコンポーネントに渡す変数
const buttonLink = "/edit"
const buttonTitle = "SAVE"

// input len : Number
// return String charsからなるlen桁の文字列
const genId = (len:Number):String => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return [...Array(len)].reduce((a:any, b:any, i:any) => {
    return a + chars.charAt(Math.floor(Math.random() * chars.length))
  }, "")
}

export default defineComponent({
  setup() {
    const data:any = reactive({
      editor: undefined,
      title: "",
      mainText: "",
      interval_handler: undefined,
      post_id: undefined,
      mainImageUrl: "",
    })
    
    const mainTitle = ref("")
    //子コンポーネントでアップロードした画像をimageFileに格納する
    const imageFile:any = ref("");
    let uid = ""

    const init = ():void => {
      // Editor.jsの初期化
      data.editor = new EditorJS({
        //Editor.jsの対象にするidを与える
        holder: "editorjs",
        tools: { 
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4],
              defaultLevel: 3
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          image: {
            class: ImageTool,
            config: {
              uploader:{
                async uploadByFile(file:File){
                  const metadata = {contentType: "image/jpeg"}
                  const uploadTask = await storage.ref().child(file.name).put(file, metadata)                  
                  const downloadURL = await uploadTask.ref.getDownloadURL()
                  return {
                    success: 1,
                    file: {url: downloadURL},
                  }
                },
              },  
            },
          }
        }, 
      });
    }

    const save = async () => {
      // 普通にcurrentUserでユーザー情報とれた
      const user = auth.currentUser
      if(user) uid = user.uid
      // editor部分をsaveするメソッド
      data.editor
        .save()
        .then(async (outputData:any) => {
          const tmpObj = {
            isPublic : true,
            title    : mainTitle.value,
            mainImage: "",
            docId    : "",
            uid      : uid
          }
          await saveStorage(imageFile.value)
          tmpObj.mainImage = data.mainImageUrl
          console.log(tmpObj)
          const articleData = Object.assign(outputData, tmpObj)
          console.log("saved on firestore!! :", articleData)
          db.collection('memo').add(articleData)
        })
        .then((error: any) => {
          console.log(error)
        })
    }


    const getImageFile = (file:File) => {
      imageFile.value = file;
      console.log(imageFile.value);
    }
    //アップロードした画像をstorageとfirestoreに保存する関数
    const saveStorage = async (file:File) => {
      //乱数を生成して保存する画像名の重複を防ぐ
      //storageに画像を保存
      const storageRef = storage.ref().child(genId(8) + "_" + file.name);
      console.log(storageRef);

      //保存した画像のstorageパスを取得して任意のfirestoreドキュメントに保存
      const uploadTask  = await storageRef.put(file)
      const downloadUrl = await uploadTask.ref.getDownloadURL()
      data.mainImageUrl = downloadUrl
    };

    onMounted(() => {
      init()
    })

    return {
      data,
      mainTitle,
      buttonLink,
      buttonTitle,
      save,
      getImageFile,
      saveStorage,
    }
  },
})
</script>

<style>
h1.ce-header {
    font-size: 2rem;
    font-weight: bold;
}
h2.ce-header {
    font-size: 1.8rem;
    font-weight: bold;
}
h3.ce-header {
    font-size: 1.6rem;
    font-weight: bold;
}
h4.ce-header {
    font-size: 1.4rem;
    font-weight: bold;
}
h5.ce-header {
    font-size: 1.2rem;
    font-weight: bold;
}
h6.ce-header {
    font-weight: bold;
}

.cdx-input.image-tool__caption {
    font-size: 0.75rem;
}

</style>