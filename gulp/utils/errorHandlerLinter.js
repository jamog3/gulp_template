var notifier = require('node-notifier');

var ErrorHandlerLinter = function(error) {
      if(error.length) {
        notifier.notify({
          message: error[0].msg,
          title: error[0].code,
          sound: 'Glass'
        });
      }
    };

module.exports = ErrorHandlerLinter;
