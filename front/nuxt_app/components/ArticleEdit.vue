<template>
  <div>
    <input type="text" class="border-2 border-cGray rounded mx-auto" placeholder="title" v-model="mainTitle">
    <div>
      <div id="editorjs"></div>
    </div>
    <div>
      <base-button :title="buttonTitle" :link="buttonLink" @buttonEvent="save" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from '@nuxtjs/composition-api'

import firebase from "../plugins/firebase";
import { db, storageRef, auth } from "../plugins/firebase";

// import firebase from '../plugins/firebase';
// import "firebase/auth"

import EditorJS from "@editorjs/editorjs";

// importするとtypescriptの型エラーが出るからやむなくrequire 普通はimportするべき
const Header    = require("@editorjs/header");
const Table     = require('@editorjs/table');  // tableはnested arrayなのでfirestoreがエラー起こす！
const List      = require("@editorjs/list");
const ImageTool = require("@editorjs/image");
//   import axios from "axios";
//   import qs from "qs";

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
    // const ptRef = storageRef.child("66f1fa1daabd518d54e3b148b309dc10--mario-nintendo-super-nintendo.jpg")
    // const ptImageRef = storageRef.child("images/66f1fa1daabd518d54e3b148b309dc10--mario-nintendo-super-nintendo.jpg")
    const buttonLink = "/edit"
    const buttonTitle = "SAVE"

    const init = ():void => {
      const user = auth.currentUser
      console.log(user)
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
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 3,
              cols: 3,
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader:{
                async uploadByFile(file:File){
                  const metadata = {
                    contentType: "image/jpeg"
                  }

                  const uploadTask = await storageRef.child(file.name).put(file, metadata)
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
        // console.log(ptRef.name)
        // console.log(ptImageRef.fullPath)
        // console.log(mainTitle.value)
      data.editor
        .save()
        .then((outputData:any) => {
          outputData["public"] = true
          outputData["title"]  = mainTitle.value
          outputData["mainImage"] = "https://firebasestorage.googleapis.com/v0/b/tokyo-oss-ad760.appspot.com/o/66f1fa1daabd518d54e3b148b309dc10--mario-nintendo-super-nintendo.jpg?alt=media&token=4aa4cf8a-4167-4a76-a8bd-b93144e229cb"

          // firestoreでnested arrayがサポート外なので
          // data.contentを多重配列 => オブジェクト配列に変換
          outputData.blocks.forEach((block:any) => {
            if(block.data.content){
              block.data.content = block.data.content.map((el:any) => {
                return el.reduce((a:any, b:any, i:number) => {
                  a[i] = b
                  return a
                },{})
              }) 
            }
          })

          console.log("saved on firestore!! :", outputData)
          db.collection('memo').add(outputData)
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

</style>