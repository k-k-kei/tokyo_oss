<template>
  <article-list-wrapper>
    <div>
      <ArticleList :articles="memos" />
    </div>
    <base-button  :title="buttonTitle" :link="buttonLink" @buttonEvent="logout" />
  </article-list-wrapper>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { db, storageRef, auth } from '../plugins/firebase'

export default defineComponent({
  middleware : 'authCheck',
  setup () {
    const memos = ref<any[]>([])
    onMounted(() => {
      db.collection('memo')
        .orderBy('time', 'desc')
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            const dataArray = Object.assign(doc.data(), {id: doc.id});
            memos.value.push(dataArray)
          })
        })
    })
    const buttonTitle = "logout"
    const buttonLink  = "/"
    const logout = () => {
      auth.signOut()
    }
    return {
      buttonTitle,
      buttonLink,
      logout,
      memos
    }
  }
})
</script>
