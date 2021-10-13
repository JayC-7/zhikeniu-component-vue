import { getPropsSlots } from "../_util/props-util"

const props = {
  label: String,
  divider: {
    type: String,
    default: '：'
  }
}

/**
 * listItem组件
 *  - 与List组件配合使用
 * @param {string} label 项标题
 * @param {string} divider 项标题与值分隔符，默认为"："
 */
export default {
  props,
  render () {
    const defaultSlot = getPropsSlots(this.$slots, this.$props)
    return (
      <li class="alv-list-item">
        {
          this.label && <label class="alv-list-item-label">{this.label + this.divider}</label>
        }
        { defaultSlot }
      </li>
    )
  }
}