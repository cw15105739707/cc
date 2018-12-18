<template>
  <div class="select-depature">
    <el-dialog :visible.sync="isVisable" title="新增出发地点" @close="close">
      <el-form label-width="100px">
        <el-form-item label="地区" prop="address">
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
        <el-form-item label="详细地址" prop="addressDet">
          <el-input v-model="departure.description" placeholder="请输入详情地址(选填)"/>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成人价格">
              <el-input v-model="departure.adultPrice"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成人市场价格">
              <el-input v-model="departure.adultMarketPrice"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="儿童价格">
              <el-input v-model="departure.childPrice"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="儿童市场价格">
              <el-input v-model="departure.childMarketPrice"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button :loading="isSubing" type="primary" @click="addDeparture">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listProvinces, listCities, listAreas, listStreets } from '@/api/system'
import { addDeparture } from '@/api/departure'

export default {
  name: 'SelectDepature',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    route: {
      type: String,
      default: ''
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isSubing: false,
      // isVisable: this.visible,
      province: '',
      municipality: '',
      prefecture: '',
      town: '',
      departure: {
        routeId: this.route,
        departureArea: '',
        description: '',
        adultPrice: '',
        adultMarketPrice: '',
        childPrice: '',
        childMarketPrice: ''
      },
      // 地址的三级
      prinvices: [],
      selectPrinvice: '',
      cities: [],
      selectCity: '',
      areas: [],
      selectArea: '',
      streets: [],
      selectStreet: ''
    }
  },
  computed: {
    isVisable() {
      return this.visible
    }
  },
  created() {
    this.fetchPrinvice()
  },
  methods: {

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
      this.province = this.prinvices[val]['name']
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
      this.municipality = this.cities[val]['name']
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
      this.prefecture = this.areas[val]['name']
    },

    // 获取街道
    fetchStreets(parentCode) {
      listStreets(parentCode).then(res => {
        this.streets = res.data
      })
    },

    // 选中街道
    changeStreet(val) {
      this.town = this.streets[val]['name']
    },

    // 确定
    addDeparture() {
      this.isSubing = true
      this.departure.departureArea = `${this.province},${this.municipality}` + (this.prefecture ? `,${this.prefecture}` : '') + (this.town ? `,${this.town}` : '')
      addDeparture(this.departure).then(res => {
        // console.log(res)
        this.$emit('value', 'success')
        this.close()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
