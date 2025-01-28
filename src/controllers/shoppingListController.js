const service = require('../services/shoppingListService');

exports.getItems = async (req, res) => {
  try {
    const items = await service.getItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { text } = req.body;
    const item = await service.addItem(text);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const item = await service.updateItem(id, text);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteItem(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};