<template>
  <main>
    <div class="title">
      <p>新型冠状病毒肺炎</p>
      <h2>疫情实时大数据报告</h2>
    </div>
    <section>
      <div class="top" >
        <h4 :class="{'line':dataShow}" @click="Show">国内疫情</h4>
        <h4 :class="{'line':!dataShow}" @click="Show">国外疫情</h4>
      </div>

      <div class="data" v-show="dataShow" > 
        <div class="title1">
          <h4>国内疫情</h4>
          <div class="time">
            <p>数据更新至 2020.{{time1}} </p>
            <p>☺数据说明</p>
          </div>
        </div>
        <ul>
          <li>
            <p>现有确诊</p>
            <h2>524</h2>
            <p class="small">昨日+13</p>
          </li>
          <li>
            <p>无症状</p>
            <h2>99</h2>
            <p class="small">昨日+4</p>
          </li>
          <li>
            <p>现有疑似</p>
            <h2>7</h2>
            <p class="small">昨日+1</p>
          </li>
          <li>
            <p>现有重症</p>
            <h2>7</h2>
            <p class="small">昨日-1</p>
          </li>
          <li>
            <p>累计确诊</p>
            <h2>85227</h2>
            <p class="small">昨日+23</p>
          </li>
          <li>
            <p>境外输入</p>
            <h2>1918</h2>
            <p class="small">昨日+11</p>
          </li>
          <li>
            <p>累计治愈</p>
            <h2>80055</h2>
            <p class="small">昨日+10</p>
          </li>
          <li>
            <p>累计死亡</p>
            <h2>4648</h2>
            <p class="small">昨日+0</p>
          </li>
        </ul>
        <map-one></map-one>
        <logo></logo>
      </div>
      <div class="data" >
        <div class="title1">
          <h4>国外疫情</h4>
          <div class="time">
            <p>数据更新至2020.{{time1}} </p>
            <p>☺数据说明</p>
          </div>
        </div>
        <ul>
          <li>
            <p>现有确诊</p>
            <h2>4234616</h2>
            <p class="small">昨日+60035</p>
          </li>
          <li>
            <p>累计确诊</p>
            <h2>10354044</h2>
            <p class="small">昨日+152227</p>
          </li>
          <li>
            <p>累计治愈</p>
            <h2>5615099</h2>
            <p class="small">昨日+89121</p>
          </li>
          <li>
            <p>累计死亡</p>
            <h2>504329</h2>
            <p class="small">昨日昨日+3071</p>
          </li>
        </ul>
        <map-tow></map-tow>
        <abroad></abroad>
      </div>
    </section>
    <section>
      <my-map></my-map>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dataShow: true,
      time1:''
    }
  },
  mounted() {
    this.time()
  },
  methods: {
    Show(){
      this.dataShow = !this.dataShow

    },
    time(){
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
         

           
         
          this.time1 = ret.data[0].trend.updateDate.pop()
          
          console.log(ret);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
};
</script>

<style scoped>
</style>