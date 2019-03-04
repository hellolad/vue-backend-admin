<template>
  <div class="order-item-container">
    <div class="order-item">
      <span class="title">{{ title }}</span>
      <span class="number">{{ number }}</span>
      <div class="ratio">
        <span :class="ratioVal">{{ ratio*100 }}%</span>
        <span>{{ ratioTitle }}</span>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    number: {
      type: Number
    },
    ratio: {
      type: Number
    },
    ratioTitle: {
      type: String
    }
  },

  computed: {
    ratioVal() {
      return this.ratio < 0 ? "green" : "red"
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../styles/vars.less';

.order-item-container {
  .order-item {
    display: flex;
    flex-direction: column;
    .title {
      color: #999;
      margin-bottom: 5px;
    } 
    .number {
      color: #666;
      font-size: 26px;
      margin-bottom: 5px;
    }
    .ratio {
      color: #999;
      :first-child {
        margin-right: 5px;
      }
    }
  }
}

.green {
  color: @green;
}
.red {
  color: @red;
}

</style>


