"use strict";
exports.__esModule = true;
var defaultState = true;
var urlServerIo = 'http://localhost:8888';
/**
 * HomeComponent contient les elements HTML nécessaire à la modification de la page et le status du composant
 */
// noinspection JSUnusedLocalSymbols
function init() {
    var socket = io.connect(urlServerIo);
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
    homeComponents.forEach(function (component) {
        var btnOn = component.btnOn;
        var btnOff = component.btnOff;
        btnOn.onclick = function () {
            console.log("On : componentId = ", component.component.id);
        };
        btnOff.onclick = function () {
            console.log("Off : componentId = ", component.component.id);
        };
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQzFCLElBQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0FBRTVDOztHQUVHO0FBS0gsb0NBQW9DO0FBQ3BDLFNBQVMsSUFBSTtJQUNULElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdkM7OztPQUdHO0lBQ0gsSUFBTSxjQUFjLEdBQW9CLGlCQUFpQixFQUFFLENBQUM7SUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUUvQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVwQyxRQUFRO0lBQ1IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsT0FBTztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLElBQUk7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsaUJBQWlCO0lBRXRCOztPQUVHO0lBQ0gsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXRELElBQU0sY0FBYyxHQUFvQixFQUFFLENBQUM7SUFFM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWhFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBRXhDLElBQU0sU0FBUyxHQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFNLElBQUksR0FBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBTSxLQUFLLEdBQXNCLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQXNCLENBQUM7WUFDaEcsSUFBTSxNQUFNLEdBQXNCLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQXNCLENBQUM7WUFDbEcsNkVBQTZFO1lBQzdFLHlHQUF5RztZQUV6RyxJQUFJLGFBQWEsR0FBa0I7Z0JBQy9CLElBQUksRUFBRSxJQUFJO2dCQUNWLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQztZQUNGLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FFdEM7S0FDSjtJQUNELE9BQU8sY0FBYyxDQUFDO0FBQzFCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLG1CQUFtQixDQUFDLGNBQStCO0lBRXhELGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUF3QjtRQUU1QyxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFaEMsS0FBSyxDQUFDLE9BQU8sR0FBRztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUM5RCxDQUFDLENBQUM7UUFDRixNQUFNLENBQUMsT0FBTyxHQUFHO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQy9ELENBQUMsQ0FBQztJQUVOLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyJ9