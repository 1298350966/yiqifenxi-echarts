<template>
  <div>
    <div class="mapOne"></div>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      area: [],
      newlyAdded: [],
      existing: [],
      Cumulative: [],
      cure: [],
      death: [],
      a: []
    };
  },
  methods: {
    echartsInit() {
      let data = [{ name: "南海诸岛", value: 0 }];
      axios
        .get(
          "/api/newpneumonia/get?target=trend&isCaseIn=0&stage=publish&callback=jsonp_1593828326098_79746"
        )
        .then(res => {
          var ret = res.data;
          if (typeof ret === "string") {
            var reg = /^\w+\(({[^()]+})\);$/;
            var matches = ret.match(reg);

            if (matches) {
              ret = JSON.parse(matches[1]);
            }
          }
          for (let i = 0; i < ret.data.length; i++) {
            this.area.push(ret.data[i].name);
          }

          for (let i = 0; i < ret.data.length; i++) {
            this.newlyAdded.push(ret.data[i].trend.list[3].data.pop());
          }

          for (let i = 0; i < ret.data.length; i++) {
            this.cure.push(ret.data[i].trend.list[1].data.pop());
          }

          for (let i = 0; i < ret.data.length; i++) {
            this.death.push(ret.data[i].trend.list[2].data.pop());
          }

          for (let i = 0; i < ret.data.length; i++) {
            this.Cumulative.push(ret.data[i].trend.list[0].data.pop());
          }
          for (let i = 0; i < ret.data.length; i++) {
            this.existing.push(
              this.Cumulative[i] - this.death[i] - this.cure[i]
            );
          }
          console.log(ret);

          for (let i = 0; i < ret.data.length; i++) {
            data.push({
              name: ret.data[i].name,
              value: this.Cumulative[i] - this.death[i] - this.cure[i]
            });
          }
          console.log(data);
          this.a = data;
          console.log(this.existing);
        })
        .catch(err => {
          console.error(err);
        });
      // 1. 实例化对象

      var myChart = this.$echarts.init(document.querySelector(".mapOne"));
      console.log(data);
      let dataList = [
        { name: "南海诸岛", value: 0 },
        { name: "北京", value: 325 },
        { name: "天津", value: 1 },
        { name: "上海", value: 27 },
        { name: "重庆", value: 2 },
        { name: "安徽", value: 0 },
        { name: "福建", value: 2 },
        { name: "广东", value: 6 },
        { name: "广西", value: 0 },
        { name: "贵州", value: 0 },
        { name: "甘肃", value: 8 },
        { name: "海南", value: 0 },
        { name: "河南", value: 0 },
        { name: "黑龙江", value: 0 },
        { name: "湖北", value: 0 },
        { name: "湖南", value: 0 },
        { name: "河北", value: 7 },
        { name: "江苏", value: 1 },
        { name: "江西", value: 0 },
        { name: "吉林", value: 0 },
        { name: "辽宁", value: 5 },
        { name: "宁夏", value: 0 },
        { name: "内蒙古", value: 0 },
        { name: "青海", value: 0 },
        { name: "山东", value: 0 },
        { name: "山西", value: 0 },
        { name: "陕西", value: 7 },
        { name: "四川", value: 11 },
        { name: "台湾", value: 98 },
        { name: "西藏", value: 0 },
        { name: "新疆", value: 0 },
        { name: "云南", value: 1 },
        { name: "浙江", value: 1 },
        { name: "香港", value: 116 },
        { name: "澳门", value: 35 }
      ];
      console.log(dataList);
      let option = {
        tooltip: {

          triggerOn: "click",
          formatter: function(e, t, n) {
            return 0.5 == e.value
              ? e.name + "：有疑似病例"
              : e.seriesName + "<br />" + e.name + "：" + e.value;
          }
        },
      
        visualMap: {
          min: 0,
          max: 1000,
          left: 26,
          bottom: 40,
          showLabel: !0,
          text: ["高", "低"],
          pieces: [
            {
              gt: 100,
              label: "> 100 人",
              color: "#7f1100"
            },
            {
              gte: 10,
              lte: 100,
              label: "10 - 100 人",
              color: "#ff5428"
            },
            {
              gte: 1,
              lt: 10,
              label: "1 - 9 人",
              color: "#ff8c71"
            },
            {
              gt: 0,
              lt: 1,
              label: "疑似",
              color: "#ffd768"
            },
            {
              value: 0,
              color: "#ffffff"
            }
          ],
          show: !0
        },
        geo: {
          map: "china",
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.23,
          top: 120,
          label: {
            normal: {
              show:  true,
              fontSize: "14",
              color: "rgba(0,0,0,0.7)"
            }
          },
          itemStyle: {
            normal: {
              show: true,
              //shadowBlur: 50,
              //shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: "#f2d5ad",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: "确诊病例",
            type: "map",
            geoIndex: 0,
            data: dataList
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.echartsInit();
  }
};
</script>

<style scoped>
</style>