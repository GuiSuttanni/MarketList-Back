const express = require('express');
const controller = require('../controllers/shoppingListController');

const router = express.Router();

router.get('/', controller.getItems);
router.post('/', controller.addItem);
router.put('/:id', controller.updateItem);
router.delete('/:id', controller.deleteItem);

module.exports = router;