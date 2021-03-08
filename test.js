const cases = require('jest-in-case');
const {
	windDirectionMean,
	airQualityIndex,
	noiseMean,
	parseRaw,
} = require('./index');

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
			const result = noiseMean([70, 70, 70, 70, 70]);

			expect(result).toEqual(70);
		});
	});

	describe('Parse Raw', () => {
		cases(
			'Parser must return object containing metadata info',
			opts => {
				const result = parseRaw(opts.raw);

				expect(result).toEqual(opts.parsed);
			},
			[
				{
					name: '000000000001',
					raw:
						'QART,v2018.1,LE1,1.0.100,000000000001,OK,444,364,264,245,326,326,250,261,207,172,694,136,0,694,136,5,16.52,19.21,9.38,11.90,13,,150|3.01|15/01/2020 18:50:08|N| -61 dBm|867858033064406|0|0|0|0|0|0|0|0.',
					parsed: {
						DUI: '000000000001',
						dataString: 'v2018.1',
						firmwareVersion: '1.0.100',
						status: 'OK',
						version: 'LE1',
					},
				},
				{
					name: '202007260067',
					raw:
						'QART,v2018.1,LE1,1.0.100,202007260067,OK,430,371,270,241,322,321,235,259,362,355,528,157,0,528,157,6,16.94,22.00,31.02,51.80,16,555,132|4.02|07/02/2021 13:07:35|N| -51 dBm|865210039116800|0|0|154|509|10055|0|0|2001|||52966915|3876|0|.',
					parsed: {
						DUI: '202007260067',
						dataString: 'v2018.1',
						firmwareVersion: '1.0.100',
						status: 'OK',
						version: 'LE1',
					},
				},
			]
		);
	});
});
