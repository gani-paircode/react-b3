import React from 'react';
import { ASC_ORDER, DESC_ORDER, SortOrders } from './contants';
import { Button } from '../Button/button';
import { MemoisedNamesList, NamesList } from './NamesList';

export const MemoisedDemo = () => {
    const [myState, setMyState] = React.useState({
        name: '',
        number: Math.random(),
        names: [],
        order: SortOrders[0].value,
    });

    const addName = () => setMyState({ ...myState, name: '', names: [...myState.names, myState.name]   });

    return (
        <div id='memoisedDataEntryForm'>
            <div>
                <div style={{ marginBottom: '1rem'}}>
                    <label>Random Number : {myState.number}</label>
                    <Button onClick={() => {
                        setMyState({ ...myState, number: Math.random() });
                    }} variant="danger" >Click Me To Generate Random Number</Button>
                </div>
                
                <div style={{ marginBottom: '1rem'}}>
                    <label>Sort Order : {myState.order}</label>
                    <Button onClick={() => {
                        setMyState({ ...myState, order: myState.order === ASC_ORDER ? DESC_ORDER : ASC_ORDER });
                    }} variant="success" >Toggle The Sort Order</Button>
                </div>

                <div>
                    <label>Enter Name</label>
                    <input value={myState.name} type='text' onChange={(e) => {
                        setMyState({ ...myState, name: e.target.value });
                    }} />
                    <Button variant="success" onClick={addName}>Add Name</Button>
                </div>
                
            </div>

            <br />

            <NamesList names={myState.names} order={myState.order} />
            <MemoisedNamesList  names={myState.names} order={myState.order} cached />
        </div>
    )
}