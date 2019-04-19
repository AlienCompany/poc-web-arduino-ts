"use strict";
exports.__esModule = true;
var express = require("express");
var http_1 = require("http");
var io = require("socket.io");
var SerialPort = require("serialport");
var myLog_1 = require("./myLog");
var Readline = SerialPort.parsers.Readline;
var app = express();
var server = new http_1.Server(app);
var ioServer = io(server);
var port = 8888;
var arduinoCom = 'COM16';
var usbPort = new SerialPort(arduinoCom, { baudRate: 115200 });
var parser = usbPort.pipe(new Readline({ delimiter: '\n' }));
function sendToArduino(data) {
    myLog_1.myLog('OUT Serial', 'A <- ' + data);
    data = data + '\n';
    usbPort.write(data);
}
function receiveArduinoLine(line) {
    myLog_1.myLog('IN Serial', 'A -> ' + line);
}
function onClientConnection(client) {
    myLog_1.myLog('+ New socket!');
    client.on('srvEventBtnClick', function (data) {
        console.log('srvEventBtnClick', data);
        sendToArduino('change,' + data.roomName + ',' + data.componentName + ',' + data.state);
    });
    client.on('disconnect', function () {
        myLog_1.myLog('- Socket disconnected!');
    });
    //client.emit('customCliEvent1', 'test');
    //client.emit('customCliEvent2', {myNum: 543210, myStr: 'abcde'});
}
function init() {
    server.listen(port, function () { return myLog_1.myLog('+ Server listen on port: ' + port); });
    app.use(express.static(__dirname + '/public')); //requête sur le site redirigé vers le dossier public
    ioServer.on('connection', function (socket) { return onClientConnection(socket); });
    parser.on('data', function (line) { return receiveArduinoLine(line); });
}
init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFtQztBQUVuQyw2QkFBOEI7QUFDOUIsOEJBQWdDO0FBRWhDLHVDQUF5QztBQUN6QyxpQ0FBZ0M7QUFFaEMsSUFBTyxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFHOUMsSUFBTSxHQUFHLEdBQVksT0FBTyxFQUFFLENBQUM7QUFDL0IsSUFBTSxNQUFNLEdBQVcsSUFBSSxhQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsSUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLElBQU0sSUFBSSxHQUFXLElBQUksQ0FBQztBQUMxQixJQUFNLFVBQVUsR0FBVyxPQUFPLENBQUM7QUFDbkMsSUFBTSxPQUFPLEdBQWUsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7QUFDM0UsSUFBTSxNQUFNLEdBQWEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFFdkUsU0FBUyxhQUFhLENBQUMsSUFBWTtJQUNsQyxhQUFLLENBQUMsWUFBWSxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLElBQVk7SUFDdkMsYUFBSyxDQUFDLFdBQVcsRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsTUFBYztJQUN6QyxhQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFdkIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBQyxVQUFDLElBQXlCO1FBRXRELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFeEYsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtRQUN2QixhQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILHlDQUF5QztJQUN6QyxrRUFBa0U7QUFDbkUsQ0FBQztBQUdELFNBQVMsSUFBSTtJQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxhQUFLLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQztJQUNyRSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxREFBcUQ7SUFDckcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxNQUFjLElBQUssT0FBQSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBWSxJQUFLLE9BQUEsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUMifQ==