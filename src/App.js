import React, { useEffect, useRef } from 'react';
import "./styles.css";
import { Routes, Route, Link, useParams } from 'react-router-dom';
import When from './components/When';
import { useAppStore } from './store';

export default function App() {
  return (
    <div className="App">
      <div id="CommunityContainer">
        <div className="tabItems">
          <Link to="/people">People</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/vehicles">Vehicles</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/species">Species</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div className="tabComponent">
          <Routes>
            <Route path="/:resource" element={<ResourceList />} />
            <Route path="/:resource/:id" element={<ResourceInstance />} />
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
  console.log({
    resource,
    req,
    records
  });
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
      <ol>
      {
        records.map((rec, index) => <li key={rec.name + index}>{rec.name}</li>)
      }
      </ol>
    </div>
  )
}

const ResourceInstance = () => {
  return (
    <div>
      All People
    </div>
  )
}
