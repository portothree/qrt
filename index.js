'use strict';
const { deg2rad, rad2deg } = require('./utils.js');

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
};
