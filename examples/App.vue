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
  </div>
</template>

<script>
import { AlvButton } from '../components'

const { AlvBackButton, AlvConfirmButton, AlvGroupButton } = AlvButton

export default {
  components: {
    AlvButton,
    AlvBackButton,
    AlvConfirmButton,
    AlvGroupButton,
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