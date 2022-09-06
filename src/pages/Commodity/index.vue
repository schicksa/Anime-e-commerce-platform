<template>
  <div id="commdity">
    <Toast :msg="msg" show :fade="isFade" />
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
      <NoData :msg="msg0" v-else />
      <router-link class="back" @click.native="getGoods(0)" to="/commdity">
        ← Back to Top List
      </router-link>
      <Loading v-show="isLoading" />
    </div>
    <div class="commdity-type">
      <button
          @click="
          (toggleId = 1)
            ? loadCommdityList(
                pageIndex,
                pageSize,
                searchType,
                searchText,
                orderField,
                orderType
              )
            : 1
        "
      >
        Commodity list panel
      </button>
      <button @click="toggleId = 2">Add Commodity panel</button>
      <button @click="toggleId = 3">Delete Commodity panel</button>
    </div>
    <div class="other-func">
      <div class="search">
        Search:
        <select v-model="searchType">
          <option value="default">Blank</option>
          <option
              v-for="(item, index) in search"
              :key="index"
              :value="item.value"
          >
            {{ item.text }}
          </option>
        </select>
        &nbsp;
        <input
            type="text"
            v-model.lazy="searchText"
            :placeholder="
            searchType !== 'default'
              ? ' Search by ' + formatSearchType
              : ' Please select a search type'
          "
        />
      </div>
      <div class="sort">
        Sort:
        <select v-model="orderField">
          <option value="default">Blank</option>
          <option value="price">Price</option>
          <option value="payCount">Number of payment</option>
        </select>
        &nbsp;
        <select v-model="orderType">
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
    </div>
    <div v-show="toggleId === 1">
      <div class="pagination">
        Page {{ pageIndex }} | Each page can displays {{ pageSize }} commodities | Current page display
        {{ commdityList.length }} commodities |
        <a
            href="javascript:void(0)"
            @click="
            loadCommdityList(
              --pageIndex <= 1 ? (pageIndex = 1) && 1 : pageIndex,
              pageSize,
              searchType,
              searchText,
              orderField,
              orderType
            )
          "
        >
           Previous
        </a>
        |
        <a
            href="javascript:void(0)"
            @click="
            loadCommdityList(
              commdityList.length !== 0 ? ++pageIndex : pageIndex,
              pageSize,
              searchType,
              searchText,
              orderField,
              orderType
            )
          "
        >
          Next
        </a>
      </div>
      <div class="commdity-list">
        <h2 v-show="commdityList.length === 0">Temporarily no data</h2>
        <div
            class="commdity-list-wrapper"
            v-for="item in commdityList"
            :key="item.id"
        >
          <div class="commdity-list-wrapper-content">
            <div class="img">
              <img v-lazy="item.url" alt="" />
            </div>
            <p class="price">
              <big>{{ item.price | formatPrice }}</big>
            </p>
            <p class="title">
              <router-link
                  :to="{ path: '/magnifer', query: { id: item.id } }"
              >{{ item.title }}</router-link
              >
            </p>
            <p class="trade">{{ item.trade }}</p>
            <p class="address">{{ item.address }}</p>
            <small class="payCount" style="color: grey">{{
                (item.payCount + "+") | formatPayCount
              }}</small>
            <div class="add-cart">
              <button @click="addCart(item)">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="commdity-main" v-show="toggleId === 2">
      <div class="commdity-main-list"></div>
      <div class="commdity-main-add">
        <div class="form-control">
          <label for=""> commodity ID </label>
          <input
              type="text"
              v-model="formData.id"
              readonly
              placeholder="Please enter the commodity ID"
          />
          &nbsp; <span style="color: red">* only read</span>
        </div>
        <div class="form-control">
          <label for=""> commodity title </label>
          <input
              type="text"
              v-model="formData.title"
              placeholder="Please enter the commodity title"
          />
        </div>
        <div class="form-control">
          <label for=""> commodity price </label>
          <input
              type="text"
              v-model.number="formData.price"
              placeholder="Please enter the commodity price"
          />
        </div>
        <div class="form-control">
          <label for=""> delivery address </label>
          <input
              type="text"
              v-model="formData.address"
              placeholder="Please enter the delivery address"
          />
        </div>
        <div class="form-control">
          <label for=""> Brand </label>
          <input
              type="text"
              v-model="formData.trade"
              placeholder="Please enter the brand name"
          />
        </div>
        <div class="form-control">
          <label for=""> number of payers </label>
          <input
              type="text"
              v-model.number="formData.payCount"
              placeholder="Please enter the number of payers "
          />
        </div>
        <div class="form-control">
          <label for=""> commodity picture </label>
          <input
              type="text"
              v-model="formData.url"
              placeholder="Please enter commodity picture"
          />
        </div>
        <div class="form-control">
          <label></label>
          <input type="button" @click="submitForm" value="Add commodity" />
        </div>
      </div>
    </div>
    <div v-show="toggleId === 3">
      <h2 style="margin: 20px 0">
        Clicking on the corresponding ID will delete the corresponding commodity -
        <span style="color: red">It corresponds to the list of commodities</span>
      </h2>
      <div>
        <p v-for="item in ids" :key="item.id">
          {{ item.title }} &nbsp;&nbsp;&nbsp;
          <a href="javascript:void(0)" @click="deleteCommdity(item.id)">
            {{ item.id }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addCommdityHook,
  getCommdityListHook,
  getCommdityIds,
  deleteCommdityHook,
} from "@/hooks/CommdityHook";
import { mapState, mapActions } from "vuex";
import { nanoid } from "nanoid";

