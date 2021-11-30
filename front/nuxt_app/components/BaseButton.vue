<template>
    <NuxtLink :to="link">
        <button @click="buttonEvent" class="bg-cAcc rounded">
            <div class="text-cBase px-4 py-2 text-xs md:text-sm">
                <span>{{ title }}</span>
            </div>
        </button>
    </NuxtLink>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
        type: String,
        required: true
    },
    link:{
        type: String,
        default: '/'
    }
  },
  emits:['buttonEvent'],
  setup(props, { emit }) {
    const { title } = toRefs(props)
    const { link } = toRefs(props)

    const buttonEvent = () =>{
        emit('buttonEvent')
    }

    return {
      title, link, buttonEvent
    }
  },
})
</script>
