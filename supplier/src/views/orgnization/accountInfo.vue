<template>
  <div class="app-container">

    <el-row type="flex" align="middel" justify="space-between">
      <h3>银行卡管理</h3>
      <div>
        <el-button size="small" @click="isShowDialog = true">添加银行卡</el-button>
      </div>
    </el-row>
    <el-table :data="datas">
      <el-table-column label="账户类型" prop="type"/>
      <el-table-column label="户主姓名" prop="name"/>
      <el-table-column label="开户地区" prop="area"/>
      <el-table-column label="银行账号" prop="bankAccount"/>
      <el-table-column label="添加时间" prop="createTime"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑银行卡弹窗 -->
    <el-dialog :visible.sync="isShowDialog" title="新增银行卡" center>
      <el-form label-width="80px" class="form">
        <el-form-item label="账户类型">
          <el-select class="input">
            <el-option label="对公银行账户" value="1"/>
            <el-option label="对私银行账户" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="户主姓名">
          <el-input class="input"/>
        </el-form-item>
        <el-form-item label="户主姓名">
          <el-input class="input"/>
        </el-form-item>
        <el-form-item label="银行账户">
          <el-input class="input"/>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="input"/>
          <el-button type="primary">获取验证码</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDeparture">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  data() {
    return {
      isShowDialog: false,
      datas: [
        {
          id: 1,
          type: '对公账户',
          name: '小胡',
          area: '杭州市下沙区',
          bankAccount: '2234232342423',
          createTime: '2019-12-12 00:23:12'
        },
        {
          id: 1,
          type: '对私账户',
          name: '小胡',
          area: '杭州市西湖区',
          bankAccount: '2234232342423',
          createTime: '2019-12-12 00:23:12'
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .input{
    width: 80%;
  }
</style>
