import React, { useContext, useRef, useState  } from 'react';
import NoteContext from '../context/notes/noteContext';
import alertContext from '../context/alertContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useEffect } from 'react';

export default function Notes() {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;  //destructuring our context
    const [note, setNote] = useState({title:"", description:"", tag:""});

    const ref = useRef(null);
    const refClose = useRef(null);
    
    const editClickNote = (currentNote)=>{
      ref.current.click()
      setNote(currentNote)
      // editNote(currentNote._id)
    }
    
    useEffect(() => {
      getNotes()
      // eslint-disable-next-line 
    }, [] )
    
  const {showAlert} = useContext(alertContext)
  const handleClick = async ()=>{
    // console.log('Updating the note', note)
    // let txt; 
    // txt = document.getElementById('description').value.split("\n");
    // let str = txt.join('</br>');
    // setNote({description: str})

    //api call
    refClose.current.click()
    const update = await editNote(note._id, note.title, note.description, note.tag) 
    if(update){
      // show alert
      showAlert(": Note is updated", "success")
    }else {
      showAlert(": Internal server error!!", "danger")
    }

  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value});  //using sprade operator
  }


  return (
    <>
    <div className="addNotes">
      <AddNote />

    </div>

    {/* modal form for edit note */}
    {/* <!-- Button trigger modal --> */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div id='update-modal01' className="modal-content">
      <div className="modal-header">
        <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='form-container'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <textarea style={{resize:'none'}} min={3} type="text" className="form-control title02" id="title" name='title' aria-describedby="emailHelp" autoComplete="username" onChange={onChange} value={note.title} required={true} />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea style={{resize:'none'}} min={5} type="text" className="form-control desc02" id="description" name='description' autoComplete="current-password" onChange={onChange} value={note.description} required={true} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input min={2} type="text" className="form-control tag02" id="tag" name='tag' autoComplete="current-password" onChange={onChange} value={note.tag} required={true} />
          </div>

        </form>
      </div>
      <div className="modal-footer">
        <button id='update-btn' type="button" className="btn btn-primary" onClick={handleClick} >Update</button>
      </div>
    </div>  
  </div>
</div>

    <div className="row my-3">
        <h2>Your Notes</h2>

        <div className="container">
          {notes.length === 0 && "no notes to display"}

        </div>


        {notes.map((note)=>{
            return <NoteItem key={note._id} note={note} editClickNote={editClickNote} tag={note.tag} />
        })}
    </div>
    </>
  )
}