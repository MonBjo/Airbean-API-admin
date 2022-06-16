function auth(req, res, next) {
  const APIkeys = [
    "ZyPlY1LaR20qH3W41r16",
    "uXrYAh42AR0rbKbAQ7Q0",
    "lT5aT0QO356jG3IRHwJb",
    "Owi0G2kUd6G9NJQlbvgg",
    "Y9lA9mxx6eXqhYHLRPCS",
    "rsm3OXDMa4bMY40SD7Vf"
  ];  

  const apiKey = req.headers['key'];
  const resObj = {
    success: "false",
    message: "You need an API key"
  }

  
  if(apiKey) {
    if (APIkeys.includes(apiKey)) {
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