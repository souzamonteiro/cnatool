// jsdocMaiaScriptPlugin.js
// jsdocPlugin.js
var commentPattern = /\/\*\*[\s\S]+?\*\//g,
    notNewLinePattern = /[^\n]/g,
    extname = require('path').extname,
    extension = '.maia',
    comments;

exports.handlers = {
    beforeParse: function (e) {
        if (extension === extname(e.filename)) {
            e.source = e.source.replace(/(\n[ \t]*\/\/\/[^\n]*)+/g, function($) {
                var replacement = '\n/**' + $.replace(/^[ \t]*\/\/\//mg, '').replace(/(\n$|$)/, '*/$1');
                return replacement;
            });
            comments = e.source.match(commentPattern);
            e.source = comments ? e.source.split(commentPattern).reduce(function(result, source, i) {
                return result + source.replace(notNewLinePattern, '') + comments[i];
            }, '') : e.source.replace(notNewLinePattern, '');
        }
    }
};
