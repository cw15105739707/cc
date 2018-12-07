<template>
  <div class="app-container">

    <div class="schedule-top">
      <el-row type="felx" justify="space-between">
        <el-col :span="6">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="linkTo(`/routes/schedule/edit/${$route.params.id}/add`)">新增排期</el-button>
        </el-col>
        <el-col :span="18">
          <el-form inline>
            <el-form-item label="排期区间">
              <el-date-picker
                v-model="value13"
                :default-time="['00:00:00', '23:59:59']"
                type="datetimerange"
                size="small"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </el-form-item>
            <el-form-item>
              <el-button size="small">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <el-table v-loading="listLoading" :data="datas" class="schedule-table">
      <el-table-column label="排期日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.tripStartTime | formatterTime }}<br> - <br>
          {{ scope.row.tripEndTime | formatterTime }}
        </template>
      </el-table-column>
      <el-table-column label="排期价格" align="center">
        <template slot-scope="scope">
          成人价格：&yen;{{ scope.row.adultPrice }} 儿童价格：&yen;{{ scope.row.childPrice }}<br>
          成人市场价格：&yen;{{ scope.row.adultMarketPrice }} 儿童市场价格：&yen;{{ scope.row.childMarketPrice }}
        </template>
      </el-table-column>
      <el-table-column label="套餐" align="center" width="50">
        <template slot-scope="scope">
          <p>-</p>
        </template>
      </el-table-column>
      <el-table-column label="出发点" align="center">
        <template slot-scope="scope">
          <p>-</p>
        </template>
      </el-table-column>
      <el-table-column label="退款规则" align="center">
        <template slot-scope="scope">
          <p>-</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <p>
            <el-button size="mini" @click="linkTo(`/routes/schedule/singleClone/${$route.params.id}/${scope.row.id}`)">单一克隆</el-button>
            <el-button size="mini" @click="linkTo(`/routes/schedule/multipleClone/${$route.params.id}/${scope.row.id}`)">批量克隆</el-button>
          </p>
          <p>
            <el-button size="mini" @click="linkTo(`/routes/schedule/edit/${$route.params.id}/${scope.row.id}`)">编辑</el-button>
            <el-button type="danger" size="mini" @click="toDelete(scope.$index, scope.row)">删除</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- <div style="margin-top: 12px;">
      <el-pagination
        :total="count"
        :current-page="pageNo"
        :page-size="pageSize"
        background
        layout="->, total, prev, pager, next, jumper"
      />
    </div> -->
  </div>
</template>

<script>
import { listSchedule, deleteSchedule } from '@/api/schedule'
import { parseTime } from '@/utils'

export default {
  name: 'Schedule2',
  filters: {
    formatterTime(time) {
      return parseTime(time)
    }
  },
  data() {
    return {
      value13: '',
      listLoading: false,
      datas: [],
      count: 12,
      pageNo: 1,
      pageSize: 6
    }
  },
  created() {
    this.fetchScheduleDatas()
  },
  methods: {

    // 获取排期列表
    fetchScheduleDatas() {
      listSchedule(this.$route.params.id).then(res => {
        console.log(res)
        this.datas = res.data
      })
    },

    // 点击 删除
    toDelete(index, row) {
      this.$confirm('确定删除此条记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSchedule(row.id).then(res => {
          this.datas.splice(index, 1)
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {
        console.log('cancel')
      })
    },

    // 跳转
    linkTo(url) {
      if (url) {
        this.$router.push({
          path: url
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .schedule-table{
    width: 100%;
    p{
      margin: 0;
      text-align: center;
      &:first-child{
        margin-bottom: 3px;
      }
    }
  }
</style>
