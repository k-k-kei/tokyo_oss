import { auth } from '../plugins/firebase'

export default ({ store, route, redirect }) => {
    auth.onAuthStateChanged((user) => {
        if (!user) redirect('/login')
    })
}