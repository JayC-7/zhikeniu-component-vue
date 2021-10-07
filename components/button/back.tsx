import { defineComponent, ExtractPropTypes } from 'vue'
import { Button } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import { getPropsSlots } from '../_util/props-util'
import buttonProps, { ButtonProps } from './buttonTypes'
import PropTypes from '../_util/vue-types'

const backButtonProps = {
  // path: {
  //   type: String as PropType<string>,
  //   default: '/'
  // },
  // params: {
  //   type: Object as PropType<object>,
  //   default: () => {
  //     return {}
  //   }
  // }
}

export type BackButtonProps = Partial<ExtractPropTypes<typeof backButtonProps> & ButtonProps>

export default defineComponent({
  props: {
    ...backButtonProps,
    ...buttonProps
  },
  setup (props, { slots }) {
    const defaultProps = getPropsSlots(slots, props)
    return () => {
      return (
        <Button {...props} class="alv-back-button" type="link">
          <LeftOutlined />
          {defaultProps}
        </Button>
      )
    }
  }
})