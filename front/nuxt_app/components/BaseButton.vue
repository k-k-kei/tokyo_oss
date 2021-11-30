<template>
    <NuxtLink :to="buttonLink">
        <button @click="buttonEvent" class="bg-cAcc rounded">
            <div class="text-cBase px-4 py-2 text-xs md:text-sm">
                <span>{{ buttonTitle }}</span>
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

    const buttonTitle = title.value
    const buttonLink = link.value

    const buttonEvent = () =>{
        emit('buttonEvent')
    }

    return {
      buttonTitle, buttonLink, buttonEvent
    }
  },
})
</script>
