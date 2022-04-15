<template>
  <div class="outer">
    <div class="top">
      <div>
        <h3>welcome!</h3>
      </div>
      <div>
        <el-button type="primary" @click="download">项目笔记下载</el-button>
      </div>
    </div>
    <div class="center">
      <div style="width: 40%; height: 50%" id="bar"></div>
      <div style="width: 40%; height: 50%" id="line"></div>
      <div style="width: 40%; height: 50%" id="pie"></div>
      <div style="width: 40%; height: 50%" id="radar"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myBar: null,
      myline: null,
      mypie: null,
      myradar: null,
    };
  },
  methods: {
    download() {
      console.log("文件下载");
      this.$axios({
        url: "/download",
        method: "get",
        // responseType: "ArrayBuffer", // 文件下载 默认格式 ArrayBuffer
        responseType: "blob", // 设置拿到的响应数据的格式
      }).then((res) => {
        console.log(res.data);
        const blob = res.data;
        let url = URL.createObjectURL(blob);
        console.log(url);
        let link = document.createElement("a");
        link.href = url;
        link.download = "img.jpg";
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    drawBar() {
      console.log("加载图表bar");
      const myBar = this.$echarts.init(document.getElementById("bar")); //初始化图表
      let option = {
        //配置项
        title: {
          text: "bar",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      myBar.setOption(option); //使用配置项
      this.myBar = myBar; // 将echarts图表 赋值给vue实例的属性
    },
    drawLine() {
      const myline = this.$echarts.init(document.getElementById("line")); //实例化图表
      let option = {
        title: {
          text: "line",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      myline.setOption(option); //使用配置项
      this.myline = myline;
    },
    drawPie() {
      const mypie = this.$echarts.init(document.getElementById("pie")); //实例化图表
      let option = {
        title: {
          text: "pie",
        },
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: ["30%", "80%"],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };
      mypie.setOption(option); //使用配置项
      this.mypie = mypie;
    },
    drawRadar() {
      const myradar = this.$echarts.init(document.getElementById("radar")); //实例化图表
      let option = {
        title: {
          text: "Radar",
        },
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
      myradar.setOption(option); //使用配置项
      this.myradar = myradar;
    },
  },
  mounted() {
    this.drawBar();
    this.drawLine();
    this.drawPie();
    this.drawRadar();
    let vm = this;
    window.onresize = function () {
      // BOM事件,当视口大小改变的时候触发
      vm.myBar && vm.myBar.resize(); // 当视口改变时，重新计算图表的大小
      vm.myline && vm.myline.resize();
      vm.mypie && vm.mypie.resize();
      vm.myradar && vm.myradar.resize();
    };
  },
};
</script>

<style lang="less" scoped>
.outer {
  height: 100%;
  .top {
    display: flex;
    justify-content: space-between;
  }
  .center {
    padding: 10px;
    box-sizing: border-box;
    height: 90%;
    background: white;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}
</style>