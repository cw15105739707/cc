<template>
  <div class="app-container">
    <div class="info">
      <img src="http://i.lasttt.com/0.jpg">
      <div class="text">
        <p>商家名称：上课猫</p>
        <p>主体信息：上海市点击开始i科技优势安</p>
      </div>
    </div>

    <div class="data">
      <div class="item">
        <h3>七天收入（截止今日0点）</h3>
        <div class="det">
          <p>&yen;0.00</p>
          <p>收支明细</p>
        </div>
      </div>
      <div class="item">
        <h3>待结算</h3>
        <div class="det">
          <p>&yen;0.00</p>
          <p>近30天待结算记录</p>
        </div>
      </div>
      <div class="item">
        <h3>可用余额</h3>
        <div class="det">
          <p>&yen;123,234.44</p>
          <p>
            <el-button type="primary" size="mini">提现</el-button>
            <el-button type="primary" size="mini">充值</el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIncome'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .info{
    display: flex;
    padding: 10px;
    border: 1px solid #eee;
    img{
      width: 100px;
      height: 100px;
      margin-right: 18px;
    }
    p{
      margin-top: 5px;
      margin-bottom: 20px;
    }
  }
  .data{
    @extend .info;
    margin-top: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
    .item{
      flex: 1;
      padding-left: 30px;
      padding-right: 30px;
      border-right: 1px solid #eee;
      &:last-child{
        border-right: 0;
      }
      h3{
        font-size: 18px;
        color: #333;
        font-weight: normal;
      }
      p{
        font-size: 14px;
        color: #666;
      }
      .det{
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
