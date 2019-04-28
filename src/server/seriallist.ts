import * as SerialPort from 'serialport';

SerialPort.list((err, ports) => {
    console.log();
    if(ports.length){
        console.log('Voici la liste des ports séries trouvés :');
        ports.forEach((port) => console.log(' - ' + port.comName));
    }
    else if(err) {
        console.error(err.message);
    }else {
        console.log('Il n\'y a aucun appareil connecté en port série');
    }
});