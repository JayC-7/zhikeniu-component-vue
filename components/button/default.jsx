import { Button } from 'ant-design-vue'
import { getListeners, getPropsSlots } from '../_util/props-util'
import buttonProps from './buttonTypes'

const props = buttonProps

/**
 * Button组件
 * 1. 支持所有AntdButton组件属性
 * 2. 除danger外新增支持success/warning状态，优先级danger > warning > success
 */
export default {
  name: 'AlvButton',
  props,
  render () {
    const { danger, success, warning, ...restProps } = this.$props

    // danger > warning > success
    let type
    if (success) type = 'success'
    if (warning) type = 'warning'
    if (danger) type = 'danger'

    const props = {
      attrs: {
        ...restProps
      },
      on: {
        ...getListeners(this)
      },
      class: [
        'alv-btn',
        this.$props.type ? `alv-btn-${this.$props.type}` : '',
        type ? `alv-btn-${type}` : '',
      ]
    }

    const defaultSlots = getPropsSlots(this.$slots, this.$props)
    
    return (
      <Button
        {...props}
      >
        {defaultSlots}
      </Button>
    )
  }
}