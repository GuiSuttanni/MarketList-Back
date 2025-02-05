const express = require('express');
const cors = require('cors');
require('dotenv').config();
const shoppingListRoutes = require('./routes/shoppingListRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/shopping-list', shoppingListRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));