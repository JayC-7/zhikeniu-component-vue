const drawerTypes = {
  visible: Boolean,
  title: String,
  width: {
    type: Number,
    default: 720
  },
  maskClosable: Boolean,
  destroyOnClose: Boolean,
  hideFooter: Boolean,
  cancelText: {
    type: String,
    default: '取消'
  },
  okText: {
    type: String,
    default: '确定'
  },
}

export default drawerTypes