<script setup>
import { reactive } from 'vue'
import lib from '~/util/axiosModule'

const emit = defineEmits()
var map, marker
const position = reactive({})
const circle = reactive([])

const posCheck = () => {
  circle.some((obj) => {
    if (
      position.lng > obj.getBounds().ha &&
      position.lat > obj.getBounds().qa &&
      position.lng < obj.getBounds().oa &&
      position.lat < obj.getBounds().pa
    ) {
      console.log('in position')

      emit('setLocationInfo', {
        circleIn: true,
        locCode: obj.Eb.fillColor
      })

      return true
    } else {
      console.log('out of position')

      emit('setLocationInfo', {
        circleIn: false,
        locCode: null
      })
    }
  })
}

const initMap = () => {
  var container = document.getElementById('map')
  var options = {
    center: new kakao.maps.LatLng(37.51082, 127.02928),
    level: 4
  }
  map = new kakao.maps.Map(container, options)

  marker = new kakao.maps.Marker({
    position: map.getCenter()
  })

  marker.setMap(map)

  lib
    .api({
      url: '/company-locations',
      method: 'get'
    })
    .then((res) => {
      res.forEach((obj) => {
        circle.push(
          new kakao.maps.Circle({
            center: new kakao.maps.LatLng(obj.latitude, obj.longitude),
            fillColor: obj.locationCode // kakao circle에 커스텀 데이터 삽입 위해 (String) fillColor 활용
          })
        )
      })

      circle.forEach((obj) => {
        obj.setMap(map)
      })

      posCheck()
    })

  map.setDraggable(true)

  //위치 테스트용으로만 사용(배포시 삭제)
  kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
    // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
    // 클릭한 위도, 경도 정보를 가져옵니다
    var latlng = mouseEvent.latLng

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng)

    position.lat = latlng.getLat()
    position.lng = latlng.getLng()

    posCheck()
  })
}

;(() => {
  if (!window.kakao || !window.kakao.maps) {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_APP_KAKAOMAP_KEY
    }`
    script.addEventListener('load', () => {
      kakao.maps.load(initMap)
    })
    document.head.appendChild(script)
  } else {
    // this.setCompBounds();
    initMap()
  }
})()
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  height: 400px;
}
</style>
