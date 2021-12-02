<template>
  <div>
    <p class="text-lg font-semibold">  {{ inputTitle }} </p>
    <input
      class="block text-gray-700 p-1 m-4 ml-0 mt-1 w-full rounded text-lg font-normal placeholder-gray-300"
      :type="typeName"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      autocomplete="on"
      list="handicap"
    />
    <datalist id="handicap">
      <option  v-for="(handicap,i) in handicaps" :key="i">{{ handicap }}</option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from '@vue/composition-api'

export default defineComponent({
    props:{
      typeName   : String as PropType<string | undefined>,
      inputTitle : String as PropType<string | undefined>,
      handicaps  : Array
    },
    emit:['update:modelValue','change'],
    setup() {
        const handicaps = ["a", "b", "c"]
      return{
        handicaps
      }
    },
})
</script>
