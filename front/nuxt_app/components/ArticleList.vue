<template>
  <!-- t-settings__mainInner -->
  <div data-has-main-background="true" class="p-6 m-0 border-concreteGray border-b rounded bg-white">
    <div class="o-noteList__main">
      <div class="o-noteListNotes__main">
        <header class="o-noteListNotes__nav">
          <nav class="o-noteListHeader">
            <div class="o-noteListHeader__inner">
              <div class="o-noteListHeader__num">
                15 記事
              </div>
              <div class="o-noteListHeader__sort">
                <ul class="o-noteListHeader__list">
                  <li class="o-noteListHeader__item">
                    <button class="o-noteListHeader__label">
                      公開ステータス
                      <i aria-hidden="true" class="a-icon a-icon--arrowdropdown a-icon--size_medium" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <!-- o-articleList__item -->
        <div v-for="article in articles" :key="article.id" class="relative flex p-4 border-b border-solid border-concreteGray">
          <ul>
            <li>
              <div class="o-articleList__item">
                <NuxtLink :to="'/' + article.id + '/'">
                  <div class="o-articleList__checkbox">
                    <label for="listCheckbox" class="a-checkbox list-checkbox">
                      <input id="listCheckbox" type="checkbox" class="a-checkbox__field visually-hidden" value="true">
                      <div class="a-checkbox__check" /></label>
                  </div>
                  <div class="o-articleList__body">
                    <div class="o-articleList__heading">
                      <h2 class="text-lg text-cMain tracking-wider font-bold line-clamp-2">
                        {{ article.title }}
                      </h2>
                    </div>
                    <div class="o-articleList__description">
                      <div class="o-articleList__descriptionItem">
                        <button type="button" class="o-articleList__status o-articleList__status--published">
                          <id class="o-articleList__statusIcon">
                            <span class="o-articleList__statusLabel">
                              {{ article.status }}
                            </span>
                          </id>
                        </button>
                      </div>
                      <!-- o-articleList__descriptionItem -->
                      <div class="text-xs text-cGray pl-2">
                        <p>
                          {{ article.created }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="o-articleList__image">
                    <!-- o-articleList__image -->
                    <img class="block w-12 h-12 border-b border-solid border-concreteGray rounded-md" :src="article.img" :alt="article.title">
                  </div>
                  <div class="o-articleList__edit">
                    <button data-type="basic" data-size="small" data-disable-focus="false" type="button" class="a-button">
                      <div class="a-button__inner">
                        編集
                      </div>
                    </button>
                  </div>
                  <div class="o-articleList__others">
                    <button type="button" aria-label="その他" class="o-articleList__more a-icon a-icon--more a-icon--size_medium" />
                  </div>
                </NuxtLink>
              </div>
            </li>
          </ul>
          <!-- <div class="w-full">
          <img class="max-w-full rounded-md" :src="article.img" :alt="article.title">
        </div>
        <div class="mt-2">
          <h2 class="text-lg text-cMain tracking-wider font-bold line-clamp-2">
            {{ article.title }}
          </h2>
        </div>
        <div class="mt-2">
          <h3 class="text-base text-cGray tracking-wider line-clamp-2 md:line-clamp-2">
            {{ article.text }}
          </h3>
        </div>
        <div class="mt-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cPink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span class="text-sm text-cPink ml-1 tracking-wider line-clamp-2 md:line-clamp-4">{{ article.like }}</span>
        </div>
        <div class="mt-2">
          <div class="flex items-center">
            <div>
              <img class="max-w-full w-8 rounded-full" :src="article.editorImage" :alt="article.editor">
            </div>
            <div class="flex flex-col ">
              <div class="text-xs text-cGray pl-2">
                <p>{{ article.editor }}</p>
              </div>
              <div class="text-xs text-cGray pl-2">
                <p>{{ article.created }}</p>
              </div>
            </div>
          </div>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const articleNum = computed(() => props.articles.length)
    return {
      articleNum
    }
  }
})
</script>
