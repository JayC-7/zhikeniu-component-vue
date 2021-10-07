import { defineComponent, ExtractPropTypes } from 'vue'
import buttonProps, { ButtonProps } from './buttonTypes'
import { Popconfirm, Button } from 'ant-design-vue'
import PropTypes from '../_util/vue-types'
import { getPropsSlots } from '../_util/props-util'

const confirmPlacement = ['topLeft', 'top', 'topRight', 'leftTop', 'left', 'leftBottom', 'rightTop', 'right', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight']

const confirmButtonProps = {
  disabled: PropTypes.bool,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  placement: PropTypes.oneOf(confirmPlacement),
  overlayStyle: PropTypes.object
}

export type ConfirmButtonProps = Partial<ExtractPropTypes<typeof confirmButtonProps> & ButtonProps>

/**
 * 点击后弹出确认气泡的按钮，一般用于需要用户二次确认的快捷操作
 * props:
 *    @param {String}title: 确认框的描述
 *    @param {small|normal|large}size: 按钮尺寸，默认值“small”
 *    @param {Boolean}danger: 按钮是否为danger类型
 *    @param {Boolean}disabled: 按钮是否可点击
 *    @param {String}overlayStyle: 用于覆盖按钮的样式
 *    @param {link|primary|dashed|danger}type: 按钮类型，默认值“link”
 *    @param {String}cancelText: 取消按钮文字，默认值“取消”
 *    @param {String}okText: 确认按钮文字，默认值“确定”
 *    @param {topLeft|top|topRight|leftTop|left|leftBottom|rightTop|right|rightBottom|bottomLeft|bottom|bottomRight}placement: 气泡位置，默认值“topRight”
 */
const DEFAULT_CANCEL = '取消'
const DEFAULT_OK = '确定'
const DEFAULT_PLACEMENT = 'topRight'
const DEFAULT_TYPE = 'link'
export default defineComponent({
  name: 'AlvConfirmButton',
  props: {
    ...buttonProps,
    ...confirmButtonProps,
  },
  emits: ['confirm', 'cancel'],
  setup (props, { slots, emit }) {
    const defaultSlot = getPropsSlots(slots, props)
    
    const handleConfirm = (event: Event) => {
      emit('confirm', event)
    }

    const handleCancel = (event: Event) => {
      emit('cancel', event)
    }

    return () => {
      const popConfirmProps = {
        disabled: props.disabled,
        title: props.title,
        cancelText: props.cancelText || DEFAULT_CANCEL,
        okText: props.okText || DEFAULT_OK,
        placement: props.placement || DEFAULT_PLACEMENT,
        onConfirm: handleConfirm,
        onCancel: handleCancel,
      }

      const btnProps = {
        disabled: props.disabled,
        danger: props.danger,
        type: props.type || DEFAULT_TYPE,
        size: props.size,
        overlayStyle: props.overlayStyle,
      }

      return (
        <Popconfirm {...popConfirmProps}>
          <Button {...btnProps}>
            {defaultSlot}
          </Button>
        </Popconfirm>
      )
    }
  }
})