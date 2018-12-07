<template>
  <div>
    <a
      v-if="item.type === 'text'"
      :style="{
        fontSize: item.font_size + 'px',
        color: item.color,
        backgroundColor: item.bg_color
      }"
      class="cap-text"
    >
      <div class="cap-text-render-warp">
        <p class="cap-text-render-content">{{ item.text }}</p>
      </div>
    </a>
    <a v-if="item.type === 'image'" class="cap-image">
      <img :src="item.imageUrl">
    </a>
  </div>
</template>

<script>
export default {
  name: 'BlackboardItem',
  props: {
    item: {
      type: Object,
      default: function() {
        return { }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// text
.cap-text{
  display: block;
  .cap-text-render-warp{
    position: relative;
    padding: 10px 0;
    margin: 0 10px;
    .cap-text-render-content{
      margin: 0;
      line-height: 24px;
    }
  }
}

// image
.cap-image{
  display: block;
  img{
    width: 100%;
    height: auto;
  }
}
</style>
