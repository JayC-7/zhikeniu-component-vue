<template>
  <div>
    <alv-button type="danger" @click="handleClick">click</alv-button>
    <alv-link-button @click="handleClick">link click</alv-link-button>
    <alv-back-button @click="handleClick">back</alv-back-button>
    <alv-group-button :dataSource="groupButtonData" :multiple="true"></alv-group-button>
    <alv-confirm-button
      title="confirm?"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >confirm</alv-confirm-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { AlvButton } from '../components'
import { StepBackwardOutlined } from '@ant-design/icons-vue'

const { AlvLinkButton, AlvBackButton, AlvGroupButton, AlvConfirmButton } = AlvButton

export default defineComponent({
  components: {
    AlvButton,
    AlvLinkButton,
    AlvBackButton,
    AlvGroupButton,
    AlvConfirmButton
  },
  data () {
    this.groupButtonData = [
      {
        label: 'group button1',
        icon: StepBackwardOutlined,
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
    }
  }
})
</script>

<style>

</style>