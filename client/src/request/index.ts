import { VAxios } from "./Axios";
const createAxios = ()=>{
  return new VAxios({ timeout: 25 * 1000,'Content-Type': 'application/json; charset=utf-8'})
};
export default  createAxios();
