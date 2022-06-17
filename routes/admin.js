const { getMenu, addMenuItem, removeMenuItem, doesItemExist } = require('../model/menudb');
const { auth } = require('../middleware/auth');
const { Router } = require('express');

const router = Router();

router.post('/addproduct', auth, async (req, res) => {
  const newMenuItem = req.body;
  const checkTitle = await doesItemExist("title", newMenuItem.title);
  const checkId = await doesItemExist("id", newMenuItem.id);
  
  const resObj = {
    sucess: false,
    message: `do you have all properties? id, title, desc and price`
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
        
        resObj.sucess = true;
        resObj.message = "Item added to menu";
        
      } else {
        resObj.message = "id already exists";
      }
      
    } else {
      resObj.message = "title already exists";
    }
  }
  const newMenu = await getMenu();
  resObj.menu = newMenu[0].menu;
  
  res.json(resObj);
});

router.delete('/removeproduct', auth, async (req, res) => {
  let itemToRemove = req.body;
  let checkItem;
  let propertyType;
  const resObj = {
    sucess: false,
    message: "Please add title as a property the body"
  };

  if(itemToRemove.hasOwnProperty('title')) {
    itemToRemove = capitalizeFirstLetter(req.body.title);
    propertyType = "title";
  } else if (itemToRemove.hasOwnProperty('id')) {
    itemToRemove = itemToRemove.id;
    propertyType = "id";
  }
  checkItem = await doesItemExist(propertyType, itemToRemove);

  // Length 0 = item do not exist
  // Length 1 = item do exists
  if(checkItem.length == 1) {
    await removeMenuItem(propertyType, itemToRemove);
    
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