import React, { useContext } from "react";
import noteContext from '../context/notes/noteContext';
import alertContext from "../context/alertContext";

export default function NoteItem(props) {
  const { note, editClickNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const {showAlert} = useContext(alertContext)

  const handleDelete = async ()=> {
    // api call
    const update = await deleteNote(note._id);
    if(update){
      showAlert(":  Note deleted successfully", "danger")
    }else {
      showAlert(": Internal server error!!", "danger")
    }
  }
  const handleEdit = ()=> {
    editClickNote(note)
  }

  return (
    <div className="col-md-3">
      <div className="card my-3 mx-3 note-1">
        <div className="card-body">
          <div className="d-flex align-items-center" style={{justifyContent:'space-between', flexWrap: 'wrap'}}>
            <h5 className="card-title note-title-01"> {note.title}</h5>
            <div className="" >
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


