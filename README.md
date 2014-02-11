Preprocesor for .ejs files for karma
====================================

Enables support the underscore.js `.ejs` template system.


Usage
-----

As shown below, add `karma-ejs-preprocessor` to your plugins, add ejs to the preprocessors
directive, and in the `ejsOptions` add a path (absolute) to the location of your templates.

    plugins: [
        'karma-qunit',
        [...]
        'karma-ejs-preprocessor',
    ],
    preprocessors: {
        '**/*.ejs': ['ejs']
    },
    ejsOptions: {
        parentPath: 'app/assets/javascripts/templates/'
    },
    [...]

The `parentPath` is relative to the `basePath` specified in your config. 

The `JST` global variable will contain keys relative to `parentPath` for your templates. E.g. for
the file `/Users/sebi/devel/super_site/app/assets/javascripts/templates/homepage/header.ejs`, by
specifying the proper `parentPath` you can get the template initialized in `JST['homepage/header']`.


License
-------

Copyright (c) 2013-2014 Sebastian Zaha

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
