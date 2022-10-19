import defHttp from "@/request/index";
export const getList = (params:any)=>{
  return  defHttp.get(
    {
      url: "/api/post",
      params,
    }
  )
}
export const getDetail = (id:number|string)=>{
  return  defHttp.get(
    {
      url: "/api/post/postDetail",
      params:{
        id
      }
    },
   
  )
}
export const addPost = (data:any)=>{
  return  defHttp.post(
    {
      url: "/api/post/addPost",
      data
    },
    
  )
}
export const editPost = (data:any)=>{
  return  defHttp.post(
    {
      url: "/api/post/editPost",
      data
    },
    
  )
}
export const deletePost = (id:number|string)=>{
  return  defHttp.delete(
    {
      url: "/api/post/deletePost",
      params:{
        id
      }
    },
    
  )
}
export const getPostGroup = (uid:number|string)=>{
  return  defHttp.get(
    {
      url: "/api/post/getPostGroup",
      params:{
        uid
      }
    },
    
  )
}