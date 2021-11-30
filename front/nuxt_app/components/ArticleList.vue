<template>
  <!-- t-settings__mainInner -->
  <div data-has-main-background="true" class="max-w-2xl p-10 m-0 border-concreteGray border-b rounded bg-white">
    <!-- o-noteList__main -->
    <div class="w-full">
      <!-- o-noteListNotes__main -->
      <div>
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
              <!-- o-noteListHeader__sort -->
              <div>
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
        <ul class="relative z-50">
          <li v-for="article in articles" :key="article.id">
            <!-- o-articleList__item -->
            <div class="relative flex p-4 border-b border-solid border-concreteGray">
              <NuxtLink :to="'/' + article.id + '/'">
                <!-- o-articleList__link -->
                <button class="absolute top-0 right-12 bottom-0 left-10 z-0 w-11/12" :aria-label="article.title" />
                <!-- o-articleList__checkbox -->
                <div class="z-20 flex items-center mr-4">
                  <!-- a-checkbox list-checkbox -->
                  <label for="listCheckbox" class="relative z-0 inline-block min-h-5 pl-5 leading-loose text-sm">
                    <!-- a-checkbox__field visually-hidden -->
                    <input id="listCheckbox" type="checkbox" class="before:bg-cGray before:border-cGray absolute w-px h-px verflow-hidden bg-clip-padding" value="true">
                    <!-- a-checkbox__check -->
                    <div class="before:absolute before:top-0 before:left-0 before:w-5 before:h-5 before:contents before:bg-cWhite before:border-px before:border-solid before:border-gray-300 before:rounded-sm " />
                    <span />
                  </label>
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
              </NuxtLink>
            </div>
            <div class="o-articleList__others">
              <button type="button" aria-label="その他" class="o-articleList__more a-icon a-icon--more a-icon--size_medium" />
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
