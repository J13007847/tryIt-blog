import defHttp from "@/request/index";
export const req_upload = (data:any,path?:string)=>{
  return  defHttp.post(
    {
      url: "/api/upload",
      data,
      params:{
        path
      }
    }
  )
}