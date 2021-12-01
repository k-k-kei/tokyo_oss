<template>
  <div class="min-h-screen flex flex-col">
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
import firebase from 'firebase'
import { db, storage, auth } from "../plugins/firebase";

import EditorJS from "@editorjs/editorjs";

// importするとtypescriptの型エラーが出るからやむなくrequire 普通はimportするべき
const Header    = require("@editorjs/header");
const Table     = require('@editorjs/table');  // tableはnested arrayなのでfirestoreがエラー起こす！
const List      = require("@editorjs/list");
const ImageTool = require("@editorjs/image");
//   import axios from "axios";
//   import qs from "qs";

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

//アップロードした画像をstorageとfirestoreに保存する関数
const saveStorage = (file:File) => {
  //乱数を生成して保存する画像名の重複を防ぐ
  //storageに画像を保存
  const storageRef = storage.ref(`images/${genId(8)}_${file.name}`);
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
    const data:any = reactive({
      editor: undefined,
      title: "",
      mainText: "",
      interval_handler: undefined,
      post_id: undefined,
    })
    
    const mainTitle = ref("")
    let uid = ""

    const init = ():void => {
      // auth.onAuthStateChanged((user) => {
      //   if(user){
      //     console.log(user.uid)
      //     uid.value = user.uid
      //   }
      // })
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
          // tableはiOS用のeditorjs が対応してないので不使用
          // table: {
          //   class: Table,
          //   inlineToolbar: true,
          //   config: {
          //     rows: 3,
          //     cols: 3,
          //   },
          // },
          image: {
            class: ImageTool,
            config: {
              uploader:{
                async uploadByFile(file:File){
                  const metadata = {
                    contentType: "image/jpeg"
                  }

                  const uploadTask = await storage.ref().child(file.name).put(file, metadata)
                  console.log("Uploaded !", uploadTask)
                  
                  const downloadURL = await uploadTask.ref.getDownloadURL()
                  console.log(downloadURL)

                  return {
                    success: 1,
                    file: {
                      url: downloadURL,
                    },
                  }
                },
              },  
            },
          }
        }, 
      });
    }

    const save = ():void => {

      // 普通にcurrentUserでユーザー情報とれた
      const user = auth.currentUser
      if(user) uid = user.uid

      // editor部分をsaveするメソッド
      data.editor
        .save()
        .then((outputData:any) => {
          const tmpObj = {
            isPublic : true,
            title    : mainTitle.value,
            mainImage: "https://aaa",
            docId    : "",
            uid      : uid
          }

          // table使わないためコメントアウト
          // // firestoreでnested arrayがサポート外なので
          // // data.contentを多重配列 => オブジェクト配列に変換
          // outputData.blocks.forEach((block:any) => {
          //   if(block.data.content){
          //     block.data.content = block.data.content.map((el:any) => {
          //       return el.reduce((a:any, b:any, i:number) => {
          //         a[i] = b
          //         return a
          //       },{})
          //     }) 
          //   }
          // })

          const articleData = Object.assign(outputData, tmpObj)

          console.log("saved on firestore!! :", articleData)
          db.collection('memo').add(articleData)
            // .then((docRef) => db.collection('memo').doc(docRef.id).update({docId:docRef.id}))
        })
        .then((error: any) => {
          console.log(error)
        })
    }


    onMounted(() => {
      init()
    })

    return {
      data,
      mainTitle,
      buttonLink,
      buttonTitle,
      save
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