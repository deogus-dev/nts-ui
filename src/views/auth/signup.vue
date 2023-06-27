<script setup>
import { ref, reactive } from 'vue'
import lib from '~/util/axiosModule'
import valid from '~/util/validation'
import { useRouter } from 'vue-router'

const router = useRouter()

const member = reactive({
  agree: null,
  email: null,
  authCode: null,
  password: null,
  passwordChk: null,
  name: null,
  contact: null
})

/*
  step
    0 : 인증번호 발송 전
    1 : 인증번호 발송 완료, 인증번호 입력 전
    2 : 인증번호 검증 완료, 비밀번호 입력 전
    3 : 비밀번호 입력 완료, 추가정보 입력 전
    4 : end
*/
const step = ref(0)

const nextStep = () => {
  if (step.value === 2) {
    if (!valid('password', member.password)) {
      return false
    }
  }
  step.value += 1
}

const generateCode = () => {
  if (!member.agree) {
    alert('본인 인증 이용약관 동의가 필요합니다.')
    return false
  }
  if (valid('email', member.email)) {
    lib
      .api({
        url: '/member/generate-code',
        data: {
          email: member.email,
          type: 'SIGNUP'
        }
      })
      .then((res) => {
        alert(
          '인증번호가 [ ' +
            member.email +
            ' ]로 발송되었습니다.\r\n 확인 후 인증번호를 입력해주세요'
        )
        nextStep()
      })
  }
}

const verifyCode = () => {
  if (valid('authCode', member.authCode)) {
    lib
      .api({
        url: '/member/verify-code',
        data: {
          email: member.email,
          type: 'SIGNUP',
          code: member.authCode
        }
      })
      .then((res) => {
        nextStep()
      })
  }
}

const signup = () => {
  if (member.password !== member.passwordChk) {
    alert('비밀번호가 일치하지 않습니다.')
    return false
  }

  if (valid('password', member.password)) {
    lib
      .api({
        url: '/member/new',
        data: {
          companyCode: 'CP01',
          contact: '010-1111-2222',
          email: member.email,
          name: member.name,
          password: member.password,
          pushAgreeYn: member.agree
        }
      })
      .then((res) => {
        alert('환영합니다. [' + res.data.name + '] 님,\r\n로그인 페이지로 이동합니다.')
        router.push('/login')
      })
  }
}

// 완료버튼 event
// 완료 후 alert을 통해 회원가입 완료 안내 및 로그인 페이지 push
</script>
<template>
  {{ step }}
  <p>본인 확인을 위해 이메일주소를 입력해주세요.</p>

  <label for="cBox">[필수] 본인 인증 이용약관 동의</label>
  <input
    id="cBox"
    type="checkbox"
    v-model="member.agree"
    true-value="Y"
    false-value="N"
    :disabled="step != 0"
  />

  <br />

  <input type="email" placeholder="it1234@gsitm.com" v-model="member.email" :disabled="step >= 1" />
  <button @click="generateCode" :disabled="step >= 1">인증번호 발송</button>
  <!-- <transition-group name="slide-fade" mode="out-in"> -->
  <input
    type="number"
    placeholder="인증코드를 입력해주세요"
    v-model="member.authCode"
    v-if="step == 1"
  />
  <button @click="verifyCode" v-if="step == 1" :disabled="step >= 2">인증번호 검증</button>

  <br />

  <input type="password" placeholder="비밀번호" v-model="member.password" v-if="step == 2" />
  <input
    type="password"
    placeholder="비밀번호 확인"
    v-model="member.passwordChk"
    v-if="step == 2"
  />
  <button
    @click="nextStep"
    :disabled="step == 3 && member.password && member.password != member.passwordChk"
    v-if="step == 2"
  >
    다음
  </button>
  <!-- </transition-group> -->

  <input type="text" placeholder="사용자 이름" v-model="member.name" v-if="step == 3" />
  <input type="text" placeholder="전화번호" v-model="member.contact" v-if="step == 3" />

  <button @click="signup" v-if="step == 3">완료</button>
</template>
