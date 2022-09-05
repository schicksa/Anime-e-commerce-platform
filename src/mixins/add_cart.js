import { addCartHook } from "@/hooks/CartHook";
import { nanoid } from "nanoid";
// Add to shopping cart
export default {
    methods: {
        addCart(commdity, number = 1) {
            if(this.userInfo && this.token){
                const cartRecord = {
                  id: nanoid(),
                  cid: commdity.id,
                  number,
                  uid:this.userInfo?.id,
                  isChecked: false,
                  commdity,
                };
                // Add to shopping cart
                addCartHook(this, cartRecord);
            }else{
                this.msg = "Please log in";
                this.isFade = true;
                setTimeout(()=>{
                    this.isFade = false;
                },1000)
            }
          }
    }
}