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
  const checkTitle = await doesItemExist("title", newMenuItem.title);
  const checkId = await doesItemExist("id", newMenuItem.id);
  
  const resObj = {
    sucess: false,
    message: "do you have all properties?"
  }




  // Length 0 = title/id does not exist
  // Length 1 = title/id already exists
  if(checkTitle.length == 0) {
    if(checkId.length == 0) {
      const menuItem = {
        "id": newMenuItem.id,
        "title": newMenuItem.title,
        "desc": newMenuItem.desc,
        "price": newMenuItem.price
      };

      await addMenuItem(menuItem);
      const newMenu = await getMenu();

      resObj.sucess = true;
      resObj.message = "Item added to menu";
      resObj.menu = newMenu[0].menu;

    } else {
      resObj.message = "id already exists";
    }

  } else {
    resObj.message = "title already exists";
  }
  res.json(resObj);
});

router.get('/removeproduct', async (req, res) => {
  const checkTitle = await doesItemExist("title", newMenuItem.title);
  const checkId = await doesItemExist("id", newMenuItem.id);
  
  const resObj = {
    sucess: false,
    message: "do you have all properties?"
  };

  // Length 0 = title/id does not exist
  // Length 1 = title/id already exists
  if(checkTitle.length == 1 || checkId.length == 1) {
    await removeMenuItem();
    const newMenu = await getMenu();

    resObj.sucess = true;
    resObj.message = "Item was deleted";
    resObj.menu = newMenu[0].menu;
  } else {
    resObj.message = "Item does not exist";
  }

});

module.exports = router;