import {
  addCart,
  getCarts,
  deleteCart,
  updateCartNumber,
} from "@/request/CartRequest";

export default {
  namespaced: true,
  state: () => ({
    //  Raw shopping cart Data
    carts: [],
    // This is where the data structures I need to display my shopping cart page are stored
    cartList: [],
  }),
  actions: {
    get_carts: function (store,uid) {
      return new Promise((resolve, reject) => {
        getCarts(uid).then((carts) => {
          resolve(carts.data);
          store.commit("GET_CARTS", carts.data);
        });
      });
    },
    add_cart: function (store, commdity) {
      //  Add to database
      return new Promise((reslove, reject) => {
        addCart(commdity)
          .then((cart) => {
            store.commit("ADD_CART", cart.data);
            reslove(cart);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateCartNumber: function (store, options) {
      store.commit("UPDATE_CART_NUMBER", options);
    },
    checkAll: function (store, options) {
      store.commit("CHECKED_ALL", options);
    },
    delete_cart: function (store, id) {
      return new Promise((resolve, reject) => {
        deleteCart(id)
          .then(() => {
            resolve("success");
            store.commit("DELETE_CART_LIST", id);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {
    GET_CARTS: function (state, carts) {
      state.carts = carts;
    },
    ADD_CART: function (state, cartRecord) {
      state.carts.push(cartRecord);
    },
    CHECKED_ALL: function (state, options) {
      if (options.index === undefined) {
        state.carts.forEach((element) => {
          element.isChecked = options.checked;
        });
      } else {
        state.carts[options.index].isChecked = options.checked;
      }
    },
    MAP_CARLIST: function (state, carts) {
      state.cartList = carts;
    },
    UPDATE_CART_NUMBER: function (state, options) {
      const cart = state.carts[options.index];
      if (!options.n) {
        cart.number++;
      } else if (options.add) {
        cart.number += +options.n;
      } else {
        cart.number = +options.n;
      }
      updateCartNumber(cart);
    },
    DELETE_CART_LIST: function (state, id) {
      if (!id) return (state.carts = []);
      const index = state.carts.findIndex((item) => {
        return item.id === id;
      });
      state.carts.splice(index, 1);
    },
  },
};
