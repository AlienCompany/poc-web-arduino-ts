import {HomeComponent, HomeComponentStatus} from "../../model/home-component";
import Socket = SocketIOClient.Socket;

const urlServerIo = 'http://localhost:8888';
let socket: Socket;

// noinspection JSUnusedLocalSymbols
function init() {

    socket = io.connect(urlServerIo);

    /**
     * homeComponents est la liste de tous les {@link HomeComponent composants} connectés de la maison
     *
     */
    const homeComponents: HomeComponent[] = getHomeComponents();
    console.log("homeComponent =", homeComponents);

    initButtonListerner(homeComponents);

    //Listen
    socket.on('connect', () => {
        console.log("connect");
        socket.emit('getState');
        document.body.classList.remove('offline');
        document.body.classList.add('online');
    });

    socket.on('onReceiveComponentsStates', (data: HomeComponentStatus) => {

        const hc = homeComponents.find((homeComponent) =>
            homeComponent.room.id === data.roomName && homeComponent.component.id === data.componentName);

        if (hc != null) {
            
            if (hc.state !== data.state) {
                hc.state = data.state;
                if (hc.state) {
                    hc.component.classList.add('enable');
                } else {
                    hc.component.classList.remove('enable');
                }
            }
        }
    });

    socket.on('disconnect', () => {
        console.log("disconnect");
        document.body.classList.remove('online');
        document.body.classList.add('offline');
    });

}

/**
 * getHomeComponents Récupère la liste des composants
 */
function getHomeComponents(): HomeComponent[] {

    /**
     * rooms est la liste de toutes les pièces de la maison
     */
    const rooms = document.getElementsByClassName('room');

    const homeComponents: HomeComponent[] = [];

    for (let i = 0; i < rooms.length; i++) {
        const components = rooms[i].getElementsByClassName("component");

        for (let j = 0; j < components.length; j++) {

            const component: Element = components[j];
            const room: Element = rooms[i];
            const btnOn: HTMLButtonElement = component.getElementsByClassName("on")[0] as HTMLButtonElement;
            const btnOff: HTMLButtonElement = component.getElementsByClassName("off")[0] as HTMLButtonElement;
            // Note personnelle : component.getElementsByClasseName() retourne un tableau
            // Note personnelle n°2 : as HTMLButtonElement cast component.getElementsByClassName en HTMLButtonElement

            let homeComponent: HomeComponent = {
                room: room,
                component: component,
                state: null,
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
function initButtonListerner(homeComponents: HomeComponent[]): void {

    homeComponents.forEach((homeComponent: HomeComponent) => {

        const btnOn = homeComponent.btnOn;
        const btnOff = homeComponent.btnOff;

        btnOn.onclick = () => {

            const componentStatus: HomeComponentStatus = {
                state: true,
                roomName: homeComponent.room.id,
                componentName: homeComponent.component.id
            };

            console.log("On : componentId = ", homeComponent.component.id);
            socket.emit("srvEventBtnClick", componentStatus);

        };
        btnOff.onclick = () => {

            const componentStatus: HomeComponentStatus = {
                state: false,
                roomName: homeComponent.room.id,
                componentName: homeComponent.component.id
            };

            console.log("Off : componentId = ", homeComponent.component.id);
            socket.emit("srvEventBtnClick", componentStatus);

        };

    });

}






