<template>
  <div data-has-main-background="true" class="max-w-2xl p-10 m-0 border-concreteGray border-b rounded bg-white">
    <header class="flex items-baseline justify-between min-w-full px-4 pb-2 border-b border-solid border-concreteGray">
      <div class="text-sm whitespace-nowrap">
        {{ articleNum }} 記事
      </div>
      <!-- o-noteListHeader__sort -->
      <div>
        <ul class="flex items-center">
          <li class="ml-8 text-sm whitespace-nowrap">
            <button class="flex items-center">
              公開ステータス
            </button>
          </li>
          <li class="ml-8 text-sm whitespace-nowrap">
            <button class="flex items-center">
              期間
            </button>
          </li>
        </ul>
      </div>
    </header>
    <!-- o-noteListNotes__body -->
    <ul class="relative z-50">
      <li v-for="(memo, i) in articles" :key="i">
        <!-- o-articleList__item -->
        <div class="relative flex p-4 border-b border-solid border-concreteGray">
          <div class="flex justify-between w-full bg-teal-100 text-teal-900">
            <label for="listCheckbox" class="flex items-center">
              <input id="listCheckbox" type="checkbox" class="text-cGreen w-10" value="true">
            </label>
            <NuxtLink :to="'/' + i + '/'" class="block px-4 py-3">
              <h2 class="text-lg text-cMain tracking-wider font-bold inline-block w-10/12">
                {{ memo.title }}
              </h2>
              <div class="text-xs text-cGray pl-2 mb-1 inline-block">
                ● {{ status }} ・ {{ created }}
              </div>
            </Nuxtlink>
            <!-- image分岐 -->
            <div v-if="memo.mainImage" class="flex items-center ml-4">
              <img class="block w-12 h-12 border-b border-solid border-concreteGray rounded-md" :src="memo.mainImage" :alt="memo.title">
            </div>
            <div v-else class="flex items-center ml-4">
              <img class="block w-12 h-12 border-b border-solid border-concreteGray rounded-md" :src="images/test" :alt="memo.title">
            </div>
            <!-------------->
            <div class="flex items-center ml-2">
              <NuxtLink :to="'/edit' + i + '/'">
                <button class="text-sm w-12 p-2 align-center rounded border-2 hover:border-gray-600">
                  編集
                </button>
              </NuxtLink>
            </div>
            <div class="flex items-center m-2">
              <button class="text-sm w-12 p-2 align-center rounded border-2 hover:border-gray-600" @click="deleteMemo(i)">
                削除
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
