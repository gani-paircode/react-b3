import { doLogin } from "./service/auth"
import { fetchUserById, fetchUsers, createUser } from "./service/members";
import _get from 'lodash/get';
import { getAxiosErrorMessage, getErrorState, getLoadingState, getSuccessState } from "./helpers";
import { getAdminNumberFromLocal } from "./service/helper";

export const getActions = (set) => {
    
    const getAdminData = () => {
        const adminNumber = getAdminNumberFromLocal();
        if (adminNumber) {
            return getSuccessState(adminNumber);
        }
        return null;
    }


    const login = async (id, pass) => {
        try {
            console.log('in login action ');
            set((oldState) => {
                const data = { ...oldState.data };
                data.admin = getLoadingState();
                const newState = { ...oldState, data }
                console.log('new data vs old data ', { newState, oldState });
                return newState;
            });
            const { data: user } = await doLogin(id, pass);
            set((oldState) => {
                const data = { ...oldState.data };
                data.admin = getSuccessState(user.phoneNumber);
                const newState = { ...oldState, data }
                console.log('new data vs old data after login success ', { newState, oldState });
                localStorage.setItem('admin', JSON.stringify(user));
                return newState;
            });
            console.log('login api response..  ', user);
        } catch (error) {
            console.log('err in try ', error);
            const msg = getAxiosErrorMessage(error, 'Something went wrong while doing login');
            set((oldState) => {
                const data = { ...oldState.data };
                data.admin = getErrorState(msg);
                const newState = { ...oldState, data }
                localStorage.removeItem('admin');
                console.log('new data vs old data ', { newState, oldState });
                return newState;
            });
        }
    }

    const fetchMemberById = async (id) => {
        try {
            set((oldState) => {
                const data = { ...oldState.data };
                data.membersById[id] = getLoadingState();
                const newState = { ...oldState, data }
                console.log('new data vs old data in fetchMemberById ', { newState, oldState });
                return newState;
            });
            const { data: membersById } = await fetchUserById(id);
            set((oldState) => {
                const data = { ...oldState.data };
                data.membersById[id] = getSuccessState(membersById);
                const newState = { ...oldState, data }
                console.log('new data vs old data in fetchMemberById', { newState, oldState });
                return newState;
            });
        } catch (error) {
            const msg = getAxiosErrorMessage(error, 'Something went wrong while fetching members');
            set((oldState) => {
                const data = { ...oldState.data };
                data.membersById[id] = getErrorState(msg);
                const newState = { ...oldState, data }
                console.log('new data vs old data in fetchMemberById', { newState, oldState });
                return newState;
            });
        }
    }

    const getMembers = async () => {
        try {
            set((oldState) => {
                const data = { ...oldState.data };
                data.members = getLoadingState();
                const newState = { ...oldState, data }
                console.log('new data vs old data ', { newState, oldState });
                return newState;
            });
            const { data: members } = await fetchUsers();
            set((oldState) => {
                const data = { ...oldState.data };
                data.members = getSuccessState(members);
                const newState = { ...oldState, data }
                console.log('new data vs old data ', { newState, oldState });
                return newState;
            });
        } catch (error) {
            const msg = getAxiosErrorMessage(error, 'Something went wrong while fetching members');
            set((oldState) => {
                const data = { ...oldState.data };
                data.members = getErrorState(msg);
                const newState = { ...oldState, data }
                console.log('new data vs old data ', { newState, oldState });
                return newState;
            });
        }
    }


    const createMember = async (data) => {
        try {
            console.log('in login action ');
            set((oldState) => {
                const data = { ...oldState.data };
                data.addUser = getLoadingState();
                const newState = { ...oldState, data }
                console.log('new data vs old data ', { newState, oldState });
                return newState;
            });
            const { data: user } = await createUser(data);
            set((oldState) => {
                const data = { ...oldState.data };
                data.addUser = getSuccessState(user);
                data.membersById[user.id] = user;
                const newState = { ...oldState, data }
                console.log('new data vs old data after login success ', { newState, oldState });
                return newState;
            });
            console.log('login api response..  ', user);
        } catch (error) {
            console.log('err in try ', error);
            const msg = getAxiosErrorMessage(error, 'Something went wrong while doing login');
            set((oldState) => {
                const data = { ...oldState.data };
                data.addUser = getErrorState(msg);
                const newState = { ...oldState, data }
                console.log('new data vs old data ', { newState, oldState });
                return newState;
            });
        }
    }

    const resetCreateMember = () => {
        set((oldState) => {
            const data = { ...oldState.data };
            data.addUser = null;
            const newState = { ...oldState, data }
            console.log('new data vs old data in resetCreateMember', { newState, oldState });
            return newState;
        });
    }

    return {
        login,
        getMembers,
        getAdminData,
        fetchMemberById,
        createMember,
        resetCreateMember,
    }
}