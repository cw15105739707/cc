<template>
  <div class="app-container">

    <operation-tips title="操作提示" style="border: 1px solid #eee;">
      <div slot="content">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </div>
    </operation-tips>

    <el-tabs type="border-card">
      <el-tab-pane label="我的收入">
        <my-income/>
      </el-tab-pane>
      <el-tab-pane label="提现记录">
        <withdraw-record/>
      </el-tab-pane>
      <el-tab-pane label="不可余额">
        <freezing-amount/>
      </el-tab-pane>
      <el-tab-pane label="保证金">
        <deposit/>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import OperationTips from '@/components/OperationTips'
import Deposit from './deposit'
import FreezingAmount from './freezingAmount'
import MyIncome from './myIncome'
import WithdrawRecord from './withdrawRecord'

export default {
  name: 'Asset',
  components: {
    OperationTips,
    Deposit,
    FreezingAmount,
    MyIncome,
    WithdrawRecord
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
