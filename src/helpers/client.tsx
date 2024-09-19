let fetch: any;
if (typeof window !== 'undefined') {
  ({ fetch } = window);
}

class Client {
  address: any;
  options: any;

  constructor(address: any, defaultOptions = {}) {
    if (typeof address !== 'string') throw new Error('InvalidArgument: address has to ba a string');
    if (typeof defaultOptions !== 'object')
      throw new Error('InvalidArgument: defaultOptions has to be an object');

    this.address = address;

    this.options = {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      ...defaultOptions,
    };

    this.fetchUrl = this.fetchUrl.bind(this);
  }

  getUrl(url: string) {
    return fetch(this.address + url, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
  }

  fetchUrl(url: string, request: any) {
    return fetch(this.address + url, {
      body: request.body || {},
      credentials: request.credentials || 'same-origin',
      headers: request.headers || {},
      method: request.method || {},
      mode: request.mode || 'cors',
    });
  }

}

export default Client;