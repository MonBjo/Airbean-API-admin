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

  const resObj = {
    sucess: false,
    message: "do you have all properties?"
  }

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
    
      // res.send(addMenuItem(menuItem));
      await addMenuItem(menuItem);

      resObj.message = "Item added to menu";
      const newMenu = await getMenu();
      resObj.order = newMenu[0].menu;

    } else {
      resObj.message = "id already exists";
    }

  } else {
    resObj.message = "title already exists";
  }
  res.json(resObj);
});

router.get('/removeproduct', async (req, res) => {
  res.send("byeeee!");
});

module.exports = router;