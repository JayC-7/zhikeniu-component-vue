import { Drawer } from 'ant-design-vue'
import Vue from 'vue'
import Button from '../button'
import { getPropsSlots } from '../_util/props-util'
import drawerTypes from './drawerTypes'

const props = {
  ...drawerTypes
}

// 使用该方式引入Drawer组件，消除"Failed to resolve directive"报错提示
Vue.use(Drawer)

/**
 * Drawer组件
 * @param {boolean} visible drawer组件是否可见
 * @param {string} title 标题
 * @param {number} width 弹出框宽度，默认为720px
 * @param {boolean} maskClosable 点击遮罩层是否关闭drawer
 * @param {boolean} hideFooter 是否隐藏footer部分
 * @param {string} cancelText 取消按钮文字
 * @param {string} okText 确定按钮文字
 */
export default {
  props,
  methods: {
    handleClose (e) {
      this.$emit('close', e)
    },
    handleOk (e) {
      this.$emit('ok', e)
    }
  },
  render () {
    const drawerProps = {
      attrs: {
        visible: this.visible,
        width: this.width,
        title: this.title,
        maskClosable: this.maskClosable,
        destroyOnClose: this.destroyOnClose,
      },
      on: {
        close: this.handleClose
      },
      class: [
        'alv-drawer'
      ]
    }
    const defaultSlots = getPropsSlots(this.$slots, this.$props)
    return (
      <Drawer {...drawerProps}>
        {defaultSlots}
        {
          !this.hideFooter &&
          <div class="alv-drawer-footer">
            <Button onClick={this.handleClose}>{this.cancelText}</Button>
            <Button type="primary" onClick={this.handleOk}>{this.okText}</Button>
          </div>
        }
      </Drawer>
    )
  }
}