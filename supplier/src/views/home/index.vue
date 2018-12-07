<template>
  <div class="home-container">
    <div class="today">
      <h2>今日统计数据</h2>
      <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    </div>
    <!-- <br/> -->
    <div class="history">
      <h2>历史统计数据</h2>
      <chart height="85%" width="100%"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import Chart from '@/components/Charts/mixChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Home',
  components: {
    PanelGroup,
    Chart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home {
  &-container {
    padding: 30px;
    background-color: #f0f2f5;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.today{
  padding: 10px 20px;
  background-color: white;
  position: relative;
  width: 100%;
  height: 220px;
}

.history{
  padding: 10px 20px;
  background-color: white;
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
