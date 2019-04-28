"use strict";
exports.__esModule = true;
var SerialPort = require("serialport");
SerialPort.list(function (err, ports) {
    console.log();
    if (ports.length) {
        console.log('Voici la liste des ports séries trouvés :');
        ports.forEach(function (port) { return console.log(' - ' + port.comName); });
    }
    else if (err) {
        console.error(err.message);
    }
    else {
        console.log('Il n\'y a aucun appareil connecté en port série');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcmlhbGxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFFekMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBRSxLQUFLO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUcsS0FBSyxDQUFDLE1BQU0sRUFBQztRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7S0FDOUQ7U0FDSSxJQUFHLEdBQUcsRUFBRTtRQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzlCO1NBQUs7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7S0FDbEU7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9