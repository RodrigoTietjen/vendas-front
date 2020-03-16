export class AbstractService {
  constructor(baseURL) {
      this.baseURL = 'http://localhost:8080/api' + baseURL;
      this.options = {};
  }

  setOptions = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${localStorage.getItem('access_token')}`);

    this.options = {
        headers: headers,
        mode: 'cors',
        cache: 'default' };
  }

  post(url, body) {
    this.setOptions();
    const payload = {
      ...this.options,
      method: 'POST',
      body: JSON.stringify(body)
    };
    return fetch(this.baseURL + url, payload);
  }

  put(url, body) {
    this.setOptions();
    const payload = {
      ...this.options,
      method: 'PUT',
      body: JSON.stringify(body)
    };
    return fetch(this.baseURL + url, payload);
  }
  
  get(url, params) {
    this.setOptions();
    this.options.method = 'GET';
    const urlToReq = new URL(this.baseURL + url);
    params.forEach(param => {
      urlToReq.searchParams.append(`${param.name}`, param.value);
    });
    const myRequest = new Request(urlToReq, this.options);
    return fetch(myRequest);
  }
}