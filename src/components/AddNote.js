import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

export default function Form() {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title:"", description:"", tag:""});
  
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note);
    setNote({title:"", description:"", tag:""});
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value});  //using sprade operator
  }

  return (
    <div>
      <form className='form-container'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input value={note.title} type="text" className="form-control"  name='title' aria-describedby="emailHelp" autoComplete="username" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input value={note.description} type="text" className="form-control desc"  name='description' autoComplete="current-password" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input value={note.tag} type="text" className="form-control desc"  name='tag' autoComplete="current-password" onChange={onChange} />
          </div>


          <div className="d-flex justify-content-center addButton">
          <button disabled={ note.title.length<3 || note.description.length<5 || note.tag.length<2  } className="btn btn-primary" id='btn-add' onClick={handleClick} >Add</button>
          </div>
        </form>
    </div>
  )
}
