<template>
  <div>

    <!-- 步骤条 -->
    <div class="block">
      <el-steps :active="1" align-center style="margin: 30px auto 0; width: 90%;">
        <el-step title="步骤1" description="填写线路通用信息"/>
        <el-step title="步骤2" description="填写线路图文信息"/>
        <el-step title="步骤3" description="填写线路关联信息"/>
      </el-steps>
    </div>

    <!-- 第一步 -->
    <el-form
      ref="generalInfo"
      :model="generalInfo"
      :rules="generalInfoRules"
      label-width="130px">
      <div class="block">
        <h3>通用信息</h3>
        <el-form-item label="线路分类" prop="categoryId">
          <el-select v-model="generalInfo.categoryId" placeholder="请选择线路分类">
            <el-option v-for="(routeCategory, i) in routeCategorys" :label="routeCategory.name" :value="routeCategory.id" :key="i"/>
          </el-select>
        </el-form-item>
        <el-form-item label="线路名称" prop="name">
          <el-input v-model="generalInfo.name"/>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成人价" prop="adultPrice">
              <el-input v-model.number="generalInfo.adultPrice"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成人市场价" prop="adultMarketPrice">
              <el-input v-model.number="generalInfo.adultMarketPrice"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否允许儿童购买">
          <el-switch v-model="generalInfo.tagChildBuy"/>
        </el-form-item>
        <el-row v-show="generalInfo.tagChildBuy">
          <el-col :span="12">
            <el-form-item label="儿童价" prop="childPrice">
              <el-input v-model.number="generalInfo.childPrice"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="儿童市场价" prop="childMarketPrice">
              <el-input v-model.number="generalInfo.childMarketPrice"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否限购" prop="maxPersons">
          <el-row type="flex" align="middle" class="max-persons-row">
            <el-switch v-model="generalInfo.tagMaxPersons"/>
            <el-input v-model.number="generalInfo.maxPersons" :disabled="!generalInfo.tagMaxPersons" style="width: 200px; margin-left: 20px; margin-right: 20px;"/>
            <p class="tips">注释：默认不限购，如需限购请打开开关，输入限购数量</p>
          </el-row>
        </el-form-item>
        <el-form-item label="目的地" prop="target">
          <el-button :disabled="confirmTheAddress || editAddress !== ''" size="small" @click="addTargetVisible = true">添加</el-button>
          <el-alert
            v-if="selectPrinvice !== '' && confirmTheAddress"
            :title="`目的地：${generalInfo.province}${generalInfo.municipality}${generalInfo.prefecture}${generalInfo.town}     详细地址：${generalInfo.address ? generalInfo.address : '无'}`"
            type="success"
            style="margin-top: 12px;"
            @close="removeAddress"/>
          <el-alert
            v-if="editAddress !== ''"
            :title="editAddress"
            type="success"
            style="margin-top: 12px;"
            @close="removeAddress"/>
        </el-form-item>

        <!-- 选择目的地弹框 -->
        <el-dialog :visible.sync="addTargetVisible" title="新增目的地">
          <el-form label-width="80px">
            <el-form-item label="地区">
              <el-select v-model="selectPrinvice" placeholder="请选择省份" @change="changePrinvice">
                <el-option v-for="(prinvice, i) in prinvices" :label="prinvice.name" :value="i" :key="i"/>
              </el-select>
              <el-select v-model="selectCity" placeholder="请选择城市" @change="changeCity">
                <el-option v-for="(city, i) in cities" :label="city.name" :value="i" :key="i"/>
              </el-select>
              <el-select v-model="selectArea" placeholder="请选择地区(选填)" @change="changeArea">
                <el-option v-for="(area, i) in areas" :label="area.name" :value="i" :key="i"/>
              </el-select>
              <el-select v-model="selectStreet" placeholder="请选择街道(选填)" @change="changeStreet">
                <el-option v-for="(street, i) in streets" :label="street.name" :value="i" :key="i"/>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="generalInfo.address" placeholder="请输入详情地址(选填)"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addTargetVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="block">
        <h3>特殊信息</h3>
        <el-form-item label="儿童的标准">
          <el-row type="flex">
            <span>年龄</span>
            <el-input v-model.number="generalInfo.age0" style="width: 100px; margin: 0 20px 0;"/>
            <el-input v-model.number="generalInfo.age1" style="width: 100px; margin-right: 20px;"/>
            <span>系统默认2-12岁，如果与实际不符，请手动修改</span>
          </el-row>
          <el-row type="flex" style="margin-top: 8px;">
            <span>身高低于</span>
            <el-input v-model.number="generalInfo.height" style="width: 100px; margin: 0 20px 0;"/>
            <span>cm</span>
            <span>系统默认低于1.2米，如果与实际不符，请手动修改</span>
          </el-row>
        </el-form-item>
        <el-form-item label="儿童标准描述">
          <span>年龄{{ generalInfo.age0 }}-{{ generalInfo.age1 }}（不含{{ generalInfo.age1 }}岁），不占床，含往返机票（含税）、半价正餐、导服，旅游车位、其他自理</span>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button :loading="generalInfoLoading" type="primary" @click="submit">下一步，填写线路图文信息</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { addRoute, getRoute, editRoute } from '@/api/route'
