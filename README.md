# Core Web Vitals Experiment

The purpose of this repo is to serve as workbench to explore the `web-vitals` 
package and how it reports core web vital metrics to an analytic endpoint.

## Run it locally

This repo assumes Node v14+

  * Clone this repo
  * Install dependencies running `npm install`
  * Run it with `npm start`
    * App will start in port 3000

## Implementation details

The app is developed using Express 4 and it is composed of 2 routes:

  * GET `/`
    * Static pages that loads `web-vitals` using the UNPKG delivery network
  * POST `/analytics`
    * It receives the requests sent by `web-vitals` and store them as JSON files
    in the `analytics` folder.

Of course this implementation is too simplistic and there are a lot of 
improvements that could be added. The intention was to implement something 
really quick to allow us exploring these metrics.

## Example requests from web-vitals

These are some early findings about how core vitals are reported by the package.

### LCP

```JSON
{
  "headers": {
    "host": "localhost:3000",
    "connection": "keep-alive",
    "content-length": "475",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
    "sec-ch-ua-mobile": "?0",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    "sec-ch-ua-platform": "\"macOS\"",
    "content-type": "text/plain;charset=UTF-8",
    "accept": "*/*",
    "origin": "http://localhost:3000",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-dest": "empty",
    "referer": "http://localhost:3000/",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9"
  },
  "method": "POST",
  "url": "/",
  "httpVersion": "1.1",
  "body": {
    "name": "LCP",
    "value": 68.6,
    "delta": 68.6,
    "entries": [
      {
        "name": "",
        "entryType": "largest-contentful-paint",
        "startTime": 68.6,
        "duration": 0,
        "size": 106800,
        "renderTime": 0,
        "loadTime": 68.6,
        "firstAnimatedFrameTime": 0,
        "id": "",
        "url": "https://images.unsplash.com/photo-1564865878688-9a244444042a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540"
      }
    ],
    "id": "1653403532951-7194692982584",
    "isFinal": true
  },
  "cookies": {},
  "path": "/",
  "protocol": "http",
  "query": {},
  "hostname": "localhost",
  "ip": "::1",
  "originalUrl": "/analytics",
  "params": {}
}
```


### CLS

```JSON
{
  "headers": {
    "host": "localhost:3000",
    "connection": "keep-alive",
    "content-length": "97",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
    "sec-ch-ua-mobile": "?0",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    "sec-ch-ua-platform": "\"macOS\"",
    "content-type": "text/plain;charset=UTF-8",
    "accept": "*/*",
    "origin": "http://localhost:3000",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-dest": "empty",
    "referer": "http://localhost:3000/",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9"
  },
  "method": "POST",
  "url": "/",
  "httpVersion": "1.1",
  "body": {
    "name": "CLS",
    "value": 0,
    "delta": 0,
    "entries": [],
    "id": "1653402867685-1218954971094",
    "isFinal": true
  },
  "cookies": {},
  "path": "/",
  "protocol": "http",
  "query": {},
  "hostname": "localhost",
  "ip": "::1",
  "originalUrl": "/analytics",
  "params": {}
}
```

### FID

```JSON
{
  "headers": {
    "host": "localhost:3000",
    "connection": "keep-alive",
    "content-length": "291",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
    "sec-ch-ua-mobile": "?0",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    "sec-ch-ua-platform": "\"macOS\"",
    "content-type": "text/plain;charset=UTF-8",
    "accept": "*/*",
    "origin": "http://localhost:3000",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-dest": "empty",
    "referer": "http://localhost:3000/",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9"
  },
  "method": "POST",
  "url": "/",
  "httpVersion": "1.1",
  "body": {
    "name": "FID",
    "value": 3.100000023841858,
    "delta": 3.100000023841858,
    "entries": [
      {
        "name": "keydown",
        "entryType": "first-input",
        "startTime": 5064.600000023842,
        "duration": 0,
        "processingStart": 5067.700000047684,
        "processingEnd": 5068,
        "cancelable": true
      }
    ],
    "id": "1653403511143-5846688356636",
    "isFinal": true
  },
  "cookies": {},
  "path": "/",
  "protocol": "http",
  "query": {},
  "hostname": "localhost",
  "ip": "::1",
  "originalUrl": "/analytics",
  "params": {}
}
```

### HTTP Requests used by the web-vitals package

In the file `example-requests.http` you will find the way the `web-vitals` 
package sends requests to the analytics endpoints.
