import * as authApi from "../api/auth.api";

const loginUser = async (data) => {
  const response = await authApi.login(data);
  return response.data;
};
