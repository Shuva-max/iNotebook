import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
  const host = "https://inotebookbackend-tyuv.onrender.com";

    const noteItem = []

    const [notes, setNotes] = useState(noteItem);
        
        //Get all notes
        const getNotes = async()=>{
          //API call
          //fetch api call
          // Default options are marked with *
          const response = await fetch(`${host}/api/notes/getnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          const json = await response.json();
          // console.log(json);
          setNotes(json);  
        }
        //ADD a note
        const addNote = async(n)=>{
          //API call
          //fetch api call
          // Default options are marked with *
          const response = await fetch(`${host}/api/notes/createnotes`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title:n.title, description:n.description, tag:n.tag}), // body data type must match "Content-Type" header
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          // console.log("Adding a new note")
          const note = await response.json();
          
          setNotes(notes.concat(note.note))  
          // console.log(note)
          return note.status
        }
        //Delete a note
        const deleteNote = async (id)=>{
          //TODO API call
          // console.log("Deleting note" , id)
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          const json = await response.json();
          // console.log(json)
          const newNote = notes.filter((note)=>{return note._id !== id});
          setNotes(newNote);
          return json.status
        }
        //Edit a note
        const editNote = async(id, title, description, tag)=>{
          // console.log("note is editing..")
          //API call
          //fetch api call
          // Default options are marked with *
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title: title, description: description, tag: tag}), // body data type must match "Content-Type" header
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          const json = await response.json();
          // console.log(json)

          //logic to implement edit operation in clint
          const eNote = await JSON.parse(JSON.stringify(notes));
          for (let index = 0; index < eNote.length; index++) {
            const element = eNote[index];
            if(element._id === id){
              eNote[index].title = title;
              eNote[index].description = description;
              eNote[index].tag = tag;
              break;
            }
          }
          // console.log(eNote)
          setNotes(eNote)
          return json.status;
        }

    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;