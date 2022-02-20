const app = require('./app');
const dbConnection = require('./config/dbConfig');

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log('server started');
});

