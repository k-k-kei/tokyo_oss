import { useContext } from '@nuxtjs/composition-api'

//記事params_idの取得
const getParamsId = () => {
  const { route } = useContext();
  console.log(route.value.params.id)
  return route.value.params.id;
}

export default getParamsId;