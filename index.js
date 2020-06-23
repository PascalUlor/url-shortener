const app = require('./server/server');

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Application started  on port`, PORT);
   });