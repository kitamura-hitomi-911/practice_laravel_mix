const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public');
mix.js('resources/assets/js/common.js', 'public/js')
		.sass('resources/assets/sass/style.scss', 'public/css')
		.options({
			autoprefixer:{
				options:{
					grid: true,
					browsers: ['last 2 versions']
				}
			},
			processCssUrls: false
		})
		.copyDirectory('resources/assets/img', 'public/img');