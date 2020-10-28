const { windDirectionMean } = require('./index');

describe('Air Quality Toolki', () => {
	describe('Wind Direction Mean', () => {
		test('Throws if non array is passed as input', () => {
			expect(() => windDirectionMean('random')).toThrow();
		});
		test('Return the right mean', () => {
			expect(windDirectionMean([360, 45, 90])).toEqual(45);
		});
	});
});
