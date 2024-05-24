const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const postRoutes = require('./routes/posts'); 

app.use(express.json());

app.use('/posts', postRoutes);
// app.get('/', (req, res) => {
//     console.log('Solicitud GET recibida en la ruta /');
//     res.send('Servidor funcionando correctamente');
// });

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;