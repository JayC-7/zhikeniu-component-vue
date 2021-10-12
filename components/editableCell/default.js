import { getPropsSlots } from "../_util/props-util"
import editableCellProps from "./editableCellProps"
import { InputNumber, Input, Icon } from "ant-design-vue"

const props = {
  ...editableCellProps
}

/**
 * 可编辑的cell组件
 *  - 鼠标hover时显示”edit“icon，点击后组件变为编辑状态，显示输入框
 * @param {number} precision input为number时的精度
 * @param {string} type 输入框的类型'number'|'text'，默认值为'text'
 * @param {stirng|number} defaultValue 输入框的默认值
 * @param {object|array} dataSource 额外的值，一般用于传入should Editing判断是否能唤醒编辑状态...
 * @param {function} beforeUpdate 执行修改前的钩子函数，(value, dateSource) => boolean | Promise，返回false或reject时终止修改操作
 * @param {function} shouldEditing 点击”编辑“按钮的钩子函数，(dataSource) => boolean | Promise，返回false或reject时无法进入编辑状态
 * @param {function} onUpdate 真实的修改函数，(value, dataSource) => Promise，返回Promise用于组件关闭编辑状态
 */
export default {
  props,
  data () {
    return {
      editing: false,
      value: this.defaultValue
    }
  },
  watch: {
    defaultValue (val) {
      this.value = val
    }
  },
  methods: {
    handleUpdate () {
      if (this.beforeUpdate) {
        const value = this.beforeUpdate(this.value, this.dataSource)

        // if 'beforeUpdate' return Boolean
        if (typeof value === 'boolean') {
          if (value !== false) {
            this.doUpdate(value)
          }
          return
        }

        // if 'beforeUpdate' return Promise
        if (value instanceof Promise) {
          value.then((resultValue) => {
            this.doUpdate(resultValue)
          }).catch()
          return
        }
      }
      this.doUpdate(this.value)
    },
    
    handleChange (val) {
      if (val.target) {
        this.value = val.target.value
      } else {
        this.value = val
      }
    },

    handleClick () {
      if (this.shouldEditing) {
        const shouldEditing = this.shouldEditing(this.dataSource)

        // if shouldEditing return boolean
        if (typeof shouldEditing === 'boolean') {}

        // if shouldEditing return Promise
        if (shouldEditing instanceof Promise) {}
      }
      this.editing = true
    },

    // 执行update操作
    doUpdate (value) {
      if (this.onUpdate) {
        this.onUpdate(value, this.dataSource).finally(() => {
          this.editing = false
        })
      }
    },
  },
  render () {
    const cellProps = {
      class: [
        'alv-editable-cell',
        this.editing ? 'alv-editable-cell-editing' : '',
      ]
    }

    const inputProps = {
      attrs: {
        precision: this.precision,
        value: this.value,
      },
      on: {
        change: this.handleChange,
        pressEnter: this.handleUpdate,
      }
    }

    const defaultSlot = getPropsSlots(this.$slots, this.$props)

    const bodyEl = () => {
      if (this.editing) {
        let inputEl = []
        // input
        if (this.type === 'number') {
          inputEl.push(<InputNumber {...inputProps} />)
        } else {
          inputEl.push(<Input {...inputProps} />)
        }
        // icon
        inputEl.push(<Icon
          class="alv-editable-cell-update"
          type="check"
          title="确认修改"
          onClick={this.handleUpdate}
        />)
        return inputEl
      } else {
        const slotEl = [defaultSlot]
        slotEl.push(<Icon
          class="alv-editable-cell-update"
          type="edit"
          title="点击修改"
          onClick={this.handleClick}
        />)
        return slotEl
      }
    }

    return (
      <div {...cellProps}>
        {
          bodyEl()
        }
      </div>
    )
  }
}