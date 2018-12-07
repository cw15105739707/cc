<template>
  <div class="app-container">

    <!-- 步骤条 -->
    <div class="block">
      <el-steps :active="2" align-center style="margin: 30px auto 0; width: 90%;">
        <el-step title="步骤1" description="填写线路通用信息"/>
        <el-step title="步骤2" description="填写线路图文信息"/>
        <el-step title="步骤3" description="填写线路关联信息"/>
      </el-steps>
    </div>

    <!-- 第二步 -->
    <el-form
      ref="imageInfo"
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
        <el-button @click="$router.go(-1)">上一步，线路通用信息</el-button>
        <el-button type="primary" @click="subimageInfo">下一步，填写线路关联信息</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import SelectDeparture from '@/components/SelectDeparture'

import { batchAddImages, getCarouselImage, deleteCarouselImage } from '@/api/routeCarouselImage'
import { getRoute, editRoute } from '@/api/route'
import { getDepartures, deleteDeparture } from '@/api/departure'
import OSS from 'ali-oss'
import md5 from 'blueimp-md5'

export default {
  name: 'EditStep2',
  components: {
    Tinymce,
    SelectDeparture
  },
  data() {
    return {
      id: null,

      imgDomain: 'https://lxzx-resources.oss-cn-hangzhou.aliyuncs.com',

      // 已经上传的图片
      carouseImagesAleady: [],

      // 选择的图片 线路轮播图片
      carouseImages: [],

      // 新增出发地点弹框 是否显示
      addTargetsVisible: false,

      depatures: [],

      imageInfo: {
        details: '<p>线路介绍</p>',
        tripReference: '<p>参考行程</p>',
        applicationNotes: '<p>报名须知</p>',
        costDescription: '<p>费用说明</p>'
      },

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
      const { id } = this.$route.params
      this.id = id
      // 获取线路的东西
      getRoute(id).then(res => {
        // console.log(res)
        const { applicationNotes, costDescription, details, tripReference } = res.data
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

      this.fetchOSSToken()
    },

    // 提交第二步
    subimageInfo() {
      // 提交轮播图片的
      this.uploadCarouselRequest()
      // 提交富文本的
      editRoute({
        id: this.$route.params.id,
        ...this.imageInfo
      }).then(res => {
        console.log(res)
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$router.push({
          path: `/routes/edit/step3/${this.id}`
        })
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

    // 删除图片
    beforeRemove(file, fileList) {
      deleteCarouselImage(file.id).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      })
    },

    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgUploadDialog = true
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
