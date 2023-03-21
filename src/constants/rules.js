import { isEmail } from '../utils/helper'

export const rules = {
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc nhập'
    },
    validate: {
      email: v => isEmail(v) || 'Email không đúng định dạng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc nhập'
    }
  }
}
