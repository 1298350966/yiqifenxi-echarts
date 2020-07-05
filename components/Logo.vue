<template>
  <div class="content">
    <div class="title2">
      <h3>国内各地区疫情统计汇总</h3>
      <p>7:00-10:00为更新高峰，数据若滞后敬请谅解</p>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>疫情地区</th>
            <th>新增</th>
            <th>现有</th>
            <th>累计</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in area" :key="index">
            <td>{{area[index]}}</td>
            <td>{{newlyAdded[index]}}</td>
            <td>{{existing[index]}}</td>
            <td>{{Cumulative[index]}}</td>
            <td>{{cure[index]}}</td>
            <td>{{death[index]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      nameList: [],
      domesticList: [],
      updateDate: []
    };
  },
  mounted() {
    this.getdomesticList();
  },
  methods: {
    getdomesticList() {
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

          
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 30px;
}
.title2 {
  h3 {
    color: #303133;
  }
  p {
    color: #606266;
    font-size: 14px;
  }
}

table {
  table-layout: fixed;
  width: 100%;
  margin-top: 0.625rem;
  text-align: center;
  border-spacing: 0 0.3125rem;
  font-size: 0.8125rem;
  color: #4d5054;

  thead {
    font-size: 0.938rem;
    tr {
      background: #f5f6f7;
      th {
        padding: 5px;
        text-align: center;
        font-weight: 700;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
    }
  }
  tbody {
    tr {
      background: #f5f6f7;

      td:nth-child(1) {
        background-color: #00bec9;
        padding: 5px;
        font-weight: 700;
        color: #fff;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
    }
  }
}
</style>>

