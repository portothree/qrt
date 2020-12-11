const cases = require('jest-in-case');
const { windDirectionMean, airQualityIndex } = require('./index');

describe('Air Quality Toolkit', () => {
	describe('Wind Direction Mean', () => {
		test('Throws if non array is passed as input', () => {
			expect(() => windDirectionMean('random')).toThrow();
		});
		test('Calculate only directions', () => {
			expect(windDirectionMean([360, 45, 90])).toEqual(45);
		});
		test('Calculate with directions and speed', () => {
			expect(
				windDirectionMean([360, 45, 90], [1.48, 1.78, 3.44])
			).toEqual(59.76384812527999);
		});
		test('Calculate when receive array of arrays with directions and speed', () => {
			expect(
				windDirectionMean([
					[360, 1.48],
					[45, 1.78],
					[90, 3.44],
				])
			).toEqual(59.76384812527999);
		});
	});

	cases(
		'Air Quality Index',
		opts => {
			const [pollutant, aqi] = opts.name.split(':');
			const [PM10, PM25, NO2, O3, SO2] = opts.values;
			const result = airQualityIndex(PM10, PM25, NO2, O3, SO2);

			expect(result).toEqual({ pollutant, aqi: Number(aqi) });
		},
		[
			{ name: 'PM10:5', values: [1, 0, 0, 0, 0] },
			{ name: 'PM10:5', values: [20, 0, 0, 0, 0] },
			{ name: 'PM10:4', values: [22, 0, 0, 0, 0] },
			{ name: 'PM10:4', values: [35, 0, 0, 0, 0] },
			{ name: 'PM10:3', values: [37, 0, 0, 0, 0] },
			{ name: 'PM10:3', values: [50, 0, 0, 0, 0] },
			{ name: 'PM10:2', values: [52, 0, 0, 0, 0] },
			{ name: 'PM10:2', values: [100, 0, 0, 0, 0] },
			{ name: 'PM10:1', values: [102, 0, 0, 0, 0] },
		]
	);
});
