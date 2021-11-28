<template>
  <div>
    <input type="text" class="border-2 border-cGray rounded mx-auto" placeholder="title">
    <div>
      <div id="editorjs"></div>
    </div>
    <div>
      <button @click="save">SAVE</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from '@nuxtjs/composition-api'

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from '@editorjs/table';  // tableはnested arrayなのでfirestoreがエラー起こす！
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import db from "../plugins/firebase";
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
              endpoints: {
                byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
              }
            },
          },

        }, 
      });
    }

  const save = ():void => {
    data.editor
      .save()
      .then((outputData:any) => {

        // firestoreでnested arrayがサポート外なので
        // data.contentを多重配列 => オブジェクト配列に変換
        outputData.blocks.forEach(block => {
          if(block.data.content){
            block.data.content = block.data.content.map(el => {
              return el.reduce((a,b,i) => {
                a[i] = b
                return a
              },{})
            }) 
          }
        })

        console.log("saved on firestore!! :", outputData)
        db.collection('memo').add(outputData)
      })
  }

    onMounted(() => {
      init()
    })

    return {
      data,
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