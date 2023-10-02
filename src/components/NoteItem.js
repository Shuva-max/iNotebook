import React, { useContext } from "react";
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;

  const handleDelete = ()=> {
    deleteNote(note._id);
  }
  const handleEdit = ()=> {
    editNote(note)
  }

  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3 mx-3">
        <div className="card-body">
          <div className="d-flex align-items-center" style={{justifyContent:'space-between'}}>
            <h5 className="card-title"> {note.title}</h5>
            <div className="d-flex" >
                <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit} ></i>
                <i className="fa-solid fa-trash" onClick={handleDelete} ></i>
            </div>
            
          </div>
          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}


