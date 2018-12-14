<template>
  <div>

    <div>
      <el-steps :active="active" align-center>
        <el-step description="填写线路通用信息" title="步骤 1"/>
        <el-step description="填写线路图文信息" title="步骤 2"/>
        <el-step description="填写线路关联信息" title="步骤 3"/>
      </el-steps>
    </div>

    <div>
      <h3>通用信息</h3>
      <el-form
        ref="routerInfo"
        :model="routerInfo"
        :rules="rules"
        status-icon
        label-width="130px">

        <el-form-item label="线路分类" prop="routeCategoryId">
          <el-select v-model="routerInfo.routeCategoryId" placeholder="请选择线路分类">
            <el-option v-for="(routeCategory, index) of routeCategorys" :key="index" :label="routeCategory.name" :value="routeCategory.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="线路名称" prop="name">
          <el-input v-model="routerInfo.name"/>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="成人价" prop="adultPrice">
              <el-input v-model.number="routerInfo.adultPrice"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成人市场价" prop="adultMarketPrice">
              <el-input v-model.number="routerInfo.adultMarketPrice"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="是否允许儿童购买">
          <el-switch v-model="routerInfo.allow"/>
        </el-form-item>
        <el-row v-show="routerInfo.allow">
          <el-col :span="12">
            <el-form-item label="儿童价" prop="childPrice">
              <el-input v-model.number="routerInfo.childPrice"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="儿童市场价" prop="childMarketPrice">
              <el-input v-model.number="routerInfo.childMarketPrice"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="是否限购">
          <el-switch v-model="routerInfo.limit"/>
        </el-form-item>
        <el-row v-show="routerInfo.limit">
          <el-col :span="6">
            <el-form-item label="限购数量" prop="quantity">
              <el-input v-model="routerInfo.quantity"/>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <p>注释：默认不限购，如需限购请打开开关，输入限购数量</p>
          </el-col>
        </el-row>

        <el-form-item label="目的地">
          <el-button :disabled="editAddress || confirmTheAddress" type="primary" @click="changeVisible">添加</el-button>
        </el-form-item>

        <div class="alert">
          <el-alert
            v-show="selectProvince && confirmTheAddress"
            :description="`ffffffffffff`"
            :title="`fffffffff`"
            type="success"
            show-icon
            @close="close"/>
          <el-alert
            v-show="editAddress"
            :description="`详细地址:${address}`"
            :title="`目的地:${editAddress}`"
            type="success"
            show-icon
            @close="close"/>
        </div>

        <el-dialog :visible.sync="dialogFormVisible" title="新增目的地">
          <el-form>
            <el-form-item :label-width="formLabelWidth" label="地区">
              <el-select v-model="selectProvince" placeholder="请选择省份" @change="changeProvince">
                <el-option v-for="(item,index) in areaInfo.provinces" :key="item.code" :value="index" :label="item.name"/>
              </el-select>
              <el-select v-model="selectCity" placeholder="请选择城市" @change="changeCities">
                <el-option v-for="(item,index) in areaInfo.cities" :key="item.code" :value="index" :label="item.name"/>
              </el-select>
              <el-select v-model="selectAera" placeholder="请选择县区" @change="changeArea">
                <el-option v-for="(item,index) in areaInfo.area" :key="item.code" :value="index" :label="item.name"/>
              </el-select>
              <el-select v-model="selectStreet" placeholder="请选择街道">
                <el-option v-for="(item,index) in areaInfo.street" :key="item.code" :value="index" :label="item.name"/>
              </el-select>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="详细地址">
              <el-input v-model="address"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>

      </el-form>
      <el-button type="primary" @click="submitForm('routerInfo')">下一步，填写线路图文信息</el-button>
    </div>

  </div>
</template>

