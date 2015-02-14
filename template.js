/*
 * grunt-init-markup
 * https://gruntjs.com/
 *
 * Copyright (c) 2015.
 * Licensed under the MIT license.
 */
'use strict';

// Basic template description.
exports.description = 'Create a markup project boilerplate.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
    'install_. After that, you may execute project tasks with _grunt_. For ' +
    'more information about installing and configuring Grunt, please see ' +
    'the Getting Started guide:' +
    '\n\n' +
    'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
    init.process({}, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('description'),
        init.prompt('version', '0.0.1'),
        init.prompt('repository', ''),
        init.prompt('homepage', ''),
        init.prompt('bugs', ''),
        init.prompt('licenses'),
        init.prompt('author_name'),
        init.prompt('author_email'),
        init.prompt('author_url')
    ], function(err, props) {
        props.keywords = [];
        props.devDependencies = {
            "csslint": "^0.10.0",
            "grunt": "^0.4.5",
            "grunt-image-resize": "^1.0.0",
            "grunt-autoprefixer": "^2.2.0",
            "grunt-contrib-concat": "^0.5.0",
            "grunt-contrib-csslint": "^0.4.0",
            "grunt-contrib-sass": "^0.8.1",
            "grunt-html-validation": "^0.1.18",
            "grunt-htmlhint": "^0.4.1",
            'grunt-include-replace': '^2.0.2',
            "grunt-scss-lint": "^0.3.4",
            "grunt-spritesmith": "^3.6.0",
            "jit-grunt": "^0.9.0"
        };

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Add properly-named license files.
        init.addLicenseFiles(files, props.licenses);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props, {noProcess: "img/**"});

        // Generate package.json file.
        init.writePackageJSON('package.json', props);

        // All done!
        done();
    });
};
