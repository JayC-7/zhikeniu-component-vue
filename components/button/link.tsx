import { defineComponent, ExtractPropTypes } from 'vue'
import { Button } from 'ant-design-vue'
import buttonProps, { ButtonProps } from './buttonTypes'
import { getPropsSlots } from '../_util/props-util'
import PropTypes from '../_util/vue-types'

const linkStatus = ['success', 'danger', 'warning']

/**
 * 链接式按钮
 * @params status {linkStatus}: 用于控制显示样式
 */
const linkButtonProps = {
  status: PropTypes.oneOf(linkStatus)
}

export type LinkButtonProps = Partial<ExtractPropTypes<typeof linkButtonProps> & ButtonProps>

export default defineComponent({
  name: 'AlvLinkButton',
  props: {
    ...buttonProps,
    ...linkButtonProps
  },
  setup (props, { slots }) {
    const defaultSlots = getPropsSlots(slots, props)
    return () => {
      return (
        <Button
          class={ `alv-link-button${props.status ? `-${props.status}` : ''}` }
          {...props}
          type="link"
        >{ defaultSlots }</Button>
      )
    }
  }
})