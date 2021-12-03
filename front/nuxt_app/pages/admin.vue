<template>
    <div>
      <InfoList :articles="data.memos" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import { db } from '../plugins/firebase'

export default defineComponent({
    middleware: 'adminCheck',
    setup() {
        const data:any = reactive({
            memos:[]
        })
        
        const getMemos = async (memos:any = []) => {
            await db.collection('memo').get()
                .then((querySnapshot:any) => {
                    querySnapshot.forEach((doc:any) => {
                        memos.push(Object.assign(doc.data(), {id:doc.id}))
                    })
                })
            return memos
        }
        onMounted(async () => {
            data.memos = await getMemos()
        })

        return { 
            data
        }
    },
})
</script>
