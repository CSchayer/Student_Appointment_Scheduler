// Database connection string

var configValues = require('./config');

module.exports = {
    getDbConnectionString: function () {
        return 'mongodb://' + configValues.uname + ':' +
            configValues.pwd + '@ds025449.mlab.com:25449/appt-scheduling';
    }
};
