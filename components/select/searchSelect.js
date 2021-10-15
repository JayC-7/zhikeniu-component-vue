import Select from './default'
import Option from './option'

const props = {
  hideDefault: Boolean,
  value: String | Number | Boolean,
  options: {
    type: Array,
    default: () => {return []},
  }
}

export default {
  props,
  data () {
    return {
      selectValue: null,
    }
  },
  watch: {
    value (val) {
      this.selectValue = val
    }
  },
  mounted () {
    this.selectValue = this.value
  },
  methods: {
    handleChange (e) {
      console.log('==change', e)
    },
    onSearch () {},
  },
  render () {
    const selectProps = {
      attrs: {
        value: this.selectValue,
        allowClear: true,
        showSearch: true,
        filterOption: false,
        notFoundContent: null,
      },
      on: {
        change: this.handleChange,
        search: this.onSearch
      }
    }

    return (
      <Select {...selectProps}>
        {
          !this.hideDefault &&
          <Option value="">全部</Option>
        }
        {
          this.options.map(option => 
            <Option key={option.value} value={option.value}>{
              option.customRender ? option.customRender() : option.label
            }</Option>
          )
        }
      </Select>
    )
  }
}