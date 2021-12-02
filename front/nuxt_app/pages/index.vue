<template>
  <layout-top-wrapper>
    <div>
      <BaseCard :cards="memos" />
    </div>
  </layout-top-wrapper >
</template>

<script lang="ts">

import { defineComponent, reactive, ref, onMounted } from '@nuxtjs/composition-api'
import { db, storageRef, auth } from "../plugins/firebase";

export default defineComponent({
  setup() {

    const memos = ref<any[]>([])

    onMounted(() => {
        db.collection("memo")
        .where('isPublic', '==', true)
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            const dataObj = Object.assign(doc.data(), {id:doc.id});
            memos.value.push(dataObj)
            memos.value.sort((memo1, memo2) => memo1.time > memo2.time ? -1 : 1)
          });
        });
    });

    return {
      memos
    }
  },
})
</script>
