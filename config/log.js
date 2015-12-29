'use strict';

var log4js = require('log4js');
var $depth = 11;
log4js.configure({
  appenders: [
    {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: "[%r] [%[%5.5p%]] {%x{ln}} %m%n",
        tokens: {
          ln : function() {
            // The caller:
            return (new Error).stack.split("\n")[$depth]
              // Just the namespace, filename, line:
              .replace(/^\s+at\s+(\S+)\s\((.+?)([^\/]+):(\d+):\d+\)$/, function (){
                return arguments[1] +' '+ arguments[3] +' line '+ arguments[4];
              });
          }
        }
      }
    }
  ]
});

//var dateFileLog = log4js.getLogger('dateFileLog');
//
//exports.logger = dateFileLog;
var consoleLog = log4js.getLogger();
consoleLog.setLevel('DEBUG');
exports.logger = consoleLog;

exports.use = function(app) {
  app.use(log4js.connectLogger(consoleLog, {level:'trace', format:':method :url'}));
};
