import React, {useContext} from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

export default function Notes() {
    const Context = useContext(NoteContext);
    const { notes } = Context;
  return (
    <div className="row my-3">
        <h2>Your Notes</h2>

        {notes.map((note)=>{
            return <NoteItem key={note._id} note={note}/>
        })}
    </div>
  )
}
