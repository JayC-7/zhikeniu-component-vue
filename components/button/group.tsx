import { defineComponent, ExtractPropTypes } from 'vue'
import PropTypes from '../_util/vue-types'
import { Button } from 'ant-design-vue'

const DataSourceItem = {
  icon: PropTypes.VNodeChild,
  key: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
}

const groupButtonProps = {
  dataSource: PropTypes.arrayOf(PropTypes.shape(DataSourceItem)).def([]),
  multiple: PropTypes.bool
}

export type dataSourceItem = Partial<ExtractPropTypes<typeof DataSourceItem>>

export type GroupButtonProps = Partial<ExtractPropTypes<typeof groupButtonProps>>

export default defineComponent({
  props: {
    ...groupButtonProps
  },
  data () {
    return {
      active: []
    }
  },
  methods: {
    handleClick (record: dataSourceItem): void {
      this.addActive(record.key)
      record.onClick?.()
    },
    addActive (key: string) {
      if (this.multiple) {
        this.active = this.active.filter(item => item !== key).concat(key)
      } else {
        this.active = [key]
      }
    },
    removeActive (key: string) {
      this.active = this.active.filter(item => item !== key)
    },
  },
  render () {
    const { dataSource } = this.$props
    return (
      <div class="alv-group-button">
        {
          dataSource.map((item) => {
            const IconCom: any = item.icon
            return (
              <Button
                key={item.key}
                class={(this.active.indexOf(item.key) > -1) ? 'active-button' : ''}
                onClick={() => this.handleClick(item)}
              >
                {item.icon && <IconCom />}
                {item.label}
              </Button>
            )
          })
        }
      </div>
    )
  }
})