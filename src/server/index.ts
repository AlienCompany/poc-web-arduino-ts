import * as express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import * as io from 'socket.io';
import { Socket } from 'socket.io';
import * as SerialPort from 'serialport';
import { myLog } from './myLog';
import IoServer = io.Server;
import Readline = SerialPort.parsers.Readline;

const app: Express = express();
const server: Server = new Server(app);
const ioServer: IoServer = io(server);
const port: number = 8888;
const arduinoCom: string = 'COM6';
const usbPort: SerialPort = new SerialPort(arduinoCom);
const parser: Readline = usbPort.pipe(new Readline({delimiter: '\n'}));

// Describe the content of SrvEvent3 (good practice)
interface SrvEvent3 {
	nom: string;
	prenom: string;
	autrePrenom: string[];
	age: number;
}

function sendToArduino(data: string) {
	myLog('OUT Serial', 'A <- ' + data);
	usbPort.write(data);
}

function receiveArduinoLine(line: string): void {
	myLog('IN Serial', 'A -> ' + line);
}

function onClientConnection(client: Socket) {
	myLog('+ New socket!');

	client.on('customSrvEvent1', (data: string) => console.log('customSrvEvent1', data));
	client.on('customSrvEvent2', (data: { btn: number, input: string }) => console.log('customSrvEvent2', data));
	client.on('customSrvEvent3', (data: SrvEvent3) => {
		console.log('customSrvEvent3 from ' + data.prenom + ' ' + data.nom);
		console.log('Autre Prenom');
		for (let i = 0; i < data.autrePrenom.length; i++){
			console.log('\t- ' + data.autrePrenom[i]);
		}
		console.log('all data:', data);
	});

	client.on('disconnect', () => {
		myLog('- Socket disconnected!');
	});

	client.emit('customCliEvent1', 'test');
	client.emit('customCliEvent2', {myNum: 543210, myStr: 'abcde'});
}


function init() {
	server.listen(port, () => myLog('+ Server listen on port: ' + port));
	app.use(express.static(__dirname + '/public')); //requête sur le site redirigé vers le dossier public
	ioServer.on('connection', (socket: Socket) => onClientConnection(socket));
	parser.on('data', (line: string) => receiveArduinoLine(line));
}

init();