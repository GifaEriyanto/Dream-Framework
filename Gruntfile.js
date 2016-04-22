module.exports = function(grunt) {
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserSync: {
			dream: {
				bsFiles: {
					src: [
						'app/dream/assets/css/*.css',
						'app/dream/assets/js/*.js',
						'app/dream/*.html'
					]
				},
				options: {
					proxy: '0.0.0.0:8080',
					watchTask: true
				}
			}
		},

		concat: {
			dream: {
				dest: 'app/dream/assets/js/dream.js',
				src: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/modernizr/modernizr.js',
					'assets/js-dream/*.js', 'assets/js/*.js',
				]
			}
		},

		connect: {
			dream: {
				options: {
					base: 'app/dream',
					hostname: '0.0.0.0',
					port: '8080'
				}
			}
		},

		cssmin: {
			all: {
				files: [{
					cwd: 'css/',
					dest: 'css/',
					expand: true,
					ext: '.min.css',
					src: ['*.css', '!*.min.css']
				}]
			},
			dream: {
				src: ['app/dream/assets/css/dream.css'],
				dest: 'app/dream/assets/css/dream.min.css'
			}
		},

		postcss: {
			all: {
				files: [{
					cwd: 'css/',
					dest: 'css/',
					expand: true,
					ext: '.css',
					src: ['*.css', '!*.min.css']
				}]
			},
			options: {
				map: false,
				processors: [
					require('autoprefixer') ({
						browsers: ['> 1%', 'Firefox ESR', 'last 2 versions', 'not ie <= 9']
					})
				]
			},
			dream: {
				src: 'app/dream/assets/css/dream.css'
			}
		},

		sass: {
			dream: {
				files: [{
					cwd: 'assets/sass/',
					dest: 'app/dream/assets/css/',
					expand: true,
					ext: '.css',
					src: ['*.scss']
				}],
				options: {
					sourcemap: 'none',
					style: 'expanded'
				}
			}
		},

		uglify: {
			all: {
				files: [{
					cwd: 'js/',
					dest: 'js/',
					expand: true,
					ext: '.min.js',
					src: ['*.js', '!*.min.js']
				}]
			},
			dream: {
				files: {
					'app/dream/assets/js/dream.min.js': ['app/dream/assets/js/dream.js']
				}
			}

		},

		watch: {
			all: {
				files: ['assets/js/**/*.js', 'assets/js-project/**/*.js', 'assets/sass/**/*.scss', 'assets/sass-project/**/*.scss', 'assets/sass-psb/**/*.scss'],
				tasks: ['concat:all', 'uglify:all', 'sass:all', 'postcss:all', 'cssmin:all']
			},
			dream: {
				files: ['assets/js/**/*.js', 'assets/sass/**/*.scss'],
				tasks: ['concat:dream', 'uglify:dream', 'sass:dream', 'postcss:dream', 'cssmin:dream']
			}
		},

		// dev update
		devUpdate: {
			main: {
				options: {
					semver: false,
					updateType: 'prompt'
				}
			}
		}
	});

	grunt.registerTask( 'dream', ['connect:dream', 'browserSync:dream', 'sass:dream', 'concat:dream', 'uglify:dream', 'watch:dream'] );
};
