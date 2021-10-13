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
    <alv-drawer :visible="drawerVisible" hideFooter title="标题" @close="drawerClose" @ok="drawerOk">
      hello~<br />
      hello~<br />
      hello~
    </alv-drawer>
    <alv-editable-cell :defaultValue="cellValue" :beforeUpdate="cellBeforeUpdate" :onUpdate="cellUpdate" :shouldEditing="cellShouldEditing">{{cellValue}}</alv-editable-cell>
    <alv-list :col="2">
      <alv-list-item label="姓名">张三</alv-list-item>
      <alv-list-item label="称谓">法外狂徒</alv-list-item>
    </alv-list>
    <div style="width: 260px;">
      <alv-thumb-list thumb="./bg.png">
        <alv-list-item label="姓名">张三</alv-list-item>
        <alv-list-item label="称谓">法外狂徒</alv-list-item>
      </alv-thumb-list>
    </div>
  </div>
</template>

<script>
import { AlvButton, AlvCascader, AlvDrawer, AlvEditableCell, AlvList } from '../components'

const { AlvBackButton, AlvConfirmButton, AlvGroupButton } = AlvButton
const { AlvMultiCascader } = AlvCascader
const { AlvListItem, AlvThumbList } = AlvList

export default {
  components: {
    AlvButton,
    AlvBackButton,
    AlvConfirmButton,
    AlvGroupButton,
    AlvMultiCascader,
    AlvDrawer,
    AlvEditableCell,
    AlvList,
    AlvListItem,
    AlvThumbList,
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
      testTxt: 'test1',
      drawerVisible: false,
      cellValue: 100,
    }
  },
  methods: {
    handleClick () {
      console.log('==click')
      this.showDrawer()
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
    },
    showDrawer () {
      this.drawerVisible = true
    },
    hideDrawer () {
      this.drawerVisible = false
    },
    drawerClose () {
      this.hideDrawer()
      console.log('===drawer close')
    },
    drawerOk () {
      this.hideDrawer()
      console.log('===drawer ok')
    },
    cellShouldEditing () {
      return false
    },
    cellBeforeUpdate (val) {
      console.log('cell before update', val)
      return val
    },
    cellUpdate (val) {
      console.log('cell update', val)
      this.cellValue = val
      return Promise.resolve()
    },
  }
}
</script>

<style>

</style>