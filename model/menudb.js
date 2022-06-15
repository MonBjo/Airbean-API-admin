const nedb = require('nedb-promise');
const database = new nedb({ filename: 'menu.db', autoload: true });

async function getMenu() {
    const result = await database.find({})
    if (result.length > 0) {
        return result;
    }
    else {
        const menuList = require('../menu.json')
        const menuItem = await database.insert(menuList)
        return [menuItem];
    }
}

async function addMenuItem(newMenuItem) {
    const currentMenu = await database.find({});
    const menuId = currentMenu[0]._id;
    const menuItem = await database.update({_id: menuId}, { $push: {newMenuItem} }, {});
    return [menuItem];
}

async function doesItemExist(type, value) {
    if(type == "title") {
        return await database.find({ "menu.title": value });
    } else if(type == "id") {
        return await database.find({ "menu.id": value });
    } else {
        return "type not found";
    }
}

function removeMenuItem() {
    console.log("removeMenuItem() is running");
}

module.exports = { getMenu, addMenuItem, removeMenuItem, doesItemExist }