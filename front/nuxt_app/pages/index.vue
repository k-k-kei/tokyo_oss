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
        .orderBy('time', 'desc')
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            const dataArray = doc.data();
            memos.value.push(dataArray)
          });
        });
    });
    return {
      memos
    }
  },
})
</script>
