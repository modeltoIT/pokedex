import { State } from './state.js'

export async function startREPL(state: State) { 
	const { rl, commands } = state;

	rl.prompt();

	rl.on("line", async (command: string) => {
		if (!command) {
			rl.prompt();
			
			return;
		}

		const [cmd, ...arg] = cleanInput(command);

		const registeredCommand = commands[cmd];

		if (!registeredCommand) {
			console.log('Unknown command');
			
			rl.prompt();

			return;
		}
	
		try {
			await registeredCommand.callback(state, ...arg);
		} catch (error) {
			console.log(error);
		}

		rl.prompt();
	});
}

export function cleanInput(input: string): string[] {
	return input.trim().split(' ').map(word => word.trim()).filter(word => word);
}
