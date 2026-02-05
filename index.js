const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const authRoutes = require('./src/routes/authRoutes');
const bookRoutes = require('./src/routes/bookRoutes');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  exposedHeaders: ['X-Total-Count']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use('/', (req, res) => {
  res.json({ message: 'Hello World!!!' });
});

// Sync database and start server
// force: false ensure we don't drop tables if they exist
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Synced db.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync db: ' + err.message);
  });
