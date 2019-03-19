export function myLog(msg: string, msg2 ?: string) {
	const time = new Date().toLocaleDateString('en-GB');
	if (msg2) {
		msg += ' ';
		while (msg.length < 30) {
			msg += '.';
		}
		msg += ' ' + msg2;
	}
	console.log(`[${time}] ${msg}`);
}
