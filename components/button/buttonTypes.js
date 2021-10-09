import buttonTypes from "ant-design-vue/lib/button/buttonTypes"

const buttonProps = {
  ...buttonTypes(),
  danger: Boolean,
  warning: Boolean,
  success: Boolean,
}

export default buttonProps