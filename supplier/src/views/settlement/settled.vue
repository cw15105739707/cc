<template>
  <div class="app-container">

    <operation-tips title="操作提示" style="border: 1px solid #eee;">
      <div slot="content">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </div>
    </operation-tips>

    <div class="list-filter">
      <el-row type="flex" justify="space-between">
        <el-form :inline="true">
          <el-form-item label="结算时间区间">
            <el-date-picker
              v-model="filterTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </el-form-item>
          <el-form-item>
            <el-button>筛选</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button>导出订单</el-button>
          <el-input v-model="searchText" placeholder="请输入订单号" prefix-icon="el-icon-search" size="medium" style="width: 300px; margin-left: 20px;" />
        </div>
      </el-row>
    </div>

    <el-table :data="datas">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="下单时间" prop="time0" align="center"/>
      <el-table-column label="完成时间" prop="time1" align="center"/>
      <el-table-column label="开始结算时间" prop="time2" align="center"/>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          订单总金额：&yen;{{ scope.row.moneyAll }}<br>
          待结算金额：&yen;{{ scope.row.moneyShouldSettle }}
        </template>
      </el-table-column>
      <el-table-column label="实际结算金额" prop="moneySettled" align="center"/>
      <el-table-column label="实际完成结算时间" prop="time3" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini">账目明细d</el-button>
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
  name: 'Settled',
  components: {
    OperationTips
  },
  data() {
    return {
      filterTime: '',
      searchText: '',
      count: 12,
      pageNo: 1,
      pageSize: 5,
      datas: [
        {
          id: 1,
          num: 'LX_12314',
          time0: '2018-12-12 12:23:30',
          time1: '2018-12-12 12:23:30',
          time2: '2018-12-12 12:23:30',
          moneyAll: 2000,
          moneyShouldSettle: 2000,
          moneySettled: 200,
          time3: '2018-12-12 12:23:30'
        },
        {
          id: 1,
          num: 'LX_12314',
          time0: '2018-12-12 12:23:30',
          time1: '2018-12-12 12:23:30',
          time2: '2018-12-12 12:23:30',
          moneyAll: 2000,
          moneyShouldSettle: 2000,
          moneySettled: 200,
          time3: '2018-12-12 12:23:30'
        },
        {
          id: 1,
          num: 'LX_12314',
          time0: '2018-12-12 12:23:30',
          time1: '2018-12-12 12:23:30',
          time2: '2018-12-12 12:23:30',
          moneyAll: 2000,
          moneyShouldSettle: 2000,
          moneySettled: 200,
          time3: '2018-12-12 12:23:30'
        },
        {
          id: 1,
          num: 'LX_12314',
          time0: '2018-12-12 12:23:30',
          time1: '2018-12-12 12:23:30',
          time2: '2018-12-12 12:23:30',
          moneyAll: 2000,
          moneyShouldSettle: 2000,
          moneySettled: 200,
          time3: '2018-12-12 12:23:30'
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .list-filter{
    background-color: #fff;
    padding: 15px;
    margin: 20px 0;
  }
</style>
