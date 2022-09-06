<template>
  <div id="banner">
    <div class="search">
      <div class="search-container">
        <input
            @keydown.enter="goSearch"
            type="text"
            v-model="searchText"
            placeholder="Please input keywords search in home......"
        />
        <button @click="goSearch">
          Search
        </button>
      </div>
    </div>

  <div class="swiper" v-if="bannerList.length > 0">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in bannerList" :key="item.url">
        <img :src="item.url" alt="" />
      </div>
    </div>
    <!-- Pager if needed -->
    <div class="swiper-pagination"></div>

    <!-- Navigation buttons if required -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
  <NoData v-else/>

  </div>

</template>

<script>
import { getAllBanner } from "@/request/BannerRequest";
import Loading from "@/components/Loading/loading";
import NoData from "@/components/NoData"

export default {
  name: "Banner",
  components: { Loading , NoData},

  data() {
    return {
      searchText: "",
      bannerList: [],
    };
  },
  // data: () => {
  //   return {
  //     bannerList: [],
  //   };
  // },
  async mounted() {
    this.bannerList = (await getAllBanner(this)).data;
    this.$nextTick(() => {
      new Swiper(".swiper", {
          loop: true, // Loop Mode Options
          effect : 'cards',
          // Pager if needed
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          // Forward and back buttons if needed
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
methods: {
  goSearch() {
    if (!this.searchText) return alert("Do not empty")
    this.$router.push({
      name: "home",
      params: {
        keyword: this.searchText,
      },
    });
  },
},
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  height: 150px;
  justify-content: center;
  align-items: center;
  &-container {
    width: 500px;
    height: 45px;
    display: flex;
    input,
    button {
      border: 1px solid #333;
      outline: none;
      transition: 0.2s;
    }
    input {
      padding-left: 1em;
      flex: 1;
      &:focus {
        box-shadow: 0 2px 10px #ddd;
      }
    }
    button {
      width: 100px;
      background-color: #333;
      color: white;
      cursor: pointer;
      position: relative;
      line-height: 45px;
      &:active {
        opacity: 0.8;
      }
    }
  }
}
.swiper {
  --swiper-pagination-color: #eee; /* Both are possible */
  --swiper-theme-color: #ff6600; /* Set the Swiper style */
  --swiper-navigation-color: #eee; /* Set button color separately */
  --swiper-navigation-size: 30px; /* Set button size */
  width: 700px;
  height: 350px;
  img {
    width: 100%;
    height: 100%;
    cursor: move;
  }
}
</style>
