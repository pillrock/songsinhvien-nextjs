import "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig<D = unknown> {
    showLoading?: boolean;
  }

  export interface AxiosRequestConfig<D = unknown> {
    showLoading?: boolean;
  }
}
