var ejs = require('ejs');
var path = require('path');

var createTemplateName = function (basePath, parentPath, filePath) {	
	var extensionRegex = /(\.[a-z]+)+$/;
	var absolutePath = path.join(basePath, parentPath);
	var normalizedAbsolutePath = absolutePath.lastIndexOf('/') == absolutePath.length - 1 
					? absolutePath
					: absolutePath + '/';
	var templateName = filePath.replace(normalizedAbsolutePath, '')
				   .replace(extensionRegex, '');
	
	return templateName;
};

var createEjsPreprocessor = function(logger, basePath, ejsOptions) {
    var log = logger.create('preprocessor.ejs');

    return function(content, file, done) {
        var processed = null;

	var templateName = createTemplateName(basePath, ejsOptions.parentPath, file.originalPath);

        log.debug('Processing "%s".', templateName);

        try {
            processed = "\
              (function() {\
                this.JST || (this.JST = {});\
                this.JST['" + templateName +
                  "'] = " + ejs.compile(content, {client: true}) +
            "}).call(this);";
        } catch (e) {
            log.error('%s\n  at %s', e.message, content);
        }

        done(processed);
    };
};

createEjsPreprocessor.$inject = ['logger', 'config.basePath', 'config.ejsOptions'];

module.exports = {
    'preprocessor:ejs': ['factory', createEjsPreprocessor]
};
