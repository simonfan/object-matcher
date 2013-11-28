define(['document-matcher'], function (DocumentMatcher) {
	'use strict';

	return function () {

		QUnit.module('Range', {
			setup: function() {
				window.people = [];
				people.push({
					name: 'Joe',
					age: 60,
					job: 'writer'
				});

				people.push({
					name: 'Alex',
					age: 10,
					job: 'student'
				});

				people.push({
					name: 'Lucie',
					age: 20,
					job: 'researcher',
					hobbies: ['']
				});

				people.push({
					name: 'Felipe',
					age: 24,
					job: 'artist',
					hobbies: ['skating','sleeping','photography']
				});
			}
		});

		test('$gt', function () {
			var people = window.people;

			var olderThan30 = DocumentMatcher({
				age: { $gt: 30 }
			});

			ok(olderThan30);

			ok(olderThan30(people[0]));
		});

	}
});
