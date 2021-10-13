import { getPropsSlots } from '../_util/props-util'
import List from './default'

const props = {
  thumb: String,
  thumbWidth: {
    type: String,
    default: '30%'
  },
  listCol: {
    type: Number,
    default: 1,
  }
}

/**
 * 带有缩略图的列表组件
 * @param {string} thumb 缩略图路径
 * @param {string} thumbWidth 缩略图宽度，需携带单位 px、% ...
 * @param {number} listCol 列表列数
 */
export default {
  props, 
  render () {
    const thumbProps = {
      attrs: {
        alt: '预览图',
        src: this.thumb || '',
      }
    }

    const defaultSlot = getPropsSlots(this.$slots, this.$props)

    return (
      <div class="alv-thumb-list">
        <div class="alv-thumb-list-thumb" style={{width: this.thumbWidth}}>
          <img {...thumbProps}/>
        </div>
        <List class="alv-thumb-list-list" col={this.listCol}>{defaultSlot}</List>
      </div>
    )
  }
}