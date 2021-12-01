<template>
    <button
    @click="logout"
    class="block mx-auto mt-6 bg-cGray  py-2 px-4 rounded text-white shadow-lg font-semibold"
    >
      <a href="/">
        ログアウト
      </a>
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
          router.push('/')
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
