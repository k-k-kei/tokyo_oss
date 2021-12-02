
import { onUnmounted, ref, onMounted } from '@nuxtjs/composition-api'

export function useGeolocation(){

    const coords = ref({ latitude:35.735682062563185, longitude:139.6516558688486 })
    const isSupported = 'navigator' in window && 'geolocation' in navigator
    
    let watcher = null
    onMounted(()=>{
        if(isSupported)
            watcher = navigator.geolocation.watchPosition(
                position => (coords.value = position.coords)
            )
    })

    onUnmounted(()=>{
        if(watcher) navigator.geolocation.clearWatch(watcher)
    })

    return{ coords, isSupported }
}