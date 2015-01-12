module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/app.js',
                dest: 'build/app.min.js'
            }
        },
        // Minify css with cssmin plugin. (https://github.com/gruntjs/grunt-contrib-cssmin)
        cssmin: {
            my_target: {
                files: [{
                    // Minify the index.html css file(s).
                    expand: true,
                    cwd: 'src/',
                    // Use "!" to exclude previous "min" files in order to overwrite them.
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['uglify', 'jsdoc'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['src/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false
                }
            },
            markdown: {
                files: ['docs/*.md'],
                tasks: ['readme', 'jsdoc'],
                options: {
                    spawn: false
                }
            }
        },
        jsdoc : {
            docstrap : {
                src: ['src/*.js', 'README.md'],
                options: {
                    destination: 'jsdoc',
                    template : 'node_modules/ink-docstrap/template',
                    configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }
    });

    // Load plugins for tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-readme');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'readme', 'jsdoc', 'watch']);

};