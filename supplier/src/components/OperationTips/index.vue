<template>
  <div class="operation-tips">
    <el-collapse accordion>
      <el-collapse-item :title="title">
        <slot name="content"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'OperationTips',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .operation-tips{
    padding: 10px 18px;
    margin-bottom: 12px;
    background-color: #fff;
    .el-collapse{
      border-top: 0;
    }
    .el-collapse, .el-collapse-item__header, .el-collapse-item__wrap{
      border-bottom: 0;
    }
  }
</style>
