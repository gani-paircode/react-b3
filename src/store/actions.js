import { doLogin } from "./service/auth"
import { fetchUserById, fetchUsers, createUser } from "./service/members";
import { getAxiosErrorMessage, getErrorState, getLoadingState, getSuccessState } from "./helpers";
import { getAdminNumberFromLocal, resetAuthHeaders, setAuthHeaders } from "./service/helper";

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
            set((oldState) => {
                const data = { ...oldState.data };
                data.admin = getLoadingState();
                resetAuthHeaders();
                const newState = { ...oldState, data }
                return newState;
            });
            const { data: user } = await doLogin(id, pass);
            set((oldState) => {
                const data = { ...oldState.data };
                data.admin = getSuccessState(user.phoneNumber);
                const newState = { ...oldState, data }
                setAuthHeaders(user.phoneNumber, user.loginToken);
                return newState;
            });
        } catch (error) {
            const msg = getAxiosErrorMessage(error, 'Something went wrong while doing login');
            set((oldState) => {
                const data = { ...oldState.data };
                data.admin = getErrorState(msg);
                const newState = { ...oldState, data }
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
                return newState;
            });
            const { data: membersById } = await fetchUserById(id);
            set((oldState) => {
                const data = { ...oldState.data };
                data.membersById[id] = getSuccessState(membersById);
                const newState = { ...oldState, data }
                return newState;
            });
        } catch (error) {
            const msg = getAxiosErrorMessage(error, 'Something went wrong while fetching member');
            set((oldState) => {
                const data = { ...oldState.data };
                data.membersById[id] = getErrorState(msg);
                const newState = { ...oldState, data }
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
                return newState;
            });
            const { data: members } = await fetchUsers();
            set((oldState) => {
                const data = { ...oldState.data };
                data.members = getSuccessState(members);
                const newState = { ...oldState, data }
                return newState;
            });
        } catch (error) {
            const msg = getAxiosErrorMessage(error, 'Something went wrong while fetching members');
            set((oldState) => {
                const data = { ...oldState.data };
                data.members = getErrorState(msg);
                const newState = { ...oldState, data }
                return newState;
            });
        }
    }

    const createMember = async (data) => {
        try {
            set((oldState) => {
                const data = { ...oldState.data };
                data.addUser = getLoadingState();
                const newState = { ...oldState, data }
                return newState;
            });
            const { data: user } = await createUser(data);
            set((oldState) => {
                const data = { ...oldState.data };
                data.addUser = getSuccessState(user);
                data.membersById[user.id] = user;
                const newState = { ...oldState, data }
                return newState;
            });
        } catch (error) {
            const msg = getAxiosErrorMessage(error, 'Something went wrong while creating member');
            set((oldState) => {
                const data = { ...oldState.data };
                data.addUser = getErrorState(msg);
                const newState = { ...oldState, data }
                return newState;
            });
        }
    }

    const resetCreateMember = () => {
        set((oldState) => {
            const data = { ...oldState.data };
            data.addUser = null;
            const newState = { ...oldState, data }
            return newState;
        });
    }

    const logMeOut = async () => {
        try {
            set((oldState) => {
                const data = { ...oldState.data };
                data.logout = getLoadingState();
                const newState = { ...oldState, data }
                return newState;
            });
            setTimeout(() => {
                set((oldState) => {
                    const data = { ...oldState.data };
                    data.logout = getSuccessState(true);
                    data.admin = null;
                    resetAuthHeaders();
                    const newState = { ...oldState, data }
                    return newState;
                });    
            }, 500);
            
        } catch (error) {
            const msg = getAxiosErrorMessage(error, 'Something went wrong while doing logout');
            set((oldState) => {
                const data = { ...oldState.data };
                data.logout = getErrorState(msg);
                const newState = { ...oldState, data }
                return newState;
            });
        }
    }
    return {
        login,
        getMembers,
        getAdminData,
        fetchMemberById,
        createMember,
        resetCreateMember,
        logMeOut
    }
}