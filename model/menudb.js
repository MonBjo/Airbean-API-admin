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
    const menuId = await getDatabaseId();
    const menuItem = await database.update({_id: menuId}, { $push: {menu: newMenuItem} }, {});
    return [menuItem];
}

async function getDatabaseId() {
    const currentMenu = await database.find({});
    return currentMenu[0]._id;
}

async function doesItemExist(type, value) {
    if(type == "title") {
        return await database.find({ "menu.title": capitalizeFirstLetter(value) });
    } else if(type == "id") {
        return await database.find({ "menu.id": value });
    } else {
        return "type not found";
    }
}

function capitalizeFirstLetter(value) {
    console.log(value);
     value[0].toUpperCase() + value.substring(1);
}

async function removeMenuItem(removeMenuItem) {
    console.log("removeMenuItem() is running");
    const menuId = await getDatabaseId();
    const item = capitalizeFirstLetter(removeMenuItem);
    const menuItem = await database.update({menu: item}, { $unset: {} }, {});
    return [menuItem];
}

module.exports = { getMenu, addMenuItem, removeMenuItem, doesItemExist }