import { pageAll } from '@/api/routeCategorys'
import { listProvinces, listCities, listAreas, listStreets } from '@/api/system'
import { save, get } from '@/utils/storeFormData'

export default {
  name: 'EditStep1',
  data() {
    // 自定义检查儿童价格
    const checkChildPrice = (rule, value, callback) => {
      if (this.generalInfo.tagChildBuy) {
        if (value === '') {
          return callback(new Error(rule.fullField === 'childPrice' ? '请输入儿童价格' : '请输入儿童市场价格'))
        }
        if (!Number.isInteger(value)) {
          return callback(new Error('必须为数字值'))
        }
        callback()
      } else {
        callback()
      }
    }

    // 自定义检查限购人数
    const checkMaxPersons = (rule, value, callback) => {
      if (this.generalInfo.tagMaxPersons) {
        if (value === '') {
          return callback(new Error('请输入限购人数'))
        }
        if (!Number.isInteger(value)) {
          return callback(new Error('必须为数字值'))
        }
        callback()
      } else {
        callback()
      }
    }

    return {

      // 线路分类数据
      routeCategorys: [],
      prinvicesProps: {
        value: 'code',
        label: 'name'
      },

      addTargetVisible: false,

      // 地址的三级
      prinvices: [],
      selectPrinvice: '',
      cities: [],
      selectCity: '',
      areas: [],
      selectArea: '',
      streets: [],
      selectStreet: '',

      // 编辑进来 选择的地址 省市已经拼接
      editAddress: '',

      // 确认过地址了
      confirmTheAddress: false,

      generalInfoLoading: false,
      // 通用信息的提交数据
      generalInfo: {
        organizationId: '',
        id: '',
        categoryId: '',
        name: '',
        adultPrice: '',
        adultMarketPrice: '',
        tagChildBuy: true,
        childPrice: '',
        childMarketPrice: '',
        tagMaxPersons: false,
        maxPersons: '',

        // 地址相关 省 市 区 街道 详细地址
        province: '',
        municipality: '',
        prefecture: '',
        town: '',
        address: '',

        age0: 2,
        age1: 12,
        height: 120
      },

      // 第一步的表单验证
      generalInfoRules: {
        categoryId: [
          { required: true, message: '请选择线路分类', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入线路名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        adultPrice: [
          { required: true, message: '请输入成人价', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        adultMarketPrice: [
          { required: true, message: '请输入成人市场价', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        childPrice: [
          { validator: checkChildPrice, trigger: 'blur' }
        ],
        childMarketPrice: [
          { validator: checkChildPrice, trigger: 'blur' }
        ],
        maxPersons: [
          { validator: checkMaxPersons, trigger: 'blur' }
        ]
      }

    }
  },
  watch: {
    generalInfo: {
      handler(newVal, oldVal) {
        // 如果是新增 才保存
        if (this.$route.params.id === 'add') {
          this.autoSave()
        }
      },
      deep: true
    }
  },
  created() {
    this.pageInit()
  },
  methods: {

    autoSave() {
      save('generalInfo', this.generalInfo)
    },

    pageInit() {
      // 获取id 如果不是add 那就是编辑
      const { id } = this.$route.params

      // 这个是编辑的情况
      if (id !== 'add') {
        getRoute(id).then(res => {
          const { categoryId, name, adultPrice, adultMarketPrice, tagChildBuy, childPrice, childMarketPrice, tagMaxPersons, maxPersons, province, municipality, prefecture, town, address } = res.data

          this.generalInfo['categoryId'] = categoryId
          this.generalInfo['name'] = name
          this.generalInfo['adultPrice'] = adultPrice
          this.generalInfo['adultMarketPrice'] = adultMarketPrice
          this.generalInfo['tagChildBuy'] = tagChildBuy
          this.generalInfo['childPrice'] = childPrice
          this.generalInfo['childMarketPrice'] = childMarketPrice
          this.generalInfo['tagMaxPersons'] = tagMaxPersons
          this.generalInfo['maxPersons'] = maxPersons
          this.generalInfo['province'] = province
          this.generalInfo['municipality'] = municipality
          this.generalInfo['prefecture'] = prefecture
          this.generalInfo['town'] = town
          this.generalInfo['address'] = address

          this.generalInfo['id'] = id
          this.editAddress = `目的地：${province}${municipality}${prefecture}${town}  详细地址：${address}`
        })
      } else {
        // 如果是add 检查下本地有没有存数据
        if (get('generalInfo')) {
          this.generalInfo = JSON.parse(get('generalInfo'))
        }
      }

      this.getOrganizationId()
      this.fetchRouteCategorys()
      this.fetchPrinvice()
    },

    // 获取localStorage的organizationId
    getOrganizationId() {
      const organizationId = localStorage.getItem('organizationId')
      if (organizationId) {
        this.generalInfo.organizationId = organizationId
      }
    },

    // 获取线路分类
    fetchRouteCategorys() {
      pageAll({
        pageNo: 1,
        pageSize: 20
      }).then(res => {
        this.routeCategorys = res.data.rows
      })
    },

    // 获取所有省
    fetchPrinvice() {
      listProvinces().then(res => {
        // console.log(res)
        this.prinvices = res.data
      })
    },

    // 选中省后
    changePrinvice(val) {
      this.selectCity = ''
      this.selectArea = ''
      this.selectStreet = ''
      this.fetchCities(this.prinvices[val]['code'])
      this.generalInfo.province = this.prinvices[val]['name']
    },

    // 获取城市
    fetchCities(parentCode) {
      listCities(parentCode).then(res => {
        // console.log(res)
        this.cities = res.data
      })
    },

    // 选中城市后
    changeCity(val) {
      this.selectArea = ''
      this.selectStreet = ''
      this.fetchAreas(this.cities[val]['code'])
      this.generalInfo.municipality = this.cities[val]['name']
    },

    // 获取地区
    fetchAreas(parentCode) {
      listAreas(parentCode).then(res => {
        // console.log(res)
        this.areas = res.data
      })
    },

    // 选中地区
    changeArea(val) {
      this.selectStreet = ''
      this.fetchStreets(this.areas[val]['code'])
      this.generalInfo.prefecture = this.areas[val]['name']
    },

    // 获取街道
    fetchStreets(parentCode) {
      listStreets(parentCode).then(res => {
        this.streets = res.data
      })
    },

    // 选中街道
    changeStreet(val) {
      this.generalInfo.town = this.streets[val]['name']
    },

    // 选择地址后的确认
    confirm() {
      if (this.selectPrinvice !== '' &&
        this.selectCity !== '') {
        this.addTargetVisible = false
        this.confirmTheAddress = true
      }
    },

    // 删除地址
    removeAddress() {
      this.confirmTheAddress = false
      this.selectPrinvice = ''
      this.selectCity = ''
      this.selectArea = ''
      this.selectStreet = ''
      this.generalInfo.address = ''
      this.editAddress = ''

      this.generalInfo.province = ''
      this.generalInfo.municipality = ''
      this.generalInfo.prefecture = ''
      this.generalInfo.town = ''
      this.generalInfo.address = ''
    },

    // 提交第一个表单
    submit() {
      this.$refs['generalInfo'].validate((valid) => {
        if (valid) {
          this.generalInfoLoading = true
          if (this.$route.params.id !== 'add') {
            // 编辑
            editRoute({
              ...this.generalInfo
            }).then(res => {
              this.generalInfoLoading = false

              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.$router.push({
                path: `/routes/edit/step2/${this.$route.params.id}`
              })
            })
          } else {
            // 新增
            addRoute({
              ...this.generalInfo
            }).then((res) => {
              this.generalInfoLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$router.push({
                path: `/routes/edit/step2/${res.data}`
              })
            }).catch(e => {
              this.generalInfoLoading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
