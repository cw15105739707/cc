<template>
  <div class="app-container">

    <!-- 筛选 -->
    <div class="filter">

      <el-row type="flex" justify="start">
        <el-col :span="6">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="linkTo('/routes/edit/step1/add')">发布线路</el-button>
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
            <el-input v-model="searchText" placeholder="请输入线路编号" prefix-icon="el-icon-search" size="small" style="width: 200px;" />
            <el-button type="primary" size="small" icon="el-icon-search" >搜索</el-button>

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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"/>
      <el-table-column label="编号" width="180">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
      <el-table-column label="线路信息" width="180">
        <template slot-scope="scope">
          <p style="text-align: center">{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <el-row type="flex">
            <el-col :span="12">
              <p>成人价格：<br>&yen;{{ scope.row.adultPrice }}</p>
            </el-col>
            <el-col :span="12">
              <p>成人市场价格：<br>&yen;{{ scope.row.adultMarketPrice }}</p>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <p>儿童价格：<br>&yen;{{ scope.row.childPrice }}</p>
            </el-col>
            <el-col :span="12">
              <p>儿童市场价格：<br>&yen;{{ scope.row.childMarketPrice }}</p>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="目的地">
        <template slot-scope="scope">
          {{ scope.row.province }}
          {{ scope.row.municipality }}
          {{ scope.row.prefecture }}
          {{ scope.row.town }}<br>
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.state | routeState }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-date" @click="linkToSchedule(scope.row.id)">排期</el-button>
          <el-button size="mini" icon="el-icon-edit" @click="linkTo(`/routes/edit/step1/${scope.row.id}`)">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteData(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 12px;">
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
import { pageQuery, deleteRoute } from '@/api/route'

const routeStates = {
  UNREVIEWED: '未审核',
  PUTAWAY: '上架',
  UNSHELVE: '下架',
  FAILED: '审核失败',
  SUCCESS: '审核成功'
}

export default {
  name: 'RoutesList',
  filters: {
    routeState(val) {
      return routeStates[val] || '-'
    }
  },
  data() {
    return {
      // 数据
      datas: null,
      count: 0,
      pageNo: 1,
      pageSize: 10,

      // 是否在loading数据
      listLoading: false,
      status: '',
      searchText: '',
      multipleSelection: []
    }
  },
  created() {
    this.fetchData({ pageNo: this.pageNo })
  },
  methods: {

    // 切换状态
    changeStatus(state) {
      this.fetchData({
        pageNo: this.pageNo,
        state
      })
    },

    // 获取数据
    fetchData(params) {
      this.listLoading = true
      pageQuery({
        ...params,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        const { rows, count } = res.data
        this.datas = rows
        this.count = count
        this.listLoading = false
      })
    },

    // 编辑路线 id 为add 是添加线路 跳转到编辑页面
    // editRoutes(id) {
    //   this.$router.push(
    //     {
    //       path: `/routes/edit/${id}`
    //       // meta: {
    //       //   title: id === 'add' ? '发布路线' : '编辑线路'
    //       // }
    //     }
    //   )
    // },

    // 跳转
    linkTo(url) {
      if (url) {
        this.$router.push({
          path: url
        })
      }
    },

    // 点击页码
    handleCurrentChange(val) {
      this.fetchData({ pageNo: val })
    },

    // 删除路线
    deleteData(index, row) {
      this.$confirm('确定删除此条记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoute(row.id).then(res => {
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
    },

    // 点击跳转到 排期
    linkToSchedule(id) {
      this.$router.push({
        path: `/routes/schedule/${id}`
      })
    },

    onSubmit() {
      console.log('search')
    },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`)
    // },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .filter {
    margin-top: 12px;
    margin-bottom: 20px;
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
