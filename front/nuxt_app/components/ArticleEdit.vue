<template>
  <div class="min-h-screen flex flex-col">
    <BaseInputImage @saveImageFile="getImageFile" :imageUrl="data.mainImageUrl"/>
    <div class="text-center mx-8 my-8">
      <input type="text" class="w-full text-center text-2xl font-bold focus:outline-none" placeholder="記事タイトル" v-model="data.title">
    </div>
    <div class="flex justify-center text-4xl mx-8 my-8">
      <div v-if="evaluation == '5'" class="m-4">😆</div>
      <div v-else class="opacity-50 m-4" @click="evalPlace(5)">😆</div>
      <div v-if="evaluation == '4'" class="m-4">😀</div>
      <div v-else class="opacity-50 m-4" @click="evalPlace(4)">😀</div>
      <div v-if="evaluation == '3'" class="m-4">🙂</div>
      <div v-else class="opacity-50 m-4" @click="evalPlace(3)">🙂</div>
      <div v-if="evaluation == '2'" class="m-4">😕</div>
      <div v-else class="opacity-50 m-4" @click="evalPlace(2)">😕</div>
      <div v-if="evaluation == '1'" class="m-4">😞</div>
      <div v-else class="opacity-50 m-4" @click="evalPlace(1)">😞</div>
    </div>
    <div id="editorjs" class="mx-8 mt-4 tracking-wider"></div>
    <div class="text-center">
      <base-button :title="buttonTitle1" :link="buttonLink1" @buttonEvent="save(true)" />
      <base-button :title="buttonTitle2" :link="buttonLink2" @buttonEvent="save(false)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, useRoute } from '@nuxtjs/composition-api'
import firebase from '../plugins/firebase'
import { db, storage, auth } from "../plugins/firebase";

import EditorJS from "@editorjs/editorjs";

// importするとtypescriptの型エラーが出るからやむなくrequire 普通はimportするべき
const Header    = require("@editorjs/header");
const Table     = require('@editorjs/table');  // tableはnested arrayなのでfirestoreがエラー起こす！
const List      = require("@editorjs/list");
const ImageTool = require("@editorjs/image");

// ボタンのコンポーネントに渡す変数
const buttonLink1 = "/"
const buttonTitle1 = "SAVE"
const buttonLink2 = "/"
const buttonTitle2 = "DRAFT"

// input len : Number
// return String charsからなるlen桁の文字列
const genId = (len:Number):String => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return [...Array(len)].reduce((a:any, b:any) => {
    return a + chars.charAt(Math.floor(Math.random() * chars.length))
  }, "")
}

export default defineComponent({
  setup() {
    const data:any = reactive({
      editor: undefined,
      author: undefined,
      title: "",
      mainText: "",
      interval_handler: undefined,
      post_id: undefined,
      mainImageUrl: "",
    })
    const evaluation = ref("3")
    const route = useRoute()

    const id = ref("")
    const mainTitle = ref("")
    const imageFile:any = ref("");
    let uid = ""

    const init = (article:any):void => {
      data.title        = article.title
      data.mainImageUrl = article.mainImage
      data.author       = article.author
      evaluation.value  = article.evaluation
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
        data:{
          time:article.time,
          version:article.version,
          blocks:article.blocks
        },
      });
    }

    const save = async (bool:boolean) => {
      // 普通にcurrentUserでユーザー情報とれた
      const user = auth.currentUser
      if(user) uid = user.uid

      if(!data.author){
        await db.collection('users').doc(uid).get()
        .then((user) => {
          console.log(user.data())
          data.author = user.data().name
        })
      }
      // editor部分をsaveするメソッド
      data.editor.save()
        .then(async (outputData:any) => {
          const tmpObj = {
            isPublic : bool,
            title    : data.title,
            mainImage: "",
            uid      : uid,
            like     : 0,
            lat      : "",
            lng      : "",
            author   : data.author,
            icon     : "",
            evaluation : evaluation.value,
          }
          console.log(tmpObj)
          if(imageFile.value !== ""){
            await saveStorage(imageFile.value)
            tmpObj.mainImage = data.mainImageUrl
          } 

          const articleData = Object.assign(outputData, tmpObj)

          if(id.value){
            console.log("aaa", articleData)
            db.collection('memo').doc(id.value).set(articleData)
            console.log("update your article!! :", articleData)
          }else{
            console.log("bbb", articleData)
            db.collection('memo').add(articleData)
            console.log("saved on firestore!! :", articleData)
          }
        })
        .then((error: any) => {
          console.log(error)
        })
    }

    const getFireArticle = async (docId:string) => {
      if(docId){
        const data = await db.collection('memo').doc(docId).get()
        return data.data()
      }
    }

    const getImageFile = (file:File) => {
      imageFile.value = file;
    }
    //アップロードした画像をstorageとfirestoreに保存する関数
    const saveStorage = async (file:File) => {
      //乱数を生成して保存する画像名の重複を防ぐ
      //storageに画像を保存
      const storageRef = storage.ref().child(genId(8) + "_" + file.name);

      //保存した画像のstorageパスを取得して任意のfirestoreドキュメントに保存
      const uploadTask  = await storageRef.put(file)
      const downloadUrl = await uploadTask.ref.getDownloadURL()
      data.mainImageUrl = downloadUrl
    };

    const evalPlace = (num:number) => {
      evaluation.value = String(num)
    }

    onMounted(async () => {
      id.value = route.value.params.id
      const myArticle = await getFireArticle(id.value)

      if(myArticle){
        data.mainImage = myArticle.mainImage
        init(myArticle)
      } else {
        init({})
      }
    })

    return {
      data,
      mainTitle,
      buttonLink1,
      buttonLink2,
      buttonTitle1,
      buttonTitle2,
      save,
      getImageFile,
      saveStorage,
      id, 
      route, 
      evalPlace,
      evaluation
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
