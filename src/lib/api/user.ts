import { AxiosError } from "axios";
import apiClient from "./apiClient";

type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};
export type User = {
  userId: number;
  roomId: number;
  name: string;
  passwordHash: string;
  username: string;
};

const userService = {
  async getUser(): Promise<ApiResponse<{ data: User } | null>> {
    try {
      const res = await apiClient.get("/user/me");
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) return error?.response?.data;
      return {
        status: "error",
        message: "An unknown error occurred",
        data: null,
      };
    }
  },
  async loginUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<ApiResponse<{ access_token: string } | null>> {
    try {
      const res = await apiClient.post(
        "/signin",
        { username, password },
        { showLoading: true }
      );
      return res.data;
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError) return error?.response?.data;
      return {
        status: "error",
        message: "An unknown error occurred",
        data: null,
      };
    }
  },
  async registerUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<ApiResponse<{ access_token: string } | null>> {
    try {
      const res = await apiClient.post(
        "/signup",
        { username, password },
        { showLoading: true }
      );
      return res.data;
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof AxiosError) return error?.response?.data;
      return {
        status: "error",
        message: "An unknown error occurred",
        data: null,
      };
    }
  },
};

export default userService;
