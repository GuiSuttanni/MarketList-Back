const service = require('../services/shoppingListService');

exports.getItems = async (req, res) => {
  try {
      const { houseCode } = req.query;
      if (!houseCode) return res.status(400).json({ error: 'houseCode is required.' });

      const items = await service.getItems(houseCode);
      res.json(items);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.verifyHouse = async (req, res) => {
  const { houseCode } = req.params;
  const exists = await service.verifyHouse(houseCode);
  res.json({ exists });
};

exports.registerHouse = async (req, res) => {
  const { houseCode } = req.body;

  try {
    const exists = await service.checkHouseExists(houseCode);
    if (exists) {
      return res.status(400).send({ message: 'O código da casa já existe.' });
    }

    const success = await service.registerHouse(houseCode);
    res.status(success ? 201 : 400).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao registrar a casa.' });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { houseCode, text } = req.body;
    if (!houseCode || !text) {
      return res.status(400).json({ error: 'houseCode and text are required.' });
    }
    const item = await service.addItem(houseCode, text);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { houseCode } = req.params;
    const { id } = req.params;
    const { text } = req.body;

    const updatedItem = await service.updateItem(houseCode, id, text);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { houseCode } = req.params;
    const { id } = req.params;

    await service.deleteItem(houseCode, id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

