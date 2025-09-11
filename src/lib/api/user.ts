import apiClient from "./apiClient";

const userService = {
  async loginUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const res = await apiClient.post("/signin", { username, password });
      return res.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default userService;
