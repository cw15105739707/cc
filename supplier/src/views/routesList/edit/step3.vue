<template>
  <div>

    <!-- 步骤条 -->
    <div class="block">
      <el-steps :active="3" align-center style="margin: 30px auto 0; width: 90%;">
        <el-step title="步骤1" description="填写线路通用信息"/>
        <el-step title="步骤2" description="填写线路图文信息"/>
        <el-step title="步骤3" description="填写线路关联信息"/>
      </el-steps>
    </div>

    <!-- 第三步 -->
    <el-form
      ref="relevantInfo"
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
          <el-transfer v-model="relevantInfo.transfer1" :data="transfer1data"/>
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
          <el-transfer v-model="relevantInfo.transfer1" :data="transfer1data"/>
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
        <el-button @click="$router.go(-1)">上一步，填写线路图文信息</el-button>
        <el-button type="primary">完成</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'EditStep3',
  data() {
    return {
      relevantInfo: {
        transfer1: []
      },
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
      searchRoutesType: '',
      wenzhang1: '',
      addwenzhangVisible: false,

      // 编辑器的内容
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
