<template class="bg-cWhite">
  <ArticleEdit :id="route"/>
</template>

<script lang="ts">
import { ref, defineComponent, useRoute, onMounted } from "@nuxtjs/composition-api";

export default defineComponent({
  middleware: 'authCheck',
  setup(){
    const route = useRoute()
  },
})
</script>
