import React, { useEffect, useMemo, useRef } from 'react';
import "./styles.css";
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useAppStore } from './store';
import When from './components/When';

export default function App() {
  return (
    <div className="App">
      <div id="CommunityContainer">
        <div className="tabItems">
          <Link to="/people">People</Link>
          <Link to="/vehicles">Vehicles</Link>
          <Link to="/species">Species</Link>
          <Link to="/films">Films</Link>
          <Link to="/starships">Starships</Link>
          <Link to="/planets">Planets</Link>
        </div>
        <div className="tabComponent">
          <Routes>
            <Route path="/:resource" element={<ResourceListWrapper />} />
            <Route path="/:resource/:id" element={<ResourceInstance />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const RetryAction = ({ message, retry }) => {
  return (<div>
    <div className='errMsg'>
      {errMsg}.
      Please click following button to retry
    </div>
    <button
      disabled={isLoading}
      onClick={retry}
    >
      Fetch Data
    </button>
  </div>)
}

// https://stackoverflow.com/a/73069241/2132002
const ResourceListWrapper = () => {
  const { resource: resourceName } = useParams();
  return (<ResourceList key={resourceName} />)
}

const ResourceList = () => {
  const { resource } = useParams();
  const { next, records, req } = useAppStore(state => state.data[resource]);
  const { fetchList } = useAppStore(state => state.actions);
  const noMoreRecords = records.length > 0 && Boolean(next) === false;
  const makeInitialFetch = records.length === 0 && !next && Object.keys(req).length === 0;
  const fetchCountRef = useRef(0);

  const fetchResourceList = React.useCallback(() => {
    fetchList(resource, next);
    fetchCountRef.current++;
  }, [resource, next]);

  useEffect(() => {
    if (fetchCountRef.current === 0 && makeInitialFetch) {
      fetchResourceList();
    }

  }, [fetchResourceList, makeInitialFetch])

  return (
    <div>
      {req.errMsg ? <RetryAction retry={fetchResourceList} message={req.errMsg} /> : ''}
      <div>
        <table style={{ width: '80vw' }}>
          <thead>
            <tr>
              <th className='column-sr-no'>Sr No</th>
              <th className='column-details'>Details</th>
              <th className='column-other-data'>Other Data</th>
            </tr>
          </thead>
          <tbody>
            {
              records.map((rec, index) => <ResourceRow resourceName={resource} key={rec.name + index} resource={rec} srNo={index + 1} />)
            }
          </tbody>
        </table>
        <button
          disabled={Boolean(req.isFetching) || noMoreRecords}
          onClick={fetchResourceList}
        >
          Fetch {resource}
        </button>
      </div>
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
  const keys = InfoKeysByResourceName[resourceName] || ['name'];

  return (<tr>
    <td>{srNo}</td>
    <td>
      <div>
        <ol>
          {
            keys.map(key => <li key={key}> {key}  -  {resource[key]}</li>)
          }
        </ol>
      </div>
    </td>
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

  const retry = () => fetchInstance(url, true);
  const { isFetching, errMsg, data } = urlData || {};
  const displayText = data?.title || data?.name;
  return (
    <div data-test-id={`instance_${resourceName}_${id}`}>
      {!urlData ? <div>{resourceName} - {id}</div> : null }
      <When isLoading={isFetching} retry={retry} errMsg={errMsg}>
        <div>
          <a
            className='mr-2'
            target='_blank'
            href={`http://images.google.com/images?um=1&hl=en&safe=active&nfpr=1&q=star+wars+${resourceName}+${displayText}`}>
            {displayText}
          </a>
          <Link to={`/${resourceName}/${id}`}>{id}</Link></div>)
      </When>
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
