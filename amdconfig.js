require.config({
	// cache busting
	urlArgs: 'bust=' + Math.random(),
	// base url is the root.
	baseUrl: '/src',
	// remember: paths are relative to the / root.
	paths: {
		requirejs: '../bower_components/requirejs/requirejs',
		text: '../bower_components/requirejs-text/text',

		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',

		// the module
		'object-matcher': 'index',
	},

	// predefined shims... (we already know they are needed)
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore'],
		},
		underscore: {
			exports: '_',
		},
		mocha: {
			exports: 'mocha',
		},
		should: {
			exports: 'should'
		}
	},
});
