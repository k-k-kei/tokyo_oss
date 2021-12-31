<template>
    <div class="flex flex-col md:grid md:grid-cols-4 md:gap4 2xl:grid-cols-6">
      <div v-for="memo in cards" :key="memo.id" class="w-full flex flex-col mx-auto pt-4 pb-2 border-b-2 md:border-b-0 px-4">
        <NuxtLink :to="'/articles/' + memo.id ">
            <div v-if="memo.mainImage" class="w-full">
                <img class="max-w-full object-cover h-44 rounded-md mx-auto" :src="memo.mainImage" :alt="memo.title">
            </div>
            <div v-else class="w-full">
                <img class="max-w-full object-cover h-44 rounded-md mx-auto" src="/images/sotoburo.png" :alt="memo.title">
            </div>
            <div class="mt-2">
                <h2 class="text-lg text-cMain tracking-wider font-bold line-clamp-2">{{ memo.title }}</h2>
            </div>
            <div class="mt-2">
                <h3 class="text-base text-cGray tracking-wider line-clamp-2 md:line-clamp-2">{{ memo.blocks[0].data.text }}</h3>
            </div>

            <div v-if="memo.like" class="mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cPink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-sm text-cPink ml-1 tracking-wider line-clamp-2 md:line-clamp-4">{{ memo.like }}</span>
            </div>
            <div v-else class="mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cPink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-sm text-cPink ml-1 tracking-wider line-clamp-2 md:line-clamp-4">{{ likeNum }}</span>
            </div>

            <div class="mt-2">
                <div class="flex items-center">
                  <div v-if="memo.icon">
                    <img class="max-w-full w-8 rounded-full" :src="memo.icon" :alt="editorImage">
                  </div>
                  <div v-else>
                    <img class="max-w-full w-8 rounded-full" :src="editorImage" :alt="editorImage">
                  </div>

                  <div class="flex flex-col ">
                    <div v-if="memo.author" class="text-xs text-cGray pl-2">
                      <p>{{ memo.author }}</p>
                    </div>
                    <div v-else class="text-xs text-cGray pl-2">
                      <p>{{ editorName }}</p>
                    </div>

                    <div class="text-xs text-cGray pl-2">
                      <p>{{ changeDate(memo.time) }}</p>
                    </div>
                  </div>

                </div>
            </div>
        </NuxtLink>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import changeDate from '../composable/changeDate'

export default defineComponent({
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const cardNum = computed(() => props.cards.length)
    const likeNum = 0
    const editorImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    const editorName = "No Name"

    return {
      cardNum, likeNum, editorImage, editorName, changeDate
    }
  },
})
</script>
