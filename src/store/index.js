import { create } from "zustand";
import { getActions } from "./actions";


export const useAppStore = create((set) => {
    const actions = getActions(set);
    const appState = {
        data: {
            admin: actions.getAdminData(),
            members: null,
        },
        actions,
    };

    console.log('App State in store/index', appState);
    return appState;
});