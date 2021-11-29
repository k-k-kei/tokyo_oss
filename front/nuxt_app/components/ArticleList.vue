<template>
  <!-- t-settings__mainInner -->
  <div data-has-main-background="true" class="max-w-2xl p-10 m-0 border-concreteGray border-b rounded bg-white">
    <div class="o-noteList__main">
      <div class="o-noteListNotes__main">
        <!-- o-noteListNotes__nav -->
        <header class="px-4 pb-2 border-b border-solid border-concreteGray">
          <!-- o-noteListHeader -->
          <nav class="flex items-start">
            <!-- o-noteListHeader__inner -->
            <div class="flex items-baseline justify-between min-w-full">
              <!-- o-noteListHeader__num -->
              <div class="text-sm whitespace-nowrap">
                15 記事
              </div>
              <div class="o-noteListHeader__sort">
                <!-- o-noteListHeader__list -->
                <ul class="flex items-center">
                  <!-- o-noteListHeader__item -->
                  <li class="ml-8 text-sm whitespace-nowrap">
                    <!-- o-noteListHeader__label -->
                    <button class="flex items-center">
                      公開ステータス
                      <i aria-hidden="true" class="a-icon a-icon--arrowdropdown a-icon--size_medium" />
                    </button>
                  </li>
                  <!-- o-noteListHeader__item -->
                  <li class="ml-8 text-sm whitespace-nowrap">
                    <!-- o-noteListHeader__label -->
                    <button class="flex items-center">
                      期間
                      <i aria-hidden="true" class="a-icon a-icon--arrowdropdown a-icon--size_medium" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <!-- o-noteListNotes__body -->
        <ul>
          <li v-for="article in articles" :key="article.id">
            <!-- o-articleList__item -->
            <div class="relative flex p-4 border-b border-solid border-concreteGray">
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
            </div>
          </li>
        </ul>
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
