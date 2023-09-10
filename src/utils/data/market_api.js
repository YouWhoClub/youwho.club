import { API_CONFIG } from "../../config";
import { APIWrapper } from "../api_wrapper";
class MarketApiWrapper extends APIWrapper {

}
const marketApi = new MarketApiWrapper({
    baseUrl: API_CONFIG.MARKET_API_URL,
});
export const MARKET_API = marketApi;