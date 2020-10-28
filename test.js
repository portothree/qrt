const { windDirectionMean } = require('./index');

describe('Air Quality Toolki', () => {
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
});
