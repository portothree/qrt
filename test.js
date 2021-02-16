const cases = require('jest-in-case');
const { windDirectionMean, airQualityIndex, noiseMean } = require('./index');

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

			expect(result).toEqual({
				AQI_POL: pollutant,
				AQI_GLOBAL: Number(aqi),
			});
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
			{ name: 'PM10:5', values: [0, 1, 0, 0, 0] },
			{ name: 'PM10:5', values: [0, 10, 0, 0, 0] },
			{ name: 'PM25:4', values: [0, 12, 0, 0, 0] },
			{ name: 'PM25:4', values: [0, 20, 0, 0, 0] },
			{ name: 'PM25:3', values: [0, 22, 0, 0, 0] },
			{ name: 'PM25:3', values: [0, 25, 0, 0, 0] },
			{ name: 'PM25:2', values: [0, 27, 0, 0, 0] },
			{ name: 'PM25:2', values: [0, 50, 0, 0, 0] },
			{ name: 'PM25:1', values: [0, 52, 0, 0, 0] },
			{ name: 'PM10:5', values: [0, 0, 1, 0, 0] },
			{ name: 'PM10:5', values: [0, 0, 39, 0, 0] },
			{ name: 'NO2:4', values: [0, 0, 42, 0, 0] },
			{ name: 'NO2:4', values: [0, 0, 100, 0, 0] },
			{ name: 'NO2:3', values: [0, 0, 102, 0, 0] },
			{ name: 'NO2:3', values: [0, 0, 200, 0, 0] },
			{ name: 'NO2:2', values: [0, 0, 202, 0, 0] },
			{ name: 'NO2:2', values: [0, 0, 400, 0, 0] },
			{ name: 'NO2:1', values: [0, 0, 402, 0, 0] },
			{ name: 'PM10:5', values: [0, 0, 0, 0, 1] },
			{ name: 'PM10:5', values: [0, 0, 0, 0, 99] },
			{ name: 'SO2:4', values: [0, 0, 0, 0, 102] },
			{ name: 'SO2:4', values: [0, 0, 0, 0, 200] },
			{ name: 'SO2:3', values: [0, 0, 0, 0, 202] },
			{ name: 'SO2:3', values: [0, 0, 0, 0, 350] },
			{ name: 'SO2:2', values: [0, 0, 0, 0, 352] },
			{ name: 'SO2:2', values: [0, 0, 0, 0, 500] },
			{ name: 'SO2:1', values: [0, 0, 0, 0, 502] },
		]
	);

	describe('Noise Mean', () => {
		test('Average noise measurements', () => {
			const result = noiseMean([70, 70, 70, 70]);

			expect(result).toEqual(161.1809565095832);
		});
	});
});
