
// FEATURE: use a class to encapsule states
function Debug() {
  function debug() {
    var args =  Array.prototype.slice.call( arguments );
    var sinks = debug.sinks;
    var caller = arguments.callee.caller;
    var appendCallerMessage = debug.appendCallerMessage;

    args.unshift('debug');

    if ( debug.enabled === true ) {
      sinks.forEach(function(sink) {
        sink.logFunction.apply(sink.context, args);
      });
    }

    if ( appendCallerMessage === true ) {
      var callerMsg;
      if ( caller === null ) {
        callerMsg = 'In function null';
      } else if ( caller.name ) {
        callerMsg = 'In function ' + caller.name;
      } else {
        callerMsg = 'In anonymous function';
      }
      args.push(callerMsg);
    }

    return args;
  };

  debug.enabled = true;
  debug.appendCallerMessage = true;

  debug.sinks = [];

  debug.writeTo = function(target, options) {
    if (target instanceof HTMLElement) {
      options || ( options = {} );
      var append = options.append;
      var logFun;

      if ( append === true ) {
        logFun = function() {
          var args =  Array.prototype.slice.call( arguments );
          target.textContent += args.join();
        };
      } else {
        logFun = function() {
          var args =  Array.prototype.slice.call( arguments );
          target.textContent = args.join();
        };
      }
      debug.sinks.push({
        context: null,
        logFunction: logFun
      });
    } else if (target === console) {
      debug.sinks.push({
        context: console,
        logFunction: console.log
      });
    } else if (target && typeof target === 'object' &&
               typeof target.emit === 'function') {
      debug.sinks.push({
        context: target,
        logFunction: target.emit
      });
    }
  };

  debug.readFrom = function(source, options) {
    if (source && typeof source === 'object' &&
        typeof source.on === 'function') {
      source.on('debug', function() {
        var args =  Array.prototype.slice.call( arguments );
        var message;

        debug.enabled = false;
        debug.appendCallerMessage = false;
        message = debug.apply(null, args);
        message.shift();
        console.log.apply(console, message);
        debug.enabled = true;
        debug.appendCallerMessage = true;
      });
    }
  };

  // FEATURE:
  debug.createElement = function() {

  };

  // defaults:
  if ( window.io ) {
    var io = window.io;
    var socket = io.connect();
    debug.writeTo(socket);

    window.onerror = function(msg, url, lineNumber) {
      debug(msg, url, lineNumber);
    };
  } else {
    debug.writeTo(console);
  }

  return debug;
}


// function debug() {
//   var args =  Array.prototype.slice.call( arguments );
//   var sinks = debug.sinks;
//   var caller = arguments.callee.caller;
//   var appendCallerMessage = debug.appendCallerMessage;

//   args.unshift('debug');

//   if ( debug.enabled === true ) {
//     sinks.forEach(function(sink) {
//       sink.logFunction.apply(sink.context, args);
//     });
//   }

//   if ( appendCallerMessage === true ) {
//     var callerMsg;
//     if ( caller === null ) {
//       callerMsg = 'In function null';
//     } else if ( caller.name ) {
//       callerMsg = 'In function ' + caller.name;
//     } else {
//       callerMsg = 'In anonymous function';
//     }
//     args.push(callerMsg);
//   }

//   return args;
// };

// debug.enabled = true;
// debug.appendCallerMessage = true;

// debug.sinks = [];

// debug.writeTo = function(target, options) {
//   if (target instanceof HTMLElement) {
//     options || ( options = {} );
//     var append = options.append;
//     var logFun;

//     if ( append === true ) {
//       logFun = function() {
//         var args =  Array.prototype.slice.call( arguments );
//         target.textContent += args.join();
//       };
//     } else {
//       logFun = function() {
//         var args =  Array.prototype.slice.call( arguments );
//         target.textContent = args.join();
//       };
//     }
//     debug.sinks.push({
//       context: null,
//       logFunction: logFun
//     });
//   } else if (target === console) {
//     debug.sinks.push({
//       context: console,
//       logFunction: console.log
//     });
//   } else if (target && typeof target === 'object' &&
//             typeof target.emit === 'function') {
//     debug.sinks.push({
//       context: target,
//       logFunction: target.emit
//     });
//   }
// };

// debug.readFrom = function(source, options) {
//   if (source && typeof source === 'object' &&
//       typeof source.on === 'function') {
//     source.on('debug', function() {
//       var args =  Array.prototype.slice.call( arguments );
//       var message;

//       debug.enabled = false;
//       debug.appendCallerMessage = false;
//       message = debug.apply(null, args);
//       message.shift();
//       console.log.apply(console, message);
//       debug.enabled = true;
//       debug.appendCallerMessage = true;
//     });
//   }
// };

// // FEATURE:
// debug.createElement = function() {

// };

// // defaults:
// if ( window.io ) {
//   var io = window.io;
//   var socket = io.connect();
//   debug.writeTo(socket);

//   window.onerror = function(msg, url, lineNumber) {
//     debug(msg, url, lineNumber);
//   };
// } else {
//   debug.writeTo(console);
// }

module.exports = exports = Debug;
