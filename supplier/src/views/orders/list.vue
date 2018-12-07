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
          <el-radio-group v-model="type" size="small" @change="changeStatus">
            <el-radio-button label="">全部订单</el-radio-button>
            <el-radio-button label="UNPAID">待付款</el-radio-button>
            <el-radio-button label="PAID">待出行</el-radio-button>
            <el-radio-button label="COMPLETE">已完成</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" size="medium">导出订单</el-button>
          <el-input v-model="searchText" placeholder="请输入订单名称、编号" prefix-icon="el-icon-search" size="medium" style="width: 300px; margin-left: 20px;" />
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="orderList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="订单号" prop="order">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
      <el-table-column label="下单时间" prop="time">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="出游人数">
        <template slot-scope="scope">
          共{{ scope.row.travellersCount }}人
        </template>
      </el-table-column>
      <el-table-column label="订单金额">
        <template slot-scope="scope">
          订单总金额：&yen;{{ scope.row.paymentAmount }}<br>
          应付金额：&yen;{{ scope.row.grossPrice }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{ scope.row.status | orderState }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="toDetail(scope.row.id)">查看</el-button>
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
import { pageQuery } from '@/api/order'

const orderStates = {
  UNPAID: '待付款',
  PAID: '带出行',
  COMPLETE: '已完成'
}

export default {
  name: 'UNPAID',
  components: {
    OperationTips
  },
  filters: {
    orderState(val) {
      return orderStates[val] || '-'
    }
  },
  data() {
    return {
      listLoading: false,
      orderList: [],
      count: 0,
      pageNo: 1,
      pageSize: 10,
      type: '',
      searchText: ''
    }
  },
  created() {
    this.fetchData({ pageNo: this.pageNo })
  },
  methods: {

    // 获取数据
    fetchData(params) {
      this.listLoading = true
      pageQuery({
        ...params,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, count } = res.data
        this.orderList = rows
        this.count = count
        console.log(this.count)

        this.listLoading = false
      })
    },

    // 按照订单类型进行筛选
    changeStatus(state) {
      console.log('订单类型' + state)
      this.fetchData({
        pageNo: this.pageNo,
        state
      })
    },

    // 查看详情
    toDetail(id) {
      this.$router.push({
        path: `/orders/detail/${id}`
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 点击页码
    handleCurrentChange(val) {
      this.fetchData({ pageNo: val })
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
