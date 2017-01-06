var notifier = require('node-notifier');

var ErrorHandler = function(error) {
      notifier.notify({
        message: error.message,
        title: error.plugin,
        sound: 'Glass'
      });
      console.log('\u001b[31m' + error.plugin);
      console.log(error.message + '\u001b[0m');
    };

module.exports = ErrorHandler;
