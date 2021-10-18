import { Tooltip } from "ant-design-vue"
import { getPropsSlots } from "../_util/props-util"

const props = {
  placement: String,
  width: Number,
}

export default {
  props,
  render () {
    const defaultSlot = getPropsSlots(this.$slots, this.$props)

    return (
      <Tooltip placement={this.placement}>
        <template slot="title">{defaultSlot}</template>
        <span style={`width: ${this.width}px;`} class="text-ellipsis">{defaultSlot}</span>
      </Tooltip>
    )
  }
}