const express = require('express');
const app = express();
const env = 'development';
const settings = require('./config/settings')[env];

require('./config/express-config')(app);


app.listen(settings.port, () => console.log(`Server up and running on port ${settings.port}`));