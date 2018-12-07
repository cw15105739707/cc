<template>
  <div class="app-container">
    <el-form label-width="150px" label-position="left">
      <el-form-item label="主体名称">
        <span>嘉兴尚客猫电子商务有限公司</span>
      </el-form-item>
      <el-form-item label="营业执照注册号">
        <span>A237382943298749823</span>
      </el-form-item>
      <el-form-item label="营业执照">
        <img
          class="img"
          src="http://i.lasttt.com/0.jpg?imageView2/1/w/200/h/200"
          alt="营业执照"
          @click="previewImg('http://i.lasttt.com/0.jpg', '营业执照')">
      </el-form-item>
      <el-form-item label="法人代表姓名">
        <span>王秋霞</span>
      </el-form-item>
      <el-form-item label="法人证件">
        <img
          class="img"
          src="http://i.lasttt.com/0.jpg?imageView2/1/w/200/h/120"
          alt="身份证正面"
          style="margin-right: 40px;"
          @click="previewImg('http://i.lasttt.com/0.jpg?imageView2/1/w/400/h/200', '身份证正面')">
        <img
          class="img"
          src="http://i.lasttt.com/0.jpg?imageView2/1/w/200/h/120"
          alt="身份证反面"
          @click="previewImg('http://i.lasttt.com/0.jpg?imageView2/1/w/400/h/200', '身份证反面')">
      </el-form-item>

      <!-- 大图预览 -->
      <el-dialog :visible.sync="isShowDialog">
        <img :src="dialogImage.url" :alt="dialogImage.alt" width="100%">
      </el-dialog>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EssentialInfo',
  data() {
    return {
      isShowDialog: false,
      dialogImage: {
        url: '',
        alt: ''
      }
    }
  },
  methods: {
    previewImg(url, alt) {
      this.dialogImage.url = url
      this.dialogImage.alt = alt
      this.isShowDialog = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .img{
    cursor: pointer;
  }
</style>
