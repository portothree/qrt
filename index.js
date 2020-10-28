'use strict';
const { deg2rad, rad2deg } = require('./utils.js');

module.exports = {
	/**
	 * @param {array} directions
	 * @return {number}
	 *
	 * @example
	 *
	 *	avgWind([180, 345, 90])
	 */
	windDirectionMean: input => {
		if (!Array.isArray(input)) {
			throw new TypeError(`Expected a array, got ${typeof input}`);
		}

		let sinSum = 0;
		let cosSum = 0;

		input.forEach(direction => {
			sinSum += Math.sin(deg2rad(direction));
			cosSum += Math.cos(deg2rad(direction));
		});

		return (rad2deg(Math.atan2(sinSum, cosSum)) + 360) % 360;
	},
};
