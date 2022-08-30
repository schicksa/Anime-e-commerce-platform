<template>
    <div class="search">
    <div class="search-container">
      <input
        @keydown.enter="goSearch"
        type="text"
        v-model="searchText"
        placeholder="please input keywords search in home......"
      />
      <button @click="goSearch">
        Search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {
      searchText: "",
    };
  },

  mounted() {},

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
</style>
