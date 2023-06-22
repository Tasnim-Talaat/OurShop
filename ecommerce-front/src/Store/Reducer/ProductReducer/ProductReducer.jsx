const INITIAL_VALUE={
        productList:[]
}

export default function getProductList(state=INITIAL_VALUE,action){
        switch (action.type) {
                case 'PRODUCT_LIST':
                        return{
                        ...state,
                        productList:action.payload
                        };      
                default:
                        return state;
        }
};

