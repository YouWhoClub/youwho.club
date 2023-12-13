import { useNavigate } from 'react-router';
import { GET_USER, UPDATE_BALANCE, SET_NFT_CONTRACT, SET_PROPOSAL_CONTRACT, SET_MARKET_CONTRACT, SET_EVENT_CONTRACT, WALLET_CONNECTION, LOGOUT_USER, SET_ACCOUNT, ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY, SET_ID, SET_REFRESH_TOKEN } from './actions';
const initialState = {
    username: '',
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
                YouWhoID: action.payload.screen_cid,
                userId: action.payload.id,
                cid: action.payload.cid,
                mail: action.payload.mail,
                isLoggedIn: action.payload.isLoggedIn,
                identifier: action.payload.identifier,
                phoneNumber: action.payload.phone_number,
                token: action.payload.token,
                // refreshToken: action.payload.refreshToken,
                // tokenExpiration: action.payload.tokenExpiration,
                isMailVerified: action.payload.is_mail_verified,
                isPhoneVerified: action.payload.is_phone_verified,
                account: action.payload.account_number,
                socialId: action.payload.social_id,
                balance: action.payload.balance,
                bio: action.payload.bio,
                avatar: action.payload.avatar,
                banner: action.payload.banner,
                walletBackground: action.payload.wallet_background,
            };
        case LOGOUT_USER:
            localStorage.removeItem('account')
            localStorage.removeItem('lastActive')
            return {
                ...state,
                username: action.payload.username,
                YouWhoID: action.payload.screen_cid,
                userId: action.payload.id,
                cid: action.payload.cid,
                mail: action.payload.mail,
                isLoggedIn: action.payload.isLoggedIn,
                identifier: action.payload.identifier,
                phoneNumber: action.payload.phone_number,
                token: action.payload.token,
                isMailVerified: action.payload.is_mail_verified,
                isPhoneVerified: action.payload.is_phone_verified,
                account: action.payload.account_number,
                socialId: action.payload.social_id,
                balance: action.payload.balance,
                privateKey: action.payload.privateKey,
                bio: action.payload.bio,
                avatar: action.payload.avatar,
                banner: action.payload.banner,
                walletBackground: action.payload.walletBackground,
                refreshToken: action.payload.refreshToken,
                tokenExpiration: action.payload.tokenExpiration,
            };
        case SET_ACCOUNT:
            return { ...state, account: action.payload };
        case SET_ID:
            return { ...state, privateKey: action.payload };
        case SET_REFRESH_TOKEN:
            return { ...state, refreshToken: action.payload.refreshToken, tokenExpiration: action.payload.tokenExpiration };
        case UPDATE_BALANCE:
            return { ...state, balance: action.payload };
        default:
            return state;
    }
}

export default userReducer;
