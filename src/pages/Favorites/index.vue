<template>
  <div id="favorites">
    <Toast show :fade="isFade" :msg="msg" />
    <h2 v-show="favorites.length === 0" style="margin: 20px 0">No favorite commodities at present</h2>
    <div class="favorites" v-for="favorite in favorites" :key="favorite.id">
      <div class="favorites-photo">
        <img v-lazy="favorite.commdity.url" />
        <a href="javascript:void(0)" @click="deleteFavorite(favorite.id)" id="del">
          Delete
        </a>
      </div>
      <div class="favorites-info">
        <p class="title">
          <router-link :to="`/magnifer?id=${favorite.commdity.id}`">{{
            favorite.commdity.title
          }}</router-link>
        </p>
        <p class="price">$ {{ favorite.commdity.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getFavoritesHook, deleteFavoriteHook } from "@/hooks/FavoriteHook";
import { mapState } from "vuex"

export default {
  name: "Favorites",
  data() {
    return {
      favorites: [],
      isFade: false,
      msg: "",
    };
  },
  computed: {
    ...mapState("user",["userInfo"])
  },
  mounted() {
    getFavoritesHook(this.userInfo.id)
      .then((result) => {
        this.favorites = result.data;
      })
      .catch((err) => {
        this.favorites = [];
      });
  },
  methods: {
    async deleteFavorite(id) {
      if (confirm("Are you sure to delete it?")) {
        let res = await deleteFavoriteHook(id);
        if (!res.errMsg) {
          this.msg = "Delete success";
          this.favorites = (await getFavoritesHook(this.userInfo.id)).data;
        }
        this.isFade = true;
        setTimeout(() => (this.isFade = false), 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#favorites {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  .favorites {
    width: 160px;
    margin: 0 10px;
    #del{
      color:#AFEEEE;
    }
    &-photo {
      position: relative;
      img {
        width: 160px;
        height: 160px;
      }
    }
    &-info {
      .title {
        height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .price {
        color: red;
        font-size: 25px;
      }
    }
  }
}
*{
  text-decoration: none;
  color:white;
}
</style>
