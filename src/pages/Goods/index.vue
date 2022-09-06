<template>
  <div>
    <h2 style="text-align:center;margin:15px">This page only does a display of multi-level list function</h2>
    <div id="goods">
      <template v-if="isShow">
        <router-link
          @click.native="getGoods(item.id)"
          :to="{ name: 'goods', params: { id: item.id } }"
          v-for="item in goods"
          :key="item.id"
        >
          {{ item.name }}
        </router-link>
      </template>
      <NoData :msg="msg" v-else />
      <router-link class="back" @click.native="getGoods(0)" to="/commdity">
        ← Back to Top List
      </router-link>
      <Loading v-show="isLoading" />
    </div>
  </div>
</template>

<script>
// Import Goods business logic encapsulation
import { getGoodsList } from "@/hooks/GoodHook";
import NoData from "@/components/NoData";
import Loading from "@/components/Loading/loading";

export default {
  name: "Goods",
  components: {
    NoData,
    Loading,
  },
  data() {
    return {
      allGood: undefined,
      goods: [],
      isShow: true,
      isLoading: true,
      msg: "NoData",
    };
  },
  mounted() {
    // Acquire commodity data
    this.getGoods(this.$route.params.id || 0);
  },
  methods: {
    // Acquire commodity data
    getGoods(id) {
      getGoodsList(this, this.$route.params.id || 0);
    },
  },
};
</script>

<style lang="less" scoped>
#goods {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .back {
    text-decoration: none;
  }
  a {
    transition: 0.5s;
    padding: 5px;
    margin: 0 10px;
    color: #000;
    text-decoration:none;
    &:hover:not(.back) {
      color: #fff;
      background-color: grey;
    }
  }
}
</style>
