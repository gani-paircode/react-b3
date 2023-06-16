import React from 'react';
import "./styles.css";
import MemoisedDemo from './components/memoisedDemo';
import EmpTable from './components/empTable';

export default function App() {

  return (
    <div className="App">
      <h1>Date : June 16, 2023 </h1>
      <MemoisedDemo />
      <EmpTable />
    </div>
  );
}
