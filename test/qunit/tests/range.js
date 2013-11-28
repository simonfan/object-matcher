define(['document-matcher'], function (DocumentMatcher) {
	'use strict';

	return function () {

		QUnit.module('Range', {
			setup: function() {
				window.people = {
					Joe: {
						age: 60,
						job: 'writer'
					},

					Alex: {
						age: 10,
						job: 'student'
					},

					Lucie: {
						age: 20,
					},
					Felipe: {
						age: 24
					}
				}
			}
		});

		test('$gt', function () {
			var people = window.people;

			var olderThan30 = DocumentMatcher({
				age: { $gt: 30 }
			});

			ok(olderThan30);

			ok(olderThan30(people.Joe));
		});


		test('aggregate', function() {
			var between20and24 = DocumentMatcher({
				age: { $gte: 20, $lte: 24 }
			});

			ok(between20and24(people.Lucie));
			ok(!between20and24(people.Joe));
		});

	}
});
