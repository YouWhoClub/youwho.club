import { API_CONFIG } from "../../config";
import { APIWrapper } from "../api_wrapper";
class AuthApiWrapper extends APIWrapper {

}
const publicApi = new AuthApiWrapper({
    baseUrl: API_CONFIG.PUBLIC_API_URL,
});
export const PUBLIC_API = publicApi;