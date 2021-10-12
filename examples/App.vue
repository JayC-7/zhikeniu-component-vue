<template>
  <div>
    <alv-button type="dashed" danger @click="reset">click</alv-button>
    <alv-back-button @click="handleClick">back</alv-back-button>
    <alv-confirm-button
      title="Are you sure?"
      type="link"
      danger
      okText="Y"
      cancelText="N"
      okType="warning"
      icon="left"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >confirm</alv-confirm-button>
    <alv-group-button :dataSource="groupButtonData" :multiple="false" ref="groupBtn"></alv-group-button>
    <alv-multi-cascader :defaultValue="[['p2'], ['p1', 'c1', 'sc1']]" changeOnSelect :options="cascaderOptions" />
  </div>
</template>
<script>
import { AlvButton, AlvCascader } from '../components'

const { AlvBackButton, AlvConfirmButton, AlvGroupButton } = AlvButton
const { AlvMultiCascader } = AlvCascader

export default {
  components: {
    AlvButton,
    AlvBackButton,
    AlvConfirmButton,
    AlvGroupButton,
    AlvMultiCascader,
  },
  data () {
    this.groupButtonData = [
      {
        label: 'group button1',
        icon: '',
        key: '1',
        onClick: () => {console.log('===group button1')}
      },
      {
        label: 'group button2',
        key: '2',
        onClick: () => {console.log('===group button2')}
      }
    ]
    this.cascaderOptions = [
      {
        value: 'p1',
        label: 'P1',
        children: [
          {
            value: 'c1',
            label: 'C1',
            children: [
              {
                value: 'sc1',
                label: 'SC1'
              }
            ]
          },
          {
            value: 'c2',
            label: 'C2',
          }
        ]
      },
      {
        value: 'p2',
        label: 'P2'
      }
    ]
    return {
      testTxt: 'test1'
    }
  },
  methods: {
    handleClick () {
      console.log('==click')
      this.testTxt = 'test' + Date.now()
    },
    handleConfirm () {
      console.log('confirm!!!')
    },
    handleCancel () {
      console.log('cancel!!!')
    },
    reset () {
      this.$refs.groupBtn.reset()
    }
  }
}
</script>

<style>

</style>