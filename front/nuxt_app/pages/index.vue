<template>
  <layout-top-wrapper>
    <div id="tab" class="bg-white">
      <ul class="flex flex-row">
        <li class="text-cGray text-sm font-semibold py-2 px-6 block border-b-2 border-b-cWhite hover:border-cBlack focus:border-cBlack" @click="isSelect('1')">
          ホーム
        </li>
        <li class="text-cGray text-sm font-semibold py-2 px-6 block border-b-2 border-b-cWhite hover:border-cBlack focus:border-cBlack" @click="isSelect('2')">
          注目記事
        </li>
      </ul>
    </div>
    <div class="tabContents border-t-2 border-t-gray md:border-t-white lg:border-t-white xl:border-t-white">
      <div v-show="isSelected !== '2'">
        <BaseCard :cards="memos" />
      </div>
      <div v-show="isSelected === '2'">
        <LinkPreview />
      </div>
    </div>
  </layout-top-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, onMounted } from '@nuxtjs/composition-api'
import { db, storageRef, auth } from '../plugins/firebase'

export default defineComponent({

  setup () {
    const memos = ref<any[]>([])

    onMounted(() => {
      db.collection('memo')
        .where('isPublic', '==', true)
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            const dataObj = Object.assign(doc.data(), { id: doc.id })
            memos.value.push(dataObj)
            memos.value.sort((memo1, memo2) => memo1.time > memo2.time ? -1 : 1)
          })
        })
    })

    const isSelected: Ref = ref(1)

    return {
      memos,
      isActive: '1',
      isSelected,
      isSelect: (num: number) => {
        isSelected.value = num
      }
    }
  }
})
</script>
