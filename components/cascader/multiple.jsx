import { Cascader, Select } from "ant-design-vue"
import cascaderProps from './cascaderTypes'

const props = {
  ...cascaderProps,
  options: Array,
  divider: {
    type: String,
    default: '>'
  }
}

/**
 * 级联多选组件
 * @param {array} options 级联组件的选项，[{ label: '', value: '', children: [...] }]
 * @param {string} divider 父项与子项的分隔符号，默认值为”>“
 */
export default {
  props,
  data () {
    return {
      selectedValue: [],
      selectedTree: {},
    }
  },
  mounted () {
    this.initValue(this.defaultValue, this.options)
  },
  watch: {
    selectedValue (val) {
      const tempVal = val.map(item => {
        return JSON.parse(item.key)
      })
      this.fireChange(tempVal)
    },
    defaultValue (val) {
      this.initValue(val, this.options)
    },
  },
  computed: {
    midDivider () {
      return ` ${this.divider} `
    }
  },
  methods: {

    // 填充初始值
    initValue (value, options) {
      const valueResult = this.getValueFromOptions(options, value)
      valueResult.forEach(item => {
        this.setSelectedTree(item, this.selectedTree)
      })
      this.getSelected()
    },

    // 从options中提取值
    getValueFromOptions (options, values) {
      let result = []
      values.forEach(item => {
        const temp = this.recursionValueFromOptions(options, item)
        result.push(temp)
      })
      return result
    },

    recursionValueFromOptions (options, values, result = []) {
      if (!(options && options.length && values && values.length)) {
        return result
      }

      const tempValues = [].concat(values)
      const curValue = tempValues.shift()

      for (let item of options) {
        if (item.value === curValue) {
          result.push({
            label: item.label, 
            value: item.value,
          })
          return this.recursionValueFromOptions(item.children, tempValues, result)
        }
      }
    },

    // 提交change
    fireChange (value) {
      this.$emit('change', value)
    },

    // cascader的change事件
    handleChange (_, selectedOptions) {
      this.setSelectedTree(selectedOptions, this.selectedTree)
      this.getSelected()
    },

    // 获取
    getSelected () {
      const selectedValue = []
      
      this.parseValTree(this.selectedTree, selectedValue)
      this.selectedValue = selectedValue
    },

    // 解析value树构建val&label
    parseValTree (valTree, result, val = [], label = '') {
      if (!valTree.children) {
        result.push({
          label: label, 
          key: JSON.stringify(val),
        })
        return 
      }
      
      Object.keys(valTree.children).forEach(valNodeKey => {
        const valNode = valTree.children[valNodeKey]
        const tempVal = val.concat(valNode.value)
        let midffix = this.midDivider
        if (!label) {
          midffix = ''
        }
        const tempLabel = `${label}${midffix}${valNode.label}`
        this.parseValTree(valNode, result, tempVal, tempLabel)
      })
    },

    // 构建value树🌲
    setSelectedTree (selectedOptions, storage, fieldLabel = 'label', fieldVal = 'value') {
      if (!(selectedOptions && selectedOptions.length)) {
        delete storage.children
        return true
      }
      
      if (!storage.children) {
        storage.children = {}
      }

      const tempSelectedOptions = [].concat(selectedOptions)
      const currentOption = tempSelectedOptions.shift()
      const storageItem = storage.children
      const key = currentOption[fieldVal]
      
      if (!storageItem[key]) {
        storageItem[key] = {
          label: currentOption[fieldLabel],
          value: currentOption[fieldVal]
        }
      }
      this.setSelectedTree(tempSelectedOptions, storageItem[key], fieldLabel, fieldVal)
    },

    // select的change事件
    handleSelectChange (value) {
      const tempValue = []
      value.forEach(item => {
        const valArr = JSON.parse(item.key)
        const labelArr = item.label.split(this.midDivider)
        valArr.forEach((innerItem, index) => {
          tempValue.push({
            label: labelArr[index],
            value: innerItem
          })
        })
      })
      this.clearSelectedTree()
      this.setSelectedTree(tempValue, this.selectedTree)
      this.selectedValue = value
    },

    clearSelectedTree () {
      this.selectedTree = {}
    },
  },
  render () {
    const { options, changeOnSelect } = this.$props
    
    const cascaderProps = {
      attrs: {
        options,
        changeOnSelect,
      },
      class: [
        'alv-multiple-cascader'
      ],
      on: {
        change: this.handleChange,
      },
    }
    
    const selectProps = {
      attrs: {
        mode: "multiple",
        dropdownRender: () => null,
        value: this.selectedValue,
        labelInValue: true,
      },
      class: [
        'alv-multiple-cascader-values'
      ],
      on: {
        change: this.handleSelectChange
      },
    }
    
    return (
      <Cascader {...cascaderProps}>
        <Select {...selectProps} />
      </Cascader>
    )
  },
}
