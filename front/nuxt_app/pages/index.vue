<template>
  <layout-top-wrapper>
    <div>
      <BaseCard :cards="data.cards" />
    </div>
  </layout-top-wrapper >
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const data = reactive({
      cards: [
        { id: 1, img:"yvT7lAAA_aI", title: 'hoge', text:"hogehoge", created:"2021.2.2", like:43 },
        { id: 2, img:"YMtYYGyHVRg", title: 'foo', text:"foo!", created:"2021.3.3", like:33 },
        { id: 3, img:"4ycP_uEBjJM", title: 'bar', text:"bar!", created:"2021.4.4", like:44 },
      ],
    })
    return {
      data
    }
  },
})
</script>
