define(['document-matcher'], function (documentMatcher) {
	'use strict';

	return function () {

		QUnit.module('Aggregate');

		test('Aggregate', function () {
			var person = {
				name: 'Simon',
				age: 21,
				interests: ['communication','politics','philosophy'],
				parents: {
					mother: {
						age: 50
					},
					father: {
						age: 52
					}
				}
			};

			var likesPoliticsIsYoungerThan25andWhoseFatherIsOlderThan51 = documentMatcher({
				interests: { $in: ['politics'] },
				'parents.father.age': { $gt: 51 },
				age: { $lt: 25 }
			});

			ok(likesPoliticsIsYoungerThan25andWhoseFatherIsOlderThan51(person))
		});

	}
});
