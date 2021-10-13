import { Spin, Icon } from 'ant-design-vue'

const props = {
  loading: Boolean,
}

export default {
  props,
  render () {

    const loadingProps = {
      class: [
        'alv-loading-wrap',
        this.loading ? '' : 'alv-loading-hide'
      ]
    }

    return (
      <div {...loadingProps}>
        <Spin spinning={true}>
          <Icon slot="indicator" type="loading" style="font-size: 40px" spin />
          <p class="alv-loading-label">加载中，请稍后</p>
        </Spin>
      </div>
    )
  }
}