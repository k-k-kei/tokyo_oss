<template>
    <header id="header" class="pt-8 pb-4 flex justify-around md:justify-between items-center">
        <div class="flex justify-center items-center md:pl-4">
          <img src="/images/logo.png" alt="ソトブロ" class="w-8 md:w-12">
          <span
            class="text-center text-xs md:text-xl ml-1 font-bold leading-relaxed font-sans"
          >
            外に出たくなるブログ
          </span>
        </div>
        <div class="flex items-center md:pr-4">
          <Nuxt-link to="/edit"><p class="text-cGray text-xs md:text-sm mr-2 font-semibold">ログイン</p></Nuxt-link>
          <base-button :title="buttonTitle" :link="buttonLink" />
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const buttonTitle = ref('会員登録')
    const buttonLink = ref('/edit/')

    return{
      buttonTitle, buttonLink
    }
  },
})
</script>