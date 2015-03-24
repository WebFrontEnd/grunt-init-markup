module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sprite:{
            dist: {
                src: ['img/sp/*.png'],
                dest: 'img/sp_{%= name %}_2x.png',
                imgPath: '../img/sp_{%= name %}_2x.png',
                destCss: 'scss/sprites/_sprites.scss',
                padding: 4,
                cssSpritesheetName: 'sp-{%= name %}',
                cssTemplate: function(params) {
                    var Mustache = require('mustache');
                    var template = grunt.file.read('sprites.mustache');

                    return Mustache.render(template, params);
                },
                cssOpts: {
                    // 비 레티나용 이미지 경로를 반환하는 함수
                    path: function(){
                        return function(text, render){
                            return render(text).replace('_2x', '');
                        }
                    },
                    // zerounit 검증을 통과하기 위해 템플릿을
                    // 수정하고 별도의 함수를 추가.
                    zerounit: function() {
                        return function(text, render) {
                            var value = render(text);
                            return '0px' === value? '0' : value;
                        };
                    },
                    // 레티나 대응을 위해서
                    // width, height, offset을 pixel ratio로 나눔
                    retina: function() {
                        return function(text, render) {
                            var pixelRatio = 2;
                            return parseInt(render(text), 10) / pixelRatio + 'px';
                        };
                    }
                }
            }
        },
        image_resize: {
            dist: {
                options: {
                    width: '50%'
                },
                files: {
                    'img/sp_{%= name %}.png': 'img/sp_{%= name %}_2x.png'
                }
            }
        },
        concat: {
            sprites: {
                files: {
                    'scss/core/_sprites.scss': ['scss/sprites/*.scss']
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
                    noCache: true,
                    'default-encoding': 'UTF-8'
                },
                files: {
                    'css/{%= name %}.css': 'scss/{%= name %}.scss'
                }
            },
            min: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                    noCache: true,
                    'default-encoding': 'UTF-8'
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
        includereplace: {
            dist: {
                files: [
                    {src: '*.html', dest: 'dist/', expand: true, cwd: 'html/'}
                ]
            }
        },
        htmlhint: {
            dist: {
                options: {
                    htmlhintrc: '.htmlhintrc'
                },
                src: ['dist/**/*.html']
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
                src: ['dist/*.html']
            }
        },
        watch: {
            html: {
                files: 'html/**/*.html',
                tasks: 'includereplace',
                options: {
                    spawn: false
                }
            },
            scss: {
                files: 'scss/**/*.scss',
                tasks: ['sass:dev', 'autoprefixer:dev'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // load grunt plugins
    require('jit-grunt')(grunt, {
        sprite: 'grunt-spritesmith',
        image_resize: 'grunt-image-resize',
        scsslint: 'grunt-scss-lint',
        validation: 'grunt-html-validation',
        includereplace: 'grunt-include-replace'
    });

    // CSS task(s).
    grunt.registerTask('css', ['sprite', 'image_resize', 'concat', 'scsslint', 'sass:dev', 'csslint', 'autoprefixer:dev']);

    // HTML task(s).
    grunt.registerTask('html', ['includereplace', 'htmlhint', 'validation']);

    // Develop task(s).
    grunt.registerTask('devel', ['css', 'html']);

    // Build task(s).
    grunt.registerTask('build', ['sprite', 'image_resize', 'concat', 'scsslint', 'sass:min', 'csslint', 'autoprefixer:min', 'html']);

    // Default task(s).
    grunt.registerTask('default', ['devel', 'build']);
};
