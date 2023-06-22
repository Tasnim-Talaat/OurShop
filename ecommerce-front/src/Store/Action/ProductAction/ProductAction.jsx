// export const productData=(payload)=>{
//         return {
//                 payload,
//                 type:"PRODUCT_LIST"
//         }}
import { axiosistance } from "../../../Network/axiosistance"

export const getProductLists=(search)=> async (dispatch)=>{
        try {
                const response = await axiosistance.get(`/product/search/?search=${search}`);
                dispatch({
                  type: 'PRODUCT_LIST',
                  payload: response.data,
                });
              } catch (error) {
                console.log(error);
              }
            };

