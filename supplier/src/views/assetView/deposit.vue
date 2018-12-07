<template>
  <div class="app-container">

    <operation-tips title="保证金说明" style="border: 1px solid #eee;">
      <div slot="content">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </div>
    </operation-tips>

    <div class="block" style="margin-top: 40px;">
      <el-form label-width="82px">
        <el-form-item label="缴纳时间">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
      </el-form>
      <el-form :inline="true" label-width="82px">
        <el-form-item label="保证金类型">
          <el-select v-model="type">
            <el-option value="1">全部</el-option>
            <el-option value="0">全部</el-option>
            <el-option value="10">全部</el-option>
            <el-option value="11">全部</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保证金状态">
          <el-select v-model="status">
            <el-option value="1">全部</el-option>
            <el-option value="9">全部</el-option>
            <el-option value="12">全部</el-option>
            <el-option value="51">全部</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="block">
      <el-table :data="datas">
        <el-table-column label="保证金类型" prop="" align="center"/>
        <el-table-column label="保证金状态" prop="" align="center"/>
        <el-table-column label="保证金金额" prop="" align="center"/>
        <el-table-column label="交保时间/退保时间" prop="" align="center"/>
        <el-table-column label="说明" prop="" align="center"/>
        <el-table-column label="操作" prop="" align="center"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import OperationTips from '@/components/OperationTips'

export default {
  name: 'Deposit',
  components: {
    OperationTips
  },
  data() {
    return {
      time: '',
      type: '',
      status: '',
      datas: []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
