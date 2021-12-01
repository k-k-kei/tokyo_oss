<template>
  <div class="flex flex-col items-center pt-24 min-h-screen">
    <div class="sw-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded border-gray-100 border">
    <div class="pb-6 text-3xl font-semibold">プロフィール登録</div>
    <Input
      inputTitle="ニックネーム"
      v-model = 'name'
      @change = 'changeName'
      typeName="text"
    />
    <input-auto
      inputTitle="カテゴリ"
      v-model = 'category'
      @change = 'changeCategory'
      typeName="text"
      :handicaps="handicaps"
    />
    <button
      @click="addProfile(name, category)"
      class="w-1/3 block mx-auto mt-6 bg-cAcc  py-2 rounded text-white shadow-lg font-semibold"
    >
      プロフィール登録
    </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent,computed,ref, useRouter} from '@nuxtjs/composition-api'
  import InputAuto from '../components/InputAuto.vue'
  import { db, auth } from '../plugins/firebase'


  export default defineComponent({
  components: { InputAuto },
    middleware : 'authCheck',
      setup(){
        const name = ref('')
        const category = ref('')
        const uid = ref('')
        const router = useRouter()
        const handicaps = [
          "車椅子",
          "杖",
          "ベビーカー",
          "肢体不自由",
          "視覚障がい",
          "聴覚障がい",
          "その他"
        ]

        const changeName = (value: any) => {
          name.value = value
        }

        const changeCategory = (value: any) => {
          category.value = value
        }

        //新規登録処理
        const addProfile = async (name:string, category:string) => {
          const user = auth.currentUser
          console.log(user)
          if(user){
            uid.value = user.uid
            db.collection("users").doc(uid.value).set({
              uid:uid.value,
              name:name,
              category:category,
              admin:false,
            })
            .then(() => console.log("success!:",name))

          }
        }

        return {
          name,
          category,
          changeName,
          changeCategory,
          addProfile,
          uid,
          handicaps
        }
      }
  })

</script>
