import { create } from "zustand";
import { getActions } from "./swapiActions";


export const useAppStore = create((set) => {
    const actions = getActions(set);
    const appState = {
        data: {
            people: getInitialState4Resource(),
            vehicles: getInitialState4Resource(),
            species: getInitialState4Resource(),
            resourcesById: {
                
            },
        },
        actions,
    };

    console.log('App State in store/index', appState);
    return appState;
});

function getInitialState4Resource () {
    return ({
        next: '',
        records: [],
        req: {}
    });
}