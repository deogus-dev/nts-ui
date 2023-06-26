import globalConstant from '~/util/globalConstant'

const valid = (type, target) => {
  if (!target) {
    alert(globalConstant[type] + '을 입력해주세요')
    return false
  }

  switch (type) {
    case 'email':
      if (target.indexOf('@') == -1) {
        alert('이메일 형식이 아닙니다.')
        return false
      }

    case 'password':
      //비밀번호 형식
      return true

    case 'authCode':
      //인증번호 6자리 체크
      return true
  }

  return true
}

export default valid
