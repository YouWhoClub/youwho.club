import { API_CONFIG } from "../../config";
import { APIWrapper } from "../api_wrapper";
class AuthApiWrapper extends APIWrapper {

}
const authApi = new AuthApiWrapper({
    baseUrl: API_CONFIG.AUTH_API_URL,
});
export const AUTH_API = authApi;