<script>
import { requestRouterInfo, requestRouterCategorysPageAll, requestProvincesPage, requestCityPage, requestAreaPage, requestStreetPage } from '@/api/router'
export default {
  name: 'Step1',
  data() {
    return {
      // 步骤条当前显示页
      active: 0,

      // 线路通用信息表单数据
      routerInfo: {
        name: '',
        routeCategoryId: '',
        adultPrice: '',
        adultMarketPrice: '',
        childPrice: '',
        childMarketPrice: '',
        allow: true,
        limit: true,
        quantity: 0
      },
      // 线路类别
      routeCategorys: [],

      // form表单校验规则
      rules: {
        routeCategoryId: [
          { required: true, message: '请输入线路分类', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入线路名称', trigger: 'blur' }
        ],
        adultPrice: [
          { required: true, message: '请输入成人价格', trigger: 'blur' },
          { type: 'number', required: true, message: '请输入数字', trigger: 'blur' }
        ],
        adultMarketPrice: [
          { required: true, message: '请输入成人市场价格', trigger: 'blur' },
          { type: 'number', required: true, message: '请输入数字', trigger: 'blur' }
        ],
        childPrice: [
          { required: true, message: '请输入儿童价格', trigger: 'blur' },
          { type: 'number', required: true, message: '请输入数字', trigger: 'blur' }
        ],
        childMarketPrice: [
          { required: true, message: '请输入儿童市场价格', trigger: 'blur' },
          { type: 'number', required: true, message: '请输入数字', trigger: 'blur' }
        ]
      },

      // alert提示框数据
      description: '',
      confirmTheAddress: false,
      editAddress: false,

      // dialog数据用于拼接editAddress和address
      provinces: '',
      cities: '',
      area: '',
      street: '',
      address: '',

      // 是否显示dialog对话框
      dialogFormVisible: false,

      // el-select绑定数据
      selectProvince: '',
      selectCity: '',
      selectAera: '',
      selectStreet: '',

      // dialog表单内取值数据
      formLabelWidth: '120px',
      areaInfo: {
        provinces: '',
        cities: '',
        area: '',
        street: '',
        address: ''
      }
    }
  },

  created() {
    // 执行跳转路由
    this.getRouter()

    // 获取省级列表
    this.requestProvinces()
  },
  methods: {
    // 跳转step1路由
    getRouter() {
      // 定义step1的路由id
      const id = this.$route.params.id
      // 检验路由后缀为id还是add
      // 路由后缀为id的情况
      if (id !== 'add') {
        // 请求特定id的线路信息
        requestRouterInfo(id).then(res => {
          // 接收各数据用于填入form表单
          const { name, routeCategory, adultPrice, adultMarketPrice, childPrice, childMarketPrice, province, prefecture, municipality, town, address } = res.data.data
          this.routerInfo.name = name
          this.routerInfo.adultPrice = adultPrice
          this.routerInfo.adultMarketPrice = adultMarketPrice
          this.routerInfo.childPrice = childPrice
          this.routerInfo.childMarketPrice = childMarketPrice
          this.routerInfo.routeCategoryId = routeCategory.name
          // 接收省市县镇数据用于拼接后填入alert提醒框
          this.editAddress = province + prefecture + municipality + town
          this.address = address
        })
      } else {
        // 路由后缀为add的情况
        return
      }
      // 获取所有线路分类
      this.getAll()
    },
    // 获取所有线路分类用于接收线路分类类别
    getAll() {
      requestRouterCategorysPageAll({
        pageNo: 1,
        pageSize: 20
      }).then(res => {
        // 定义线路类别数据
        const { rows } = res.data.data
        this.routeCategorys = rows
      })
    },
    // 打开dialog对话框添加目的地
    changeVisible() {
      this.dialogFormVisible = true
    },
    // 获取省级列表
    requestProvinces() {
      requestProvincesPage().then(res => {
        this.areaInfo.provinces = res.data.data
      })
    },
    // 选中省级事件
    changeProvince(val) {
      // 清空缓存的市县镇信息
      this.selectCity = []
      this.selectAera = []
      this.selectStreet = []
      // 执行获取城市列表方法并传入省级code码
      this.requestCities(this.areaInfo.provinces[val]['code'])
    },
    // 获取城市列表
    // 接收省级code码
    requestCities(code) {
      requestCityPage(code).then(res => {
        this.areaInfo.cities = res.data.data
      })
    },
    // 选中市级事件
    // 接收el-select选择器change事件传入的index
    changeCities(code) {
      // 清空缓存的县镇信息
      this.selectAera = []
      this.selectStreet = []
      // 执行获取县级列表事件并传入市级的code码
      this.requestArea(this.areaInfo.cities[code].code)
    },
    // 获取县级列表
    requestArea(code) {
      requestAreaPage(code).then(res => {
        this.areaInfo.area = res.data.data
      })
    },
    // 选中县级事件
    // 接收el-select选择器change事件传入的index
    changeArea(code) {
      // 清空缓存的镇级信息
      this.selectStreet = []
      // 获取镇级列表并传入县级code码
      requestStreetPage(this.areaInfo.area[code].code).then(res => {
        this.areaInfo.street = res.data.data
      })
    },
    // 关闭警告框事件
    close() {
      // this.confirmTheAddress = true
      this.editAddress = false
    },
    // dialog对话框确认事件
    confirm() {
      this.dialogFormVisible = false
      // this.confirmTheAddress = true
    },
    // 提交表单
    submitForm(routerInfo) {
      // 判断是否允许儿童购买
      // 允许儿童购买的情况
      if (this.routerInfo.allow) {
        // 表单验证
        this.$refs[routerInfo].validate((valid) => {
          if (valid) {
            // 验证成功跳转路由step2
            this.$router.push(`/router/edit/step2/${this.$route.params.id}`)
          } else {
            // 验证失败，return
            return
          }
        })
      } else {
        // 不允许儿童购买的情况
        // 取消儿童价和儿童市场价验证行为，
        this.rules.childPrice = null
        this.rules.childMarketPrice = null
        // 表单验证
        this.$refs[routerInfo].validate((valid) => {
          if (valid) {
            // 验证成功跳转路由step2
            this.$router.push(`/router/edit/step2/${this.$route.params.id}`)
          } else {
            // 验证失败，return
            return
          }
        })
      }
    }
  }
}
// https://www.lxzaixian.com/swagger-ui.html
</script>

<style scoped>
.el-alert{
  padding: 30px;
  margin: 0 50px;
  width: 90%;
}
</style>
