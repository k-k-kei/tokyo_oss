<template>
    <div id="wrapper" class="wrapper bg-cBase min-h-screen">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {

    },
})
</script>

<style scoped>

.wrapper{
    @media(min-width: 768px){
        padding-top: 0;
        margin:0;
    }
}

</style>