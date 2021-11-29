<template>
  <div class="md:hidden bg-cBase border-t-2 static uppercase font-semibold flex items-center md:flex-col md:ml-1 shadow-lg justify-around fixed w-screen bottom-0">
    <NuxtLink to="/">
        <div class="flex flex-col pt-1 pb-2">
            <div class="md:px-5 px-3 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </div>
            <div class="text-xxs m-auto">ホーム</div>
        </div>
    </NuxtLink>
    <NuxtLink to="/edit">
        <div class="flex flex-col pt-1 pb-2">
            <div class="md:px-5 px-3 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </div>
            <div class="text-xxs m-auto">つくる</div>
        </div>
    </NuxtLink>
    <NuxtLink to="/mypage">
      <div class="flex flex-col pt-1 pb-2">
        <div class="md:px-5 px-3 pt-1 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <div class="text-xxs m-auto">アカウント</div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {

    },
})
</script>