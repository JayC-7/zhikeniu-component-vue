import type { ButtonProps as AButtonProps } from 'ant-design-vue'
import aButtonProps from 'ant-design-vue/lib/button/buttonTypes'
import type { ExtractPropTypes } from 'vue'

const _aButtonProps = aButtonProps()

const buttonProps = {
  ..._aButtonProps
}

export type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps> & AButtonProps>

export default buttonProps