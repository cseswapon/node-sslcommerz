import fetch, { RequestInit } from "node-fetch";

interface HttpCallParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "UPDATE";
  data?: any;
}

const httpCall = async ({
  url,
  method = "POST",
  data = {},
}: HttpCallParams): Promise<any> => {
  const options: RequestInit = {
    method,
    headers: {},
  };

  if (["POST", "PUT", "PATCH", "UPDATE"].includes(method)) {
    const isFormData = typeof data?.getBoundary === "function";
    options.body = isFormData ? data : JSON.stringify(data);

    if (!isFormData) {
      options.headers = {
        "Content-Type": "application/json",
      };
    }
  }

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (err) {
    return err;
  }
};

export default httpCall;
