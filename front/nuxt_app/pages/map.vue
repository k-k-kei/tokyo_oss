<template>
    <div>
        <div>
            <div>
                <h4>Your Position</h4>
                Latitude:{{ currPos.lat.toFixed(2) }}, Longitude:{{ currPos.lng.toFixed(2) }}
            </div>
            <div>
                <h4>Click Position</h4>
                <span v-if="otherPos">
                    Latitude:{{ otherPos.lat.toFixed(2) }},
                    Longitude:{{ otherPos.lng.toFixed(2) }}
                </span>
                <span v-else>Click the map to select a position</span>
            </div>
        </div>
        <div ref="mapDiv" style="width:100%; height: 80vh" />
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
    setup() {
        const { coords } = useGeolocation()
        const currPos = computed(()=>({
                lat: coords.value.latitude,
                lng: coords.value.longitude
        }))

        const otherPos = ref(null)

        const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
        const mapDiv = ref(null)
        let map = ref(null)
        let clickListener = null
        onMounted(async () => {
            await loader.load()
            map.value = new google.maps.Map(mapDiv.value, {
                //遅れて入ってくる
                center:currPos.value,
                // center: {lat:35.68, lng:139.69 },
                zoom:7
            })
            clickListener = map.value.addListener(
                'click',
                ({ latLng: { lat, lng} })=>
                    (otherPos.value = {lat: lat(), lng: lng()})
            )
        })
        onUnmounted(async() => {
            if(clickListener) clickListener.remove()
        })
        
        return{ currPos, otherPos, mapDiv }
    },
})
</script>