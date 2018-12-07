<template>
  <div class="app-container">
    <el-table :data="datas">
      <el-table-column label="业务类型" prop="type" align="center"/>
      <el-table-column label="交易流水号" prop="type" align="center"/>
      <el-table-column label="金额" prop="type" align="center"/>
      <el-table-column label="交易发生时间" prop="type" align="center"/>
      <el-table-column label="说明" prop="type" align="center"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'FreezingAmount',
  data() {
    return {
      datas: []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
