<template>
  <div class="app-container">

    <div class="operation-tips">
      <el-collapse accordion>
        <el-collapse-item title="操作提示">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="block">
      <el-row type="flex" align="middle">
        <el-col :span="4">
          <el-button size="small" @click="showDialog = true">新增</el-button>
        </el-col>
        <el-col :span="10" :offset="2">
          <h3 class="rule-title">退款规则列表</h3>
        </el-col>
      </el-row>
      <el-row style="margin: 30px 20px;">
        <el-col :span="12">
          <el-button size="small">系统默认退款规则</el-button>
          <el-button size="small">自建退款规则</el-button>
        </el-col>
        <el-col :span="12">
          <el-input v-model="searchText" placeholder="请输入退款规则、名称" prefix-icon="el-icon-search" size="small" style="width: 300px;" />
          <el-button size="small">搜索</el-button>
        </el-col>
      </el-row>

      <el-row>
        <waterfall :line-gap="420" :watch="ruleDatas">
          <waterfall-slot
            v-for="(data, i) in ruleDatas"
            :key="i"
            :width="400"
            :height="data.data.length * 100"
            :order="i"
            style="padding: 10px">
            <el-card :body-style="{ padding: '10px'}" shadow="hover">
              <div class="item-top">
                <p>标号：{{ data.id }}</p>
                <h4>{{ data.name }}</h4>
              </div>
              <el-row>
                <el-col v-for="(item, j) in data.data" :span="24" :key="j">
                  <p>距离出发前<el-input :value="item.day" class="item-input" disabled/>天&nbsp;&nbsp;
                  退款比例<el-input :value="item.rate" class="item-input" disabled/>%</p>
                </el-col>
              </el-row>
            </el-card>
          </waterfall-slot>
        </waterfall>
      </el-row>
    </div>

    <!-- 新增弹窗 -->
    <el-dialog :visible.sync="showDialog" title="新增规则">
      <el-form ref="rule" :inline="true" :model="rule" style="padding-left: 40px;">
        <el-row>
          <el-form-item label="是否默认规则">
            <el-switch v-model="rule.tagDefault" />
          </el-form-item>
        </el-row>
        <el-row v-for="(item, i) in rule.newRules" :key="i">
          <el-form-item label="距离出发前">
            <el-input v-model="item.level" class="new-item-input"/>天
          </el-form-item>
          <el-form-item label="退款比例">
            <el-input-number v-model="item.percent" :min="0" :max="100" controls-position="right" class="new-item-input"/>%
          </el-form-item>
          <el-form-item v-if="i !== 0" style="margin-left: 40px;">
            <el-button type="danger" size="small" @click="deleteRule(i)">删除</el-button>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button size="small" type="primary" @click="addNewRule">新 增</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmNewRule">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { Waterfall, WaterfallSlot } from 'vue-waterfall'
import Cookie from 'js-cookie'

export default {
  name: 'BackRule',
  components: {
    Waterfall,
    WaterfallSlot
  },
  data() {
    return {
      searchText: '',
      showDialog: false,

      organizationId: '',

      // 新增规则 form
      rule: {
        tagDefault: false,
        newRules: [
          { level: 0, percent: 0 }
        ]
      },

      ruleDatas: [
        {
          id: 0,
          name: '退款规则123',
          data: [
            { day: 1, rate: 50 },
            { day: 5, rate: 60 },
            { day: 10, rate: 90 },
            { day: 10, rate: 90 },
            { day: 10, rate: 90 }
          ]
        },
        {
          id: 1,
          name: '退款规则123',
          data: [
            { day: 1, rate: 50 },
            { day: 5, rate: 60 },
            { day: 10, rate: 90 }
          ]
        },
        {
          id: 3,
          name: '退款规则123',
          data: [
            { day: 1, rate: 50 },
            { day: 5, rate: 60 },
            { day: 10, rate: 90 }
          ]
        },
        {
          id: 5,
          name: '退款规则123',
          data: [
            { day: 1, rate: 50 },
            { day: 5, rate: 60 },
            { day: 10, rate: 90 }
          ]
        },
        {
          id: 7,
          name: '退款规则123',
          data: [
            { day: 1, rate: 50 },
            { day: 5, rate: 60 },
            { day: 10, rate: 90 }
          ]
        },
        {
          id: 8,
          name: '退款规则123',
          data: [
            { day: 1, rate: 50 },
            { day: 5, rate: 60 },
            { day: 10, rate: 90 },
            { day: 10, rate: 90 }
          ]
        },
        {
          id: 78,
          name: '退款规则12f3',
          data: [
            { day: 1, rate: 50 },
            { day: 5, rate: 60 },
            { day: 10, rate: 90 },
            { day: 10, rate: 90 }
          ]
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {

    // 初始化 organizationId
    init() {
      this.organizationId = Cookie('organizationId')
    },

    // 新加一个条规则
    addNewRule() {
      this.rule.newRules.push({
        level: 0,
        percent: 0
      })
    },

    // 删除一个
    deleteRule(i) {
      this.rule.newRules.splice(i, 1)
    },

    // 点击确认提交 规则
    confirmNewRule() {

      // this.showDialog = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    background-color: #f5f5f5;
  }
  .rule-title{
    text-align: center;
  }
  .item-top{
    display: flex;
    align-items: center;
    p{
      margin: 0;
    }
    h4{
      flex: 1;
      text-align: center;
    }
  }
  .item-input{
    display: inline-block;
    width: 80px;
    margin: 0 4px;
  }
  .new-item-input{
    display: inline-block;
    width: 110px;
    margin: 0 4px;
  }
</style>
