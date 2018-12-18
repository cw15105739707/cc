<template>
  <div class="black-board">
    <code>{{ blckboardTemp }}</code>
    <div class="black-board-preview">
      <draggable v-model="blckboardTemp" class="item-list">
        <div v-for="(item, i) in blckboardTemp" :key="i" class="preview-item">
          <blackboard-item :item="item"/>
        </div>
      </draggable>
      <div class="black-board-add-grouped">
        <div class="editor-add-component">
          <div class="editor-add-component__grouped">
            <p>基础组建</p>
            <div class="component__grouped-list">
              <div class="component__grouped-btn-wrapper">
                <a class="grouped-btn" @click="addItem('text')">文本</a>
              </div>
              <div class="component__grouped-btn-wrapper">
                <a class="grouped-btn">富文本</a>
              </div>
              <div class="component__grouped-btn-wrapper">
                <a class="grouped-btn" @click="addItem('image')">图片</a>
              </div>
            </div>
          </div>
          <div class="editor-add-component__grouped">
            <p>其他</p>
            <div class="component__grouped-list">
              <div class="component__grouped-btn-wrapper">
                <a class="grouped-btn">公告</a>
              </div>
              <div class="component__grouped-btn-wrapper">
                <a class="grouped-btn">辅助线</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BlackboardItem from './blackboardItem'

export default {
  name: 'Blackboard',
  components: {
    draggable,
    BlackboardItem
  },
  data() {
    return {
      blckboardTemp: []
    }
  },
  methods: {
    addItem(itemType) {
      switch (itemType) {
        case 'text':
          this.blckboardTemp.push({
            type: 'text',
            bg_color: '#ffffff',
            color: '#000000',
            font_size: '14',
            text: '我是文字'
          })
          break
        case 'image':
          this.blckboardTemp.push({
            type: 'image',
            imageUrl: 'https://i.lasttt.com/0.jpg'
          })
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .black-board{
    font-family: inherit;
    text-rendering: optimizelegibility;
    width: 760px;
    .black-board-preview{
      border: 1px solid #e5e5e5;
      min-height: 450px;
      position: relative;
      width: 320px;
      background-color: rgb(249, 249, 249);
    }
    .item-list{
      min-height: 304px;
      padding-bottom: 9px;
      overflow-anchor: none;
    }
    .black-board-add-grouped{
      border-top: 1px solid #e5e5e5;
      padding-bottom: 5px;
      position: relative;
      background-color: #fff;
    }
    .editor-add-component__grouped{
      padding: 0 5px 0 10px;
      p{
        font-size: 12px;
        margin-bottom: 8px;
        margin-top: 13px;
      }
      .component__grouped-list{
        display: flex;
        flex-wrap: wrap;
        .component__grouped-btn-wrapper{
          flex: 0 0 33.33%;
          height: 30px;
          margin-bottom: 5px;
          padding-right: 5px;
        }
        .grouped-btn{
          -ms-flex-align: center;
          -ms-flex-pack: center;
          -webkit-box-align: center;
          -webkit-box-pack: center;
          -webkit-box-sizing: border-box;
          align-items: center;
          background: #f8f8f8;
          border: 1px dashed #e5e5e5;
          border-radius: 0;
          box-sizing: border-box;
          color: #666;
          cursor: pointer;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          font-size: 12px;
          height: 100%;
          justify-content: center;
          width: 100%;
        }
      }
    }
  }
</style>
