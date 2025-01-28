const express = require('express');
const controller = require('../controllers/shoppingListController');

const router = express.Router();

router.get('/', controller.getItems);
router.post('/', controller.addItem);
router.put('/:houseCode/:id', controller.updateItem);
router.delete('/:houseCode/:id', controller.deleteItem);
router.get('/house/:houseCode', controller.verifyHouse);
router.post('/house', controller.registerHouse);

module.exports = router;