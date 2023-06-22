const INITIAL_VALUE={
        count:0,
}
export default function countCarts(state=INITIAL_VALUE,action){
        switch(action.type){
                case 'COUNTER_CARTS':
                        return{
                                ...state,
                                count:action.payload
                        };
                        default:
                                return state;
        }

}
