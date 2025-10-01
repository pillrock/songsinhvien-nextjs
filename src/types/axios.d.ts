import "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig<D = unknown> {
    showLoading?: boolean;
    url: { href: string };
  }

  export interface AxiosRequestConfig<D = unknown> {
    showLoading?: boolean;
  }
}
