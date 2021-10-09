import { Popconfirm, Icon } from "ant-design-vue"
import Button from "./default"
import { getListeners, getPropsSlots } from "../_util/props-util"
import buttonProps from "./buttonTypes"

const props = {
  ...buttonProps,
  title: String,
  cancelText: String,
  okText: String,
  okType: String,
  placement: String,
  icon: String,
  confirmDisabled: Boolean,
}

const DEFAULT_CANCEL = '取消'
const DEFAULT_OK = '确定'
const DEFAULT_PLACEMENT = 'topRight'

/**
 * 点击后弹出confirm气泡的Button组件
 * @param {string} title 气泡中的标题
 * @param {string} cancelText 取消按钮的文字
 * @param {string} okText 确定按钮的文字
 * @param {string} okType 确定按钮的type，同button + danger
 * @param {string} placement 气泡位置
 * @param {string} icon 气泡中的icon，使用type填充
 * @param {boolean} confirmDisabled 激活气泡后是否弹出
 */
export default {
  props,
  render () {
    const {
      title,
      icon,
      cancelText,
      okText,
      okType,
      placement,
      confirmDisabled,
      ...restProps,
    } = this.$props
    const defaultSlots = getPropsSlots(this.$slots, this.$props)

    const confirmProps = {
      attrs: {
        title,
        cancelText: cancelText || DEFAULT_CANCEL,
        okText: okText || DEFAULT_OK,
        okType: okType,
        placement: placement || DEFAULT_PLACEMENT,
        disabled: confirmDisabled,
      },
      on: {
        ...getListeners(this)
      },
      class: [
        'alv-confirm-btn'
      ]
    }

    const btnProps = {
      attrs: {
        ...restProps,
      }
    }

    return (
      <Popconfirm {...confirmProps}>
        {
          icon &&
          <Icon slot="icon" type={icon} class="alv-confirm-btn-icon" /> ||
          null
        }
        <Button {...btnProps}>{defaultSlots}</Button>
      </Popconfirm>
    )
  }
}