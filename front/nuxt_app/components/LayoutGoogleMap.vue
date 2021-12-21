<template>
    <div>
        <div ref="mapDiv" class="w-full " style="height: 80vh" />
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { defineComponent, ref, onMounted, computed, onUnmounted } from '@vue/composition-api'
import { useGeolocation } from '../plugins/useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = 'AIzaSyBbpYgXLDr3PWNAoWXhmTzdCTh7f8TlKsc'

import { auth } from "../plugins/firebase";

export default defineComponent({
    setup(props, { emit }) {
        const { coords } = useGeolocation()
        const currPos = computed(()=>({
                lat: coords.value.latitude,
                lng: coords.value.longitude
        }))

        const otherPos = ref(null)
        const sendPositionToParent = () => {
          emit("latLng", otherPos.value);
        }

        const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
        const mapDiv = ref(null)
        let map = ref(null)
        let clickListener = null
        onMounted(async () => {
            await loader.load()
            map.value = new google.maps.Map(mapDiv.value, {
                center:currPos.value,
                zoom:14
            })
            clickListener = map.value.addListener(
                'click',
                ({ latLng: { lat, lng} })=>{
                  (otherPos.value = {lat: lat(), lng: lng()})
                  sendPositionToParent()
                }
            )
        })
        onUnmounted(async() => {
            if(clickListener) clickListener.remove()
        })
        
        return{ currPos, otherPos, mapDiv }
    },
})
</script>