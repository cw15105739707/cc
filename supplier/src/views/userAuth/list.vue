<template>
  <div class="app-container">

    <operation-tips title="操作提示" style="border: 1px solid #eee;">
      <div slot="content">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </div>
    </operation-tips>

    <div class="filter">
      <el-row type="flex">
        <el-button type="primary" size="medium">添加管理员</el-button>
        <el-input v-model="searchText" placeholder="请输入用户昵称" prefix-icon="el-icon-search" size="medium" style="width: 400px; margin-left: 40px;" />
      </el-row>
    </div>

    <el-table :data="datas">
      <el-table-column label="用户名" prop="name" align="center"/>
      <el-table-column label="电话号码" prop="name" align="center"/>
      <el-table-column label="创建时间" prop="createTime" align="center"/>
      <el-table-column label="最后一次登录时间" prop="lastLogin" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini">分配权限</el-button>
          <el-button size="mini">重置密码</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import OperationTips from '@/components/OperationTips'

export default {
  name: 'UserAuthList',
  components: {
    OperationTips
  },
  data() {
    return {
      datas: [
        {
          id: 1,
          name: 'adain',
          tel: '180282811822',
          createTime: '2018-09-12 12:39:20',
          lastLogin: '2018-09-19 12:39:20'
        },
        {
          id: 1,
          name: 'adain',
          tel: '180282811822',
          createTime: '2018-09-12 12:39:20',
          lastLogin: '2018-09-19 12:39:20'
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .filter{
    margin: 30px 0 40px;
  }
</style>
