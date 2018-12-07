<template>
  <div class="app-container">

    <div class="operation-tips">
      <el-collapse accordion>
        <el-collapse-item title="操作提示">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          <div>{{ id }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 步骤条 -->
    <div class="block">
      <el-steps :active="currentStep" align-center style="margin: 30px auto 0; width: 90%;">
        <el-step title="步骤1" description="填写线路通用信息"/>
        <el-step title="步骤2" description="填写线路图文信息"/>
        <el-step title="步骤3" description="填写线路关联信息"/>
      </el-steps>
    </div>

    <transition-group name="fade">

      <!-- 第一步 -->
      <el-form
        v-show="currentStep === 1"
        ref="generalInfo"
        :key="1"
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
          <el-button type="primary" @click="submitForm('generalInfo', 1)">下一步，填写线路图文信息</el-button>
        </el-form-item>
      </el-form>

      <!-- 第二步 -->
      <el-form
        v-show="currentStep === 2"
        ref="imageInfo"
        :key="2"
        :model="imageInfo"
        label-width="100px">
        <div class="block">
          <h3>轮播图片</h3>
          <el-form-item label="轮播图片">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :before-remove="beforeRemove"
              :http-request="saveCarouselImages"
              :auto-upload="true"
              :multiple="true"
              :file-list="carouseImagesAleady"
              action=""
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="imgUploadDialog">
              <img :src="dialogImageUrl" width="100%" alt="">
            </el-dialog>
            <p class="upload-tips" style="margin-top: 10px;">1.最多可以上传9张，默认第一张为封面图</p>
            <p class="upload-tips">2.建议宽高等长，宽高400px最适合</p>
          </el-form-item>
          <el-form-item label="线路视频">
            <el-upload
              :limit="1"
              accept="video/mp4"
              list-type="picture-card"
              action="https://jsonplaceholder.typicode.com/posts/">
              <i class="el-icon-plus"/>
            </el-upload>
            <p class="upload-tips" style="margin-top: 10px;">大小：最大10M，10秒以内的视频</p>
            <p class="upload-tips">格式：只支持MP4格式</p>
            <p class="upload-tips">建议像素：400px * 400px</p>
          </el-form-item>
          <el-form-item label="出发地" prop="target">
            <el-button size="small" @click="addTargetsVisible = true">添加</el-button>
            <p class="upload-tips" style="margin-top: 10px;">可以添加多个出发地点</p>
          </el-form-item>

          <select-departure :visible="addTargetsVisible" :route="id" :close="() => showDeparture = false" @value="confirmDepartureValue"/>

          <el-form-item>
            <el-table :data="depatures" style="width: 100%" border size="small">
              <el-table-column fixed label="编号" width="50">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column label="出发地" prop="departureArea" width="220"/>
              <el-table-column prop="adultPrice" label="成人价格" width="100"/>
              <el-table-column prop="adultMarketPrice" label="成人市场价格" width="140"/>
              <el-table-column prop="childPrice" label="儿童价格" width="100"/>
              <el-table-column prop="childMarketPrice" label="儿童市场价格" width="140"/>
              <el-table-column label="详细地址" width="320">
                <template slot-scope="scope">
                  {{ scope.row.address ? scope.row.address : '无' }}
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                  <el-button size="mini" type="danger" @click="toDeleteDepatures(scope.$index, scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <!-- 选择出发地弹框 -->
          <!-- <el-dialog :visible.sync="addTargetsVisible" title="新增出发地">
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
                <el-input v-model="departure.address" placeholder="请输入详情地址(选填)"/>
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
              <el-button @click="addTargetsVisible = false">取 消</el-button>
              <el-button type="primary" @click="addDeparture">确 定</el-button>
            </div>
          </el-dialog> -->
        </div>
        <div class="block">
          <h3>图文详情</h3>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="线路介绍" name="intr">
              <div class="detail-des">
                <p>一、基本要求： 1、手机详情页总体大小：图片+文本（富文本）图片不超过20张，文字不超过500字</p>
                <p>二、图片要求： 建议使用宽度480-620像素，高度小于960像素图片。图片格式为JPG、JPEG、PNG</p>
                <p>三、文字要求</p>
              </div>
              <!-- <black-board/> -->
              <tinymce :height="300" v-model="imageInfo.details" :hasbtn="false"/>
            </el-tab-pane>
            <el-tab-pane label="参考行程" name="travel">
              <div class="detail-des">
                <p>一、基本要求： 1、手机详情页总体大小：图片+文本（富文本）图片不超过20张，文字不超过500字</p>
                <p>二、图片要求： 建议使用宽度480-620像素，高度小于960像素图片。图片格式为JPG、JPEG、PNG</p>
                <p>三、文字要求</p>
              </div>
              <tinymce :height="300" v-model="imageInfo.tripReference" :hasbtn="false"/>
            </el-tab-pane>
            <el-tab-pane label="报名须知" name="notive">
              <div class="detail-des">
                <p>一、基本要求： 1、手机详情页总体大小：图片+文本（富文本）图片不超过20张，文字不超过500字</p>
                <p>二、图片要求： 建议使用宽度480-620像素，高度小于960像素图片。图片格式为JPG、JPEG、PNG</p>
                <p>三、文字要求</p>
              </div>
              <tinymce :height="300" v-model="imageInfo.applicationNotes" :hasbtn="false"/>
            </el-tab-pane>
            <el-tab-pane label="费用说明" name="cost">
              <div class="detail-des">
                <p>一、基本要求： 1、手机详情页总体大小：图片+文本（富文本）图片不超过20张，文字不超过500字</p>
                <p>二、图片要求： 建议使用宽度480-620像素，高度小于960像素图片。图片格式为JPG、JPEG、PNG</p>
                <p>三、文字要求</p>
              </div>
              <tinymce :height="300" v-model="imageInfo.costDescription" :hasbtn="false"/>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-form-item>
          <el-button @click="prev(2)">上一步，线路通用信息</el-button>
          <!-- <el-button @click="prev(2)">提交</el-button> -->
          <el-button type="primary" @click="subimageInfo">下一步，填写线路关联信息</el-button>
        </el-form-item>
      </el-form>

      <!-- 第三步 -->
      <el-form
        v-show="currentStep === 3"
        ref="relevantInfo"
        :key="3"
        :model="relevantInfo"
        label-width="130px">
        <div class="block">
          <h3>设置线路关联协议（旅游合同、出游人限制等 -- 部分线路选填）</h3>
          <el-form-item label="关联协议">
            <el-row type="flex" justify="space-between">
              <el-col>
                <el-select v-model="wenzhang1" placeholder="请选择协议类型">
                  <el-option label="旅游合同" value="1"/>
                  <el-option label="出游人限制" value="2"/>
                </el-select>
                <el-input v-model="searchRoutesType" placeholder="请输入关键字" prefix-icon="el-icon-search" style="width: 300px; margin: 0 12px;" />
                <el-button type="primary" style="margin-right: 100px;">搜索</el-button>
              </el-col>
              <el-button size="primary" @click="addwenzhangVisible = true">新增协议</el-button>
            </el-row>
          </el-form-item>

          <!-- 新增协议弹框 -->
          <el-dialog :visible.sync="addwenzhangVisible" title="新增文章">
            <el-form label-width="80px">
              <el-form-item label="协议类型" prop="tese">
                <el-row type="flex">
                  <el-select v-model="tese1" placeholder="请选择文章类型">
                    <el-option label="协议类型1" value="1"/>
                    <el-option label="协议类型3" value="2"/>
                  </el-select>
                  <el-button type="primary" style="margin-left: 18px;">添加文章类型</el-button>
                </el-row>
              </el-form-item>
              <el-form-item>
                <tinymce :height="300" v-model="content" :hasbtn="true"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addwenzhangVisible = false">取 消</el-button>
              <el-button type="primary" @click="addwenzhangVisible = false">确 定</el-button>
            </div>
          </el-dialog>

          <el-form-item>
            <el-transfer v-model="generalInfo.transfer1" :data="transfer1data"/>
          </el-form-item>
        </div>
        <div class="block">
          <h3>设置线路关联标签（选填）</h3>
          <el-form-item label="关联标签">
            <el-row type="flex" justify="space-bewteen">
              <el-col>
                <el-select v-model="wenzhang1" placeholder="请选标签类型分组">
                  <el-option label="笔记" value="1"/>
                  <el-option label="轨迹" value="2"/>
                </el-select>
                <el-input v-model="searchRoutesType" placeholder="请输入标签关键字" prefix-icon="el-icon-search" style="width: 300px; margin-right: 12px;" />
                <el-button type="primary">搜索</el-button>
              </el-col>
              <el-button size="primary" @click="addTeSeVisible = true">新增标签</el-button>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-transfer v-model="generalInfo.transfer1" :data="transfer1data"/>
          </el-form-item>

          <!-- 新增线路特色弹框 -->
          <el-dialog :visible.sync="addTeSeVisible" title="新增标签">
            <el-form label-width="80px">
              <el-form-item label="特色分组" prop="tese">
                <el-select v-model="tese1" placeholder="请选择特色分组">
                  <el-option label="特色1" value="1"/>
                  <el-option label="特色2" value="2"/>
                </el-select>
              </el-form-item>
              <el-form-item label="特色名称" prop="addressDet">
                <el-input v-model="teseName"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addTeSeVisible = false">取 消</el-button>
              <el-button type="primary" @click="addTeSeVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <el-form-item>
          <el-button @click="prev(3)">上一步，填写线路图文信息</el-button>
          <el-button type="primary">完成</el-button>
        </el-form-item>
      </el-form>

    </transition-group>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { addRoute, getRoute, editRoute } from '@/api/route'
import { pageAll } from '@/api/routeCategorys'
import { listProvinces, listCities, listAreas, listStreets } from '@/api/system'
import { batchAddImages, getCarouselImage, deleteCarouselImage } from '@/api/routeCarouselImage'
import { getDepartures, deleteDeparture } from '@/api/departure'
import SelectDeparture from '@/components/SelectDeparture'
import OSS from 'ali-oss'
import md5 from 'blueimp-md5'

export default {
  name: 'Edit',
  components: {
    Tinymce,
    SelectDeparture
  },
  data() {
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

      imgDomain: 'https://lxzx-resources.oss-cn-hangzhou.aliyuncs.com',

      carouseImagesAleady: [],

      carouseImages: [], // 线路轮播图片

      // 当前第几步
      currentStep: 1,

      // 第一步成功后的返回id
      id: '',

      // 线路分类数据
      routeCategorys: [],
      prinvicesProps: {
        value: 'code',
        label: 'name'
      },

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
      },

      // 第二步添加地址
      departure: {
        address: '',
        adultPrice: 0,
        adultMarketPrice: 0,
        childMarketPrice: 0,
        childPrice: 0
      },

      addTargetVisible: false,

      // 上传图片的凭证
      OSSClient: null,

      addTargetsVisible: false,

      depatures: [],

      imageInfo: {
        details: '<p>线路介绍</p>',
        tripReference: '<p>参考行程</p>',
        applicationNotes: '<p>报名须知</p>',
        costDescription: '<p>费用说明</p>'
      },
      relevantInfo: {

      },
      searchRoutesType: '',

      // 穿梭框初始数据
      transfer1data: [
        { key: 1, label: '线路特色1' },
        { key: 2, label: '线路特色2' },
        { key: 3, label: '线路特色3' },
        { key: 4, label: '线路特色4' },
        { key: 5, label: '线路特色5' },
        { key: 6, label: '线路特色6' },
        { key: 7, label: '线路特色7' },
        { key: 8, label: '线路特色8' },
        { key: 9, label: '线路特色9' }
      ],

      tese1: '',
      teseName: '',
      addTeSeVisible: false,

      wenzhang1: '',
      addwenzhangVisible: false,

      // 编辑器的内容
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,

      // 图片预览
      dialogImageUrl: '',
      imgUploadDialog: false,

      activeName: 'intr'

    }
  },
  created() {
    this.pageInit()
  },
  methods: {

    pageInit() {
      // 获取id 如果不是add 那就是编辑
      const { id } = this.$route.params
      // 编辑的情况
      if (id !== 'add') {
        // 获取线路的东西
        getRoute(id).then(res => {
          this.id = id
          // console.log(res)
          const { categoryId, name, adultPrice, adultMarketPrice, tagChildBuy, childPrice, childMarketPrice, tagMaxPersons, maxPersons, province, municipality, prefecture, town, address, applicationNotes, costDescription, details, tripReference } = res.data
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

          // 第二步的
          this.imageInfo.applicationNotes = applicationNotes
          this.imageInfo.costDescription = costDescription
          this.imageInfo.details = details
          this.imageInfo.tripReference = tripReference
        })
        // 获取线路的轮播图片
        getCarouselImage(id).then(res => {
          // console.log(res)
          if (res.data) {
            res.data.map((val, i) => {
              this.carouseImagesAleady.push({
                url: `${this.imgDomain}/${val.imageUrl}`,
                id: val.id
              })
            })
          }
        })
        // 获取线路的出发地点
        getDepartures(id).then(res => {
          // console.log(res)
          this.depatures = res.data
        })
      }
      this.getOrganizationId()
      this.fetchRouteCategorys()
      this.fetchPrinvice()
      this.fetchOSSToken()
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
    submitForm(formName, step) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.generalInfoLoading = true
          if (this.$route.params.id !== 'add') {
            // 编辑
            editRoute({
              ...this.generalInfo
            }).then(res => {
              this.generalInfoLoading = false
              this.id = this.$route.params.id
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.next(step)
            })
          } else {
            // 新增
            addRoute({
              ...this.generalInfo
            }).then((res) => {
              this.generalInfoLoading = false
              this.id = res.data
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.next(step)
            }).catch(e => {
              this.generalInfoLoading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 提交第二步
    subimageInfo() {
      // 提交轮播图片的
      this.uploadCarouselRequest()
      // 提交富文本的
      editRoute({
        id: this.id,
        ...this.imageInfo
      }).then(res => {
        console.log(res)
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.next(2)
      })
    },

    // 获取OSSToken & 初始化
    fetchOSSToken() {
      // getOSSToken().then(res => {
      //   const { accessKeyId, accessKeySecret, securityToken } = res.data
      //   this.OSSClient = new OSS({
      //     accessKeyId,
      //     accessKeySecret,
      //     securityToken,
      //     endpoint: 'oss-cn-hangzhou.aliyuncs.com',
      //     bucket: 'lxzx-resources'
      //   })
      //   console.log(this.OSSClient)
      // })
      // 暂时用账号密码代替
      this.OSSClient = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAICtUyeZvlUhF3',
        accessKeySecret: 'dPQBtC33iqtaTqRGQUgLC8SM02hCRD',
        bucket: 'lxzx-resources'
      })
      // console.log(this.OSSClient)
    },

    // 选择图片保存图片
    saveCarouselImages(options) {
      this.carouseImages.push(options.file)
      // console.log(options.file.name)
      // console.log(this.carouseImages)
    },

    // 去上传图片
    uploadCarouselRequest() {
      // 如果需要上传的图片数据为空 那就直接返回了
      if (this.carouseImages.length === 0) {
        return false
      }
      // promise 的数组
      const promiseArr = []
      this.carouseImages.map((val, i) => {
        const p = new Promise((resolve, reject) => {
          const fileName = md5(val.name)
          const suffix = val.name.substr(val.name.indexOf('.'))
          const storeAs = `image/route/${this.id}/carousel/${fileName}${suffix}`
          this.OSSClient.multipartUpload(storeAs, val).then(res => {
            resolve({
              imageUrl: res.name,
              routeId: this.id
            })
          }).catch(e => {
            reject(e)
          })
        })
        promiseArr.push(p)
      })
      // 请求
      Promise.all(promiseArr).then(res => {
        // console.log(res)
        batchAddImages(res).then(res => {
          console.log(res)
        })
      }).catch(e => {
        console.log(e)
      })
    },

    // tabs 切换
    handleClick(tab, event) {
      // console.log(tab, event)
      // this.uploadCarouselRequest()
    },

    // 添加出发地点
    // addDeparture() {
    //   if (this.selectPrinvice !== '' &&
    //     this.selectCity !== '') {
    //     const departureArea = `${this.generalInfo.province},${this.generalInfo.municipality}` + (this.generalInfo.prefecture ? `,${this.generalInfo.prefecture}` : '') + (this.generalInfo.town ? `,${this.generalInfo.town}` : '')

    //     const { address, adultPrice, adultMarketPrice, childMarketPrice, childPrice } = this.departure
    //     this.depatures.push({
    //       departureArea,
    //       address,
    //       adultPrice,
    //       adultMarketPrice,
    //       childMarketPrice,
    //       childPrice
    //     })
    //     // 清空
    //     this.selectPrinvice = ''
    //     this.selectCity = ''
    //     this.selectArea = ''
    //     this.selectStreet = ''
    //     this.departure.address = ''
    //     this.departure.adultPrice = 0
    //     this.departure.adultMarketPrice = 0
    //     this.departure.childMarketPrice = 0
    //     this.departure.childPrice = 0

    //     this.addTargetsVisible = false
    //   }
    // },

    // 新增出发地点确定后的回调
    confirmDepartureValue(val) {
      // console.log(val)
      if (val === 'success') {
        this.getDepartures()
      }
    },

    // 删除出发地点
    toDeleteDepatures(i, id) {
      this.$confirm('确定删除此条记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDeparture(id).then(res => {
          // console.log(res)
          this.depatures.splice(i, 1)
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

    // 下一步
    next(step) {
      if (step === 1) {
        this.selectPrinvice = ''
        this.selectCity = ''
        this.selectArea = ''
        this.selectStreet = ''
      }
      this.currentStep = step + 1
    },

    // 上一步
    prev(step) {
      if (step === 2) {
        this.selectCity = ''
        this.selectArea = ''
        this.selectStreet = ''
      }
      this.currentStep = step - 1
    },

    // 删除图片
    beforeRemove(file, fileList) {
      deleteCarouselImage(file.id).then(res => {
        console.log(res)
      })
    },
    handlePictureCardPreview(file) {
      // this.carouseImages
      this.dialogImageUrl = file.url
      this.imgUploadDialog = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .max-persons-row + .el-form-item__error{
    margin-left: 30px;
  }
</style>

<style scoped>
  .app-container{
    background-color: #f5f5f5;
  }
  .tips{
    margin: 0;
    font-size: 12px;
    color: red;
  }
  .tinymce-textarea{
    visibility: hidden;
    z-index: -1;
  }
  .upload-tips {
    margin: 0;
    line-height: 22px;
  }
  .detail-des{
    padding: 10px;
    margin-bottom: 12px;
    border: 1px dashed blue;
  }
  .detail-des p{
    margin: 6px 0;
  }
</style>
