<template>
  <div class="flex flex-col items-center pt-10 min-h-screen ">
    <div v-if="userId == '' " class="max-w-lg p-12 pb-3 shadow-2xl rounded border-gray-100 border">
    <div class="pb-6 text-xl font-semibold text-center">ログイン</div>
      <Input
        inputTitle="メールアドレス"
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
      <Nuxt-link to="/signup" class="text-sm border-black border-b"> 新規登録はこちらから </Nuxt-link>
      <button
        @click="signUpWithEmail(email,pass)"
        class="w-full block mx-auto mt-6 bg-cAcc  py-2 rounded text-white shadow-lg font-semibold"
      >
        ログイン
      </button>
      <button  @click="googleSignIn"
        class="w-full block mx-auto mt-6 bg-cAcc  py-2 rounded text-white shadow-lg font-semibold">
        Google認証
      </button>
    </div>
    <div v-else>
      <LogoutButton />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, useRouter} from '@nuxtjs/composition-api'
  import { auth, db } from '../plugins/firebase'
  import firebase from 'firebase';
  import 'firebase/auth'

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

      // google認証
      // サインインした後、ログインページにリダイレクトされる
      const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithRedirect(provider)
      }

      // 新規登録
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

      // google認証後のリダイレクト時にGoogle認証情報を取得
      auth.getRedirectResult().then((result) => {
        if(result.user) {
          const user = result.user

          // firestoreのusersコレクションにユーザーデータがない場合、usersコレクションにデータを登録して、プロフィール登録に移動
          db.collection('users').doc(user.uid).get()
            .then((doc) => {
              doc.exists
                ? router.push('/')
                : db.collection('users').doc(user.uid).set(
                  {
                    uid:  user.uid,
                    admin:false,
                    icon: user.photoURL,
                    name: user.displayName
                  }
                )
                .then(() => router.push('/profileEdit'))
          })
        }
      })

      auth.onAuthStateChanged((user:any) => {
        if(user){
          userId.value = user.uid
        }else{
          console.log('Not login')
        }
      })



      return {
        email,
        pass,
        changeEmail,
        changePassword,
        signUpWithEmail,
        userId,
        googleSignIn
      }
    }
  })

</script>
