// The Goods network request service is imported
import { getAllCateGory } from "@/request/GoodRequest";

import nprogress from "nprogress"

export const filterCateGory = (id,list) => {
    return list.filter(item => item.pid === +id);
}

/**
 * Goods List related logic
 */

export const getGoodsList = async (goods,id) => {
    nprogress.start();
    goods.isLoading = true;
    // Get all categories of Goods
    if(!goods.allData){
      const res = await getAllCateGory();
      goods.allData = res.data;
    }
    if (goods.allData) {
      const data = goods.allData;
      // Gets the category of Goods by ID
      const renderGoodList = filterCateGory(id, data);
      // Modified Loading
      goods.isLoading = false;
      nprogress.done();
      // Determine if there is data
      if (renderGoodList.length > 0) {
        return (goods.isShow = true) && (goods.goods = renderGoodList);
      }
    } else {
      goods.msg = "The network is faulty. Ensure that the JSON-server service is enabled";
      goods.isLoading = false;
    }
    // Toggle the presentation of components
    goods.isShow = false;
    nprogress.done();
}