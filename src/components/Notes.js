import React, {useContext} from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useEffect } from 'react';

export default function Notes() {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;  //destructuring our context
    
    useEffect(() => {
      getNotes()
      // eslint-disable-next-line 
    }, [] )

  return (
    <>
    <div className="container addNotes">
      <AddNote />

    </div>

    <div className="row my-3">
        <h2>Your Notes</h2>

        {notes.map((note)=>{
            return <NoteItem key={note._id} note={note}/>
        })}
    </div>
    </>
  )
}