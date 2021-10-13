import { getPropsSlots } from "../_util/props-util"
import listProps from "./listProps"

const props = {
  ...listProps
}

/**
 * list组件
 *  - 用于展示列表，目前只支持1~2列
 * @param {number} col 列表列数
 */
export default {
  props,
  render () {
    const listProps = {
      class: [
        'alv-list',
        `alv-list-col-${this.col}`
      ]
    }

    const defaultSlot = getPropsSlots(this.$slots, this.$props)

    return (
      <ul {...listProps}>{defaultSlot}</ul>
    )
  }
}