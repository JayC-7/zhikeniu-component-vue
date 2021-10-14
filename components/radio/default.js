import { Radio } from 'ant-design-vue'
import { getListeners, getPropsSlots } from "../_util/props-util"

const props = {
  defaultChecked: Boolean,
  checked: { type: Boolean, default: undefined },
  disabled: Boolean,
  isGroup: Boolean,
  value: Number | String | Boolean,
  name: String,
  id: String,
  autoFocus: Boolean,
}

/**
 * Radio组件
 */
export default {
  props,
  render () {
    const defaultSlot = getPropsSlots(this.$slots, this.$props)
    const radioProps = {
      attrs: {
        ...this.$props,
        ...this.$attrs,
      },
      on: {
        ...getListeners(this),
      },
      class: [
        'alv-radio'
      ]
    }

    return (
      <Radio {...radioProps} >{defaultSlot}</Radio>
    )
  }
}