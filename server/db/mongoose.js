var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://root:abc123@ds137863.mlab.com:37863/ionicbackend');

module.exports= {
    mongoose
};