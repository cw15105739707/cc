<template>
  <div class="app-container">
    <div class="block" style="padding-top: 30px;">
      <el-steps :active="2" align-center>
        <el-step title="提交订单" description="2018-09-12 12:24:23"/>
        <el-step title="支付订单" description="2018-09-12 12:24:23"/>
        <el-step title="评价" description=""/>
      </el-steps>
    </div>

    <div class="block">
      <h3>基本信息</h3>
      <div style="border: 1px solid #eee; height: 300px;"/>
    </div>

    <div class="block">
      <el-row type="flex" justify="space-between">
        <el-col>
          <h3>出游人信息</h3>
        </el-col>
        <el-col style="margin-top: 12px; text-align: right;">
          <el-button size="small">导出出游人</el-button>
        </el-col>
      </el-row>
      <el-table :data="datas">
        <el-table-column type="selection" width="50"/>
        <el-table-column label="编号" prop="id"/>
        <el-table-column label="真实姓名" prop="name"/>
        <el-table-column label="身份证" prop="idCard"/>
        <el-table-column label="手机号" prop="tel"/>
      </el-table>
    </div>

    <div class="block">
      <h3>其他信息</h3>
      <p>订单备注：无</p>
    </div>

    <div class="block">
      <h3>线路信息</h3>
      <el-table :data="routeInfo">
        <el-table-column type="selection" width="50"/>
        <el-table-column label="编号" prop="id"/>
        <el-table-column label="线路信息">
          <template slot-scope="scope">
            {{ scope.row.name }}<br>
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            成人价格：{{ scope.row.price }}<br>
            儿童价格：{{ scope.row.cprice }}
          </template>
        </el-table-column>
        <el-table-column label="排期" prop="time"/>
        <el-table-column label="套餐" prop="package"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <h3>操作日志</h3>
      <el-table :data="logDatas">
        <el-table-column type="selection" width="50"/>
        <el-table-column label="编号" prop="id"/>
        <el-table-column label="操作者" prop="name"/>
        <el-table-column label="时间" prop="time"/>
        <el-table-column label="操作内容" prop="action"/>
      </el-table>
    </div>

  </div>
</template>

<script>
import { getOrderDetail } from '@/api/order'

export default {
  name: 'OrderDetail',
  data() {
    return {
      datas: [
        {
          id: 1,
          name: 'adain',
          idCard: '500226199311123870',
          tel: '18069611356'
        },
        {
          id: 2,
          name: 'adain',
          idCard: '500226199311123870',
          tel: '18069611356'
        },
        {
          id: 3,
          name: 'adain',
          idCard: '500226199311123870',
          tel: '18069611356'
        }
      ],
      routeInfo: [
        {
          id: 'LX_001234',
          name: '豪华巴黎游',
          type: '壕无人性',
          price: 99999,
          cprice: 787878,
          time: '2018-09-09 09:09:08',
          package: '豪华巴黎一日游'
        },
        {
          id: 'LX_001234',
          name: '豪华巴黎游',
          type: '壕无人性',
          price: 99999,
          cprice: 787878,
          time: '2018-09-09 09:09:08',
          package: '豪华巴黎一日游'
        },
        {
          id: 'LX_001234',
          name: '豪华巴黎游',
          type: '壕无人性',
          price: 99999,
          cprice: 787878,
          time: '2018-09-09 09:09:08',
          package: '豪华巴黎一日游'
        }
      ],
      logDatas: [
        {
          id: 1,
          name: 'admin',
          time: '2018-09-09 09:09:09',
          action: '修改了订单价格'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getOrderDetail(this.$route.params.id).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    background-color: #f5f5f5;
  }
</style>
