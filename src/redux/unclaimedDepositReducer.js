import { GET_UNCLAIMED_DEPOSITE} from "./actions";


const initialState = {
    unclaimdDeposits: [],
};

function unclaimdDepositReducer(state = initialState, action) {
    switch (action.type) {
        case GET_UNCLAIMED_DEPOSITE:
            // return state;
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}

export default unclaimdDepositReducer;
