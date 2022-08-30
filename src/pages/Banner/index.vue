<template>
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
</template>

<script>
import { getAllBanner } from "@/request/BannerRequest";
import Loading from "@/components/Loading/loading";
import NoData from "@/components/NoData"

export default {
  name: "Banner",
  components: { Loading , NoData},
  data: () => {
    return {
      bannerList: [],
    };
  },
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
};
</script>

<style lang="less" scoped>
.swiper {
  --swiper-pagination-color: #eee; /* Both are possible */
  --swiper-theme-color: #ff6600; /* Set Swiper style */
  --swiper-navigation-color: #eee; /* Set button color individually */
  --swiper-navigation-size: 30px; /* set button size */
  width: 600px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    cursor: move;
  }
}
</style>
