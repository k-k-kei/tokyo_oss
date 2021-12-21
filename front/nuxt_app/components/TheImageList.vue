<template>
  <div>
    <div v-for="text in data" :key="text.id">
      <div class="border rounded shadow">
        <img :src="text.data.file.url" alt="挿入画像" />
        <p class="text-center text-sm text-cGray p-2">
          {{ text.data.caption }}
        </p>
      </div>
      <div>
        <p :class="textStyle(text.type)">
          {{ text.data.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {},
});
</script>
