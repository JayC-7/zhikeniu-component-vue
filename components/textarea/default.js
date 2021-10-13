import { Input } from "ant-design-vue"

const { TextArea } = Input

const props = {
  max: {
    type: Number,
    default: 300,
  },
  row: {
    type: Number,
    default: 3,
  },
  value: String,
}

/**
 * 文本域组件
 * @param {number} max 输入框能输入的最大字数
 * @param {number} row 输入框的行数
 * @param {string} value 输入框的值，提供给form组件使用
 */
export default {
  props,
  data () {
    return {
      current: 0,
      textValue: '',
    }
  },
  created () {
    this.textValue = this.value
  },
  watch: {
    value (val) {
      this.textValue = val
    }
  },
  methods: {
    handleChange (e) {
      const val = e.target.value
      let value = val
      if (val.length > this.max) {
        value = val.slice(0, this.max)
        this.onChange(value)
      }
      this.current = value.length
      this.textValue = value
    },
    onChange (value) {
      this.$emit('change', value)
    }
  },
  render () {
    const textareaProps = {
      attrs: {
        row: this.row,
        maxLength: this.max,
        value: this.textValue,
      },
      on: {
        change: this.handleChange
      }
    }

    return (
      <div class="alv-textarea">
        <TextArea {...textareaProps} />
        <div class="alv-textarea-limit">{this.current} / {this.max}</div>
      </div>
    )
  }
}