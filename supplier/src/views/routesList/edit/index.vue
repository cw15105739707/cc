<template>
  <div class="app-container">
    <operation-tips title="操作提示" style="border: 1px solid #eee;">
      <div slot="content">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </div>
    </operation-tips>
    <router-view/>
  </div>
</template>

<script>
import OperationTips from '@/components/OperationTips'

export default {
  name: 'Edit',
  components: {
    OperationTips
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .max-persons-row + .el-form-item__error{
    margin-left: 30px;
  }
</style>

<style scoped>
  .app-container{
    background-color: #f5f5f5;
  }
  .tips{
    margin: 0;
    font-size: 12px;
    color: red;
  }
  .tinymce-textarea{
    visibility: hidden;
    z-index: -1;
  }
  .upload-tips {
    margin: 0;
    line-height: 22px;
  }
  .detail-des{
    padding: 10px;
    margin-bottom: 12px;
    border: 1px dashed blue;
  }
  .detail-des p{
    margin: 6px 0;
  }
</style>
