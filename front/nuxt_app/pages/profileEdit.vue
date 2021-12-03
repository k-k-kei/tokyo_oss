<template>
  <div class="flex flex-col items-center pt-24 min-h-screen">
    <div class="sw-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded border-gray-100 border">
    <div class="pb-6 text-3xl font-semibold">プロフィール登録</div>
    <profile-input-image @saveImageFile="getImageFile" :imageUrl="icon" class="mb-8"/>
    <Input
      :inputTitle="nameLabel"
      v-model="name"
      @change = 'changeName'
      typeName="text"
    />
    <input-auto
      :inputTitle="categoryLabel"
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
  import { defineComponent,computed,ref, useRouter, onMounted} from '@nuxtjs/composition-api'
  import InputAuto from '../components/InputAuto.vue'
  import { db, auth, storage } from '../plugins/firebase'

  const genId = (len:Number):String => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return [...Array(len)].reduce((a:any, b:any) => {
      return a + chars.charAt(Math.floor(Math.random() * chars.length))
    }, "")
  }
  export default defineComponent({
    components: { InputAuto },
    middleware : 'authCheck',
      setup(){
        const name = ref('')
        const nameLabel = ref('')
        const category = ref('')
        const categoryLabel = ref('')
        const imageFile:any = ref('')
        const icon = ref('')
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

        const getImageFile = (file:File) => {
          imageFile.value = file;
        }

        const saveStorage = async (file:File) => {
          const storageRef = storage.ref().child(genId(8) + "_" + file.name);
          const uploadTask  = await storageRef.put(file)
          const downloadUrl = await uploadTask.ref.getDownloadURL()
          icon.value = downloadUrl
        };

        //新規登録処理
        const addProfile = async (name:string, category:string) => {
          const user = auth.currentUser
          console.log(user)

          if(imageFile.value !== "") await saveStorage(imageFile.value)

          if(user){
            uid.value = user.uid
            db.collection("users").doc(uid.value).set({
              uid:uid.value,
              name:name,
              category:category,
              icon:icon.value,
              admin:false,
            })
            .then(() => {
              console.log("success!:",name,icon)
              router.push('/notes')
            })
          }
        }

          

        const getProfile = async () => {
          auth.onAuthStateChanged((user:any) => {
            if(user){
              uid.value = user.uid
              db.collection('users').doc(uid.value).get()
                .then((doc:any) => {
                  const data = doc.data()
                  // console.log(data)
                  name.value = data.name
                  nameLabel.value = "ニックネーム" + (name.value ? "：" + name.value : "")
                  category.value = data.category
                  categoryLabel.value = "カテゴリ" + (category.value ? "：" + category.value : "")
                  icon.value = data.icon
                })
            }
          })
        }

        onMounted(async () => {
          await getProfile()
          console.log(name)
        })

        return {
          name,
          nameLabel,
          category,
          categoryLabel,
          icon,
          changeName,
          changeCategory,
          addProfile,
          getImageFile,
          uid,
          handicaps
        }
      }
  })

</script>
