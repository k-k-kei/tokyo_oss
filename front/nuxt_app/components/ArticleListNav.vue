<template>
  <nav aria-label="記事" class="max-w-max mr-4">
    <h1 class="text-xl font-bold w-40 leading-6 mt-2 mb-4">
      記事
    </h1>
    <ul class="w-full pb-4 mb-4">
      <li data-is-current="true" class="before:absolute before:mt-0 -ml-4 before:block before:w-0.5 before:h-full before:bg-black relative z-0 flex items-center w-full h-full py-2 px-0 text-base">
        <a href="/notes" aria-current="page" class="relative z-0 flex items-center w-full pl-4 font-bold">
          すべて
        </a>
      </li>
      <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
        <a href="/notes_public" class="relative z-0 flex items-center w-full">
          公開中
        </a>
      </li>
      <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
        <a href="/notes_draft" class="relative z-0 flex items-center w-full">
          下書き
        </a>
      </li>
    </ul>
    <hr>
    <h1 class="text-xl font-bold w-40 leading-6 mt-8 mb-4">
      設定
    </h1>
    <ul class="w-full pb-4 mb-4">
      <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
        <a href="/profileEdit" class="relative z-0 flex items-center w-full">
          プロフィール
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {

  }
})
</script>
