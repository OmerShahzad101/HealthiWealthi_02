const config = require('./config/vars');
const app = require('./config/express');
const routes = require('./routes/index');
const mongoose = require('./config/mongoose');

mongoose.connect();

// mount api v1 routes
app.use('/api', routes);

const port = process.env.PORT || config.LISTEN_PORT;
app.listen(port, () => {
    console.log(`listening on port ${config.LISTEN_PORT}`);
});

module.exports = app;
