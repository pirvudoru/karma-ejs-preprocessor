var ejs = require('ejs');

var createEjsPreprocessor = function(logger, ejsOptions) {
    var log = logger.create('preprocessor.ejs');

    return function(content, file, done) {
        var processed = null;

        log.debug('Read option parentPath: ', ejsOptions.parentPath);
        var templateName = file.originalPath.replace(ejsOptions.parentPath, '');
        // Remove all extensions. For
        //     parentPath: /Users/our_user/our_project/app/assets/javascripts/templates
        // /Users/our_user/our_project/app/assets/javascripts/templates/cars/bmw_template.jst.ejs
        //     becomes `cars/bmw_template`
        templateName = templateName.replace(/(\.[a-z]+)+$/, '');
        // "/activity/activity_list_change.jst.ejs"
        log.debug('Processing "%s".', file.originalPath);
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

createEjsPreprocessor.$inject = ['logger', 'config.ejsOptions'];

module.exports = {
    'preprocessor:ejs': ['factory', createEjsPreprocessor]
};
