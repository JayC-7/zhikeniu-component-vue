import { Select } from 'ant-design-vue'
import selectProps from './selectProps'
import { getListeners, getPropsSlots } from '../_util/props-util'

const props = {
  ...selectProps
}

/**
 * select组件
 */
export default {
  props,
  data () {
    return {
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
  },
  render () {
    const selectProps = {
      attrs: {
        ...this.$props,
        ...this.$attrs,
        value: this.value || this.defaultValue
      },
      on: {
        ...getListeners(this),
        change: this.handleChange
      },
      class: [
        'alv-select'
      ]
    }
    const defaultSlot = getPropsSlots(this.$slots, this.$props)

    return (
      <Select style="width: 200px;" {...selectProps}>{defaultSlot}</Select>
    )
  }
}