import React from 'react';
import Button  from '../Button';

const getInitialFormValues = () => ({
    name: '',
    email: '',
    id: '',
  });
  
  const getInitialAppState = () => {
    return ({
      form: getInitialFormValues(),
      records: [],
    });
  }

export const EmpTable = () => {
    const [appState, setAppState] = React.useState(getInitialAppState());
    const { records, form: { name, email, id } } = appState;
  
    const handleSubmit = () => {
      const newRecords = [...records];
      if (!id) {
        newRecords.push({
          name, email, id: crypto.randomUUID(),
        });
      } else {
        for (let i = 0; i < newRecords.length; i++) {
          if (newRecords[i].id === id) {
            newRecords[i] = { id, name, email }
            break;
          }
        }
      }
      
      setAppState({
        form: getInitialFormValues(),
        records: newRecords
      })
    }
  
    const handleAction = (e) => {
      const { id, action } = e.target.dataset;
      const { records, form } = appState;
      if (action === "delete") {
        const newAppState = { ...appState }
        const newRecords = records.filter(obj => obj.id !== id);
        newAppState.records = newRecords;
        if (id === form.id) {
          newAppState.form = getInitialFormValues();
        }
        setAppState(newAppState)
      } else if (action === "edit") {
        const record = records.filter(obj => obj.id === id)[0];
        setAppState({
          ...appState,
          form: record,
        })
      }
    }
  
    const updateFormValue = (fieldName, value) => {
      setAppState({
        ...appState,
        form: {
          ...appState.form,
          [fieldName]: value,
        }
      });
    }
  
    return (
        <div className="formContainer" style={{ display: 'none' }}>
          {id ? <div className='fieldContainer'>
            <label>Emp Id</label>
            <input value={id} type="text" disabled />
          </div> : null}
          <div className='fieldContainer'>
            <label>Emp name</label>
            <input onChange={(e) => {
              updateFormValue('name', e.target.value);
            }} value={name} type="text" />
          </div>
          <div className='fieldContainer'>
            <label>Emp email</label>
            <input onChange={(e) => {
              updateFormValue('email', e.target.value);
            }} value={email} type="email" />
          </div>
          <div>
            <Button type="submit" variant="success" onClick={handleSubmit} >
              {id ? 'Update' : 'Add'}
            </Button>
          </div>
          <br />
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map(({ id, name, email }) => {
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>
                        <Button dataAttributes={ { id, action:"delete" }} type="button" variant="danger" onClick={handleAction} >Delete</Button>
                        <Button dataAttributes={ { id, action:"moveUp" }} type="button" variant="normal" onClick={handleAction} >Move Up</Button>
                        <Button dataAttributes={ { id, action:"moveDown" }} type="button" variant="normal" onClick={handleAction} >Move Down</Button>
                        <Button dataAttributes={ { id, action:"edit" }} type="button" variant="danger" onClick={handleAction} >Edit</Button>
                      </td>
                    </tr>
                  )
                })
              }
              {
                records.length === 0 ?
                <tr>
                  <td colSpan="4">No Records</td>
                </tr>
                :
                null
              }
            </tbody>
          </table>
      </div>
    )
}