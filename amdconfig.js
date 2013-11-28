require.config({
	urlArgs: 'bust=0.6466049603186548',
	baseUrl: '/',
	paths: {
		requirejs: 'bower_components/requirejs/require',
		text: 'bower_components/requirejs-text/text',
		'document-matcher': 'src/document-matcher',
		jquery: 'bower_components/jquery/jquery',
		'requirejs-text': 'bower_components/requirejs-text/text',
		'underscore.contains': 'bower_components/underscore.contains/src/underscore.contains',
		'underscore.deep': 'bower_components/underscore.deep/src/underscore.deep',
		underscore: 'bower_components/underscore/underscore'
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
		}
	}
});
