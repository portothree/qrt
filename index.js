'use strict';
const { deg2rad, rad2deg } = require('./utils.js');
const helpers = require('./helpers');
const dayjs = require('dayjs');

module.exports = {
	/**
	 * @param {Array} [directions] - array of directions in degrees
	 * @param {Array} [input] - array of arrays containing
	 * wind direction and speed
	 * @param {Array} [speed] - array of speeds in m/s
	 * @return {number}
	 *
	 * @example
	 *
	 *	avgWind([360, 45, 90]);
	 *	avgWind([[360, 1.48], [45, 1.78], [90, 3.44]]);
	 *	avgWind([360, 45, 90], [1.48, 1.78, 3.44]);
	 */
	windDirectionMean: (...args) => {
		let sinSum = 0;
		let cosSum = 0;

		if (args.length === 1) {
			if (!Array.isArray(args[0])) {
				throw new TypeError(`Expected a array, got ${typeof args[0]}`);
			}

			// The argument is an array of arrays
			if (Array.isArray(args[0][0])) {
				args[0].forEach(([direction, speed]) => {
					sinSum += speed * Math.sin(deg2rad(direction));
					cosSum += speed * Math.cos(deg2rad(direction));
				});
			} else {
				// Only an array of directions was passed
				args[0].forEach(direction => {
					sinSum += Math.sin(deg2rad(direction));
					cosSum += Math.cos(deg2rad(direction));
				});
			}
		}

		// Expect first argument to be an array of directions
		// and the second to be of speed
		if (args.length === 2) {
			if (!Array.isArray(args[1])) {
				throw new TypeError(`Expected a array, got ${typeof args[0]}`);
			}

			const directions = args[0];
			const speeds = args[1];

			directions.forEach((direction, index) => {
				const speed = speeds[index];

				sinSum += speed * Math.sin(deg2rad(direction));
				cosSum += speed * Math.cos(deg2rad(direction));
			});
		}

		return (rad2deg(Math.atan2(sinSum, cosSum)) + 360) % 360;
	},

	/**
	 * Air Quality Index
	 */
	airQualityIndex(med_PM10, med_PM25, med_NO2, med_O3, med_SO2) {
		function calcSensorAqi(aqiRules, sensorValue) {
			return Object.entries(aqiRules).reduce(
				(accumulator, [aqi, range]) => {
					const [min, max] = range;

					if (sensorValue > min && sensorValue < max) {
						accumulator = Number(aqi);
					}

					return accumulator;
				},
				5
			);
		}

		// AQI: [min, max]
		const rules = {
			PM10: {
				5: [0, 21],
				4: [21, 36],
				3: [36, 51],
				2: [51, 101],
				1: [101, Infinity],
			},
			PM25: {
				5: [0, 11],
				4: [11, 21],
				3: [21, 26],
				2: [26, 51],
				1: [51, Infinity],
			},
			NO2: {
				5: [0, 40],
				4: [40, 101],
				3: [101, 201],
				2: [201, 401],
				1: [401, Infinity],
			},
			SO2: {
				5: [0, 100],
				4: [101, 201],
				3: [201, 351],
				2: [351, 501],
				1: [501, Infinity],
			},
		};

		const aqi = {
			PM10: calcSensorAqi(rules.PM10, med_PM10),
			PM25: calcSensorAqi(rules.PM25, med_PM25),
			NO2: calcSensorAqi(rules.NO2, med_NO2),
			SO2: calcSensorAqi(rules.SO2, med_SO2),
		};

		const [AQI_POL, AQI_GLOBAL] = Object.entries(aqi).reduce(
			(accumulator, current) => {
				const [accSensor, accValue] = accumulator;
				const [currSensor, currValue] = current;

				if (accValue > currValue) {
					accumulator = current;
				}

				return accumulator;
			},
			['PM10', aqi.PM10]
		);

		return { AQI_POL, AQI_GLOBAL };
	},

	noiseMean(samples) {
		// Create a new array dividing each value by 10
		// and anti-log the value 10^x and them add together all the values
		const total = samples
			.map(sample => sample / 10)
			.map(sample => Math.pow(10, sample))
			.reduce((acc, curr) => (acc += curr), 0);

		// Divide the total by the number of samples
		// base 10 log this number and multiply it by 10
		return 10 * Math.log10(total / samples.length);
	},

	parseRaw(raw) {
		if (typeof raw !== 'string') {
			throw new Error('Raw must be an string');
		}

		const {
			dataString,
			version,
			firmwareVersion,
			status,
		} = helpers.device.info;

		const splittedRaw = raw.split(',');
		const pipes = splittedRaw[28].split('|');

		return {
			DUI: dataString === 'MQA' ? splittedRaw[3] : splittedRaw[4],
			dataString: splittedRaw[dataString.pos],
			version: splittedRaw[version.pos],
			firmwareVersion: splittedRaw[firmwareVersion.pos],
			status: splittedRaw[status.pos],
		};
	},

	parseAvgKey(key, avgType) {
		if (typeof key !== 'string') {
			throw new Error('Key must be an string');
		}

		const avgTypeConfigs = {
			'10mn': {
				length: 6,
				positions: {
					DUI: 0,
					year: 1,
					month: 2,
					day: 3,
					hour: 4,
					minute: 5,
				},
			},
			'1h': {
				length: 5,
				positions: {
					DUI: 0,
					year: 1,
					month: 2,
					day: 3,
					hour: 4,
				},
			},
			'1d': {
				length: 4,
				positions: {
					DUI: 0,
					year: 1,
					month: 2,
					day: 3,
				},
			},
		};

		const avgConfig = avgTypeConfigs[avgType];

		if (!avgConfig) {
			throw new Error('Invalid avg type');
		}

		const keyParts = key.split('!');

		if (!keyParts.length || avgConfig.length !== keyParts.length) {
			throw new Error('Invalid key format');
		}

		const positions = avgConfig.positions;

		return dayjs(0)
			.year(keyParts[positions.year])
			.month(keyParts[positions.month] - 1)
			.day(keyParts[positions.day])
			.hour(keyParts[positions.hour] || 0)
			.minute(keyParts[positions.minute] || 0)
			.toISOString();
	},
};
