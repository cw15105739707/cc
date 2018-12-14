<template>
  <div class="prompt">
    <el-collapse @change="handleChange">
      <el-collapse-item :title="title">
        <slot name="context"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'Prompt',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.prompt{
  padding: 10px 18px;
  margin-bottom: 12px;
  .el-collapse{
    border-top: none;
    border-bottom: none;
  }
}
</style>
