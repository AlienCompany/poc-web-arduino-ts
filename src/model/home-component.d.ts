//Note personnelle: ce fichier definie le model des données.

//Note personnelle: fichier .d.ts n'est pas compiler, il contient que des types


/**
 * HomeComponent contient les elements HTML nécessaire à la modification de la page et le status du composant
 */
export interface HomeComponent {
    /**
     * state correspond à état du bouton
     */
    state: boolean | null;
    /**
     * room correspond à la pièce dans laquelle se situe le component
     */
    room: Element;
    /**
     * component correspond au composant de la maison dont l'on veut modifier l'état
     */
    component: Element;
    btnOn: HTMLButtonElement;
    btnOff: HTMLButtonElement;
}
//Note personnelle : interface/type décrit le type d'un objet, exemple ici HomeComponent deviens un type

export interface HomeComponentStatus {
    state: boolean;
    roomName: string;
    componentName: string;
}