<template>
    <div>
        <div v-for="(text, index) in texts" :key="index">{{ text }}</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from '@vue/composition-api'
import db from '~/plugins/firebase';

export default defineComponent({
    setup() {
        const texts = ref<Array<String>>([]);;

        onMounted(() => {
            db.collection("memo").get().then((querySnapshot: any) => {
                querySnapshot.forEach((doc: any) => {
                    console.log(doc.data().text);
                    texts.value.push(doc.data().text);
                })
            })
        })

        return{
            texts
        }
        
    },
})
</script>
