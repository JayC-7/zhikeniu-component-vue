import { createTypes, VueTypesInterface, VueTypeValidableDef } from 'vue-types'
import { VueNode } from '../type'

const PropTypes = createTypes({})

PropTypes.extend([
  {
    name: 'VNodeChild',
    getter: true,
    type: null
  }
])

export default PropTypes as VueTypesInterface & {
  readonly VNodeChild: VueTypeValidableDef<VueNode>
}