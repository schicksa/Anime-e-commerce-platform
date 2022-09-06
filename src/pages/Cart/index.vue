<template>
  <div id="cart">
    <Toast show :fade="isFade" :msg="msg" />
    <div>
      <div class="cart-header">
        <h2>There are ({{ carts.length }}) goods in the shopping cart</h2>
        <p>
          The total price has been selected:<span> {{ totalPrice || 0 }} </span>
          <button
            :disabled="carts.length === 0"
            :style="{ background: carts.length === 0 ? '#ccc' : 'orangered' }"
            @click="pay"
          >
            Settlement
          </button>
        </p>
      </div>
      <div class="cart-main" v-if="carts.length !== 0">
        <div class="cart-main-title">
          <div class="allChecked">
            <input type="checkbox" :checked="allCheck" @change="allChecked" />
            Select all
          </div>
          <div class="commdityInfo">Commodity information</div>
          <div class="singlePrice">monovalent</div>
          <div class="number">amount</div>
          <div class="totalPrice">money</div>
          <div class="operation">operation</div>
        </div>
        <div class="cart-main-commdity">
          <div
            class="cart-main-commdity-trade"
            v-for="(cart, trade) in cartList"
            :key="trade"
          >
            store:
            <b
              ><i
                ><big>{{ trade }}</big></i
              ></b
            >
            <div class="trade-commdity">
              <table v-for="c in cart" :key="c.id">
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      @change="allChecked($event, c.id)"
                      v-model="c.isChecked"
                    />
                    &nbsp;
                    <img v-lazy="c.commdity.url" />
                    &nbsp;
                    <router-link :to="'/magnifer?id=' + c.commdity.id">{{
                      c.commdity.title
                    }}</router-link>
                  </td>
                  <td class="trade-price">$ {{ c.commdity.price }}</td>
                  <td class="trade-number">
                    <input
                      :value="c.number"
                      :data-id="c.cid"
                      @blur="updateCNumber"
                      type="number"
                    />
                    <small>  </small>
                  </td>
                  <td class="trade-totalPrice">
                    {{ c.number * c.commdity.price }}
                  </td>
                  <td class="trade-operation">
                    <a
                      href="javascript:void(0)"
                      @click="
                        addFavorite({

                          cid: c.commdity.id,
                          commdity: c.commdity,
                        })
                      "
                      >Add to favorites</a
                    >
                    <br/>
                    <a href="javascript:void(0)" @click="deleteCarts(c.id)"
                      >Delete</a
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="carts.length === 0">
        <h2 style="text-align: center; margin: 25px 0">
          Your cart is empty. Go add commodities~~
        </h2>
      </div>
      <div class="cart-footer" v-if="carts.length !== 0">
        <div>
          <input type="checkbox" :checked="allCheck" @change="allChecked" />
          Select all
        </div>
        <div>
          <button><a href="javascript:void(0)" @click="deleteCarts(undefined)"
            >Clear shopping cart</a
          ></button>
          <small style="color: red"
            >* Just delete it in memory</small>
        </div>
        <p>
          The total price has been selected:<span> {{ totalPrice }} </span>
          <button
            :disabled="carts.length === 0"
            :style="{ background: carts.length === 0 ? '#ccc' : 'orangered' }"
            @click="pay"
          >
            Settlement
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {
  mapCartToTradeHook,
  checkedCommdityTotalPrice,
} from "@/hooks/CartHook";
import {
  addFavoriteHook,
  getFavoriteCommdityByCIdHook,
} from "@/hooks/FavoriteHook";
import { nanoid } from "nanoid";

