// Introduce Goods-related network request services
import { getAllCartoonList } from "@/request/HomeRequest";

// Get all anime + search filter - can also be optimized here because every search will be re-requested, you can save the complete data with one data, but you can't do it if you are lazy
export const getAllCartoonListData = async (home)=>{
     const res = await getAllCartoonList();
     home.isLoading = false;
     if(!res.errMsg){
        home.listData = res.data;
        const keyword = home.$route.params.keyword;
        if (!keyword) return;
        const newDataList = home.listData.filter((item) => {
          return item.title.indexOf(keyword) !== -1;
        });
        if (newDataList.length > 0) {
          return (home.listData = newDataList);
        }
     }else{
        home.msg = "Network error, please make sure the JSON-SERVER service is enabled"
     }
     home.isShow = false;
     home.isLoading = false;
}