<template>
  <div class="flex flex-col items-center pt-10 min-h-screen">
    <div class="max-w-lg p-12 pb-3 shadow-2xl rounded border-gray-100 border">
    <div class="pb-6 text-xl font-semibold text-center">ユーザー登録</div>
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
      <button
        @click="signUpWithEmail(email,pass)"
        class="w-full block mx-auto mt-6 bg-cAcc  py-2 rounded text-white shadow-lg font-semibold"
      >
        登録
      </button>
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
        const router = useRouter()

        const changeEmail = (value: any) => {
          email.value = value
        }

        const changePassword = (value: any) => {
          pass.value = value
        }

        //新規登録処理
        const signUpWithEmail = async (email:string,password:string) => {
          try{
            auth.createUserWithEmailAndPassword(email,password)
              .then((user) => {
                //登録完了した後の処理を書いていく
                  router.push('/profileEdit')
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
          signUpWithEmail
        }
      }
  })

</script>
