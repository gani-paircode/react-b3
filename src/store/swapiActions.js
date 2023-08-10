import axios from "axios"; 
import { getAxiosErrorMessage, getErrorState, getLoadingState, getSuccessState } from "./helpers";

function getResourceName (url = '') {
    switch (url) {
        case url.includes('people'):
            return 'people'
        case url.includes('vehicles'):
            return 'vehicles'
        case url.includes('species'):
            return 'species'
            
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
    const fetchInstance = async (dataUrl) => {

    }

    const fetchList = async (resourceName, page) => {
        let dataUrl = '';
        if (page) {
            dataUrl = page;
        } else {
            dataUrl = `https://swapi.dev/api/${resourceName}/?page=1`;
        }
        
        try {
            set((oldState) => {
                const data = { ...oldState.data };
                const resource = { ...data[resourceName] };
                resource.req = getLoadingState();
                data[resourceName] = resource;
                const newState = { ...oldState, data };
                console.log('new state b4 loading', newState);
                return newState;
            });
            const { data: response } = await axios.get(dataUrl);
            set((oldState) => {
                const data = { ...oldState.data };
                const resource = { ...data[resourceName] };
                resource.req = getSuccessState();
                resource.records = resource.records.concat(response.results);
                resource.next = response.next;
                data[resourceName] = resource;
                
                console.log('resource.records ', resource.records);
                console.log('response.results ', response.results);
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
                console.log('new state b4 loading', newState);

                return newState;
            });
        } catch (error) {
            console.log('error ', error);
            const msg = getAxiosErrorMessage(error, `Something went wrong while fetching list of ${resourceName}`);
            set((oldState) => {
                const data = { ...oldState.data };
                const resource = { ...data[resourceName] };
                resource.req = getErrorState(msg);
                data[resourceName] = resource;
                const newState = { ...oldState, data }
                console.log('new state b4 loading', newState);

                return newState;
            });
        }
    }


    return {
        fetchList,
        fetchInstance
    }
}

