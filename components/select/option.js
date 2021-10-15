import { SelectOption } from 'ant-design-vue'
import { getPropsSlots } from '../_util/props-util'
import optionProps from 'ant-design-vue/lib/vc-select/Option'

const props = {
  ...optionProps.props
}

export default {
  props,
  render () {
    const optionProps = {
      attrs: {
        ...this.$props,
        ...this.$attrs,
      },
      class: [
        'alv-select-option'
      ]
    }
    const defaultSlot = getPropsSlots(this.$slots, this.$props)

    return (
      <SelectOption {...optionProps}>{ defaultSlot }</SelectOption>
    )
  }
}