<template>
  <div v-loading.fullscreen.lock="isLoadingAllDatas" class="app-container">

    <div class="operation-tips">
      <el-collapse accordion>
        <el-collapse-item title="操作提示">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- <P>{{ JSON.stringify(formData) }}</P>
    <P>{{ JSON.stringify(departuresValue) }}</P> -->
    <div class="block">
      <h3 class="title">单一克隆排期</h3>
      <el-form ref="formSchedule" :model="formData" label-width="100px">
        <el-row type="flex">
          <el-form-item label="排期时间">
            <el-date-picker
              v-model="formData.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="出发日期"
              end-placeholder="结束日期"/>
          </el-form-item>
          <el-form-item label="报名截止时间" style="margin-left: 40px;">
            <el-date-picker
              v-model="formData.applyEndTime"
              type="datetime"
              placeholder="选择日期时间"/>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="成人价">
              <el-input-number v-model="formData.adultPrice" :min="0" :step="10" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成人市场价">
              <el-input-number v-model="formData.adultMarketPrice" :min="0" :step="10" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="儿童价">
              <el-input-number v-model="formData.childPrice" :min="0" :step="10" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="儿童市场价">
              <el-input-number v-model="formData.childMarketPrice" :min="0" :step="10" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" align="center" style="padding: 0 20px; margin-top: 20px;">
          <h4 class="label-title">出发地点</h4>
          <div style="padding-top: 12px;">
            <el-button size="small" @click="showDeparture = true">新增出发地点</el-button>
          </div>
        </el-row>

        <select-departure :visible="showDeparture" :route="$route.params.route" :close="() => showDeparture = false" @value="confirmDepartureValue"/>

        <el-row style="margin-bottom: 50px; padding: 0 10px;">
          <el-transfer
            :data="departures"
            :props="{
              key: 'id',
              label: 'departureArea'
            }"
            :titles="['可选出发地点', '已选出发地点']"
            v-model="departuresValue"
            class="transfer"
          />
        </el-row>
        <el-row type="flex" justify="space-between" align="center" style="padding: 0 20px; margin-top: 20px;">
          <h4 class="label-title">退款规则</h4>
          <div style="padding-top: 12px;">
            <el-button size="small" @click="showRule = true">新增退款规则</el-button>
          </div>
        </el-row>

        <!-- 新增退款规则弹窗 -->
        <el-dialog :visible.sync="showRule" title="新增规则">
          <el-form ref="rule" :inline="true" :model="rule" style="padding-left: 40px;">
            <el-row>
              <el-form-item label="是否默认规则">
                <el-switch v-model="rule.tagDefault" />
              </el-form-item>
            </el-row>
            <el-form-item label="规则名称">
              <el-input v-model="rule.name"/>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="rule.remarks"/>
            </el-form-item>
            <el-row v-for="(item, i) in rule.rule" :key="i">
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
            <el-button @click="showRule = false">取 消</el-button>
            <el-button :loading="isLoadingAddRule" type="primary" @click="confirmNewRule">确 定</el-button>
          </div>
        </el-dialog>

        <el-row style="margin-bottom: 50px; padding: 0 10px;">
          <el-select v-model="formData.backRuleId" placeholder="请选择退款规则" style="width: 100%;">
            <el-option
              v-for="(rule, i) in rules"
              :key="i"
              :label="rule.name + ' ' + showRules(rule.rule)"
              :value="rule.id"
            />
          </el-select>
        </el-row>
        <el-row type="flex" style="padding: 0 20px; margin-top: 20px;">
          <h4 class="label-title">套餐</h4>
          <div style="margin-top: 12px;">
            <el-button size="small" @click="addPackageTour">添加</el-button>
          </div>
        </el-row>
        <el-row style="padding: 0 10px;">
          <el-table :data="packageTours" border>
            <el-table-column label="编号" align="center" width="80">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="套餐名称" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"/>
              </template>
            </el-table-column>
            <el-table-column label="成人价" align="center" width="140">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.adultPrice" controls-position="right" style="width: 120px;"/>
              </template>
            </el-table-column>
            <el-table-column label="成人市场价" align="center" width="140">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.adultMarketPrice" controls-position="right" style="width: 120px;"/>
              </template>
            </el-table-column>
            <el-table-column label="儿童价" align="center" width="140">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.childPrice" controls-position="right" style="width: 120px;"/>
              </template>
            </el-table-column>
            <el-table-column label="儿童市场价" align="center" width="140">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.childMarketPrice" controls-position="right" style="width: 120px;"/>
              </template>
            </el-table-column>
            <el-table-column label="详细描述" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.description"/>
              </template>
            </el-table-column>
            <el-table-column label="退款规则" align="center">
              <template slot-scope="scope">
                <!-- <span>退款规则12</span>
                <el-button size="mini">编辑</el-button> -->
                <el-select v-model="scope.row.backRuleId">
                  <el-option
                    v-for="(rule, i) in rules"
                    :key="i"
                    :label="rule.name"
                    :value="rule.id"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="packageTours.splice(scope.$index, 1)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-form-item>
          <el-button :loading="isSubmiting" type="primary" style="margin-top: 30px;" @click="subSchedule">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addSchedule, getSchedule } from '@/api/schedule'
