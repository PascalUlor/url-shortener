const fs = require('fs');
const app = require('./server/server');

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    // if (process.env.DYNO) {
    //     console.log('Running on Heroku...');
    //     fs.openSync('/tmp/app-initialized', 'w');
    //   }
    console.log('Node app is running on port:', PORT);
});