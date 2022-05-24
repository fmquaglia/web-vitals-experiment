const fs = require('fs')
const express = require('express')
const router = express.Router();

router.post('/', (req, res, next) => {

  try {
    let requestData = JSON.stringify({
      headers: req.headers,
      method: req.method,
      url: req.url,
      httpVersion: req.httpVersion,
      body: JSON.parse(req.body),
      cookies: req.cookies,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      hostname: req.hostname,
      ip: req.ip,
      originalUrl: req.originalUrl,
      params: req.params
    }, null, 2);

    fs.writeFileSync(
      `./analytics/${Date.now()}.json`,
      requestData,
      {flag: 'w'}
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500)
  }

});

module.exports = router;
