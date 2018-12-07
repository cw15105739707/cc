<template>
  <div class="app-container">

    <operation-tips title="操作提示" style="border: 1px solid #eee;">
      <div slot="content">
        <div>1、按线路周期生成账单进行结算，比如一个月，则账单是（2017-01-01至2017-01-31）</div>
        <div>2、设置天数按10天，记账日设定为2017-01-01，则出账时间为2017-01-11，以此类推，下一个出账日为2017-01-21</div>
      </div>
    </operation-tips>

    <div class="block">
      <h3>结算设置</h3>
      <p>结算模式：合同约定模式</p>
      <p>结算周期：按月结算</p>
    </div>

  </div>
</template>

<script>
import OperationTips from '@/components/OperationTips'

export default {
  name: 'Setting',
  components: {
    OperationTips
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    background-color: #f5f5f5;
  }
</style>
