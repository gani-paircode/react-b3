import axios from "axios"; 
import { getAxiosErrorMessage, getErrorState, getLoadingState, getSuccessState } from "./helpers";

function getResourceName (url = '') {
    switch (url) {
        case url.includes('people'):
            return 'people'
        case url.includes('vehicles'):
            return 'vehicles'
        default:
            return '';
    }
}

function getUniqResourceIdsFromRecords(records) {
    const res = {};
    const addToRes = (urls) => {
        urls.forEach(url => {
            res[url] = url;
        })
    };

    records.forEach(record => {
        const vehicles = record.vehicles || [];
        const films = record.films || [];
        const species = record.species || [];
        const starships = record.starships || [];
        const planets = record.planets || [];
        const people = record.characters || [];
        const pilots = record.pilots || [];

        addToRes(vehicles);
        addToRes(films);
        addToRes(species);
        addToRes(starships);
        addToRes(planets);
        addToRes(people);
        addToRes(pilots);
    })
    
    return Object.keys(res);
}

export const getActions = (set) => {
    const fetchById = async (dataUrl) => {

    }

    const fetchData = async (dataUrl) => {
        const resourceName = getResourceName(dataUrl);
        try {
            set((oldState) => {
                const data = { ...oldState.data };
                data[resourceName].req = getLoadingState();
                const newState = { ...oldState, data }
                return newState;
            });
            const { data: response } = await axios.get(dataUrl);
            set((oldState) => {
                const data = { ...oldState.data };
                const resource = { ...data[resourceName] };
                resource.req = getSuccessState();
                resource.records = resource.records.push(...response.results);
                resource.next = response.next;
                data[resourceName] = resource;
                
                resource.records.forEach((rec, index) => {
                    data.resourcesById = {
                        ...data.resourcesById,
                        [`https://swapi.dev/api/${resourceName}/${index+1}/`]: getSuccessState(rec),
                    }
                })
                
                const resourceIdURLs = getUniqResourceIdsFromRecords(response.results);

                resourceIdURLs.forEach(url => {
                    data.resourcesById[url] = data.resourcesById[url] || getLoadingState();
                });

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


    return {
        fetchData,
        fetchById
    }
}

