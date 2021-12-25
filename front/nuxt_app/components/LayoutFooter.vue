<template>
  <footer id="footer" class="flex justify-center bg-cBase pt-6 md:pt-10 pb-20 md:pb-8 md:w-full">
    <div class="space-y-3 w-4/5">
      <div class="block text-cGray text-center leading-8">
        <Nuxt-link to="/" class="hover:text-cMain">
          ホーム
        </nuxt-link>
        ｜
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScTc50sPg9_7MUi1fioy8R5PvIIHLiln-cxcnvs2rncR6oeAw/viewform" class="hover:text-cMain">お問い合わせ</a>
      </div>
      <div class="block">
        <p
          class="text-center text-cMain text-sm font-bold leading-relaxed"
        >
          Copyright © 2021 GsFRIENDS
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup () {

  }
})
</script>
