<template>
  <div data-has-main-background="true" class="p-5 border-concreteGray border-b rounded bg-white">
    <header class="flex items-baseline justify-between min-w-full px-4 pb-2 border-b border-solid border-concreteGray">
      <div class="text-sm whitespace-nowrap">
        {{ articleNum }} 記事
      </div>
    </header>
    <!-- articleList__body -->
    <ul class="relative z-50">
      <li v-for="(memo, id) in articles" :key="id">
        <!-- articleList__item -->
        <div v-if="!memo.isPublic" class="relative flex p-4 border-b border-solid border-concreteGray">
          <div class="flex justify-between w-full bg-teal-100 text-teal-900">
            <!-- <label for="listCheckbox" class="flex items-center">
              <input id="listCheckbox" type="checkbox" class="text-cGreen w-10" value="true">
            </label> -->
            <NuxtLink :to="'/' + memo.id + '/'" class="block px-4 py-3">
              <div class="items-start w-80">
                <h2 class="text-lg text-cMain tracking-wider font-bold">
                  {{ memo.title }}
                </h2>
                <div class="text-xs text-cGray pl-2 mb-1">
                  <span v-if="memo.isPublic"><span class="text-sm text-cGreen">● </span>公開中</span><span v-else><span class="text-sm">○ </span>下書き</span> ・ {{ changeDate(memo.time) }} {{ changeTime(memo.time) }}
                </div>
              </div>
            </Nuxtlink>
            <!-- image分岐 -->
            <div v-if="memo.mainImage" class="flex items-center">
              <img class="block w-12 h-12 border-b border-solid border-concreteGray rounded-md" :src="memo.mainImage" :alt="memo.title">
            </div>
            <div v-else class="flex items-center">
              <img class="block w-12 h-12 border-b border-solid border-concreteGray rounded-md" :src="defaultImage" :alt="memo.title">
            </div>
            <!-------------->
            <div class="flex items-center ml-6">
              <NuxtLink :to="'/edit/' + memo.id">
                <button class="text-sm w-12 p-2 align-center rounded border-2 hover:border-gray-600">
                  編集
                </button>
              </NuxtLink>
            </div>
            <div class="flex items-center m-2">
              <button class="text-sm w-12 p-2 align-center rounded border-2 hover:border-gray-600" @click="deleteMemo(memo.id)">
                削除
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter, computed, ref } from '@nuxtjs/composition-api'
import { db } from '../plugins/firebase'
import changeDate from '../composable/changeDate'
import changeTime from '../composable/changeTime'

export default defineComponent({
  // 親コンポーネントから受け取った配列をpropsとして定義
  props: {
    articles: {
      type: Array,
      required: true
    }
  },

  setup (props) {
    const articleNum = computed(() => props.articles.length)
    const defaultImage = '/images/sotoburo.png'
    const userId = ref('')

    const router = useRouter()

    // 記事のドキュメントidを引数にとってfirestoreから削除する関数
    const deleteMemo = (id:string) => {
      // console.log(id)
      db.collection('memo').doc(id).delete().then(() => {
        alert('削除完了！')
        router.push('/')
      })
    }

    return {
      articleNum, defaultImage, userId, changeDate, changeTime, deleteMemo
    }
  }
})
</script>
