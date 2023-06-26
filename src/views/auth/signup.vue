<script setup>
// 회원가입 완료 후 signup-finish 페이지로 이동할 필요가 있을까?
// 200 떨어지면 alert 띄우고 로그인페이지로 이동하면 될 듯?
import { ref } from 'vue'
// import lib from '~/util/axiosModule'
import valid from '~/util/validation'

const email = ref('')
const authCode = ref(null)

const step = ref(0)

const generateCode = () => {
  if (valid('email', email)) {
    // lib
    //   .api({
    //     url: '/member/generate-code',
    //     data: {
    //       email: email.value,
    //       type: 'SIGNUP'
    //     }
    //   })
    //   .then((res) => {
    //     alert(
    //       '인증번호가 [ ' + email.value + ' ]로 발송되었습니다.\r\n 확인 후 인증번호를 입력해주세요'
    //     )
    //     step.value += 1
    //   })
  }
  step.value += 1
}

const verifyCode = () => {
  if (valid('authCode', authCode)) {
    // lib
    //   .api({
    //     url: '/member/verify-code',
    //     data: {
    //       email: email.value,
    //       type: 'SIGNUP',
    //       code: authCode.value
    //     }
    //   })
    //   .then((res) => {
    //     // 비밀번호 입력 창 노출
    //     step.value += 1
    //     // 다음 버튼 위치에 완료 버튼 삽입
    //     // transition 사용하여 버튼 fade out,in 효과 추가
    //     // 기존 다음 버튼 클릭 시 signup2로 넘어가던 로직 변경
    //   })
  }
  step.value += 1
}

// 완료버튼 event
// 완료 후 alert을 통해 회원가입 완료 안내 및 로그인 페이지 push
</script>
<template>
  {{ step }}
  <p>본인 확인을 위해 이메일주소를 입력해주세요.</p>

  <label for="cBox">[필수] 본인 인증 이용약관 동의</label>
  <input id="cBox" type="checkbox" :disabled="step == 0" />

  <input type="email" placeholder="it1234@gsitm.com" v-model="email" :disabled="step >= 1" />
  <button @click="generateCode" :disabled="step >= 1">인증번호 발송</button>
  <!-- <transition-group name="slide-fade" mode="out-in"> -->
  <input type="number" placeholder="인증코드를 입력해주세요" v-model="authCode" v-if="step == 1" />
  <button @click="verifyCode" v-if="step == 1" :disabled="step >= 2">인증번호 검증</button>

  <input type="password" placeholder="비밀번호" v-model="authCode" v-if="step == 2" />

  <input type="password" placeholder="비밀번호 확인" v-model="authCode" v-if="step == 2" />
  <!-- </transition-group> -->

  <p><button @click="verifyCode" :disabled="step == 3">다음</button></p>
</template>
