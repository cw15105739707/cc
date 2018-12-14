<template>
  <div>
    <prompt title="操作提示">
      <template slot="context">
        <div>主要用来提醒操作者一些注意事项</div>
        <div>主要用来提醒操作者一些注意事项</div>
        <div>主要用来提醒操作者一些注意事项</div>
      </template>
    </prompt>
    <router-view/>
  </div>
</template>

<script>
import Prompt from '@/components/prompt'
export default {
  name: 'Edit',
  components: {
    Prompt
  }
}
</script>

<style scoped>

</style>
