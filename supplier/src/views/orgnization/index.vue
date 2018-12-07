<template>
  <div class="app-container">

    <operation-tips title="操作提示" style="border: 1px solid #eee;">
      <div slot="content">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </div>
    </operation-tips>

    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <essential-info/>
      </el-tab-pane>
      <el-tab-pane label="账户信息">
        <account-info/>
      </el-tab-pane>
      <el-tab-pane label="联系我们">
        <contact-us/>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import OperationTips from '@/components/OperationTips'
import EssentialInfo from './essentialInfo'
import AccountInfo from './accountInfo'
import ContactUs from './contactUs'
import { getOrganization } from '@/api/supplier'

export default {
  name: 'Seller',
  components: {
    OperationTips,
    EssentialInfo,
    AccountInfo,
    ContactUs
  },
  data() {
    return {
      listLoading: false,
      organizationId: ''
    }
  },
  created() {
    this.fetchData(this.id)
  },
  methods: {
    fetchData(id) {
      this.listLoading = true
      getOrganization({
        ...this.id
      }).then(res => {
        console.log(res)
        this.listLoading = false
      })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">

</style>
