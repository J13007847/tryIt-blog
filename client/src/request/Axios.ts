import type { AxiosInstance } from 'axios';
import axios from 'axios'
export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: any;
  constructor(options:any){
    this.options = options
    this.axiosInstance = axios.create(options);
  }
  private createAxios(config: any): void {
    this.axiosInstance = axios.create(config);
  }
  get<T = any>(config: any, options?: any): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: any, options?: any): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: any, options?: any): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: any, options?: any): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }
  request<T = any>(config: any, options?: any): Promise<T> {
     return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any>(config)
        .then((res: any) => {
          const {status,data,msg} = res.data
          if (status===200) {
            try {
              resolve(data);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }else{
            reject(msg)
            window.location.replace(window.location.origin + "/#/login");

          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error ) => {
        
          reject(e);
        });
    });
  }
}