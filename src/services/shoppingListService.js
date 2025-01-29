const db = require('../config/firestore');

const collection = db.collection('shoppingList');

exports.updateItem = async (houseCode, id, text) => {
  const itemRef = collection.doc(id);
  const doc = await itemRef.get();

  if (!doc.exists || doc.data().houseCode !== houseCode) {
    throw new Error('Item não encontrado.');
  }

  await itemRef.update({ text });
  return { id, houseCode, text };
};

exports.deleteItem = async (houseCode, id) => {
  const itemRef = collection.doc(id);
  const doc = await itemRef.get();

  if (!doc.exists || doc.data().houseCode !== houseCode) {
    throw new Error('Item não encontrado.');
  }

  await itemRef.delete();
};

exports.addItem = async (houseCode, text) => {
  const newItemRef = collection.doc();
  const id = newItemRef.id;

  const newItem = { id, houseCode, text };
  await newItemRef.set(newItem);

  return newItem;
};

const housesCollection = db.collection('houses');

exports.getItems = async (houseCode) => {
  const snapshot = await collection.where('houseCode', '==', houseCode).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

exports.verifyHouse = async (houseCode) => {
  const snapshot = await housesCollection.where('houseCode', '==', houseCode).get();
  return !snapshot.empty;
};

exports.checkHouseExists = async (houseCode) => {
  const snapshot = await housesCollection.where('houseCode', '==', houseCode).get();
  return !snapshot.empty;
};

exports.registerHouse = async (houseCode) => {
  try {
    await housesCollection.add({ houseCode });
    return true;
  } catch (error) {
    console.error('Erro ao registrar a casa:', error);
    return false;
  }
};
