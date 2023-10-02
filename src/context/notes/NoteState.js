import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
  const host = "http://localhost:5000";
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
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTg3ZGEyMzg5NGJjNjk4MmNmZTE2NSIsImlhdCI6MTY5NjEwMzg0Mn0.7Foj__Q7q3V01IGM5gJU003vBV28GROvvuTtEuESYz8"
            }
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          const json = await response.json();
          console.log(json);
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
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNjgyN2QzZjYzMzhmMDBmYjQ3YTEzIn0sImlhdCI6MTY3NjEyMzg4MX0.pZirPWDdq5Ktvbguo5PbpnFnAaOkiB7yfyQJ_rbzPRE"
            },
            body: JSON.stringify({title:n.title, description:n.description, tag:n.tag}), // body data type must match "Content-Type" header
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          console.log("Adding a new note")
          const note = {
            "title": n.title,
            "description": n.description,
            "tag": n.tag
          };
          setNotes(notes.concat(note))  
        }
        //Delete a note
        const deleteNote = (id)=>{
          //TODO API call
          console.log("Deleting note" , id)
          const newNote = notes.filter((note)=>{return note._id !== id});

          setNotes(newNote);
        }
        //Edit a note
        const editNote = async(n)=>{
          console.log("note is editing..")
          //logic to implement edit operation
          let element = {title:"",description:"", tag:""};
          for (let index = 0; index < notes.length; index++) {
            element = notes[index];
            if(element._id === n._id){
              element.title = n.title;
              element.description = n.description;
              element.tag = n.tag;
            }
          }
          //API call
          //fetch api call
          // Default options are marked with *
          const response = await fetch(`${host}/api/notes/updatenote/${element._id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNjgyN2QzZjYzMzhmMDBmYjQ3YTEzIn0sImlhdCI6MTY3NjEyMzg4MX0.pZirPWDdq5Ktvbguo5PbpnFnAaOkiB7yfyQJ_rbzPRE"
            },
            body: JSON.stringify({title:element.title, description:element.description, tag:element.tag}), // body data type must match "Content-Type" header
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          const json = response.json();
          console.log(json)
        
        }

    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;