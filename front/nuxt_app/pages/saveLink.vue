<template>
  <div>
      <TheSaveArticleLink />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "@nuxtjs/composition-api";
import TheSaveArticleLink from '../components/TheSaveArticleLink.vue'
import Input from '../components/Input.vue'

export default defineComponent({
  setup() {

      return{
          TheSaveArticleLink,
          Input
      }
  },
});
</script>
