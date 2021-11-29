<template>
  <!-- t-settings -->
  <main class="flex justify-center p-10 bg-cBlueGray  border border-concreteGray">
    <!-- t-settings-inner -->
    <div class="flex items-start justify-center w-full max-w-screen-xl m-0">
      <!-- t-settings-nav -->
      <div class="flex-1 max-w-max mr-8">
        <!-- t-settings-sidebar__head -->
        <h1 class="flex items-center justify-between mb-6">
          <!-- t-settings-sidebar__title -->
          <div class="text-xl font-bold leading-6">
            記事
          </div>
        </h1>
        <!-- t-settings-sidebar__list -->
        <div>
          <ul>
            <li data-is-current="true" class="relative z-auto flex items-center w-full py-2 text-base">
              自分の記事
            </li>
            <li class="relative z-auto flex items-center w-full py-2 text-base">
              オススメした
            </li>
            <li class="relative z-auto flex items-center w-full py-2 text-base">
              スキした
            </li>
            <li class="relative z-auto flex items-center w-full py-2 text-base">
              購入した
            </li>
            <li class="relative z-auto flex items-center w-full py-2 text-base">
              最近みた
            </li>
          </ul>
        </div>
      </div>
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
