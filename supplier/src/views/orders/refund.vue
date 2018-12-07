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
            <el-radio-button label="全部退单"/>
            <el-radio-button label="申请退款"/>
            <el-radio-button label="退款审核中"/>
            <el-radio-button label="退款完成"/>
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
      :data="datas"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="订单号" prop="order"/>
      <el-table-column label="下单时间" prop="time"/>
      <el-table-column label="用户">
        <template slot-scope="scope">
          {{ scope.row.name }}【{{ scope.row.tel }}】
        </template>
      </el-table-column>
      <el-table-column label="出游人">
        <template slot-scope="scope">
          {{ scope.row.people.length }}人<br>
          {{ scope.row.people.join(',') }}
        </template>
      </el-table-column>
      <el-table-column label="订单金额">
        <template slot-scope="scope">
          订单总金额：&yen;{{ scope.row.moneyAll }}<br>
          应付金额：&yen;{{ scope.row.moneyPay }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{ scope.row.status }}
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

export default {
  name: 'Refund',
  components: {
    OperationTips
  },
  data() {
    return {
      type: '全部订单',
      listLoading: false,
      count: 123,
      pageNo: 1,
      pageSize: 6,

      datas: [
        {
          id: 1,
          order: 'LX_1024556',
          time: '2018-12-12 14:12:12',
          tel: '18069611356',
          name: 'adain',
          people: ['小花', 'dingding', 'node'],
          moneyAll: 1586.12,
          moneyPay: 1586.10,
          status: '已支付'
        },
        {
          id: 11,
          order: 'LX_1024556',
          time: '2018-12-12 14:12:12',
          tel: '18069611356',
          name: 'adain',
          people: ['小花', 'dingding', 'node'],
          moneyAll: 1586.12,
          moneyPay: 1586.10,
          status: '已支付'
        },
        {
          id: 12,
          order: 'LX_1024556',
          time: '2018-12-12 14:12:12',
          tel: '18069611356',
          name: 'adain',
          people: ['小花', 'dingding', 'node'],
          moneyAll: 1586.12,
          moneyPay: 1586.10,
          status: '已支付'
        },
        {
          id: 13,
          order: 'LX_1024556',
          time: '2018-12-12 14:12:12',
          tel: '18069611356',
          name: 'adain',
          people: ['小花', 'dingding', 'node'],
          moneyAll: 1586.12,
          moneyPay: 1586.10,
          status: '已支付'
        },
        {
          id: 14,
          order: 'LX_1024556',
          time: '2018-12-12 14:12:12',
          tel: '18069611356',
          name: 'adain',
          people: ['小花', 'dingding', 'node'],
          moneyAll: 1586.12,
          moneyPay: 1586.10,
          status: '已支付'
        },
        {
          id: 15,
          order: 'LX_1024556',
          time: '2018-12-12 14:12:12',
          tel: '18069611356',
          name: 'adain',
          people: ['小花', 'dingding', 'node'],
          moneyAll: 1586.12,
          moneyPay: 1586.10,
          status: '已支付'
        }
      ]
    }
  },
  methods: {

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
      this.fetchData(val)
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
