<template>
    <button
    @click="logout"
    class="w-1/3 block mx-auto mt-6 bg-cAcc  py-2 rounded text-white shadow-lg font-semibold"
    >
    ログアウト
  </button>
</template>

<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { auth } from '../plugins/firebase'

export default defineComponent({

  setup() {
    const router = useRouter()
    const logout = () => {
      auth.signOut()
        .then(() => {
          alert("ログアウトが完了しました")
          router.push('/login')
        })
        .catch((error) => {
          alert(error)
        })
    }
    return {
      logout
    }
  }
})
</script>
