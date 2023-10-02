import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

export default function Form() {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title:"", description:"", tag:"Defult"});
  
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note);
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value});  //using sprade operator
  }

  return (
    <div>
    <h2>Add a Note</h2>
      <form className=''>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" autoComplete="username" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control desc" id="description" name='description' autoComplete="current-password" onChange={onChange} />
          </div>


          <div className="d-flex justify-content-end addButton">
          <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
          </div>
        </form>
    </div>
  )
}
