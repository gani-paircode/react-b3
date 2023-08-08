import React from 'react';
import "./styles.css";
import { Routes, Route, Link, useParams } from 'react-router-dom';

import { useAppStore } from './store';

export default function App() {
  return (
    <div className="App">
      <div id="CommunityContainer">
        <div className="tabItems">
          <Link to="/people">People</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/vehicles">Vehicles</Link>
        </div>
        <div className="tabComponent">
          <Routes>
            <Route path="/people" element={<People />} />
            <Route path="/people/:id" element={<PeopleDetails />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:id" element={<VehiclesDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const People = () => {
  return (
    <div>
      All People
    </div>
  )
}

const PeopleDetails = () => {
  const { id } = useParams();
  return (
    <div>
      Details of People with {id}
    </div>
  )
}


const Vehicles = () => {
  return (
    <div>
      All Vehicles
    </div>
  )
}

const VehiclesDetails = () => {
  const { id } = useParams();
  return (
    <div>
      Details of Vehicle with {id}
    </div>
  )
}