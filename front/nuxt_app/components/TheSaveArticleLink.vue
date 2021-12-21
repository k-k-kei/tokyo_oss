<template>
  <div>
      <label>リンク</label>
      <input type="text" class="border" v-model="link" @change="inputLink" />
      <button class="bg-gray-300 p-1" @click="saveLink">保存</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "@nuxtjs/composition-api";
import { db } from '../plugins/firebase'

export default defineComponent({
  setup() {
    const link = ref("");

    const inputLink = (value: any) => {
          link.value = value.target.value;
    }

    const saveLink = () => {
        db.collection("links").add({link: link.value});
        clearText();
    }

    const clearText = () => {
        link.value = "";
    }
    
    
    return{
        link,
        inputLink,
        saveLink
    }
  }
});
</script>
