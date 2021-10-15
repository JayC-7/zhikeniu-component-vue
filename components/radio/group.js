import { Radio as ARadio } from "ant-design-vue"
import Radio from './default'
import Textarea from '../textarea'

const props = {
  value: Number | String | Boolean,
  dataSource: {
    type: Array,
    default: () => { return [] },
  },
  hasCustome: Boolean,
  customeMax: Number,
  customeRow: Number,
}

const { Group } = ARadio

const CUSTOME = '__CUSTOME'

export default {
  props,
  data () {
    return {
      radioValue: '',
      textareaValue: '',
      customeVisible: false,
    }
  },
  watch: {
    radioValue (val) {
      this.customeVisible = val === CUSTOME
    }
  },
  methods: {
    handleChange (e) {
      const value = e.target.value
      if (value === CUSTOME) {
        this.onChange(this.textareaValue)
      } else {
        this.onChange(value)
      }
      this.radioValue = value
    },
    onChange (value) {
      this.$emit('change', value)
    },
    handleTextareaChange (value) {
      this.onChange(value)
      this.textareaValue = value
    },
  },
  render () {
    const groupProps = {
      attrs: {
        name: 'radioGroup',
        value: this.radioValue,
      },
      on: {
        change: this.handleChange,
      },
      class: [
        'alv-radio-group'
      ]
    }

    const textareaProps = {
      attrs: {
        value: this.textareaValue,
        max: this.customeMax
      },
      class: [
        'custome-textarea'
      ],
      on: {
        change: this.handleTextareaChange
      }
    }

    const textareaEl = [
      <Radio key={CUSTOME} value={CUSTOME}>自定义</Radio>,
      this.customeVisible && <Textarea {...textareaProps} />
    ]

    return (
      <Group {...groupProps}>
        {
          this.dataSource.map(item => {
            return (
              <Radio key={item.value} value={item.value}>{item.label}</Radio>
            )
          })
        }
        {
          this.hasCustome && textareaEl          
        }
      </Group>
    )
  }
}