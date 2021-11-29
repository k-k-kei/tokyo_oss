<template>
  <article-list-wrapper>
    <div>
      <ArticleList :articles="data.articles" />
    </div>
  </article-list-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const data = reactive({
      articles: [
        { id: 1, img: 'https://assets.st-note.com/production/uploads/images/66101076/rectangle_large_type_2_78f406dd0ceabba3e7ac70644ab198b4.jpg', title: 'IPA図鑑というアプリを作ってビールが飲みたくなった', text: '今回、vue3とcomposition api, Typescriptの学習のためにスコットランド発ブリュワリーである「BrewDog」のIPA図鑑を作りました！', created: '2021.2.2 10:00', like: 43, editor: 'BIRD', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 2, img: 'https://assets.st-note.com/production/uploads/images/63929728/rectangle_large_type_2_51f12e4088b2568ba4c22ed531fe9c93.png', title: 'ジーズアカデミー全カリキュラム終了「G1クライマックス決勝。そして舞台はGGAに」', text: '「逃げない。負けない。諦めない。そして、絶対に裏切らない」そう叫びながら飯伏 幸太が混戦のAブロックを勝ち抜いた。', created: '2021.3.3 10:00', like: 33, editor: 'Shinji', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 3, img: 'https://assets.st-note.com/production/uploads/images/52827146/rectangle_large_type_2_99c7fa93d6f9a4e06aac91dbdf419aaa.jpg', title: 'コーヒースタンド向けのARプロトタイプを作った話', text: '直近、ARを使ったサービスプロトタイプを作成する機会がありました。その際、作ったコーヒースタンド向けARサービスの紹介と作成してみて気づいたARの価値についてまとめたいと思います。', created: '2021.4.4', like: 44, editor: 'KEI', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 4, img: 'https://assets.st-note.com/production/uploads/images/66101076/rectangle_large_type_2_78f406dd0ceabba3e7ac70644ab198b4.jpg', title: 'IPA図鑑というアプリを作ってビールが飲みたくなった', text: '今回、vue3とcomposition api, Typescriptの学習のためにスコットランド発ブリュワリーである「BrewDog」のIPA図鑑を作りました！', created: '2021.2.2 10:00', like: 43, editor: 'BIRD', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 5, img: 'https://assets.st-note.com/production/uploads/images/63929728/rectangle_large_type_2_51f12e4088b2568ba4c22ed531fe9c93.png', title: 'ジーズアカデミー全カリキュラム終了「G1クライマックス決勝。そして舞台はGGAに」', text: '「逃げない。負けない。諦めない。そして、絶対に裏切らない」そう叫びながら飯伏 幸太が混戦のAブロックを勝ち抜いた。', created: '2021.3.3  10:00', like: 33, editor: 'Shinji', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 6, img: 'https://assets.st-note.com/production/uploads/images/52827146/rectangle_large_type_2_99c7fa93d6f9a4e06aac91dbdf419aaa.jpg', title: 'コーヒースタンド向けのARプロトタイプを作った話', text: '直近、ARを使ったサービスプロトタイプを作成する機会がありました。その際、作ったコーヒースタンド向けARサービスの紹介と作成してみて気づいたARの価値についてまとめたいと思います。', created: '2021.4.4', like: 44, editor: 'KEI', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 7, img: 'https://assets.st-note.com/production/uploads/images/66101076/rectangle_large_type_2_78f406dd0ceabba3e7ac70644ab198b4.jpg', title: 'IPA図鑑というアプリを作ってビールが飲みたくなった', text: '今回、vue3とcomposition api, Typescriptの学習のためにスコットランド発ブリュワリーである「BrewDog」のIPA図鑑を作りました！', created: '2021.2.2  10:00', like: 43, editor: 'BIRD', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 8, img: 'https://assets.st-note.com/production/uploads/images/63929728/rectangle_large_type_2_51f12e4088b2568ba4c22ed531fe9c93.png', title: 'ジーズアカデミー全カリキュラム終了「G1クライマックス決勝。そして舞台はGGAに」', text: '「逃げない。負けない。諦めない。そして、絶対に裏切らない」そう叫びながら飯伏 幸太が混戦のAブロックを勝ち抜いた。', created: '2021.3.3  10:00', like: 33, editor: 'Shinji', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 9, img: 'https://assets.st-note.com/production/uploads/images/52827146/rectangle_large_type_2_99c7fa93d6f9a4e06aac91dbdf419aaa.jpg', title: 'コーヒースタンド向けのARプロトタイプを作った話', text: '直近、ARを使ったサービスプロトタイプを作成する機会がありました。その際、作ったコーヒースタンド向けARサービスの紹介と作成してみて気づいたARの価値についてまとめたいと思います。', created: '2021.4.4  10:00', like: 44, editor: 'KEI', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 10, img: 'https://assets.st-note.com/production/uploads/images/66101076/rectangle_large_type_2_78f406dd0ceabba3e7ac70644ab198b4.jpg', title: 'IPA図鑑というアプリを作ってビールが飲みたくなった', text: '今回、vue3とcomposition api, Typescriptの学習のためにスコットランド発ブリュワリーである「BrewDog」のIPA図鑑を作りました！', created: '2021.2.2  10:00', like: 43, editor: 'BIRD', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 11, img: 'https://assets.st-note.com/production/uploads/images/63929728/rectangle_large_type_2_51f12e4088b2568ba4c22ed531fe9c93.png', title: 'ジーズアカデミー全カリキュラム終了「G1クライマックス決勝。そして舞台はGGAに」', text: '「逃げない。負けない。諦めない。そして、絶対に裏切らない」そう叫びながら飯伏 幸太が混戦のAブロックを勝ち抜いた。', created: '2021.3.3  10:00', like: 33, editor: 'Shinji', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '公開中' },
        { id: 12, img: 'https://assets.st-note.com/production/uploads/images/52827146/rectangle_large_type_2_99c7fa93d6f9a4e06aac91dbdf419aaa.jpg', title: 'コーヒースタンド向けのARプロトタイプを作った話', text: '直近、ARを使ったサービスプロトタイプを作成する機会がありました。その際、作ったコーヒースタンド向けARサービスの紹介と作成してみて気づいたARの価値についてまとめたいと思います。', created: '2021.4.4  10:00', like: 44, editor: 'KEI', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '下書き' },
        { id: 13, img: 'https://assets.st-note.com/production/uploads/images/52827146/rectangle_large_type_2_99c7fa93d6f9a4e06aac91dbdf419aaa.jpg', title: 'コーヒースタンド向けのARプロトタイプを作った話', text: '直近、ARを使ったサービスプロトタイプを作成する機会がありました。その際、作ったコーヒースタンド向けARサービスの紹介と作成してみて気づいたARの価値についてまとめたいと思います。', created: '2021.4.14  10:00', like: 44, editor: 'KEI', editorImage: 'https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png', status: '下書き' }
      ]
    })
    return {
      data
    }
  }
})
</script>
