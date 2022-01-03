<template>
  <main class="flex justify-center p-10 bg-cBlueGray border border-concreteGray">
    <div class="flex items-start justify-center w-full m-0">
      <!-- <article-list-wrapper> -->
      <div class="flex">
        <div class="mb-4">
          <h1 class="text-xl font-bold w-40 leading-6 mb-6 ml-3">
            記事
          </h1>
          <ul class="pb-4 mb-4">
            <li :class="{ clickBtn: tab === 1 }" @click="tab = 1">
              すべて
            </li>
            <li :class="{ clickBtn: tab === 2 }" @click="tab = 2">
              公開中
            </li>
            <li :class="{ clickBtn: tab === 3 }" @click="tab = 3">
              下書き
            </li>
          </ul>
          <hr>
          <h1 class="text-xl font-bold w-40 leading-6 mt-8 mb-6 ml-3">
            設定
          </h1>
          <ul class="w-full pb-4 mb-4">
            <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
              <a href="/profileEdit" class="relative z-0 flex items-center w-full">
                プロフィール
              </a>
            </li>
          </ul>
          <div v-if="data.admin">
            <hr>
            <h1 class="text-xl font-bold w-40 leading-6 mt-8 mb-6 ml-3">
              管理者メニュー
            </h1>
            <ul class="w-full pb-4 mb-4">
              <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
                <NuxtLink to="/admin" class="relative z-0 flex items-center w-full">
                  管理画面
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <div v-show="tab === 1" class="content-item">
            <ArticleList :articles="memosAll" />
          </div>
          <div v-show="tab === 2" class="content-item">
            <ArticleList :articles="memosPublic" />
          </div>
          <div v-show="tab === 3" class="content-item">
            <ArticleList :articles="memosDraft" />
          </div>

          <div class="text-center pt-12">
            <NuxtLink to="/login">
              <button class="bg-cGray rounded">
                <div class="text-cBase px-4 py-2 text-xs md:text-sm">
                  <span class="text-cBase font-semibold">{{ buttonTitle }}</span>
                </div>
              </button>
            </NuxtLink>
          </div>
        </div>
      <!-- <base-button  :title="buttonTitle" :link="buttonLink" @buttonEvent="logout" /> -->
      </div>
    </div>
  </main>
  <!-- </article-list-wrapper> -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from '@nuxtjs/composition-api'
import { db, auth } from '../plugins/firebase'

export default defineComponent({
  middleware: 'authCheck',
  setup () {
    const memosAll = ref<any[]>([])
    const memosPublic = ref<any[]>([])
    const memosDraft = ref<any[]>([])
    const userId = ref('')
    const data: any = reactive({
      uid: '',
      admin: false
    })

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
              memosAll.value.push(dataArray)
            }
          })
        })
      db.collection('memo')
        .where('isPublic', '==', true)
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            if (doc.data().uid === userId.value) {
              const dataObj = Object.assign(doc.data(), { id: doc.id })
              memosPublic.value.push(dataObj)
              memosPublic.value.sort((memo1, memo2) => memo1.time > memo2.time ? -1 : 1)
            }
          })
        })
      db.collection('memo')
        .where('isPublic', '==', false)
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            if (doc.data().uid === userId.value) {
              const dataObj = Object.assign(doc.data(), { id: doc.id })
              memosDraft.value.push(dataObj)
              memosDraft.value.sort((memo1, memo2) => memo1.time > memo2.time ? -1 : 1)
            }
          })
        })
      auth.onAuthStateChanged(async (user:any) => {
        data.uid = user.uid
        data.admin = await getUserInfo(data.uid)
      })

      const getUserInfo = async (id:string) => {
        let admin = false
        await db.collection('users').doc(id).get()
          .then((user:any) => admin = user.data().admin)
        return admin
      }
    })

    const buttonTitle = 'ログアウト'
    return {
      buttonTitle,
      memosAll,
      memosPublic,
      memosDraft,
      tab: 1,
      data
    }
  }
})
</script>
<style scoped>
ul {
  list-style: none;
  margin-top: 20px;
}
li {
  color: cBlack;
  width: 160px;
  height: 40px;
  padding: 8px;
  margin: 2px;
  position: relative;
}
li:hover{
  background-color: rgb(229 231 235);
  border-radius: 3px;
}
.content {
  margin-left: 20px;
}
.clickBtn {
  font-weight: bold;
}
.clickBtn::before {
  content: '';
  position: absolute;
  border-color: #474655;
  background-color: #474655;
  border-style: solid;
  border-width: 1px;
  height: 40px;
  margin-left: -10px;
  margin-top: -8px;
  width: 0px;
}
</style>
