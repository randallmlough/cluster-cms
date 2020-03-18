import axios from "axios";
import humps from "humps";
import { getSessionToken } from "../utils/session";
export default class API {
  constructor(baseResource) {
    this.baseURL = "/api";
    this.baseResource = baseResource;
  }

  async get(url) {
    return await this.request("get", url);
  }

  async post(url, data) {
    return await this.request("post", url, data);
  }

  async put(url, data) {
    return await this.request("put", url, data);
  }

  async patch(url, data) {
    return await this.request("patch", url, data);
  }

  async delete(url) {
    return await this.request("delete", url);
  }

  async request(method, url, data) {
    return await axios({
      baseURL: this.baseURL,
      transformResponse: [
        ...axios.defaults.transformResponse,
        data => humps.camelizeKeys(data)
      ],
      transformRequest: [
        data => humps.decamelizeKeys(data),
        ...axios.defaults.transformRequest
      ],
      method: method,
      url: this.baseResource + url,
      data: data,
      headers: {
        Authorization: `Bearer ${getSessionToken()}`,
        "content-type": "application/json"
      }
    });
  }
}

const errorType = {
  REQUEST_ERROR: "REQUEST_ERROR",
  RESPONSE_ERROR: "RESPONSE_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR"
};

export const formatError = error => {
  const err = {};
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    err.type = errorType.RESPONSE_ERROR;
    err.status = error.response.status;
    err.message = error.response.data.error;
    err.errors = error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    err.type = errorType.SERVER_ERROR;
    err.status = 500;
    err.message = "something went wrong";
  } else {
    err.type = errorType.REQUEST_ERROR;
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  return err;
};
