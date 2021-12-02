<template>
  <article-list-wrapper>
    <div>
      <ArticleListPublic :articles="memos" />
    </div>
    <div class="text-center pt-12">
      <NuxtLink to="/login">
        <button class="bg-cGray rounded">
          <div class="text-cBase px-4 py-2 text-xs md:text-sm">
            <span class="text-cBase font-semibold">{{ buttonTitle }}</span>
          </div>
        </button>
      </NuxtLink>
      <!-- <base-button  :title="buttonTitle" :link="buttonLink" @buttonEvent="logout" /> -->
    </div>
  </article-list-wrapper>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { db, auth } from '../plugins/firebase'

export default defineComponent({
  middleware: 'authCheck',
  setup () {
    const memos = ref<any[]>([])
    const userId = ref('')

    auth.onAuthStateChanged((user:any) => {
      if (user) {
        userId.value = user.uid
        console.log(userId.value)
      } else {
        console.log('Not login')
      }
    })

    onMounted(() => {
      db.collection('memo')
        .orderBy('time', 'desc')
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            if (doc.data().uid === userId.value) {
              const dataArray = Object.assign(doc.data(), { id: doc.id })
              memos.value.push(dataArray)
            }
          })
        })
    })
    const buttonTitle = 'ログアウト'
    return {
      buttonTitle,
      memos
    }
  }
})
</script>
