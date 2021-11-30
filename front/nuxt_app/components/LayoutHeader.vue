<template>
  <header id="header" class="pt-8 pb-4 flex justify-around md:justify-between items-center">
      <Nuxt-link to="/">
        <div class="flex justify-center items-center md:pl-4">
          <img src="/images/logo.png" alt="ソトブロ" class="w-8 md:w-12">
          <span
            class="text-center text-xs md:text-xl ml-1 font-bold leading-relaxed font-sans"
          >
            外に出たくなるブログ
          </span>
        </div>
      </Nuxt-link>
      <!-- ログアウト状態 -->
      <div v-if="userId == ''" class="flex items-center md:pr-4">
        <Nuxt-link to="/login"><p class="text-cGray text-xs md:text-sm mr-2 font-semibold">ログイン</p></Nuxt-link>
        <base-button :title="buttonTitle" :link="buttonLink" />
      </div>
      <!-- ログイン状態 -->
      <div v-else class="flex items-center md:pr-4">
        <Nuxt-link to="/notes"><p class="text-cGray text-xs md:text-sm mr-2 font-semibold">マイページ</p></Nuxt-link>
        <NuxtLink to="/edit">
          <div class="bg-cAcc rounded">
            <div class="text-cBase flex items-center px-2 py-2 text-xs md:text-sm">
              <div class="pr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div class="hidden md:block">
                <span>新規投稿</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { auth } from "../plugins/firebase";

export default defineComponent({
  setup() {
    const buttonTitle = ref('会員登録')
    const buttonLink = ref('/signup')

    const userId = ref('')

    auth.onAuthStateChanged((user:any) => {
      if(user){
        userId.value = user.uid
        console.log(userId.value)
      }else{
        console.log('Not login')
      }
    })

    return{
      buttonTitle, buttonLink, userId
    }
  },
})
</script>