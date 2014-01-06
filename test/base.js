(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'object-matcher',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(objectMatcher, should) {
	'use strict';

	describe('matcher = objectMatcher(criteria {Object})', function () {

		it('is a function', function () {
			var matcher = objectMatcher();

			matcher.should.be.type('function');
		});



		beforeEach(function () {
			var locations = this.locations = [];

			var brasil, sp, mg, saopaulo, campinas, belohorizonte, ouropreto;

			brasil = this.brasil = {
				name: 'Brasil',
				type: 'country',
				population: 201032714,
			};

			// states
			sp = this.sp = {
				name: 'Sao Paulo',
				type: 'state',
				country: brasil,
				population: 41901219,
				cities: [{ name: 'Sao Paulo' }, { name: 'Campinas'} ],
				dishes: ['virado', 'cafe']
			};

			mg = this.mg = {
				name: 'Minas Gerais',
				type: 'state',
				country: brasil,
				population: 19855332,
				dishes: ['tutu', 'feijao tropeiro', 'feijoada', 'queijo']
			}

			// cities
			saopaulo = this.saopaulo = {
				name: 'Sao Paulo',
				type: 'city',
				state: sp,
				population: 11316149,
			};


			campinas = this.campinas = {
				name: 'Campinas',
				type: 'city',
				state: sp,
				population: 1098630
			};

			belohorizonte = this.belohorizonte = {
				name: 'Belo Horizonte',
				type: 'city',
				state: mg,
				population: 2479175
			};

			ouropreto = this.ouropreto = {
				name: 'Ouro Preto',
				type: 'city',
				state: mg,
				population: 70227
			}

			locations.push(brasil);

			locations.push(mg);
			locations.push(belohorizonte);
			locations.push(ouropreto);

			locations.push(sp);
			locations.push(saopaulo);
			locations.push(campinas);


		});

		describe('basic matcher', function () {
			it('identical', function () {
				var stateMatcher = objectMatcher({
					type: 'state',
				});

				stateMatcher(this.sp).should.be.true;
				stateMatcher(this.brasil).should.be.false;
			});

			it('match against array property', function () {
				var hasSaoPauloAsCity = objectMatcher({
					'cities.name': 'Sao Paulo'
				});

				hasSaoPauloAsCity(this.sp).should.be.true;
			});
		});

		describe('range matcher', function () {

			it('greaterThan = objectMatcher({ prop: { $gt: limit } })', function () {

				var populationGreaterThan10Million = objectMatcher({ population: { $gt: 10000000 }});

				populationGreaterThan10Million(this.saopaulo).should.be.true;

				populationGreaterThan10Million(this.ouropreto).should.be.false;

			});

			it('aggregate = objectMatcher({ prop1: { $gt: bottomLimit }, prop2: { $lt: topLimit } })', function () {
				var populationBetween1mAnd5m = objectMatcher({
					population: { $gt: 1000000, $lt: 5000000 }
				});

				populationBetween1mAnd5m(this.saopaulo)
					.should.be.false;

				populationBetween1mAnd5m(this.belohorizonte)
					.should.be.true;

				populationBetween1mAnd5m(this.ouropreto)
					.should.be.false;
			})

		});
	});
});
