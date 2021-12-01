<template class="bg-cWhite">
  <ArticleEdit/>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "@nuxtjs/composition-api";

export default defineComponent({
  middleware: 'authCheck',
})
</script>
