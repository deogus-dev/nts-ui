<script setup>
// 회원가입 완료 후 signup-finish 페이지로 이동할 필요가 있을까?
// 200 떨어지면 alert 띄우고 로그인페이지로 이동하면 될 듯?
import { ref } from 'vue'
import lib from '~/util/axiosModule'

const email = ref('')
const authCode = ref(null)

const isVerify = ref(false)

const emailValid = () => {
  return true
}
const generateCode = () => {
  if (emailValid()) {
    lib
      .api({
        url: '/member/generate-code',
        data: {
          email: email.value,
          type: 'SIGNUP'
        }
      })
      .then((res) => {
        alert(
          '인증번호가 [ ' + email.value + ' ]로 발송되었습니다.\r\n 확인 후 인증번호를 입력해주세요'
        )
        isVerify.value = true
      })
  }
}

const verifyCode = () => {
  if (codeValid()) {
    lib
      .api({
        url: '/member/verify-code',
        data: {
          email: email.value,
          type: 'SIGNUP',
          code: authCode.value
        }
      })
      .then((res) => {
        // 비밀번호 입력 창 노출
        // 다음 버튼 위치에 완료 버튼 삽입
        // transition 사용하여 버튼 fade out,in 효과 추가
        // 기존 다음 버튼 클릭 시 signup2로 넘어가던 로직 변경
      })
  }
}

// 완료버튼 event
// 완료 후 alert을 통해 회원가입 완료 안내 및 로그인 페이지 push
</script>
<template>
  <p>본인 확인을 위해 이메일주소를 입력해주세요.</p>

  <label for="cBox">[필수] 본인 인증 이용약관 동의</label>
  <input id="cBox" type="checkbox" :disabled="isVerify" />

  <input type="email" placeholder="it1234@gsitm.com" v-model="email" :disabled="isVerify" />
  <button @click="generateCode">인증번호 발송</button>
  <input type="number" placeholder="인증코드를 입력해주세요" v-model="authCode" />

  <input type="password" placeholder="비밀번호" v-model="authCode" />
  <input type="password" placeholder="비밀번호 확인" v-model="authCode" />

  <p><button @click="verifyCode" :disabled="!isVerify">다음</button></p>
</template>
