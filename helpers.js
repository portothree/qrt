module.exports = {
	/**
	 * Box helper object
	 * @type {Object}
	 * @param {{ pos: number, trans: string, cond: array }} Position, Transformation and Condition
	 *
	 */
	device: {
		info: {
			header: { pos: 0, value: 'QART' },
			dataString: {
				pos: 1,
				values: ['v2018.1', 'MQA'],
			},
			version: {
				pos: 2,
			},
			firmwareVersion: {
				pos: 3,
			},
			dui: {
				pos: 4,
			},
			status: { pos: 5, value: 'OK' },
		},

		// Sensor Limits
		sensors: {
			coSL: {
				pos: 6,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},
			coSLcontrol: {
				pos: 7,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},

			o3SL: {
				pos: 8,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},
			o3SLcontrol: {
				pos: 9,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},

			noSL: {
				pos: 19,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},
			noSLcontrol: {
				pos: 11,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},

			no2SL: {
				pos: 12,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},
			no2SLcontrol: {
				pos: 13,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},

			so2SL: {
				pos: 14,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},
			so2SLcontrol: {
				pos: 15,
				cond: [
					{ op: '<', value: '0' },
					{ op: '>', value: '5000' },
				],
			},
		},

		// Pipes
		pipes: {
			pos: 28,
			content: {
				batteryVoltage: { pos: 0, trans: { op: '/', value: 10 } },
				boardFirmwareVersion: { pos: 1 },
				firmwareDate: { pos: 2 },
				powerMode: { pos: 3 },
				gsmSignal: { pos: 4 },
				gsmModem: { pos: 5 },
				windSpeed: { pos: 6, trans: { op: '/', value: 100 } },
				windDirection: { pos: 7, trans: { op: '*', value: 1 } },
				temperature: { pos: 8, trans: { op: '/', value: 10 } },
				humidity: { pos: 9, trans: { op: '/', value: 10 } },
				pressure: { pos: 10, trans: { op: '/', value: 10 } },
				precipitation: { pos: 11, trans: { op: '*', value: 1 } },
				precipitationCounter: { pos: 12 },
				postCode: { pos: 13 },
			},
		},
	},
};