import addCardMixin from "@/mixins/add_cart"
import NoData from "@/components/NoData";
import Loading from "@/components/Loading/loading";
import {getGoodsList} from "@/hooks/GoodHook";

export default {
  name: "Commodity",
  components: {
    NoData,
    Loading,
  },
  data() {
    return {
      //Goods
      allGood: undefined,
      goods: [],
      isShow: true,
      isLoading: true,
      msg0: "NoData",
      //Commodity
      search: [
        { text: "Title", value: "title" },
        { text: "Brand", value: "trade" },
        { text: "Delivery address", value: "address" },
      ],
      searchType: "default",
      searchText: "",
      orderField: "default",
      orderType: "asc",
      commdityList: [],
      isFade: false,
      msg: "Form items cannot be empty",
      ids: [],
      pageIndex: 1,
      pageSize: 12,
      formData: {
        id: nanoid(),
        title: "",
        price: "",
        address: "",
        trade: "",
        payCount: "",
        url: "",
      },
      isSubmit: true,
      toggleId: 1,
      userInfo:this.$store.state.user.userInfo,
      token:this.$store.state.user.token
    };
  },
  mounted() {
    // Acquire commodity data
    this.getGoods(this.$route.params.id || 0);
    // loadCommdityList
    this.loadCommdityList(this.pageIndex, this.pageSize);
  },
  computed: {
    ...mapState("cart", ["carts"])
  },
  // Add to shopping cart
  mixins:[addCardMixin],
  methods: {
    // Acquire commodity data
    getGoods(id) {
      getGoodsList(this, this.$route.params.id || 0);
    },
    // Commodity
    ...mapActions("cart", ["add_cart", "delete_cart", "updateCartNumber"]),
    loadCommdityList(
        pageIndex,
        pageSize,
        searchType,
        searchText,
        sortType,
        orderType
    ) {
      // Getting list data
      getCommdityListHook(
          pageIndex,
          pageSize,
          searchType,
          searchText,
          sortType,
          orderType
      ).then((res) => {
        if (res.errMsg) {
          if (res.errMsg) {
            this.isFade = true;
            this.msg = "Acquisition failed";
          }
        }
        this.commdityList = res.data || [];
        this.ids = getCommdityIds(this.commdityList);
      });
    },
    submitForm() {
      for (let formItem in this.formData) {
        if (!/[\w\d\p{L}]+/gu.test(this.formData[formItem])) {
          this.isSubmit = false;
          this.msg = "It does not meet the requirements of format specification";
        } else {
          if (formItem === "price" || formItem === "payCount") {
            if (!/\d+/g.test(this.formData[formItem])) {
              this.isSubmit = false;
              this.msg = "ID,price,payCount must be number";
            } else {
              this.isSubmit = true;
            }
          }
        }
      }
      if (this.isSubmit) {
        this.msg = "You can submit it when completed";
        //  Add commodity
        addCommdityHook(this.formData)
            .then((res) => {
              this.msg = "Add success，Please go to the commodity list panel to see";
              if (res.errMsg) {
                this.msg = "Add fails，ID not repeat";
              }
              // Regenerate ID
              this.formData.id = nanoid();
            })
            .catch((err) => {
              this.msg = "Add fails, check whether the network or JSON-SERVER is enabled";
            });
      }
      this.isFade = true;
      //  Close Toast
      setTimeout(() => {
        this.isFade = false;
      }, 1000);
    },
    async deleteCommdity(id) {
      if (confirm("Are you sure to delete ?")) {
        try {
          await deleteCommdityHook(id);
          this.isFade = true;
          this.msg = "Delete successfully";
          this.toggleId = 1;
          this.loadCommdityList(this.pageIndex, this.pageSize);
        } catch (error) {
          this.msg = "Failed to delete. Unknown error";
        }
        setTimeout(() => {
          this.isFade = false;
        }, 1000);
      }
    },
    searchCommdity() {
      loadCommdityList(
          this.pageIndex,
          this.pageSize,
          this.orderField,
          this.orderType
      );
    },
    solveRepeat(field, msg) {
      this.pageIndex = 1;
      if (field === "default") {
        this.isFade = true;
        this.msg = msg;
        setTimeout(() => {
          this.isFade = false;
        }, 1000);
        return false;
      }
      return true;
    },
  },
  computed: {
    ...mapState("cart", ["carts"]),
    formatSearchType() {
      for (const item in this.search) {
        if (this.searchType === this.search[item].value) {
          return this.search[item].text;
        }
      }
    },
  },
  watch: {
    orderField() {
      if (this.solveRepeat(this.orderField, "Please select the sort field"))
        this.loadCommdityList(
            this.pageIndex,
            this.pageSize,
            this.searchType,
            this.searchText,
            this.orderField,
            this.orderType
        );
    },
    orderType() {
      if (this.solveRepeat(this.orderField, "Please select the sort field"))
        this.loadCommdityList(
            this.pageIndex,
            this.pageSize,
            this.searchType,
            this.searchText,
            this.orderField,
            this.orderType
        );
    },
    searchText() {
      if (this.solveRepeat(this.searchType, "Please select a search type"))
        this.loadCommdityList(
            this.pageIndex,
            this.pageSize,
            this.searchType,
            this.searchText
        );
    },
    searchType() {
      this.loadCommdityList(
          this.pageIndex,
          this.pageSize,
          this.searchType,
          this.searchText
      );
    },
  },
  filters: {
    formatPrice(value) {
      return "$ " + value;
    },
    formatPayCount(value) {
      return value + " people pay";
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
      color: white;
      background-color: grey;
    }
  }
}
#commdity {
  .other-func {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    select{
      display: inline-block;
      position: relative;
      vertical-align: middle;
      //overflow: hidden;
      background-color: #fff;
      color: #555;
      border: 1px solid #aaa;
      text-shadow: none;
      border-radius: 4px;
      transition: box-shadow 0.25s ease;
      z-index: 2;
      height: 20px;
      cursor: pointer;
   }
    select:focus {
      outline: none;
    }
    div {
      margin: 0 15px;
      input{
        width: 165px;
        height: 25px;
        border-radius: 42px;
        border: 2px solid #324B4E;
        background: #F9F0DA;
        transition: .3s linear;
        float: right;
      }
      input:focus {
        width: 200px;
      }
    }
  }
  .pagination {
    text-align: right;
    color: #fe7d7d;
    font-size: 16px;
    padding: 5px;
    a{
      color:white;
      text-decoration: none;
      font-size: 20px;
    }
  }
  .commdity-list {
    display: flex;
    flex-wrap: wrap;
    width: 1200px;
    h2 {
      margin: 20px 0;
    }

    &-wrapper {
      width: 200px;
      padding: 10px;
      &-content {
        background-color: white;
        width: 150px;
        height: auto;
        border: 1px solid #ddd;
        padding: 5px;
        .add-cart {
          display: flex;
          button {
            margin: 5px 0;
            color: #eee;
            border: none;
            outline: none;
            font-size: 12px;
            width: 150px;
            margin-left: auto;
            height: 20px;
            background: #f53b57;
            cursor: pointer;
          }
        }

        .title {
          a {
            color: #007185;
            text-decoration:none;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
        .price {
          color: red;
          font-size: 14px;
        }
        .trade {
          color: #999;
          text-decoration: none;
        }
        img {
          width: 100%;
          height: 120px;
        }
      }
    }
  }
  display: flex;
  align-items: center;
  flex-direction: column;
  .commdity-type {
    button {
      width: 200px;
      background-color: #333;
      color: #eee;
      height: 30px;
      margin: 0 10px;
      text-decoration: none;
      cursor: pointer;
    }
  }
  .commdity-main {
    &-list,
    &-add {
      display: flex;
      margin-top: 10px;
      flex-direction: column;
      .form-control {
        display: flex;
        height: 30px;
        margin: 5px 0;
        text-align: right;
        label {
          width: 100px;
          line-height: 30px;
        }
        input {
          margin-left: 10px;
          flex: 1;
          border: 1px solid #333;
          padding-left: 1em;
          outline: none;
        }

        input[type="button"] {
          background-color: #333;
          color: white;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}

*{
  text-decoration:none;
}
</style>
