const express = require('express');
const { sequelize } = require('./modles');

const app = express();
app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced sucessfully.');
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000')
    });
}).catch(err => console.error('DB sync error:', err));