import { Button, Icon } from 'ant-design-vue'
import { getListeners, getPropsSlots } from '../_util/props-util'

const props = {}

/**
 * back button组件，用于页面上返回按钮
 *  - 暂无需求支持其他属性
 */
export default {
  props,
  render () {
    const props = {
      attrs: {
        ...this.$props,
      },
      on: {
        ...getListeners(this)
      },
      class: [
        'alv-back-btn'
      ]
    }

    const defaultSlots = getPropsSlots(this.$slots, this.$props)

    return (
      <div {...props}>
        <Button type="link" class="alv-back-btn-btn"><Icon type="left" class="alv-back-btn-icon" />{defaultSlots}</Button>
      </div>
    )
  }
}