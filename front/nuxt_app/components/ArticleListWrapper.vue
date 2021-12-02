<template>
  <main class="flex justify-center p-10 bg-cBlueGray border border-concreteGray">
    <div class="flex items-start justify-center w-full m-0">
      <articleListNav />
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
