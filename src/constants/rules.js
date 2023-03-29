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
  },
  tokenAddress: {
    required: {
      value: true,
      message: 'Địa chỉ token là trường bắt buộc'
    },
  },
  ABI: {
    required: {
      value: true,
      message: 'ABI Contract là trường bắt buộc'
    },
  },
  infuraUrl: {
    required: {
      value: true,
      message: 'Địa chỉ endpoint là trường bắt buộc'
    },
  }
}
