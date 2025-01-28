const db = require('../config/firestore');

const collection = db.collection('shoppingList');

exports.getItems = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

exports.addItem = async (text) => {
  const ref = await collection.add({ text });
  return { id: ref.id, text };
};

exports.updateItem = async (id, text) => {
  await collection.doc(id).update({ text });
  return { id, text };
};

exports.deleteItem = async (id) => {
  await collection.doc(id).delete();
};