const INITIAL_VALUE={
        countw:0,
}
export default function countwishlists(state=INITIAL_VALUE,action){
        switch(action.type){
                case 'COUNTER_WISHLIST':
                        return{
                                ...state,
                                countw:action.payload
                        };
                        default:
                                return state;
        }

}
