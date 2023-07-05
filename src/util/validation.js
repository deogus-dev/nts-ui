import constants from '~/util/constants'

var regx = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  authCode: /^\d{6}$/
}

const valid = (type, target) => {
  if (!target) {
    alert(constants[type] + '을 입력해주세요')
    return false
  }

  if (regx[type] && !regx[type].test(target)) {
    alert(constants[type] + ' 형식이 올바르지 않습니다!')
    return false
  }

  //   switch (type) {
  //     case 'email':
  //       if (!regx.email.test(target)) {
  //         alert('이메일 형식이 아닙니다!')
  //         return false
  //       }

  //     case 'password':
  //       //비밀번호 형식
  //       return true

  //     case 'authCode':
  //         if(!regx.authCode.test(target))
  //       //인증번호 6자리 체크
  //       return true
  //   }

  return true
}

export default valid
