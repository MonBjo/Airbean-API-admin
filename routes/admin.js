const { getMenu, addMenuItem, removeMenuItem, doesItemExist } = require('../model/menudb');

const { Router } = require('express');

const router = Router();

router.post('/addproduct', async (req, res) => {
  const newMenuItem = req.body;
  const checkTitle = await doesItemExist("title", newMenuItem.title);
  const checkId = await doesItemExist("id", newMenuItem.id);
  
  const resObj = {
    sucess: false,
    message: `do you have all properties? "id", "title", "desc" and "price"`
  }
  if (newMenuItem.hasOwnProperty('id') && newMenuItem.hasOwnProperty('title')
    && newMenuItem.hasOwnProperty('desc') && newMenuItem.hasOwnProperty('price')) {
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
  }

  res.json(resObj);
});

router.delete('/removeproduct', async (req, res) => {
  const resObj = {
    sucess: false,
    message: "Please add title as a property the body"
  };

  const itemTitle = capitalizeFirstLetter(req.body.title);
  const checkTitle = await doesItemExist("title", itemTitle);
  console.log(req.body.title, itemTitle, checkTitle);

  // Length 0 = title does not exist
  // Length 1 = title already exists
  if(checkTitle.length == 1) {
    await removeMenuItem(itemTitle);
    
    resObj.sucess = true;
    resObj.message = "Item was deleted";
  } else {
    resObj.message = "Item does not exist";
  }
  const databaseMenu = await getMenu();
  resObj.menu = databaseMenu[0].menu;
  res.json(resObj);
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = router;