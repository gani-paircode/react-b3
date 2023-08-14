import React, { useRef } from 'react';
import "./styles.css";
import { Routes, Route, Link, useParams } from 'react-router-dom';
import When from './components/When';
import { useAppStore } from './store';
import { getUniqResourceIdsFromRecords } from './store/helpers';

export default function App() {
  return (
    <div className="App">
      <div id="CommunityContainer">
        <div className="tabItems">
          <Link to="/people">People</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/vehicles">Vehicles</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/species">Species</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/films">Films</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/starships">Starships</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/planets">Planets</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div className="tabComponent">
          <Routes>
            <Route path="/:resource" element={<ResourceList />} />
            <Route path="/:resource/:id" element={<ResourceInstance key={location.pathname} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const ResourceList = () => {
  const { resource } = useParams();
  const { next, records, req } = useAppStore(state => state.data[resource]);
  const { fetchList } = useAppStore(state => state.actions);
  const noMoreRecords = records.length > 0 && Boolean(next) === false;

  return (
    <div>
      <button
        disabled={Boolean(req.isFetching) || noMoreRecords}
        onClick={() => fetchList(resource, next)}
      >
        Fetch {resource}
      </button>
      <br />
      <br />
      <h3>Resource - {resource}</h3>
      <h3>Next - {next}</h3>
      <h3>Records Length - {records.length} - {noMoreRecords ? 'Yeyyy... All records are fetched' : ''}</h3>
      <h3>Req State - {JSON.stringify(req)}</h3>
      <When
        isLoading={Boolean(req.isFetching)}
        errMsg={req.errMsg || ''}
        retry={() => fetchList(resource, next)}
      >
        <h2>Success</h2>
      </When>
      <br />
      <br />
      <table style={{ width: '80vw' }}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Details</th>
            <th>Other Data</th>
          </tr>
        </thead>
        <tbody>
          {
            records.map((rec, index) => <ResourceRow resourceName={resource} key={rec.name + index} resource={rec} srNo={index + 1} />)
          }
        </tbody>
      </table>
    </div>
  )
}

const InfoKeysByResourceName = {
  films: ['title', 'director'],
  people: ['name', 'height', 'birth_year'],
  species: ['name', 'language'],
};

/* Proptype to be added by students */
const ResourceRow = ({ resource, srNo, resourceName }) => {

  return (<tr>
    <td>{srNo}</td>
    <td><pre>{JSON.stringify(resource, "", 2)}</pre></td>
    <td><OtherDataList resource={resource} /></td>
  </tr>)
}

function getResourceIdFromUrl(url = '') {
  const parts = url.split("/");
  return { id: parts[parts.length - 2], resourceName: parts[parts.length - 3] };
}

const OtherDataItem = ({ url }) => {
  const resourcesById = useAppStore(state => state.data.resourcesById);
  const fetchInstance = useAppStore(state => state.actions.fetchInstance);
  const urlData = resourcesById[url];
  const { id, resourceName } = getResourceIdFromUrl(url);

  if (!urlData) {
    return (<div> :( &nbsp;&nbsp;&nbsp; {id}</div>);
  }
  const retry = () => fetchInstance(url, true);
  return (
    <div>
      {urlData.isFetching ? <div>Loading !! &nbsp;&nbsp;&nbsp; {id}</div> : null}
      {urlData.errMsg ? <div style={{ color: 'red' }}>
        {urlData.errMsg} &nbsp;&nbsp;&nbsp; <span onClick={retry}>Retry</span> &nbsp;&nbsp; {id} </div> : null}
      {!urlData.isFetching && !urlData.errMsg && urlData.data ?
        (<div> <Link to={`/${resourceName}/${id}`}>{urlData.data['name'] || urlData.data['title']} &nbsp;&nbsp;&nbsp; {id} </Link></div>)
        : null
      }

    </div>
  )
}

const OtherDataList = ({ resource }) => {
  const myMap = [
    { key: 'films', title: 'Films' },
    { key: 'people', title: 'People' },
    { key: 'species', title: 'Species' },
    { key: 'vehicles', title: 'Vehicles' },
    { key: 'starships', title: 'Starships' },
    { key: 'pilots', title: 'Pilots' },
    { key: 'characters', title: 'Characters' }
  ];

  const filteredKeys = myMap.filter(({ key }) => resource[key] !== undefined);

  return (
    <div>
      {
        filteredKeys.map(({ title, key }) => {
          return (<div key={key} className='otherDataItemListContainer'>
            <h3>{title}</h3>
            <ol>
              {
                resource[key].map(url => <OtherDataItem key={url} url={url} />)
              }
            </ol>
          </div>)
        })
      }
    </div>
  )
}
function getResourceInstanceUrl(resource, id) {
  return `https://swapi.dev/api/${resource}/${id}/`
}
const ResourceInstance = () => {
  const { resource, id } = useParams();
  const resourcesById = useAppStore(state => state.data.resourcesById);
  const fetchInstance = useAppStore(state => state.actions.fetchInstance);
  const url = getResourceInstanceUrl(resource, id);
  const currentResource = resourcesById[url];
  const countRef = useRef(0);
  React.useEffect(() => {
    if (countRef.current === 0) {
      if (!currentResource) {
        fetchInstance(url, true);
      }
    }
    countRef.current++;
  }, [currentResource]);

  const { isFetching, errMsg, data } = currentResource || {};

  React.useEffect(() => {
    if (data) {
      const urls = getUniqResourceIdsFromRecords([data]);
      urls.forEach(url => {
        if (resourcesById[url] === undefined) {
          fetchInstance(url, true);
        }
      });
    }
  }, [data, resourcesById])

  return (
    <div>
      {isFetching ? <h3>Fetching !!!!</h3> : null}
      {errMsg ? <h3>{errMsg}</h3> : null}
      {data ? (<div style={{ display: 'flex' }}>
        <div>
          <pre>
            {data['name'] || data['title']}
          </pre>
        </div>
        <div>
          {<OtherDataList resource={data} />}
        </div>
      </div>) : null}
    </div>
  )
}
