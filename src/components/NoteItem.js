import React, { useContext } from "react";
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
  const { note, editClickNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const handleDelete = ()=> {
    deleteNote(note._id);
  }
  const handleEdit = ()=> {
    editClickNote(note)
    // api call
  }

  return (
    <div className="col-md-3">
      <div className="card my-3 mx-3 note-1">
        <div className="card-body">
          <div className="d-flex align-items-center" style={{justifyContent:'space-between'}}>
            <h5 className="card-title note-title-01"> {note.title}</h5>
            <div className="d-flex" >
                <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit} ></i>
                <i className="fa-solid fa-trash" onClick={handleDelete} ></i>
            </div>
          </div>
            
            <span className="badge bg-info text-dark">{note.tag}</span>
          <p className="note-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}


