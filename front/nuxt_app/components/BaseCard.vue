<template>
    <ul>
        <li v-for="card in cards" :key="card.id">
    <div class="flex-shrink-0 w-40 md:w-52 xl:w-64 mr-3">
        <NuxtLink :to="'/' + card.id + '/'">
            <div class="w-full">
                <img class="max-w-full" :src="`https://i.ytimg.com/vi/${card.img}/mqdefault.jpg`" :alt="card.title">
            </div>
            <div class="mt-2">
                <h2 class="text-sm text-cMain tracking-wider line-clamp-2 md:line-clamp-4">{{ card.title }}</h2>
            </div>
            <div class="mt-2">
                <h2 class="text-sm text-cMain tracking-wider line-clamp-2 md:line-clamp-4">{{ card.text }}</h2>
            </div>
            <div class="mt-2">
                <h2 class="text-sm text-cMain tracking-wider line-clamp-2 md:line-clamp-4">{{ card.created }}</h2>
            </div>
            <div class="mt-2">
                <h2 class="text-sm text-cMain tracking-wider line-clamp-2 md:line-clamp-4">{{ card.like }}</h2>
            </div>
        </NuxtLink>
    </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const cardNum = computed(() => props.cards.length)
    return {
      cardNum
    }
  },
})
</script>
