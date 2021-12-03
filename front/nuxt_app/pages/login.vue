<template>
  <div class="flex flex-col items-center pt-24 min-h-screen">
    <div v-if="userId == '' " class="sw-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded border-gray-100 border">
    <div class="pb-6 text-3xl font-semibold">ログイン</div>
      <Input
        inputTitle="Email"
        v-model = 'email'
        @change = 'changeEmail'
        typeName="text"
      />
      <Input
        inputTitle="パスワード"
        v-model = 'pass'
        @change = 'changePassword'
        typeName="password"
      />
      <Nuxt-link to="/signup"> 新規登録はこちらから </Nuxt-link>
      <button
        @click="signUpWithEmail(email,pass)"
        class="w-1/3 block mx-auto mt-6 bg-cAcc  py-2 rounded text-white shadow-lg font-semibold"
      >
        ログイン
      </button>
    </div>
    <div v-else>
      <LogoutButton />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent,computed,ref, useRouter} from '@nuxtjs/composition-api'
  import { auth } from '../plugins/firebase'

  export default defineComponent({
      setup(){
        const email = ref('')
        const pass = ref('')
        const userId = ref('')
        const router = useRouter()

        const changeEmail = (value: any) => {
          email.value = value
        }

        const changePassword = (value: any) => {
          pass.value = value
        }

        auth.onAuthStateChanged((user:any) => {
          if(user){
            userId.value = user.uid
            console.log(userId.value)
          }else{
            console.log('Not login')
          }
        })

        //新規登録処理
        const signUpWithEmail = async (email:string,password:string) => {
          try{
            auth.signInWithEmailAndPassword(email,password)
              .then((user) => {
                console.log("success login! :", user)
                //ログインが完了した後の処理を書いていく
                router.push('/')
              })
              .catch((error) => {
                alert(error)
              })
          }catch(error){
            alert(error)
          }
        }

        return {
          email,
          pass,
          changeEmail,
          changePassword,
          signUpWithEmail,
          userId
        }
      }
  })

</script>
