module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sprite:{
            dist: {
                src: ['img/*.png'],
                dest: 'img/sp/sp_{%= name %}.png',
                imgPath: '../img/sp/sp_{%= name %}.png',
                cssFormat: 'scss',
                destCss: 'scss/core/_sprites.scss',
                // scsslint 검증을 통과하기 위해 _(underscore)로
                // 작성된 파싱된 파일명을 -(dash)로 변경
                cssVarMap: function (sprite) {
                    sprite.name = sprite.name.replace('_', '-');
                },
                // zerounit 검증을 통과하기 위해 템플릿을
                // 수정하고 별도의 함수를 추가.
                cssTemplate: 'scss.spritesmith.mustache',
                cssOpts: {
                    zerounit: function() {
                        return function(text, render) {
                            var value = render(text);
                            return '0px' === value? '0' : value;
                        };
                    }
                }
            }
        },
        scsslint: {
            allFiles: [
                'scss/**/*.scss'
            ],
            options: {
                config: '.scss-lint.yml',
                reporterOutput: false,
                colorizeOutput: true
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'file',
                    noCache: true
                },
                files: {
                    'css/{%= name %}.css': 'scss/{%= name %}.scss'
                }
            },
            min: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                    noCache: true
                },
                files: {
                    'css/{%= name %}.min.css': 'scss/{%= name %}.scss'
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist: {
                options: {
                    import: 2
                },
                src: ['css/**/*.css']
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    map: {inline: false},
                    browsers: ['last 2 versions', 'ie 8', 'ie 9']
                },
                src: 'css/{%= name %}.css',
                dest: 'css/{%= name %}.css'
            },
            min: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9']
                },
                src: 'css/{%= name %}.min.css',
                dest: 'css/{%= name %}.min.css'
            }
        },
        htmlhint: {
            dist: {
                options: {
                    htmlhintrc: '.htmlhintrc'
                },
                src: ['html/**/*.html']
            }
        },
        validation: {
            options: {
                reset: grunt.option('reset') || false,
                stoponerror:false,
                reportpath: false,
                doctype: 'HTML5',
                // w3c의 validation 서버를 이용하면 속도도 느리고
                // 대량의 html 파일을 검증 요청 시 IP 블락 당할 수 있으므로
                // 자체 검증 서버를 구축하여 사용하는 편이 좋다.
                // serverUrl: '',
                relaxerror: [
                    'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
                    'Element title must not be empty.'
                ]
            },
            files: {
                src: ['html/*.html']
            }
        }
    });

    // load grunt plugins
    require('jit-grunt')(grunt, {
        sprite: 'grunt-spritesmith',
        scsslint: 'grunt-scss-lint',
        validation: 'grunt-html-validation'
    });

    // CSS task(s).
    grunt.registerTask('css', ['sprite', 'scsslint', 'sass:dev', 'csslint', 'autoprefixer:dev']);

    // HTML task(s).
    grunt.registerTask('html', ['htmlhint', 'validation']);

    // Develop task(s).
    grunt.registerTask('devel', ['css', 'html']);

    // Build task(s).
    grunt.registerTask('build', ['sprite', 'scsslint', 'sass:min', 'csslint', 'autoprefixer:min', 'htmlhint', 'validation']);

    // Default task(s).
    grunt.registerTask('default', ['css', 'html', 'devel', 'build']);
};