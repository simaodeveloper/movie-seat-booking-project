import * as http from './libraries/HTTP';
import * as config from './config';

const METHODS = {
  GET_PRODUCT_LIST_BY_PARAMS: 'getProductListByParams',
  GET_PRODUCT_BY_ID: 'getProductById',
  POST_PRODUCT: 'postProduct',
};

class API {
  constructor(httpClient, baseUrl) {
    this.http = httpClient;
    this.baseUrl = baseUrl;
    this.httpHeaders = {
      'Content-Type': 'application/json, text/html, *.*',
    };
  }

  static transformDataToJSON(response) {
    if (response.ok && response.status === 200) return response.json();
    return response;
  }

  [METHODS.GET_PRODUCT_LIST_BY_PARAMS]({
    sunValue = 'high',
    waterValue = 'rarely',
    petsValue = 'false',
  }) {
    return this.http
      .get(
        `${this.baseUrl}/?sun=${sunValue}&water=${waterValue}&pets=${petsValue}`,
        { headers: this.httpHeaders }
      )
      .then(response => API.transformDataToJSON(response))
      .catch(err => err);
  }

  [METHODS.GET_PRODUCT_BY_ID](id = 1) {
    return this.http
      .get(`${this.baseUrl}/plant?id=${id}`, { headers: this.httpHeaders })
      .then(response => API.transformDataToJSON(response))
      .catch(err => err);
  }

  [METHODS.POST_PRODUCT](data) {
    return this.http
      .post(this.baseUrl, {
        headers: this.httpHeaders,
        body: JSON.stringify(data),
      })
      .catch(err => err);
  }
}

export default new API(http, config.API_URL);
