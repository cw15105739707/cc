<template>
  <div class="app-container">

    <operation-tips title="操作提示" style="border: 1px solid #eee;">
      <div slot="content">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </div>
    </operation-tips>

    <div class="order-filter">
      <el-row>
        <el-col :span="12">
          <el-radio-group v-model="type" size="medium">
            <el-radio-button label="全部"/>
            <el-radio-button label="待结算"/>
            <el-radio-button label="结算审核中"/>
          </el-radio-group>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" size="medium">导出订单</el-button>
          <el-input v-model="searchText" placeholder="请输入订单号" prefix-icon="el-icon-search" size="medium" style="width: 300px; margin-left: 20px;" />
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="datas">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="订单号" prop="orderNum" align="center"/>
      <el-table-column label="下单时间" prop="time0" align="center"/>
      <el-table-column label="完成时间" prop="time1" align="center"/>
      <el-table-column label="开始结算时间" prop="time2" align="center"/>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          订单总金额：{{ scope.row.moneyAll }}<br>
          待结算金额：{{ scope.row.moneySettlement }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini">账目明细</el-button>
          <el-button size="mini">申请结算</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 20px;">
      <el-pagination
        :total="count"
        :current-page="pageNo"
        :page-size="pageSize"
        background
        layout="->, total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script>
import OperationTips from '@/components/OperationTips'

export default {
  name: 'SettlementList',
  components: {
    OperationTips
  },
  data() {
    return {
      type: '全部',
      listLoading: false,
      count: 123,
      pageNo: 1,
      pageSize: 6,

      datas: [
        {
          id: 1,
          orderNum: 'LX_12345',
          time0: '2018-12-12 12:34:09',
          time1: '2018-12-12 12:34:09',
          time2: '2018-12-12 12:34:09',
          moneyAll: 1234,
          moneySettlement: 1231,
          status: '未达到结算条件【订单未完成】'
        },
        {
          id: 1,
          orderNum: 'LX_12345',
          time0: '2018-12-12 12:34:09',
          time1: '2018-12-12 12:34:09',
          time2: '2018-12-12 12:34:09',
          moneyAll: 1234,
          moneySettlement: 1231,
          status: '未达到结算条件【订单未完成】'
        },
        {
          id: 1,
          orderNum: 'LX_12345',
          time0: '2018-12-12 12:34:09',
          time1: '2018-12-12 12:34:09',
          time2: '2018-12-12 12:34:09',
          moneyAll: 1234,
          moneySettlement: 1231,
          status: '未达到结算条件【订单未完成】'
        },
        {
          id: 1,
          orderNum: 'LX_12345',
          time0: '2018-12-12 12:34:09',
          time1: '2018-12-12 12:34:09',
          time2: '2018-12-12 12:34:09',
          moneyAll: 1234,
          moneySettlement: 1231,
          status: '未达到结算条件【订单未完成】'
        },
        {
          id: 1,
          orderNum: 'LX_12345',
          time0: '2018-12-12 12:34:09',
          time1: '2018-12-12 12:34:09',
          time2: '2018-12-12 12:34:09',
          moneyAll: 1234,
          moneySettlement: 1231,
          status: '未达到结算条件【订单未完成】'
        },
        {
          id: 1,
          orderNum: 'LX_12345',
          time0: '2018-12-12 12:34:09',
          time1: '2018-12-12 12:34:09',
          time2: '2018-12-12 12:34:09',
          moneyAll: 1234,
          moneySettlement: 1231,
          status: '未达到结算条件【订单未完成】'
        },
        {
          id: 1,
          orderNum: 'LX_12345',
          time0: '2018-12-12 12:34:09',
          time1: '2018-12-12 12:34:09',
          time2: '2018-12-12 12:34:09',
          moneyAll: 1234,
          moneySettlement: 1231,
          status: '未达到结算条件【订单未完成】'
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .order-filter{
    background-color: #fff;
    padding: 15px;
    margin: 12px 0;
  }
</style>
