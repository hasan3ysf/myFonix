(function (undefined) {
  "use strict";

  var root = this;
  var commandsList = [];
  var debugStyle = 'font-weight: bold; color: #00f;';

  // The command matching code is a modified version of Backbone.Router by Jeremy Ashkenas, under the MIT license.
  var optionalParam = /\s*\((.*?)\)\s*/g;
  var optionalRegex = /(\(\?:[^)]+\))\?/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#]/g;
  var commandToRegExp = function(command) {
    command = command.replace(escapeRegExp, '\\$&')
                  .replace(optionalParam, '(?:$1)?')
                  .replace(namedParam, function(match, optional) {
                    return optional ? match : '([^\\s]+)';
                  })
                  .replace(splatParam, '(.*?)')
                  .replace(optionalRegex, '\\s*$1?\\s*');
    return new RegExp('^' + command + '$', 'i');
  };

  var registerCommand = function(command, cb, phrase) {
    commandsList.push({ command: command, callback: cb, originalPhrase: phrase });
      root.console.log('Command successfully loaded: %c'+phrase, debugStyle);
  };

root.fonixListen = {
    addCommands: function(commands) {
      var cb;
      for (var phrase in commands) {
        if (commands.hasOwnProperty(phrase)) {
          cb = root[commands[phrase]] || commands[phrase];
          if (typeof cb === 'function') {
            // convert command to regex then register the command
            registerCommand(commandToRegExp(phrase), cb, phrase);
          } else if (typeof cb === 'object' && cb.regexp instanceof RegExp) {
            // register the command
            registerCommand(new RegExp(cb.regexp.source, 'i'), cb.callback, phrase);
          }
        }
      }
    },
    executeCommand: function(commandText) {
      for (var j = 0, l = commandsList.length; j < l; j++) {
        var result = commandsList[j].command.exec(commandText);
        if (result) {
          var parameters = result.slice(1);
          // execute the matched command
          commandsList[j].callback.apply(this, parameters);
          return true;
        }
      }
    }
  };
}).call(this);
