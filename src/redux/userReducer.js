import { useNavigate } from 'react-router';
import { GET_USER, SET_NFT_CONTRACT, SET_PROPOSAL_CONTRACT, SET_MARKET_CONTRACT, SET_EVENT_CONTRACT, WALLET_CONNECTION, LOGOUT_USER, SET_ACCOUNT, ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY, SET_ID } from './actions';
const initialState = {
    username: '',
    userId: '',
    walletAddress: '',
    isLoggedIn: false,
    // cart: []
    // marketContract: undefined,
    // nftContract: undefined,
    // account: undefined
}

function userReducer(state = initialState, action) {

    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                username: action.payload.username,
                youwhoID: action.payload.screen_cid,
                cid: action.payload.cid,
                gmail: action.payload.gmail,
                isLoggedIn: action.payload.isLoggedIn,
                identifier: action.payload.identifier,
                phone_number: action.payload.phone_number,
                token: action.payload.token,
                account: action.payload.account_number,
                socialId: action.payload.social_id,
                // privateKey: action.payload.signer,
            };
        case LOGOUT_USER:
            localStorage.removeItem('account')
            localStorage.removeItem('lastActive')
            return {
                ...state,            
                username: action.payload.username,
                youwhoID: action.payload.youwhoID,
                cid: action.payload.cid,
                gmail: action.payload.gmail,
                // privateKey: action.payload.privateKey,
                isLoggedIn: action.payload.isLoggedIn,
                identifier: action.payload.identifier,
                phone_number: action.payload.phone_number,
                socialId: action.payload.socialId,
                token: action.payload.token,
                account: action.payload.account,
            };
        case SET_ACCOUNT:
            return { ...state, account: action.payload };
        case SET_ID:
            return { ...state, privateKey: action.payload };
        default:
            return state;
    }
}

export default userReducer;
