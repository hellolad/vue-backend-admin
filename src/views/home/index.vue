<template>
  <div class="home-container" v-loading.fullscreen.lock="fullScreenLoading">
    <!-- 代码地址 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <home-box :title="'Github地址'">
          <a slot="main" :href="yoyo.github">{{ yoyo.github }}</a>
        </home-box>
      </el-col>
      <el-col :span="12">
        <home-box :title="'简书地址'">
          <a slot="main" href="yoyo.jianshu">{{ yoyo.jianshu }}</a>
        </home-box>
      </el-col>
    </el-row>

    <!-- 订单量 -->
    <el-row :gutter="20" class="margin-top-20">
      <el-col :span="6" v-for="(item, index) in yoyo.sales" :key="index">
        <home-boxies :title="saleTitles[index]">
          <div slot="main">
            <i class="el-icon-news"></i>
            <span style="margin-left: 10px;">{{ item }}</span>
          </div>
        </home-boxies>
      </el-col>
    </el-row>

    <!-- 待处理事务 -->
    <el-row>
      <el-col :span="24" class="margin-top-20">
        <home-box :title="'待处理事务'">
          <el-row slot="main" :gutter="20">
            <el-col :span="8" v-for="(item, index) in getTasks(yoyo.tasks)[0]" :key="index">
              <div class="task-item">
                <span>{{ getTasks(taskTitltes)[0][index] }}</span>
                <span>({{ item }})</span>
              </div>
            </el-col>
          </el-row>
          <el-row slot="main" :gutter="20">
            <el-col :span="8" v-for="(item, index) in getTasks(yoyo.tasks)[1]" :key="index">
              <div class="task-item">
                <span>{{ getTasks(taskTitltes)[1][index] }}</span>
                <span>({{ item }})</span>
              </div>
            </el-col>
          </el-row>
          <el-row slot="main" :gutter="20">
            <el-col :span="8" v-for="(item, index) in getTasks(yoyo.tasks)[2]" :key="index">
              <div class="task-item">
                <span>{{ getTasks(taskTitltes)[2][index] }}</span>
                <span>({{ item }})</span>
              </div>
            </el-col>
          </el-row>
        </home-box>
      </el-col>
    </el-row>

    <!-- 总览 -->
    <el-row :gutter="20" class="margin-top-20">
      <el-col :span="12">
        <home-box :title="'商品总览'">
          <div slot="main" class="overview-container">
            <div class="overview-item" v-for="(item, index) in yoyo.goods_overview" :key="index">
              <span class="overview-counter">{{ item }}</span>
              <span class="overview-title">{{ goodsTitles[index] }}</span>
            </div>
          </div>
        </home-box>
      </el-col>
      <el-col :span="12">
        <home-box :title="'用户总览'">
          <div slot="main" class="overview-container">
            <div class="overview-item" v-for="(item, index) in yoyo.user_overview" :key="index">
              <span class="overview-counter">{{ item }}</span>
              <span class="overview-title">{{ userTitles[index] }}</span>
            </div>
          </div>
        </home-box>
      </el-col>
    </el-row>

    <!-- 本月订单总数 -->
    <el-row class="margin-top-20">
      <el-col :span="24">
        <home-box :title="'订单统计'">
          <div slot="main" class="order-container">
            <div class="order-left">
              <order-item
                class="margin-top-20"
                :title="'本月订单总数'"
                :number="yoyo.month_order"
                :ratio="yoyo.compare_month_order"
                :ratioTitle="'同比上月'"
              ></order-item>
              <order-item
                class="margin-top-20"
                :title="'本周订单总数'"
                :number="yoyo.week_order"
                :ratio="yoyo.compare_week_order"
                :ratioTitle="'同比上周'"
              ></order-item>
              <order-item
                class="margin-top-20"
                :title="'本月销售总额'"
                :number="yoyo.month_sale"
                :ratio="yoyo.compare_month_sale"
                :ratioTitle="'同比上月'"
              ></order-item>
              <order-item
                class="margin-top-20"
                :title="'本周销售总额'"
                :number="yoyo.week_sale"
                :ratio="yoyo.compare_week_sale"
                :ratioTitle="'同比上周'"
              ></order-item>
            </div>
            <div class="order-right">
              <el-date-picker
                style="float:right;"
                v-model="dateData"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <div id="echarts" style="width: 1200px; height: 400px;"></div>
            </div>
          </div>
        </home-box>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HomeBox from "@/components/home/box";
import HomeBoxies from "@/components/home/boxies";
import OrderItem from "@/components/home/order-item";
import echarts from "echarts";
import api from '@/api/index'

export default {
  components: {
    HomeBox,
    HomeBoxies,
    OrderItem
  },

  data() {
    return {
      dateData: {},
      yoyo: {},
      saleTitles: ["今日订单总数", "今日销售总额", "昨日销售总额", "近7天销售总额"],
      taskTitltes: ["待付款订单","已完成订单","待确认收货订单","待发货订单","新缺货登记","待处理退款申请","已发货订单","待处理退货订单","广告位即将到期"],
      goodsTitles: ["已下架", "已上架", "库存紧张", "全部商品"],
      userTitles: ["今日新增", "昨日新增", "本月新增", "会员总数"],
      fullScreenLoading: false,
    }
  },

  mounted() {
    const chart = echarts.init(document.getElementById('echarts'))
    chart.setOption(this.getOptions())

    this.getHomeIndex()
  },

  methods: {
    // 获取首页信息
    async getHomeIndex() {
      this.fullScreenLoading = true
      const { code, data } = await api.index()
      if (code == 0) {
        this.fullScreenLoading = false
        this.yoyo = data;
      }
    },

    // 获取待处理事务
    getTasks(tasks) {
      if (!tasks) {
        return [];
      }
      return [
        tasks.filter((item, index) => {
          return index < 3
        }),
        tasks.filter((item, index) => {
          return index >= 3 && index < 6
        }),
        tasks.filter((item, index) => {
          return index >= 6 && index < 9
        }),
      ]
    },

    // echarts data
    getOptions() {
      return {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      };
    }
  }
};
</script>

<style scoped lang="less">
@import "../../styles/vars.less";
.home-container {
  .margin-top-20 {
    margin-top: 20px;
  }
  .task-item {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
    padding-bottom: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    > span:first-child {
      color: #666;
      font-size: 16px;
    }
    > span:last-child {
      color: @red;
    }
  }
  .overview-container {
    display: flex;
    justify-content: space-around;
    .overview-item {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      .overview-counter {
        font-size: 25px;
        color: @red;
      }
      .overview-title {
        margin-top: 5px;
        font-size: 16px;
        color: #666;
      }
    }
  }
  .order-container {
    display: flex;
    .order-left {
      flex: 0 0 230px;
      width: 230px;
      border-right: 1px solid #e6e6e6;
    }
    .order-right {
      width: 100%;
    }
  }
}
</style>