export default {
  name: "Cart",
  data() {
    return {
      prevNumber: 0,
      isFade: false,
      msg: "",
    };
  },
  mounted() {
    this.get_carts(this.userInfo.id).then((carts) => {
      this.MAP_CARLIST(mapCartToTradeHook(carts));
    });
  },
  computed: {
    ...mapState("cart", ["carts", "cartList"]),
    ...mapState("user",["userInfo"]),
    totalPrice() {
      return checkedCommdityTotalPrice(this.carts);
    },
    allCheck() {
      return this.carts.every((item) => item.isChecked);
    },
  },
  methods: {
    ...mapMutations("cart", ["MAP_CARLIST"]),
    ...mapActions("cart", [
      "add_cart",
      "delete_cart",
      "updateCartNumber",
      "checkAll",
      "get_carts",
      "delete_cart",
    ]),
    deleteCarts(id) {
      if (confirm(id ? "Are you sure about deleting this commodity?" : "Are you sure to clear the cart?")) {
        this.delete_cart(id).then((res) => {
          this.MAP_CARLIST(mapCartToTradeHook(this.carts));
        });
      }
    },
    pay() {
      alert("To pay for");
    },
    allChecked(e, id) {
      let index = this.carts.findIndex((item) => {
        return item.id === id;
      });
      if (index < 0) index = undefined;
      this.checkAll({
        checked: e.target.checked,
        index,
      });
    },
    updateCNumber(e) {
      const index = this.carts.findIndex((item) => {
        return item.cid === e.target.dataset["id"];
      });
      let n = +e.target.value;
      if (n < 0) {
        n = 1;
        e.target.value = 1;
      }
      if (this.prevNumber !== n) {
        this.updateCartNumber({
          index,
          n,
        });
      }
      this.prevNumber = n;
    },
    async addFavorite(favoriteRecord) {
      let fav = await getFavoriteCommdityByCIdHook(favoriteRecord.cid,this.userInfo.id);
      if (fav.data.length <= 0) {
        favoriteRecord.id = nanoid();
        favoriteRecord.uid = this.userInfo.id;
        let res = await addFavoriteHook(favoriteRecord);
        if (!res.data.errMsg) {
          this.msg = "The favorite folder is added successfully.";
        } else {
          this.msg = "The favorite folder is added failed.";
        }
      } else {
         this.msg = "The commodity already exists in the favorites folder";
      }
      this.isFade = true;
      setTimeout(() => (this.isFade = false), 1000);
    },
  },
};
</script>

<style lang="less" scoped>
#cart {
  width: 1000px;
  height: auto;
  margin: 0 auto;
  padding: 15px;
  .cart-header {
    display: flex;
    height: 60px;
    line-height: 40px;
    justify-content: space-between;
    padding-bottom: 25px;
    border-bottom: 1px solid #eee;
  }
  p {
    font-size: 16px;
    span {
      color: red;
      font-size: 25px;
    }
    button {
      width: 80px;
      height: 40px;
      background-color: orangered;
      color: white;
      border-radius: 25px;
      border: none;
      cursor: pointer;
    }
  }
  .cart-main {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    &-commdity {
      margin-top: 20px;
      &-trade {
        margin-top: 10px;
      }
      table {
        margin-top: 10px;
        background-color: #eee;
        padding: 10px;
        td:first-child {
          img {
            width: 100px;
            height: 100px;
          }
          display: flex;
          justify-content: space-between;
          a {
            color: #333;
            font-size: 14px;
            height: 35px;
            &:hover {
              color: orangered;
            }
          }
        }
        .trade-price {
          font-size: 20px;
        }
        .trade-totalPrice {
          font-size: 25px;
          color: red;
        }
        .trade-operation {
          //display: flex;
          flex-direction: column;
          a {
            color: #333;
            &:hover {
              color: orangered;
            }
          }
        }
        td:not(td:first-child) {
          width: 120px;
          text-align: center;
          input {
            width: 40px;
            height: 30px;
          }
        }
      }
    }
    &-title {
      margin-top: 15px;
      font-weight: bold;
      font-size: 14px;
      width: 100%;
      display: flex;
      .allChecked {
        width: 120px;
      }
      .commdityInfo {
        flex: 1;
      }
      .singlePrice {
        width: 120px;
      }
      .number {
        width: 120px;
      }
      .totalPrice {
        width: 100px;
      }
      .operation {
        width: 120px;
      }
    }
  }
  .cart-footer {
    display: flex;
    justify-content: space-between;
    button{
      border-radius: 20px;
      padding:5px;
      background-color: #333333;
    }
    a{
      color:#AFEEEE;
    }
  }
}
*{
  text-decoration: none;
}
</style>
