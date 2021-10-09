import Button from "./default"
import { Icon } from 'ant-design-vue'

const props = {
  dataSource: {
    type: Array,
    default: () => { return [] }
  },
  multiple: Boolean,
}

/**
 * 按钮组
 *   - 不同于antd的按钮组组件，此组件用于一组按钮存在记录激活状态的需求时，多用于表格页面的删选器，支持多选
 * @param {array} dataSource 用于构建按钮的值
 * @param {boolean} multiple 是否支持多选
 */
export default {
  props,
  data () {
    return {
      active: []
    }
  },
  methods: {
    handleClick (e, record) {
      this.addActive(record.key)
      record.onClick && record.onClick(e)
    },
    addActive (key) {
      if (this.multiple) {
        this.active = this.active.filter(item => item !== key)
        this.active.push(key)
      } else {
        this.active = [key]
      }
    },
    reset () {
      this.active = []
    }
  },
  render () {
    const { dataSource } = this.$props
    return (
      <div class="alv-group-btn">
        {
          dataSource.map(item => {
            const props = {
              attrs: {
                ...item.props
              },
            }
            return (
              <Button
                class={(this.active.indexOf(item.key) > -1 ) && 'alv-group-btn-active' || ''}
                onClick={(e) => this.handleClick(e, item)}
                {...props}
              >
                {item.icon && <Icon type={item.icon} />}
                {item.label}
              </Button>
            )
          })
        }
      </div>
    )
  }
}