require.config({
	urlArgs: 'bust=0.6330075277946889',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'object-matcher': 'index',
		deep: '../bower_components/deep/built/deep',
		jquery: '../bower_components/jquery/jquery',
		containers: '../bower_components/containers/built/containers',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		itr: '../bower_components/itr/built/itr',
		qunit: '../bower_components/qunit/qunit/qunit',
		subject: '../bower_components/subject/built/subject',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