// import { save, get, remove } from '@/utils/storeFormData'
import { batchAdd, getPackageTour } from '@/api/packageTour'
import { getDepartures } from '@/api/departure'
import { getBackRules, addBackRules } from '@/api/backRule'
import SelectDeparture from '@/components/SelectDeparture'

export default {
  name: 'Schedule2Edit',
  components: {
    SelectDeparture
  },
  filters: {

  },
  data() {
    return {

      departuresValue: [],

      // 是否是编辑加载数据中
      isLoadingAllDatas: false,

      // 最后的提交按钮是否正在提交
      isSubmiting: false,

      // 最后的提交是否成功
      isSuccess: false,

      // 是否是正在提交添加新规则
      isLoadingAddRule: false,

      // 是否正在获取规则列表
      isLoadingRules: false,

      // 是否正在获取出发地点列表
      isLoadingDeparture: false,

      scheduleId: '',
      formData: {
        routeId: '',
        adultMarketPrice: '',
        adultPrice: '',
        applyEndTime: '',
        backRuleId: '',
        childMarketPrice: '',
        childPrice: '',
        tripEndTime: '',
        tripStartTime: '',
        departureId: '',
        time: []
      },
      packageTours: [],

      // 出发点
      departures: [],
      selectDepartures: [],
      departuresSearch: '',

      // 规则
      rules: [],
      selectRule: null,
      rulesSearch: '',

      // 是否显示新增出发地点弹窗
      showDeparture: false,
      showRule: false,

      // 新增规则 form
      rule: {
        tagDefault: false,
        organizationId: '',
        name: '',
        remarks: '',
        rule: [
          { level: 0, percent: 0 }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  // beforeDestroy() {
  //   if (!this.isSuccess) {
  //     save('schedule', this.formData)
  //   }
  // },
  methods: {

    // 列表选择出发地点回调
    handleSelectionChange(val) {
      // console.log(val)
      this.selectDepartures = val
      const departureIdArr = []
      if (val.length) {
        val.map(val => {
          departureIdArr.push(val.id)
        })
      }
      this.formData.departureId = departureIdArr.toString()
    },

    // 新增出发地点确定后的回调
    confirmDepartureValue(val) {
      // console.log(val)
      if (val === 'success') {
        this.fetchDeparture()
      }
    },

    // 列表选择规则后的回调
    handleSelectionRule(val) {
      // console.log(val)
      this.selectRule = val
      this.formData.backRuleId = val.id
    },

    init() {
      this.formData.routeId = this.$route.params.route

      // 关于数据本地保存先注释了
      // const localData = JSON.parse(get('schedule'))

      // if (this.formData.routeId === localData.routeId) {
      //   this.formData = localData
      //   // console.log(localData)
      // }

      // 编辑 获取编辑的数据
      if (this.$route.params.id !== 'add') {
        getSchedule(this.$route.params.id).then(res => {
          // console.log(res)
          const { tripStartTime, tripEndTime, applyEndTime, adultPrice, adultMarketPrice, childPrice, childMarketPrice, departureId, backRuleId } = res.data
          this.formData.time.push(tripStartTime, tripEndTime)
          this.formData.applyEndTime = applyEndTime
          this.formData.adultPrice = adultPrice
          this.formData.adultMarketPrice = adultMarketPrice
          this.formData.childPrice = childPrice
          this.formData.childMarketPrice = childMarketPrice
          this.departuresValue = departureId.split(',')
          this.formData.backRuleId = backRuleId
        })
        getPackageTour(this.$route.params.id).then(res => {
          // console.log(res)
          this.packageTours = res.data
        })
      }

      // 从 localStorage 获取 organizationId
      this.rule.organizationId = localStorage.getItem('organizationId')
      this.fetchDeparture()
      this.fetchBackRule()
    },

    // 获取出发地点列表
    fetchDeparture() {
      this.isLoadingDeparture = true
      getDepartures(this.$route.params.route).then(res => {
        // console.log(res)
        this.isLoadingDeparture = false
        this.departures = res.data
      })
    },

    // 获取退款规则
    fetchBackRule() {
      this.isLoadingRules = true
      getBackRules(this.rule.organizationId).then(res => {
        // console.log(res)
        this.isLoadingRules = false
        this.rules = res.data
      })
    },

    // 提交排期
    subSchedule() {
      this.$refs.formSchedule.validate(valid => {
        if (valid) {
          this.isSubmiting = true
          this.formData.tripStartTime = this.formData.time[0]
          this.formData.tripEndTime = this.formData.time[1]
          this.formData.departureId = this.departuresValue.join()
          // if (this.$route.params.id !== 'add') {
          //   deleteSchedule(this.$route.params.id).then(res => {
          //     console.log(res)
          //   })
          // }
          addSchedule(this.formData).then(res => {
            // console.log(res)
            this.scheduleId = res.data
            this.subPackageTour()
            // this.isSubmiting = false
          })
        }
      })
    },

    // 提交套餐
    subPackageTour() {
      this.packageTours.map((val, i) => {
        this.packageTours[i]['scheduleId'] = this.scheduleId
      })
      batchAdd(this.packageTours).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.isSubmiting = false

        // 成功后删除本地存储的数据
        // remove('schedule')
        this.isSuccess = true
        // console.log(res)
      })
    },

    // 添加一个套餐
    addPackageTour() {
      this.packageTours.push({
        name: '',
        adultPrice: 0,
        adultMarketPrice: 0,
        childPrice: 0,
        childMarketPrice: 0,
        description: '',
        scheduleId: '',
        // 先写死一个规则id
        backRuleId: ''
      })
    },

    // 新加一个条规则
    addNewRule() {
      this.rule.rule.push({
        level: 0,
        percent: 0
      })
    },

    // 删除一个
    deleteRule(i) {
      this.rule.rule.splice(i, 1)
    },

    // 点击确认提交 规则
    confirmNewRule() {
      this.isLoadingAddRule = true
      addBackRules(this.rule).then(res => {
        this.isLoadingAddRule = false
        // 关闭弹窗窗口
        this.showRule = false

        // 清空填的数据
        this.rule.name = ''
        this.rule.remarks = ''
        this.rule.tagDefault = false
        this.rule.rule = [
          { level: 0, percent: 0 }
        ]
        // 重新更新下列表
        this.fetchBackRule()
      })
    },

    showRules(rules) {
      let str = ''
      if (rules) {
        rules.map((val) => {
          str += `距离出发前${val.level}天，退款比例${val.percent}%；`
        })
      }
      return str
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    background-color: #f5f5f5;
  }
  .title{
    margin: 30px 0;
  }
  .label-title{
    display: inline-block;
    margin-right: 20px;
  }
</style>
