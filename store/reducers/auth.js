import { AUTHENTICATE, LOGOUT} from "../actions/auth";

const initialState = {
    registered : false,
    token : null,
    userId : null

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return{
                registered:action.registered,
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            return {
                registered : false,
                token : null,
                userId : null
            };
            

        // case SIGNUP:
        //     return{
        //         token: action.token,
        //         userId: action.userId
        //     }
        default:
            return state;
            
    }
}
export default authReducer;