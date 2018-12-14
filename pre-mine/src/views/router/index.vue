<template>
  <div>

    <div class="filter">

      <el-row>
        <el-col :span="6">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="linkTo('/router/edit/step1/add')">发布线路</el-button>
        </el-col>
        <el-col :span="18">
          <el-col :span="10">
            <el-radio-group v-model="status" size="small" @change="changeStatus">
              <el-radio-button label="">所有线路</el-radio-button>
              <el-radio-button label="PUTAWAY">上架线路</el-radio-button>
              <el-radio-button label="UNSHELVE">下架线路</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="14">
            <el-button v-model="searchText" type="primary" size="small" icon="el-icon-search">搜索</el-button>
            <el-input
              v-model="input"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              style="width: 200px"
              size="small"/>
          </el-col>
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
      <el-table-column type="selection" width="50"/>
      <el-table-column label="编号">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
      <el-table-column label="线路信息">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <p>成人价格：<br>￥{{ scope.row.adultPrice }}</p>
            </el-col>
            <el-col :span="12">
              <p>成人市场价格：<br>￥{{ scope.row.adultMarketPrice }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>儿童价格：<br>￥{{ scope.row.childPrice }}</p>
            </el-col>
            <el-col :span="12">
              <p>儿童市场价格：<br>￥{{ scope.row.childMarketPrice }}</p>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="目的地">
        <template slot-scope="scope">
          {{ scope.row.province }}
          {{ scope.row.municipality }}
          {{ scope.row.prefecture }}
          {{ scope.row.town }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.state | routerState }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-date" @click="linToschedule('/schedule/scheduleList')">排期</el-button>
          <el-button size="mini" icon="el-icon-edit" @click="linkTo(`/router/edit/step1/${scope.row.id}`)">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteData(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
//  导入请求数据和删除方法
import { requestPage, deleteRouter } from '@/api/router'
//  定义常量
const routeStates = {
  UNREVIEWED: '未审核',
  PUTAWAY: '上架',
  UNSHELVE: '下架',
  FAILED: '审核失败',
  SUCCESS: '审核成功'
}

export default {
  name: 'Index',
  // 状态转化中文
  filters: {
    routerState: function(val) {
      return routeStates[val] || '/'
    }
  },
  data() {
    return {
      // 状态
      status: '',
      // 表格数据
      listLoading: false,
      datas: null,
      pageNo: 1,
      pageSize: 10,
      // 其他
      multipleSelection: [],
      input: '',
      searchText: ''
    }
  },
  // 创建前执行的函数
  created() {
    this.requestData({ pageNo: this.pageNo })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    requestData(params) {
      this.loading = true
      return requestPage({
        ...params,
        pageSize: this.pageSize
      }).then(res => {
        // console.log(res)
        const datas = res.data.data.rows
        this.datas = datas
        this.loading = false
      })
    },
    // 改变状态
    changeStatus: function(state) {
      this.requestData({
        pageNo: this.pageNo,
        state
      })
    },
    // 跳转排期页面
    linToschedule: function(url) {
      if (url) {
        this.$router.push({
          path: url
        })
      }
    },
    //  跳转编辑页面
    linkTo: function(url) {
      if (url) {
        this.$router.push({
          path: url
        })
      }
    },
    deleteData(index, row) {
      this.$confirm('确定删除此条记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRouter(row.id).then(res => {
          // console.log(res)
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filter{
  margin: 25px;
}
.el-row{
  margin-left: 15px;
}
table {
p{
  margin: 0;
}
.el-button{
  margin-bottom: 4px;
}
}
</style>
