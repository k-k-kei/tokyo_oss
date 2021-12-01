<template>
  <!-- t-settings -->
  <main class="flex justify-center p-10 bg-cBlueGray border border-concreteGray">
    <!-- t-settings-inner -->
    <div class="flex items-start justify-center w-full max-w-screen-xl m-0">
      <!-- t-settings-nav -->
      <!-- <div class="flex-1 max-w-max mr-8"> -->
        <!-- t-settings-sidebar__head -->
        <!-- <h1 class="flex items-center justify-between mb-6"> -->
          <!-- t-settings-sidebar__title -->
          <!-- <div class="text-xl font-bold w-40 leading-6">
            記事
          </div>
        </h1> -->
        <!-- m-settings-sidebar__nav -->
        <!-- <nav aria-label="記事" class="w-full"> -->
          <!-- t-settings-sidebar__list -->
          <!-- <ul class="w-full pb-4 mb-4"> -->
            <!-- m-settings-sidebar__item -->
            <!-- <li data-is-current="true" class="before:absolute before:mt-0 -ml-4 before:block before:w-0.5 before:h-full before:bg-black relative z-0 flex items-center w-full h-full py-2 px-0 text-base"> -->
              <!-- m-settings-sidebar__link -->
              <!-- <a href="/notes" aria-current="page" class="relative z-0 flex items-center w-full pl-4 font-bold">
                自分の記事
              </a>
            </li>
            <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
              <a href="/notes/recommend" class="relative z-0 flex items-center w-full">
                オススメした
              </a>
            </li>
            <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
              <a href="/notes/liked" class="relative z-0 flex items-center w-full">
                スキした
              </a>
            </li>
            <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
              <a href="/notes/viewd" class="relative z-0 flex items-center w-full">
                最近みた
              </a>
            </li>
          </ul> -->
        <!-- </nav>
      </div> -->
      <!-- t-settings-center -->
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
