function auth(req, res, next) {
const validKeys = require('./validKeys.json').validKeys;
  const apiKey = req.headers['key'];
  const resObj = {
    success: "false",
    message: "You need an API key"
  }
  
  if(apiKey) {
    if (validKeys.includes(apiKey)) {
      next();
    } else {
      resObj.message = "API key is invalid"
      res.json(resObj);
    }
  } else {
    res.json(resObj);
  }
}

module.exports = { auth }