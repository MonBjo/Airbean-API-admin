const { getMenu, addMenuItem, removeMenuItem, doesItemExist } = require('../model/menudb');

const { Router } = require('express');

const router = Router();

router.post('/addproduct', async (req, res) => {
  const newMenuItem = req.body;

  const resObj = {
    success: false,
    message: "does the item have all the properties? "
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

      const newMenu = await addMenuItem(menuItem);
      
      resObj.success = true;
      resObj.message= "New item added to menu.";
      resObj.menu = newMenu;
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