<template>
  <div class="body">

    <prompt title="操作提示">
      <template slot="context">
        <div>主要用来提醒操作者一些注意事项</div>
        <div>主要用来提醒操作者一些注意事项</div>
        <div>主要用来提醒操作者一些注意事项</div>
      </template>
    </prompt>

    <div style="padding: 30px 0;">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step :description="finishTime ? finishTime : '暂无数据'" title="提交订单"/>
        <el-step :description="payTime ? payTime : '暂无数据'" title="支付订单"/>
        <el-step title="评价"/>
      </el-steps>
    </div>

    <div class="baseInfo">
      <h2>基本信息</h2>
      <div>
        <el-row>
          <el-col :span="6" class="num">
            <el-row>订单号：</el-row>
            <el-row>{{ number }}</el-row>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col :span="12">用户：{{ user ? user : '暂无数据' }}</el-col>
              <el-col :span="12">下单时间：{{ finishTime ? finishTime : '暂无数据' }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">订单状态：{{ state | changeState }}</el-col>
              <el-col :span="12">订单来源：{{ record ? record : '暂无数据' }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">支付方式：{{ payment ? payment : '暂无数据' }}</el-col>
              <el-col :span="12">付款时间：{{ payTime ? payTime : '暂无数据' }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="info">
      <el-row>
        <el-col :span="12">
          <h2>出游人信息</h2>
        </el-col>
        <el-col :span="12">
          <div class="btn">
            <el-button type="primary" size="small">导出出游人</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="datas"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"/>
        <el-table-column label="编号">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="身份证">
          <template slot-scope="scope">
            {{ scope.row.idcard }}
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column label="其他信息">
          <template slot-scope="scope">
            {{ remark ? remark : '暂无数据' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="linkTo(`/order/edit/edit`)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { requestDetail } from '@/api/order'
import Prompt from '@/components/prompt'

const states = {
  UNPAID: '未支付',
  PAID: '已支付',
  CANCEL: '已取消',
  REFUND: '已退款',
  REFUND_SUCCESS: '退款成功',
  COMPLETE: '已完成'
}
export default {
  name: 'Detail',
  components: {
    Prompt
  },
  filters: {
    changeState(val) {
      return states[val] || '/'
    }
  },
  data() {
    return {
      active: 1,
      loading: false,
      datas: [],
      tableData: [],
      number: null,
      payTime: null,
      record: null,
      finishTime: null,
      payment: null,
      user: '',
      state: '',
      remark: null
    }
  },
  created() {
    this.requestData()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    requestData() {
      requestDetail(this.$route.params.id).then(res => {
        // console.log(res)
        const { orderRecord, remark, number, state, record, finishTime, payment } = res.data.data
        this.datas = orderRecord.travellerRecords
        this.remark = remark
        this.payTime = orderRecord.payTime
        this.state = state
        this.record = record
        this.finishTime = finishTime
        this.payment = payment
        this.user = orderRecord.travellerRecords[0].name
        this.number = number
      })
    },
    linkTo(url) {
      this.$router.push({
        path: url
      })
    }
  }
}
</script>

<style scoped>
.baseInfo{
  border: 1px solid #f5f5f5;
  padding: 10px;
}
.info {
  border: 1px solid #f5f5f5;
  padding: 20px;
}
h2{
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 10px;
}
.btn{
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}
.num{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
</style>
