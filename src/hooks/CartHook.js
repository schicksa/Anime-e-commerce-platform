// Filter by store
// so there is no store ID and the store name is used as the KEY
export const mapCartToTradeHook = (cartRcords) => {
  const o = {};
  cartRcords.map((cur) => {
    if (!o[cur.commdity.trade]) {
      o[cur.commdity.trade] = [cur];
    } else {
      o[cur.commdity.trade].push(cur);
    }
  });
  return o;
};

let timer = null;

// Add to shopping cart
export const addCartHook = async (commdity, cartRecord) => {
  clearTimeout(timer);
  let isSuc = {};
  if (commdity.carts.length <= 0) {
    isSuc = await commdity.add_cart(cartRecord);
  } else {
    const index = commdity.carts.findIndex((v) => {
      return v.cid === cartRecord.cid;
    });
    if (index < 0) {
      isSuc = await commdity.add_cart(cartRecord);
    } else {
      console.log(66666);
      // Modify number of same commodity + 1
      commdity.updateCartNumber({
        index: index,
        n: cartRecord.number || 1,
        add: true,
      });
    }
  }
  if (!isSuc.errMsg) {
    commdity.msg = "Add success";
  } else {
    commdity.msg = "Add fails";
  }
  commdity.isFade = true;
  timer = setTimeout(() => {
    commdity.isFade = false;
  }, 1000);
};

// Calculate the total price of the selected commodity
export const checkedCommdityTotalPrice = (carts) => {
  return carts.reduce((prev, cur) => {
    if (cur.isChecked) {
      prev += cur.number * cur.commdity.price;
    }
    return prev;
  }, 0);
};
