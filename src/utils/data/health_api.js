import { API_CONFIG } from "../../config";
import { APIWrapper } from "../api_wrapper";
class HealthApiWrapper extends APIWrapper {

}
const healthApi = new HealthApiWrapper({
    baseUrl: API_CONFIG.HEALTH_API_URL,
});
export const HEALTH_API = healthApi;