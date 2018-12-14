<template>
  <div>

    <prompt title="操作提示" style="border: 1px solid #eee">
      <template slot="context">
        <div>点击订单即可进入详情页面对订单进行操作；</div>
        <div>Tab切换不同状态下的订单，便于分类订单。</div>
      </template>
    </prompt>

    <div class="btnRow">
      <el-row>
        <el-col :span="12">
          <el-radio-group v-model="radio" size="small" @change="changeOrder">
            <el-radio-button label="">全部订单</el-radio-button>
            <el-radio-button label="UNPAID">待付款</el-radio-button>
            <el-radio-button label="PAID">待出行</el-radio-button>
            <el-radio-button label="COMPLETE">已完成</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" size="small">导出订单</el-button>
          <el-input
            v-model="input"
            placeholder="请输入订单名称、编号、类型"
            prefix-icon="el-icon-search"
            size="small"
            style="width: 300px"/>
          <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="datas"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column label="订单号">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="下单时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="出游人数">
        <template slot-scope="scope">
          共{{ scope.row.travellersCount }}人
        </template>
      </el-table-column>
      <el-table-column label="订单金额">
        <template slot-scope="scope">
          ￥{{ scope.row.grossPrice }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{ scope.row.state | changeOrderState }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="linkTo(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div>
      <el-pagination
        :total="count"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="->, total, prev, pager, next, jumper"
        background
        @size-change="handleCurrentChange"
        @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import { retrieveData } from '@/api/order'
import Prompt from '@/components/prompt'
const orderStates = {
  UNPAID: '待付款',
  PAID: '带出行',
  COMPLETE: '已完成'
}
export default {
  name: 'OrderList',
  components: {
    Prompt
  },
  filters: {
    changeOrderState(val) {
      return orderStates[val] || '/'
    }
  },
  data() {
    return {
      radio: '',
      input: '',
      datas: [],
      loading: false,
      count: null,
      currentPage: 1,
      pageNo: 1,
      pageSize: 15
    }
  },
  created() {
    this.requestDate({ pageNo: this.pageNo })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    requestDate(params) {
      this.loading = true
      retrieveData({
        ...params,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, count } = res.data.data
        this.datas = rows
        this.count = count
        this.loading = false
      })
    },
    changeOrder(state) {
      this.requestDate({
        state,
        pageNo: this.pageNo
      })
    },
    linkTo(row) {
      this.$router.push({
        path: `/order/detail/${row.id}`
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.requestDate({ pageNo: val })
    }
  }
}
</script>

<style scoped>
.btnRow{
  margin-left: 25px;
}
</style>
