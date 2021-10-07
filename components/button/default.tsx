import { defineComponent } from '@vue/runtime-core'
import { Button } from 'ant-design-vue'
import buttonProps from './buttonTypes'
import { getPropsSlots } from '../_util/props-util'

export default defineComponent({
  name: 'AlvButton',
  props: {
    ...buttonProps
  },
  setup (props, { slots }) {
    const defaultSlot = getPropsSlots(slots, props)
    
    return () => {
      return (
        <Button class={`alv-button${props.type ? `-${props.type}` : ''}`} {...props} >{ defaultSlot }</Button>
      )
    }
  }
})