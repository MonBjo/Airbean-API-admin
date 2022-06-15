/* add product
{
  "id": 1,
  "title": "Bryggkaffe",
  "desc": "Bryggd på månadens bönor.",
  "price": 39
}

remove product */

const { getMenu, addMenuItem, removeMenuItem, doesItemExist } = require('../model/menudb');

const { Router } = require('express');

const router = Router();

router.post('/addproduct', async (req, res) => {
  const newMenuItem = req.body;

  // Length 0 = title/id does not exist
  // Length 1 = title/id already exists
  const checkTitle = await doesItemExist("title", newMenuItem.title);
  if(checkTitle.length == 0) {
    const checkId = await doesItemExist("id", newMenuItem.id);
    
    if(checkId.length == 0) {
      const menuItem = {
        "id": newMenuItem.id,
        "title": newMenuItem.title,
        "desc": newMenuItem.desc,
        "price": newMenuItem.price
      };
    
      res.send(addMenuItem(menuItem));
    } else {
      const menu = await getMenu();
      console.log("menu[0].length", menu[0].length);
      res.send("id already exists");
    }

  } else {
    res.send("title already exists");
  }
});

router.get('/removeproduct', async (req, res) => {
  res.send("byeeee!");
});

module.exports = router;