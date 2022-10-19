import defHttp from "@/request/index";
export const req_login = (data:any)=>{
  return defHttp.post({
    url:'/api/user/login',
    data
  })
}
export const loginOut = ()=>{
  return defHttp.get({
    url:'/api/user/loginOut',
  })
}
export const req_getOtherUser = (uid:number|string)=>{
  return defHttp.get({
    url:'/api/userSetting/getOtherUser',
    params:{
      uid
    }
  })
}
export const setAvatar=(data:any)=>{
  return defHttp.post({
    url:'/api/userSetting/avatar',
    data
  })
}
export const setBaseInfo=(data:any)=>{
  return defHttp.post({
    url:'/api/userSetting/baseInfo',
    data
  })
}
export const changePwd=(data:any)=>{
  return defHttp.post({
    url:'/api/userSetting/changePwd',
    data
  })
}