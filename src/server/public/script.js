"use strict";
exports.__esModule = true;
var defaultState = true;
var urlServerIo = 'http://localhost:8888';
var socket;
// noinspection JSUnusedLocalSymbols
function init() {
    socket = io.connect(urlServerIo);
    /**
     * homeComponents est la liste de tous les {@link HomeComponent composants} connectés de la maison
     *
     */
    var homeComponents = getHomeComponents();
    console.log("homeComponent =", homeComponents);
    initButtonListerner(homeComponents);
    //Listen
    socket.on('connect', function () {
        console.log("connect");
    });
    socket.on('disconnect', function () {
        console.log("disconnect");
    });
    socket.on('customCliEvent1', function (message) {
        console.log("customCliEvent1", message);
    });
    socket.on('customCliEvent2', function (data) {
        console.log(data);
    });
}
/**
 * getHomeComponents Récupère la liste des composants
 */
function getHomeComponents() {
    /**
     * rooms est la liste de toutes les pièces de la maison
     */
    var rooms = document.getElementsByClassName('room');
    var homeComponents = [];
    for (var i = 0; i < rooms.length; i++) {
        var components = rooms[i].getElementsByClassName("component");
        for (var j = 0; j < components.length; j++) {
            var component = components[j];
            var room = rooms[i];
            var btnOn = component.getElementsByClassName("on")[0];
            var btnOff = component.getElementsByClassName("off")[0];
            // Note personnelle : component.getElementsByClasseName() retourne un tableau
            // Note personnelle n°2 : as HTMLButtonElement cast component.getElementsByClassName en HTMLButtonElement
            var homeComponent = {
                room: room,
                component: component,
                state: defaultState,
                btnOn: btnOn,
                btnOff: btnOff
            };
            homeComponents.push(homeComponent);
        }
    }
    return homeComponents;
}
/**
 * initButtonListerner initialise les fonctions appelées lorsqu'on click sur les boutons
 * @param homeComponents
 */
function initButtonListerner(homeComponents) {
    homeComponents.forEach(function (homeComponent) {
        var btnOn = homeComponent.btnOn;
        var btnOff = homeComponent.btnOff;
        btnOn.onclick = function () {
            var componentStatus = {
                state: true,
                roomName: homeComponent.room.id,
                componentName: homeComponent.component.id
            };
            console.log("On : componentId = ", homeComponent.component.id);
            socket.emit("srvEventBtnClick", componentStatus);
        };
        btnOff.onclick = function () {
            var componentStatus = {
                state: false,
                roomName: homeComponent.room.id,
                componentName: homeComponent.component.id
            };
            console.log("Off : componentId = ", homeComponent.component.id);
            socket.emit("srvEventBtnClick", componentStatus);
        };
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQzFCLElBQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0FBQzVDLElBQUksTUFBYyxDQUFFO0FBRXBCLG9DQUFvQztBQUNwQyxTQUFTLElBQUk7SUFFVCxNQUFNLEdBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVsQzs7O09BR0c7SUFDSCxJQUFNLGNBQWMsR0FBb0IsaUJBQWlCLEVBQUUsQ0FBQztJQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRS9DLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXBDLFFBQVE7SUFDUixNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxPQUFPO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsSUFBSTtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxpQkFBaUI7SUFFdEI7O09BRUc7SUFDSCxJQUFNLEtBQUssR0FB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