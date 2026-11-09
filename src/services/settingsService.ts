import axiosInstance from "../service/api";
import { setLanguageSwitch } from "../utils/endpoints";

export const languageService = async (payload: any) => {

  console.log(`Payload in service: `, payload);
  return await axiosInstance.post(`${setLanguageSwitch}`, payload);
};