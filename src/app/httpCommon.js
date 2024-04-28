import axios from "axios";

export const httpCommon = (method, extendedUrl, data = {}) => {
  const token = localStorage.getItem("authToken");
  const config = {
    method: method,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${extendedUrl}`,
    headers: {
      "Content-Type": "application/json",
      "X-USER-EMAIL": "test1@gmail.com",
      "X-USER-TOKEN": token,
    },
    data: JSON.stringify(data),
  };
  const response = axios.request(config);
  return response;
};
