import { cleanInput } from './repl';
import { describe, expect, test } from "vitest";

describe.each([
	{
		input: 'Hello world!',
		expected: ['Hello', 'world!']
	},
	{
		input: ' Hi,      Dima   how are you?    ',
		expected: ['Hi,', 'Dima', 'how', 'are', 'you?']
	},
	{
		input: '         O laaa     Ola           !',
		expected: ['O', 'laaa', 'Ola','!']
	},
])("cleanInput($input)", ({input, expected}) => {
	test(`Expected: ${expected}`, () => {
		const result = cleanInput(input);

		expect(result).toHaveLength(expected.length);

		for (let i = 0; i < result.length; i++) {
			expect(result[i]).toBe(expected[i])
		}
	})

})

