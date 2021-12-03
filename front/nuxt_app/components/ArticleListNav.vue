<template>
  <nav aria-label="記事" class="max-w-max mr-4">
    <h1 class="text-xl font-bold w-40 leading-6 mt-2 mb-4">
      記事
    </h1>
    <ul class="w-full pb-4 mb-4">
      <li data-is-current="true" class="before:absolute before:mt-0 -ml-4 before:block before:w-0.5 before:h-full before:bg-black relative z-0 flex items-center w-full h-full py-2 px-0 text-base">
        <a href="/notes" aria-current="page" class="relative z-0 flex items-center w-full pl-4 font-bold">
          すべて
        </a>
      </li>
      <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
        <a href="/notes_public" class="relative z-0 flex items-center w-full">
          公開中
        </a>
      </li>
      <li class="relative z-0 flex items-center w-full py-2 px-0 text-base hover:bg-gray-200 hover:rounded-sm">
        <a href="/notes_draft" class="relative z-0 flex items-center w-full">
          下書き
        </a>
      </li>
    </ul>
    <hr>
    <h1 class="text-xl font-bold w-40 leading-6 mt-8 mb-4">
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
      <h1 class="text-xl font-bold w-40 leading-6 mt-8 mb-4">
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
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import { db, auth } from '../plugins/firebase'

export default defineComponent({
  setup () {
    const data:any = reactive({
      uid:"",
      admin:false
    })

    onMounted(() => {
      auth.onAuthStateChanged(async (user:any) => {
        data.uid = user.uid
        data.admin = await getUserInfo(data.uid)
      })
    })

    const getUserInfo = async (id:string) => {
      let admin = false
      await db.collection('users').doc(id).get()
        .then((user:any) => admin = user.data().admin)
      return admin
    }
    return {
      data
    }
  }
})
</script>
