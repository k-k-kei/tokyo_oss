<template>
  <main class="flex justify-center p-10 bg-cBlueGray border border-concreteGray">
    <div class="flex items-start justify-center w-full m-0">
      <nav aria-label="記事" class="max-w-max mr-2">
        <h1 class="text-xl font-bold w-40 leading-6 mb-8">
          記事
        </h1>
        <ul class="w-full pb-4 mb-4">
          <li data-is-current="true" class="before:absolute before:mt-0 -ml-4 before:block before:w-0.5 before:h-full before:bg-black relative z-0 flex items-center w-full h-full py-2 px-0 text-base">
            <a href="/notes" aria-current="page" class="relative z-0 flex items-center w-full pl-4 font-bold">
              自分の記事
            </a>
          </li>
          <!-- <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
              <a href="/notes/recommend" class="relative z-0 flex items-center w-full">
                お気に入り
              </a>
            </li>
            <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
              <a href="/notes/viewd" class="relative z-0 flex items-center w-full">
                最近みた
              </a>
            </li> -->
        </ul>
      </nav>
      <!-- ArticleListを表示 -->
      <div>
        <slot />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup () {

  }
})
</script>
