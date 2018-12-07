<template>
  <div class="app-container">
    <el-table :data="datas">
      <el-table-column label="申请时间" prop="time0" align="center"/>
      <el-table-column label="提现银行" prop="bank" align="center"/>
      <el-table-column label="提现金额" prop="money" align="center"/>
      <el-table-column label="到账时间" prop="time1" align="center"/>
      <el-table-column label="状态" prop="status" align="center"/>
      <el-table-column label="申请人" prop="people" align="center"/>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark ? scope.row.remark : '无' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'WithdrawRecord',
  data() {
    return {
      datas: [
        {
          id: 1,
          time0: '2018-02-15 12:16:32',
          bank: '中国工商',
          money: '1231.12',
          time1: '2018-02-15 12:16:32',
          status: '成功',
          people: '小红',
          remark: '备注'
        },
        {
          id: 1,
          time0: '2018-02-15 12:16:32',
          bank: '中国工商',
          money: '1231.12',
          time1: '2018-02-15 12:16:32',
          status: '成功',
          people: '小红',
          remark: ''
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
